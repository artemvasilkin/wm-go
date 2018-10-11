# Getting Started

## Installing

1. Simply clone a [wm-go repository](https://github.com/artemvasilkin/wm-go) somewhere in your projects directory

```console
$ git clone https://github.com/artemvasilkin/wm-go.git
$ cd wm-go
$ npm link
```

Now all commands from `wm-go` is available to use in any directory.

:::warning
Please, make sure you have [blocks repository](https://github.com/webliumteam/blocks) as well as [wm-cli package](https://www.npmjs.com/package/wm-cli) pre-installed on your computer.
:::

2. Add users information and github token

```console
$ wm-config
Enter github-token: ****************************************
Enter wm-cli email for dev server: your@email.com
Enter wm-cli password for dev server: ****
Enter wm-cli email for stage server: your@email.com
Enter wm-cli password for stage server: ***
Enter wm-cli email for prod server: your@email.com
Enter wm-cli password for prod server: ***
Enter wm-cli email for app server: your@email.com
Enter wm-cli password for app server: ******
```

`wm-config` calls a cli interface for entering login info.

Expected output is

```console
all set up:
You current config file:
****************************************
your@email.com
****
your@email.com
***
your@email.com
***
your@email.com
******
```

## Usage

After your wm-config is set up you can open your [blocks repository](https://github.com/webliumteam/blocks) and start working. For example

```console
$ cd blocks
$ wm-open 1/services
```

## Updating wm-go

Just pull changes from git and relink commands

```console
$ cd wm-go
$ git pull
$ npm unlink
$ npm link
```

## Removing wm-go

You'll need to unlink commands and remove repository from your computer

```console
$ cd wm-go
$ npm unlink
$ cd ../
$ rm -rf wm-go
```