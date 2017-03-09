#!/usr/bin/env node

'use strict';

var io = require('./lib/io');
var elasticBeanstalk = require('./lib/elasticBeanstalk');

var argv = require('yargs').argv;
var command = argv._[0].toLowerCase();
var configPath = argv.c || argv.config;

if(command === "update") {

	var config = io.readJsonFile(configPath);

	config.applications.forEach(function(applicationName) {
		elasticBeanstalk.updateEnvironment(config.applications, config.OptionSettings)
			.then(function(successData) {
				console.log(successData)
			});
	});
}
