#!/usr/bin/env node

'use strict';

var ec2 = require('./lib/ec2');
var io = require('./lib/io');
var exec = require('./lib/process');

function directConnect(commandType) {

    ec2.listApplications(commandType)
        .then(io.promptServers)
        .then(exec.spawnSSHProcess);
}

var commandType = '';
var argv = process.argv;
if (argv.length > 1) {
    commandType = argv[2];
}


directConnect(commandType);
