---
sidebarDepth: 2
---

# Commands

## Opening & Saving

:::warning
This section describes how to work with __code base__, i.e. commands below will affect [blocks repository](https://github.com/webliumteam/blocks) contents.
:::

### Open block

```console
$ wm-open <searchQuery>
```

__Parameters:__

| Order | Parameter            | Type         | Description                                                                     |
| ----- | -------------------- | ------------ | ------------------------------------------------------------------------------- |
| 1.    | `<searchQuery>`      | String       | __Required.__ May contain blockId, blockName full git branch or a search query. |

__What it does:__

- Determine the branch based on `searchQuery`
- In case there is more than one branch found provide an interface to choose
- Checkout the branch
- Pull the branch from remote

### Save changes

```console
$ wm-save <"commit message"> [-f|--force]
```

__Parameters:__

| Order | Parameter            | Type         | Description                                      |
| ----- | -------------------- | ------------ | ------------------------------------------------ |
| 1.    | `<"commit message">` | String       | __Required.__ Provides a commit message for git. |

__Flags:__

| Flag                 | Alias        | Description                                                                  |
| -------------------- | ------------ | ---------------------------------------------------------------------------- |
| `--force`            | `-f`         | __Optional.__ Allows to omit _stylelint_ and _eslint_ pre-commit validation. |

__What it does:__

- Add changes to the index
- Record changes to the repository
- Update remote refs along with associated objects
- In case it's a new branch
  - Push and set the remote as upstream
  - Create a Pull Request to the prod branch

## Publishing blocks

:::warning
This section describes how to work with __data base__, i.e. commands below may affect __developing, staging and/or production servers__.
:::

### Add (initialize) new block on a certain server

```console
$ wm-init <server>
```

__Parameters:__

| Order | Parameter            | Type         | Description                                                                    |
| ----- | -------------------- | ------------ | ------------------------------------------------------------------------------ |
| 1.    | `<server>`           | String       | __Required.__ Indicates which server you need to init the block to.            |

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

### Republish an existing block on a certain server

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

### Remove block from certain database

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

### Notes

`<server>` - one of the following options:
- `local`
- `dev`
- `stage`
- `app`
- `prod`

:::tip
You can also use domains as aliases for certain servers. For example:
- `dev` = `io`
- `stage` = `co`
- `prod` = `com`
:::
