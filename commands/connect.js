#!/usr/bin/env node

'use strict';

var ec2 = require('../lib/ec2');
var io = require('../lib/io');
var exec = require('../lib/process');

function directConnect(applicationName) {

    ec2.listApplications(applicationName)
        .then(io.promptServers)
        .then(exec.spawnSSHProcess);
}

var applicationName = '';
var argv = process.argv;
if (argv.length > 1) {
    applicationName = argv[2];
}

directConnect(applicationName);
