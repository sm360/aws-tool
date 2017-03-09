'use strict';

var AWS = require('aws-sdk');
var q = require('q');
var config = require('../config/auth').get();

var authOptions  = {
    region: config.aws.region,
    credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey
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
   		if (err) {
        console.log(err, err.stack);
        deferrred.reject(err);
   		} else {
   			deferred.resolve(data);
   		}
 	});

  return deferred.promise;
}

module.exports = {
    updateEnvironment: updateEnvironment
};
