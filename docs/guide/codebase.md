# Opening & Saving

__Content:__

[[toc]]

## Open block

__Example:__

```console
$ wm-open <searchQuery>
```

__`<searchQuery>`__ - string, may contain blockId, blockName full git branch or a search query

__What it does:__

- Determine the branch based on `searchQuery`
- In case there is more than one branch found provide an interface to choose
- Checkout the branch
- Pull the branch from remote

## Save changes

__Example:__

```console
$ wm-save <"commit message">
```

__`<"commit message">`__ - string, __must__ contain a commit message.

__What it does:__

- Add changes to the index
- Record changes to the repository
- Update remote refs along with associated objects
- In case it's a new branch
  - Push and set the remote as upstream
  - Create a Pull Request to the prod branch

