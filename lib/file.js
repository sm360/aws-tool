'use strict';

var os = require('os');
var path = require('path');
var fs = require('fs');
var q = require('q');

const HOME_DIRECTORY = os.homedir();
const CONFIG_FILE_LOCATION = path.join(HOME_DIRECTORY, '.awstool.conf');

function update(path, content) {

    fs.writeFile(path, content);
}

function read(path) {

  var deferred = q.defer();

  fs.readFile(path, 'utf8', function (err,data) {

    if (err) {
      deferred.reject(err)
    }

    deferred.resolve(JSON.parse(data));
  });

  return deferred.promise;
}

module.exports = {
  update: update,
  read: read
}
