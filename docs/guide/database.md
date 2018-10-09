# Publishing blocks

__Content:__

[[toc]]

## Add (initialize) new block to a database

__Example:__

```console
$ wm-init <server>
```

__What it does:__

- Login to server based on `<server>` parameter
- Automatically detect name, category, type and roles of the block
- Init new block file using name, category, type, roles and server info
- Commit block changes
- Upgrade block version in `package.json`
  - Record changes to the repository
  - Update remote refs along with associated objects
  - In case it's a new branch - push and set the remote as upstream
- Create a Pull Request to the prod branch

## Republish an existing block

__Example:__

```console
$ wm-republish <server>
```

__What it does:__

- Login to server based on `<server>` parameter
- Commit block changes
- Publish block
- Upgrade block version in `package.json`
  - Record changes to the repository
  - Update remote refs along with associated objects
  - In case it's a new branch - push and set the remote as upstream
- Create a Pull Request to the prod branch

## Remove block from database

__Example:__

```console
$ wm-kill <server>
```

__What it does:__

- Login to a server based on `<server>` parameter
- Automatically detect blockId
- Remove block from database using blockId
- Unlink block-file
  - Record changes to the repository
  - Update remote refs along with associated objects
  - In case it's a new branch - push and set the remote as upstream
- Create a Pull Request to the prod branch

## Notes

`<server>` - one of the following options:
- `dev`
- `stage`
- `app`
- `prod`

:::tip
Use domains as aliases for server names. For example:
- `dev` = `io`
- `stage` = `co`
- `app` = `app`
- `prod` = `com`
:::