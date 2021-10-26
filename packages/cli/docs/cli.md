# Command Line Interface

> Note: In this document we will use the syntax `coconut ...` for running the Coconut CLI, but as it's not installed globally, you should use `npx coconut ...` or `yarn coconut ...`.

The Coconut CLI has following options and commands (`coconut -h`):

```
coconut [options] [command]

Options:
  -p, --project <dir>  project directory (default: ".")
  -h, --help           display help for command

Commands:
  mock                 mock a Pulumi Cloud project
  outputs [options]    write a Pulumi Cloud project's outputs to outputs targets
  help [command]       display help for command
```

## <a name="opts"></a>Global options

The following options are global and are supported by all commands, unless explicitly mentioned.

### <a name="opts_p"></a>`--project`

If for some reason you can't run the Coconut CLI from the Pulumi Cloud project directory, then you must tell Coconut where to find it with the `--project` option (or `-p`).

Usage:

```sh
$ coconut --project <directory> ...
```

## <a name="cmds"></a>Commands

### <a name="cmds_mock"></a>`mock`

Emulates and mocks the Pulumi Cloud project locally. It runs the project and creates local services that try to reproduce the behaviour of the corresponding cloud services as closely as possible. It's obviously not possible to reproduce the exact behaviour, but it should be enough to be able to try things out and debug your code locally without needing to deploy to the cloud.

When the services have been created and are ready, the project outputs are written to the console. If you have outputs targets defined (see [configuration](./configuration.md)), the outputs will also be written to a file `coconut.json` under every target directory (see the [outputs](#cmds_outputs) command for details about the file content).

Usage summary:

```
coconut mock [options]

mock a Pulumi Cloud project

Options:
  -h, --help  display help for command
```

### <a name="cmds_outputs"></a>`outputs`

Reads the outputs of the last Pulumi 'up' command for a stack and writes them to the outputs targets defined in the [configuration](./configuration.md). The main purpose of the command is to make the outputs of a deployment available to client applications. The outputs will be written to a file `coconut.json` under every target directory.

The content of the `coconut.json` file is an object with the following properties:

- `stack`: a string with the name of the stack for which the file has been created (can be used to guard against using the wrong config)
- `timestamp`: a date string representing the creation timestamp of the file
- `outputs`: an object containing the program outputs

Usage summary:

```
coconut outputs [options]

write a Pulumi Cloud project's outputs to outputs targets

Options:
  -s, --stack <stack>  stack to get outputs from
  -h, --help           display help for command
```
