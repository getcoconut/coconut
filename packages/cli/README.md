# Coconut CLI

Coconut CLI is a tool for locally emulating and mocking [Pulumi Cloud Framework](https://github.com/pulumi/pulumi-cloud) (PCF) projects. By using the Coconut CLI, developers are able to emulate and test their projects locally without ever needing to deploy them to the cloud.

> Note: This tool is meant to work with pure PCF projects. So if your project uses other Pulumi resources you can't use it with the Coconut CLI.

> Note: Check the [Pulumi Cloud Mock Provider](https://www.npmjs.com/package/@getcoconut/pulumi-cloud-mock) for details about the supported resources.

## Getting started

### Prerequisites

As Coconut is a tool for PCF projects, you will need:

- [Pulumi](https://www.pulumi.com)
- A [PCF](https://github.com/pulumi/pulumi-cloud) project (check above notes for limitations)

### Installation

Add the required packages to you PCF project (use one of the [example projects](./examples) if you don't have one):

```sh
$ cd <PCF project>
$ npm install -D @getcoconut/cli @getcoconut/pulumi-cloud-mock
```

### Mocking

Run the `mock` command from the root of the PCF project:

```sh
$ npx coconut mock
```

Once the PCF program is executed and the resources are ready, the outputs of the program will be printed on the screen. For details on how to use the outputs in your client apps, check the [`outputs/targets`](./docs/configuration.md#opts_outputs_targets) configuration option.

### Examples

Check the [examples folder](./examples) for some example projects.

## Documentation

- [CLI](./docs/cli.md)
- [Configuration](./docs/configuration.md)
