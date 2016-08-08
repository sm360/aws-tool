# aws-tool

A set of command line tools for aws.

[Official repo](https://github.com/rivardolivier/aws-tool)

Install the tool on your machine with this command:

npm install -g .

_Configuration:_

 Add a file aws.json in the config folder with those configurations:

 {
  "aws": {
    "accessKeyId":"your_access_key",
    "secretAccessKey":"your_secret_access_key",
    "region":"The_region_of_your_apps"
  }
}

## Connect

_Example command:_

connect {name_of_the_app}

This will search for all the apps with this name in AWS and you will be able to connect on one of those hosts with ssh.