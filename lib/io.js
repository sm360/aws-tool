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

function readJsonFile(path) {

    var fileContent = fs.readFileSync(path, 'utf8');
    return JSON.parse(fileContent);
}

module.exports = {
    promptServers: promptServers,
    readJsonFile: readJsonFile
};
