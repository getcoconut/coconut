# Todos (Coconut example)

This is an example [Pulumi Cloud Framework](https://github.com/pulumi/pulumi-cloud) (PCF) project to show how to use the [Coconut CLI](https://www.npmjs.com/package/@getcoconut/cli).

It implements a simple API that uses a DB table to manage todos (actually any JSON objects). It uses the `HttpServer` and `Table` resources from PCF.

## Setup

Install dependencies:

```sh
$ npm install
```

## Mock

Run the Coconut CLI with the `mock` command to emulate your project locally:

```sh
$ npx coconut mock
```

Once the services are ready, you will see the url of the local HTTP Server on the console, e.g.:

```json
{
  "api": "http://localhost:64687"
}
```

Now you can use your preferred REST client to test the API by making requests to `<api url>/todos`. If you make any code changes, you must stop (Ctrl-C) the Coconut CLI and re-run it to apply them (hot reloading is in our roadmap).

## Deployment

After finnishing local testing, you can deploy your app to the cloud using the usual Pulumi processes.

To deploy to AWS for example:

```sh
$ pulumi config set cloud:provider aws
$ AWS_PROFILE=<aws profile name> pulumi up
```
