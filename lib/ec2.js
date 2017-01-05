'use strict';

var AWS = require('aws-sdk');
var q = require('q');

var config = require('../config/aws');

var autoscalingOptions = {
    region: config.aws.region,
    credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey
    }
};

var ec2 = new AWS.EC2(autoscalingOptions);

function getRunningTime(timestamp) {

    var day = 60 * 24;
    var twoHours = 60 * 2;
    var unit = "minute";
    
    var currentTime = new Date();
    var minutesRunning =  (currentTime-timestamp)/1000/60;
    var timeRunning = Math.floor(minutesRunning);

    if (minutesRunning > twoHours) {

        timeRunning = Math.floor(minutesRunning / 60);
        unit = "hour";
    }

    if (minutesRunning > day) {

        timeRunning = Math.floor(minutesRunning / 60 / 24);
        unit = "day";
        
    }

    if (timeRunning > 1) {

        unit += "s"
    }

    return timeRunning + " " + unit;
}

function listApplications(name) {

    var deferrred = q.defer();

    var params = {};
    if (name) {
        params = {
            Filters: [
                {
                    Name: 'tag:app',
                    Values: [name]
                }
            ]
        };
    }

    var listInstances = [];

    ec2.describeInstances(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            deferrred.reject(err);
        } else {

            data.Reservations.forEach(function(reservation) {
                reservation.Instances.forEach(function(instance) {
                    var instanceInfo = {};
                    instanceInfo.privateIp = instance.PrivateIpAddress || 'n/a';
                    instanceInfo.publicIp = instance.PublicIpAddress || 'n/a';
                    instanceInfo.status = instance.State.Name || 'n/a';
                    instanceInfo.name = 'n/a';
                    instanceInfo.timeRunning = getRunningTime(instance.LaunchTime);
                    instance.Tags.forEach(function(tag) {
                        if (tag.Key === "Name") {
                            instanceInfo.name = tag.Value;
                        }
                    });
                    listInstances.push(instanceInfo);
                });
            });
            deferrred.resolve(listInstances);
        }
    });

    return deferrred.promise;
}

module.exports = {
    listApplications: listApplications
};
