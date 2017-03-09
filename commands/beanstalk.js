#!/usr/bin/env node

'use strict';

var io = require('../lib/io');
var elasticBeanstalk = require('../lib/elasticBeanstalk');

var argv = require('yargs').argv;
var command = argv._[0].toLowerCase();
var configPath = argv.c || argv.config;

if(!command && !configPath) {
  console.err('Missing command or config file');
  process.exit(0);
}

if(command === 'update') {

	var config = io.readJsonFile(configPath);
  
  if(!config) {
    console.err('Configuration file was not found');
    return;
  }

	config.applications.forEach(function(applicationName) {
		elasticBeanstalk.updateEnvironment(applicationName, config.OptionSettings)
			.then(function(successData) {
				console.log(successData)
			});
	});
}
