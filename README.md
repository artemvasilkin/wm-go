# wm-go

**Essential commands**

* [#](#wm-review) `wm-review`
* [#](#wm-init) `wm-init`
* [#](#wm-republish) `wm-republish`
* [#](#wm-kill) `wm-kill`

**Special commands**

* [#](#wm-config) `wm-config`
* [#](#wm-history) `wm-history`

**Superuser commands**

* [#](#wm-go-1) `wm-go`
* [#](#wm-report) `wm-report`
* [#](#wm-kit) `wm-kit`

# Essential commands

## wm-review

Starts a server in current branch. You can also pass a flag to run server in editor mode.

**Example**

Start server in default mode

```shell
$ wm-review
```

Start server in editor mode

```shell
$ wm-review --editor
```

```shell
$ wm-review -e
```

## wm-init

Init and publish block (current branch) on dev, stage or prod server.

**What it does:**

1. Login on server
2. Init block (name, category, roles and other parameters will be detected automatically)
3. Publish block
4. Save logs to the [history](https://github.com/webliumteam/blocks/blob/history/historia_vitae_magistra.json) (see [wm-history](#wm-history))
5. Add, commit and push result to git repository
6. Create pull request on prod branch if necessary

**Please note:**

* The argument is required
* You can't init block if your current branch is prod branch
* You can't init block if publishing configs (such as `block.https.weblium.com`) are already exist

**Example**

`wm-init dev` or `wm-init io` - init block on development server

`wm-init stage` or `wm-init co` - init block on staging server

`wm-init prod` or `wm-init com` - init block on production server

## wm-republish

Republish (commit and publish) block (current branch) on dev, stage or prod server.

**What it does:**

1. Install dependencies if necessary
2. Login on server
3. Commit block
4. Publish block
5. Add, commit and push result to git repository
6. Create pull request on prod branch if necessary

**Please note:**

* The argument is required
* You can't republish block if your current branch is prod branchh
* You can't republish block if no publishing configs (such as `block.https.weblium.com`) are found

**Example**

`wm-republish dev` or `wm-republish io` - republish block on development server

`wm-republish stage` or `wm-republish co` - republish block on staging server

`wm-republish prod` or `wm-republish com` - republish block on production server

`wm-republish all` - republish block on both staging and production servers

**Additional feature:**

Expand commit by adding new name, category, role or isWireframe values by adding second argument as a string. For example, use `wm-republish stage "--roles=header` to change roles of block on stage server or `wm-republish stage "--wireframe=true` to change isWireframe block property.

*Please note, you can no longer expand commit with `--name` and `-c` argument, it's been deprecated since April 2018.*

## wm-kill

Kll (remove and purge) block (current branch) on dev, stage or prod server.

**What it does:**

1. Read block ID from publishing config file
2. Remove block from data-base
3. Purge block and publishing config file
4. Add, commit and push result to git repository
5. Create pull request on prod branch if necessary

**Please note:**

* MAKE SURE YOU KNOW WHAT YOU'RE DOING!!!
* There's no way coming back
* Memento mori

**Example**

`wm-kill dev` or `wm-kill io` - kill block on development server

`wm-kill stage` or `wm-kill co` - kill block on staging server

`wm-kill prod` or `wm-kill com` - kill block on production server

`wm-kill all` - kill block on both staging and production servers

# Special commands

## wm-config

Some actions or commands require authentication info like *username and password* for accessing servers or *github-token* for creating pull requests automatically from cli.

`wm-go.config.json` is a file, containing this information. The `wm-config` command allows you to read, create or edit this file.

**What it can do:**

* Output config file in a command line
* Edit config file within a command line interface

**Please note:**

* You can't edit config fields separately, so every time you need to edit config, you will have to input every field

**Example**

`wm-config` - read the config file, or create if empty

`wm-config --edit` or `wm-config -e` - edit the config file

## wm-history

History is a remote json file that contains a complete log of block publishing on prod servers, including block name, timestamps and some other information.

**What it can do:**

* Output the history file in a command line

**Example**

`wm-history` - read the file

# Superuser commands

## wm-go

Execute some actions with multiple blocks (branches) within one-line command. Go through a branch list and execute commands passed as optional arguments (flags).

**What it does:**

1. Filter all branches with a search query (first argument)
2. Output total number of branches found
3. Execute a loop
    * 3.1. Output current progress
    * 3.1. Checkout branch
    * 3.2. Pull changes from origin
    * 3.3. Read optional arguments (flags)
    * 3.4. Execute commands passed as optional arguments (flags)
    * 3.5. Catch errors if occurs and write down in report file (see [wm-report](#wm-report))
    * 3.6. Go to the next branch
4. Finish the loop

**Please note:**

* The argument (search query) is required. If a search query is empty `wm-go` will include all remote branches as a branch list
* Using `--init` or `-i` flag requires same arguments as `wm-init` command (see [wm-init](#wm-init))
* Using `--republish` or `-r` flag requires same arguments as `wm-republish` command (see [wm-republish](#wm-republish))
* Using `--kill` or `-k` flag requires same arguments as `wm-kill` command (see [wm-kill](#wm-kill))

**Example**

`wm-go gallery --init prod` - find all branches with `gallery` within a branch name, execute `wm-init prod` (see [wm-init](#wm-init)) on each branch found.

`wm-go services --republish stage` - find all branches with `services` within a branch name, execute `wm-republish stage` (see [wm-republish](#wm-republish)) on each branch found.

`wm-go header --kill dev` - find all branches with `header` within a branch name, execute `wm-kill dev` (see [wm-kill](#wm-kill)) on each branch found.

## wm-report

All errors caught during `wm-go` command (see [wm-go](#wm-go-1)) fall into report file.

**What it can do:**

* Output errors report in a command line
* Clear report

**Example**

`wm-report` - read the report file

`wm-report --clear` or `wm-report -c` - clear the report file

## wm-kit

Kit of small helpful commands.

**What it can do (examples):**

* Open block (checkout and pull git branch) with `wm-kit --open branch-name`, the shorter flag `wm-kit -o` also works.
* Save block (add, commit and push git branch) with `wm-kit --save "commit message"`, the shorter flag `wm-kit -s` also works. If the current branch has no upstream branch `wm-kit` will create it automatically.
* Login on dev, stage or prod server with `wm-kit --login dev`, `wm-kit --login stage` or `wm-kit --login prod`, the shorter flag `wm-kit -l` also works, as well as shorter names of servers (`io`, `co` or `com`)
* Create a pull request on prod branch with `wm-kit --pr`, the shorter flag `wm-kit -p` also works