# aws-tool

A set of command line tools for aws.

## Installation
For the moment, the tool is not available on npm.
You can install it with the following command (From the root directory):

```
npm install -g .
```

## Configuration
 In order to connect to AWS API, you will need run the `aws-tool-setup` command.
 This command will create `~/.awstool.conf` that will follow this template:

```
 {
  "aws": {
    "accessKeyId":"your_access_key",
    "secretAccessKey":"your_secret_access_key",
    "region":"The_region_of_your_apps"
  }
}
```

## Commands
### aws-tool-setup
This command will ask you some basic auth information to configure the the client.

```
aws-tool-setup
```

### Connect
This command will search for all the apps with the provided name in AWS. Once you select an instance, an SSH session will be launched. Here is a sample command:

```
connect <name_of_the_app>
```

### beanstalk
This command will allow you to update beanstalk environments:

```
beanstalk update --config <path_of_config_file>
```
