#!/usr/bin/env node

'use strict';

var elasticBeanstalk = require('./lib/elasticBeanstalk');

function getParameters(parameters) {

	var validParameters = true;
	var parameters;
	var exception;
	try {

		parameters = require('./config/updateBeanstalkEnvironmentParams');

		if (parameters.applications === undefined || parameters.OptionSettings === undefined) {
			validParameters = false;
		}

	} catch (e) {
		exception = e;
		validParameters = false;
	}

	if (validParameters) {

		return parameters;
	} else {

		var paramsTemplate = require('./resources/beanstalkEnvironmentParamsTemplate');
		console.log('Invalid or missing parameters in folder config/updateBeanstalkEnvironmentParams.json \n Example: \n %j', paramsTemplate);
		throw new Error(exception);
	}
}


function updateEnvironment() {

	var updateParameters = getParameters();

	updateParameters.applications.forEach(function(environmentName) {

		console.log('Updating %s with these optionSettings configurations %j', environmentName, updateParameters.OptionSettings);
		console.log(updateParameters.OptionSettings);
		elasticBeanstalk.updateEnvironment(environmentName, updateParameters.OptionSettings);
	});
}

updateEnvironment();