# Todos (Coconut example)

This is an example [Pulumi Cloud Framework](https://github.com/pulumi/pulumi-cloud) (PCF) project to show how to use the [Coconut CLI](https://www.npmjs.com/package/@getcoconut/cli).

It implements a simple API that uses a DB table to manage todos (actually any JSON objects). It uses the `HttpServer` and `Table` resources from PCF.

The project is also configured with dummy client apps to show how to use the program outputs. These are located in the `apps` folder and their source folders are configured as outputs targets (see `.coconutrc.json`).

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

Once the services are ready, the outputs will be written to the configured outputs targets and printed on the console, e.g.:

```json
{
  "api": "http://localhost:64687"
}
```

Now start one of the client apps which load the mock outputs and write them to the console to show how you can use these outputs. To start the admin app for example, execute the following commands in another terminal:

```sh
$ cd apps/admin-app
$ npm start
```

You can also use your preferred REST client to test the API by making requests to `<api url>/todos`.

If you make any code changes, you must stop (Ctrl-C) the Coconut CLI and re-run it to apply them (hot reloading is in our roadmap).

## Deployment

After finishing local testing, you can deploy your app to the cloud using the usual Pulumi processes. To use the outputs of the deployment in your client apps, use the Coconut `outputs` command to write them to your outputs targets.

This example project has an npm script called `deploy` that does exactly that: it runs `pulumi up` then `coconut outputs` for the `dev` stack. To try it out, run the following command:

```sh
$ AWS_PROFILE=<aws profile name> npm run deploy
```

Now start one of the client apps, which load the outputs file and write its content to the console, to show how you can use these outputs. To start the admin app for example, execute the following commands in another terminal:

```sh
$ cd apps/admin-app
$ npm start
```
