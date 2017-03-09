'use strict';

var _ = require('lodash');
var fs = require('fs');
var inquirer = require('inquirer');

function promptServers(listInstances) {

    var labels = _.map(listInstances, function(instance) {
        return {
            name: instance.name + "(" + instance.privateIp + ")" + " - " + instance.status + " - " + instance.timeRunning,
            value: instance.privateIp
        };
    });

    return inquirer.prompt([ {
        type: 'list',
        name: 'instance',
        message: 'Direct connect on:',
        choices: labels
    }]);
}

function promptSetup() {

    var questions = [{
        type: 'input',
        name: 'accessKeyId',
        message: 'Access Key Id'
    },{
        type: 'input',
        name: 'secretAccessKey',
        message: 'Secret Access Key'
    },{
        type: 'input',
        name: 'region',
        message: 'Region'
    }];

    return inquirer.prompt(questions);
}

function readJsonFile(path) {

    try {
        var fileContent = fs.readFileSync(path, 'utf8');
        return JSON.parse(fileContent);
    } catch (exception) {
        return;
    }
}

module.exports = {
    promptServers: promptServers,
    promptSetup: promptSetup,
    readJsonFile: readJsonFile
};
