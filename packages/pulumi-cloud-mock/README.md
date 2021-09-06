# Pulumi Cloud Mock Provider

An implementation of the [Pulumi Cloud Framework](https://github.com/pulumi/pulumi-cloud) (PCF) used by the [Coconut CLI](../cli) for mocking and emulating resources locally.

## Getting started

Check the [Coconut CLI](../cli) documentation for usage details.

## PCF API implementation status

Below is the list of the elements defined by the PCF API and their status of implementation in this provider:

| API                             | Status             |
| ------------------------------- | ------------------ |
| `HTTPServer` resource           | :white_check_mark: |
| `Table` resource                | :white_check_mark: |
| `Bucket` resource               | :x:                |
| Timer functions                 | :x:                |
| `Topic` resource                | :x:                |
| `API` resource                  | :x:                |
| `Service` and related resources | :x:                |
