# Developer guide

The Coconut project is a monorepo that uses [Nx](https://nx.dev), so having some knowledge of Nx would be helpful to better understand how things work.

## Main rules

TBD

## Setup

Clone the project then install dependencies in the root of the project:

```sh
$ yarn install
```

## Running unit tests

Running tests for a specific package:

```sh
$ yarn test <package name>
```

Running tests for all packages:

```sh
$ yarn test:all
```

During development you can add the `--watch` option to start [jest](https://jestjs.io) in watch mode.

If you run into strange issues when running tests, try to clear the `jest` cache with

```sh
$ yarn jest --clearCache
```

then run the tests again.

## Building

Run the following command to build production versions of a package:

```sh
yarn buid <package name>
```

If the build succeeds, the generated production version will be available in the folder `dist/packages/<package name>`.
