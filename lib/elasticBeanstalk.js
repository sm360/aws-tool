'use strict';

var AWS = require('aws-sdk');
var config = require('../config/aws');

var options  = {
    region: config.aws.region,
    credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey
    }
};

var elasticbeanstalk = new AWS.ElasticBeanstalk(options);

function updateEnvironment(environmentName, optionSettings) {

	var params = {
		EnvironmentName: environmentName,
		OptionSettings: optionSettings
	};

	elasticbeanstalk.updateEnvironment(params, function(err, data) {
   		if (err) {

   			console.log(err, err.stack); // an error occurred
   		} else {

   			console.log(data);           // successful response
   		}     
 	});

}


module.exports = {
    updateEnvironment: updateEnvironment
};