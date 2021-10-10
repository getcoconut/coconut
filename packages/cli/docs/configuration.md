# Configuration

## Configuration file

Coconut uses [cosmiconfig](https://www.npmjs.com/package/cosmiconfig) for configuration file support. This means you can configure Coconut via (in order of precedence):

- a `coconut` key in your package.json file
- a `.coconutrc` file written in JSON or YAML
- a `.coconutrc.json`, `.coconutrc.yaml` or `.coconutrc.yml` file
- a `.coconutrc.js`, `.coconutrc.cjs`, `coconut.config.js` or `coconut.config.cjs` file that exports an object using `module.exports`

The configuration file will be resolved starting from the current working directory or the project directory specified by the `-p` option, and searching up the file tree until a config file is (or isn’t) found.

## Example

File `.coconutrc.json`:

```json
{
  "outputs": {
    "targets": [
      "apps/user-app/src",
      "apps/admin-app/src",
      "apps/mobile-app/src"
    ]
  }
}
```

## Options

Here are the available options, where every option is identified by its full path.

### `outputs/targets`

Defines a list of folders where the `mock` and `outputs` commands should write the program outputs. These are generally folders that belong to the source code of your client apps that need access to the infrastructure. You would then import these outputs files and use the data to access the created resources.

For every target folder, the outputs will be written to the file `<target folder>/coconut/<stack>.json`. For the `mock` command, the stack name is `mock`.

Target folders can be absolute or relative to the folder where the Coconut CLI is executed (current working directory).
