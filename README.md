portbal-cli
=================

CLI tool for managing and balancing a financial portfolio.


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/portbal-cli.svg)](https://npmjs.org/package/portbal-cli)
[![Downloads/week](https://img.shields.io/npm/dw/portbal-cli.svg)](https://npmjs.org/package/portbal-cli)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
[Command Line Interface Guidelines](https://clig.dev/)
# Usage
<!-- usage -->
```sh-session
$ npm install -g portbal-cli
$ portbal COMMAND
running command...
$ portbal (--version)
portbal-cli/0.0.0 darwin-arm64 node-v20.12.2
$ portbal --help [COMMAND]
USAGE
  $ portbal COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
- [portbal-cli](#portbal-cli)
- [Usage](#usage)
- [Commands](#commands)
  - [`portbal hello PERSON`](#portbal-hello-person)
  - [`portbal hello world`](#portbal-hello-world)
  - [`portbal help [COMMAND]`](#portbal-help-command)
  - [`portbal plugins`](#portbal-plugins)
  - [`portbal plugins add PLUGIN`](#portbal-plugins-add-plugin)
  - [`portbal plugins:inspect PLUGIN...`](#portbal-pluginsinspect-plugin)
  - [`portbal plugins install PLUGIN`](#portbal-plugins-install-plugin)
  - [`portbal plugins link PATH`](#portbal-plugins-link-path)
  - [`portbal plugins remove [PLUGIN]`](#portbal-plugins-remove-plugin)
  - [`portbal plugins reset`](#portbal-plugins-reset)
  - [`portbal plugins uninstall [PLUGIN]`](#portbal-plugins-uninstall-plugin)
  - [`portbal plugins unlink [PLUGIN]`](#portbal-plugins-unlink-plugin)
  - [`portbal plugins update`](#portbal-plugins-update)

## `portbal hello PERSON`

Say hello

```
USAGE
  $ portbal hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ portbal hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/eriksavage/portbal-cli/blob/v0.0.0/src/commands/hello/index.ts)_

## `portbal hello world`

Say hello world

```
USAGE
  $ portbal hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ portbal hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/eriksavage/portbal-cli/blob/v0.0.0/src/commands/hello/world.ts)_

## `portbal help [COMMAND]`

Display help for portbal.

```
USAGE
  $ portbal help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for portbal.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.8/src/commands/help.ts)_

## `portbal plugins`

List installed plugins.

```
USAGE
  $ portbal plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ portbal plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.4/src/commands/plugins/index.ts)_

## `portbal plugins add PLUGIN`

Installs a plugin into portbal.

```
USAGE
  $ portbal plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into portbal.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the PORTBAL_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the PORTBAL_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ portbal plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ portbal plugins add myplugin

  Install a plugin from a github url.

    $ portbal plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ portbal plugins add someuser/someplugin
```

## `portbal plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ portbal plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ portbal plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.4/src/commands/plugins/inspect.ts)_

## `portbal plugins install PLUGIN`

Installs a plugin into portbal.

```
USAGE
  $ portbal plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into portbal.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the PORTBAL_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the PORTBAL_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ portbal plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ portbal plugins install myplugin

  Install a plugin from a github url.

    $ portbal plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ portbal plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.4/src/commands/plugins/install.ts)_

## `portbal plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ portbal plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ portbal plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.4/src/commands/plugins/link.ts)_

## `portbal plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ portbal plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ portbal plugins unlink
  $ portbal plugins remove

EXAMPLES
  $ portbal plugins remove myplugin
```

## `portbal plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ portbal plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.4/src/commands/plugins/reset.ts)_

## `portbal plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ portbal plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ portbal plugins unlink
  $ portbal plugins remove

EXAMPLES
  $ portbal plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.4/src/commands/plugins/uninstall.ts)_

## `portbal plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ portbal plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ portbal plugins unlink
  $ portbal plugins remove

EXAMPLES
  $ portbal plugins unlink myplugin
```

## `portbal plugins update`

Update installed plugins.

```
USAGE
  $ portbal plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.4/src/commands/plugins/update.ts)_
<!-- commandsstop -->
