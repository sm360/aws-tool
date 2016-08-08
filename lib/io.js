'use strict';

var _ = require('lodash');
var inquirer = require('inquirer');

function promptServers(listInstances) {

    var labels = _.map(listInstances, function(instance) {
        return {
            name:instance.name + "(" + instance.privateIp + ")" + " " + instance.status,
            value:  instance.privateIp
        };
    });

    return inquirer.prompt([ {
        type: 'list',
        name: 'instance',
        message: 'Direct connect on:',
        choices: labels
    }]);
}

module.exports = {
    promptServers: promptServers
};
