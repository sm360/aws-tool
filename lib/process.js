'use strict';

var spawn = require('child_process').spawn;

function spawnSSHProcess(answer) {
    spawn('ssh', [answer.instance], { stdio: 'inherit' });
}

module.exports = {
    spawnSSHProcess: spawnSSHProcess
};
