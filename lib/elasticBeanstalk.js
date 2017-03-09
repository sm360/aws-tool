'use strict';

var AWS = require('aws-sdk');
var q = require('q');
var config = require('../config/auth').get();

var authOptions  = {
    region: config.region,
    credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
    }
};

var elasticbeanstalk = new AWS.ElasticBeanstalk(authOptions);

function updateEnvironment(environmentName, optionSettings) {

  var params = {
		EnvironmentName: environmentName,
		OptionSettings: optionSettings
	};

  var deferred = q.defer();

	elasticbeanstalk.updateEnvironment(params, function(err, data) {
       console.log('Updating %s', environmentName);
   		if (err) {
        console.log(err, err.stack);
        deferred.reject(err);
   		} else {
   			deferred.resolve(data);
   		}
 	});

  return deferred.promise;
}

module.exports = {
    updateEnvironment: updateEnvironment
};
