# Coconut CLI

Coconut CLI is a tool for locally emulating and mocking [Pulumi Cloud Framework](https://github.com/pulumi/pulumi-cloud) (PCF) projects. By using the Coconut CLI, developers are able to emulate and test their projects locally without ever needing to deploy them to the cloud.

> Note: This tool is meant to work with pure PCF projects. So if your project uses other Pulumi resources you can't use it with the Coconut CLI.

> Note: Check the [Pulumi Cloud Mock Provider](https://www.npmjs.com/package/@getcoconut/pulumi-cloud-mock) for details about the supported resources.

## Getting started

To get started, go to your PCF project, install the required packages and run the tool:

```sh
$ cd <project>
$ npm install -D @getcoconut/cli @getcoconut/pulumi-cloud-mock
$ npx coconut mock
```

Once the PCF program is executed and the resources are ready, the output of the program will be printed on the screen and you can use them for testing. An example of these outputs are the URLs of the HTTP Server resources created by the program.

### Examples

Check the [examples folder](./examples) for some example projects to get you started.

## Configuration

The Coconut CLI uses the [config npm package](https://www.npmjs.com/package/config) for loading its configuration. To set yours, create your configuration files as described in ["Configuration Files"](https://github.com/lorenwest/node-config/wiki/Configuration-Files) and add the Coconut CLI configuration in the key `@getcoconut/cli`.

### Example

File `config/default.json`:

```json
{
  "@getcoconut/cli": {
    "output": {
      "targets": [
        "apps/user-app/src",
        "apps/admin-app/src",
        "apps/mobile-app/src"
      ]
    }
  }
}
```

### Options

Here are the available options, where every option is identified by its full path inside of the `@getcoconut/cli` key.

#### `output/targets`

Defines a list of folders where the `mock` and `outputs` commands should write the program outputs. These are generally folders that belong to the source code of your client apps that need access to the infrastructure. You would then import these output files and use the data to access the created resources.

For every target folder, the output will be written to the file `<target folder>/coconut/<stack>.json`. For the `mock` command, the stack name is `mock`.

Target folders can be absolute or relative to the folder where the Coconut CLI is executed (current working directory).
