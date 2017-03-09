'use strict';

var path = require('path');
var os = require('os');

var file = require('../lib/file');

const HOME_DIRECTORY = os.homedir();
const CONFIG_FILE_LOCATION = path.join(HOME_DIRECTORY, '.awstool.conf');

function update(config) {
  console.log(CONFIG_FILE_LOCATION, JSON.stringify(config));
  file.update(CONFIG_FILE_LOCATION, JSON.stringify(config));
}

function get() {
  return file.read(CONFIG_FILE_LOCATION);
}

module.exports = {
  update: update,
  get: get
}
