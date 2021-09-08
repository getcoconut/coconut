# Coconut CLI

Coconut CLI is a tool for locally emulating and mocking [Pulumi Cloud Framework](https://github.com/pulumi/pulumi-cloud) (PCF) projects. By using the Coconut CLI, developers are able to emulate and test their projects locally without ever needing to deploy them to the cloud.

> Note: This tool is meant to work with pure PCF projects. So if your project uses other Pulumi resources you can't use it with the Coconut CLI.

> Note: Check the [Pulumi Cloud Mock Provider](https://www.npmjs.com/package/@getcoconut/pulumi-cloud-mock) for details about the supported resources.

## Getting started

To get started, go to your PCF project, install the required packages and run the tool:

```sh
$ cd <project>
$ npm install -D @getcoconut/cli @getcoconut/pulumi-cloud-mock
$ npm run coconut
```

Once the PCF program is executed and the resources are ready, the outputs exported by the program will be printed on the screen and you can use them for testing. An example of these outputs are the URLs of the HTTP Server resources created by the program.
