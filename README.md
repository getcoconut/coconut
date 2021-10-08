# Coconut

> Note: The project is still in a very early development stage and not ready for production use, but your feedback and contributions are very welcome!

Coconut provides tools to make serverless development around the [Pulumi Cloud Framework](https://github.com/pulumi/pulumi-cloud) (PCF) more simple. It allows you to emulate infrastructure locally & develop without deciding on a cloud provider to get started.

## Packages

Coconut consists of multiple packages that work together and that are all hosted in this monorep. Here is the list of the packages and their purposes:

| Name                                                       | Description                                             |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| [Coconut CLI](./packages/cli)                              | Main CLI for mocking and emulating PCF projects locally |
| [Pulumi Cloud Mock Provider](./packages/pulumi-cloud-mock) | The PCF provider used by the Coconut CLI                |

If you just want to use the tools, then head to the [Coconut CLI](./packages/cli) documentation and follow the getting started instructions. If you feel adventurous, which we hope, feel free to look through all packages and contribute with tickets and pull requests.
