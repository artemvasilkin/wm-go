#!/usr/bin/env node

const begin = new Date()

const { slack } = require('../src/utils/slack')
const { getConfigs } = require('../src/config')

const program = require('commander')

const { figlet } = require('../src/utils/figlet')
const { getBranches } = require('../src/utils/getBranches')
const { goRound: go } = require('../src/goRound')
const { find } = require('../src/find')
const { replace } = require('../src/replace')
const { kill } = require('../src/kill')
const { init } = require('../src/init')
const { republish } = require('../src/republish')
const { open } = require('../src/open')
const { show } = require('../src/utils/show')

const {
  goConfig,
  customFunction,
  findConfig,
  replaceConfig
} = require('../config/.wmgorc')

const [, , ...args] = process.argv
const pattern = args.length ? args[0] : false

slack(`*_@${getConfigs().slackUsername}_ started* \`wm-go ${args.join(' ')}\``)

program
  .option('-f, --find', 'find', '')
  .option('-k, --kill [server]', 'kill', '')
  .option('-p, --replace', 'replace', '')
  .option('-i, --init [server]', 'init', '')
  .option('-r, --republish [server]', 'republish', '')
  .option('-c, --custom', 'custom', '')
  .parse(process.argv)

const filterBranches = () => {
  if (goConfig && goConfig.customList) {
    return goConfig.branches
  } else if (goConfig && goConfig.customPattern && !goConfig.customList) {
    return getBranches(goConfig.pattern)
  } else {
    return getBranches(pattern).filter(branch =>
      branch.match(/^(w)(\/)(series-\d+)(\/)([a-zA-Z0-9_-]*)(\/)(dev)$/)
    )
  }
}

const branches = filterBranches()
const branchesLength = branches.length

figlet(`${branchesLength} branches found`)

go(branches, (branch, index) => {
  // console.log(branch)
  figlet(`${index + 1} of ${branchesLength}`)

  // customFunction

  if (program.custom && customFunction.enabled) {
    customFunction.function(branches, branch, index)

    if (index === 0) {
      slack(`\`\`\`\n${customFunction.function.toString()}\n\`\`\``)
    } else if (index % 10 === 0 || index === branchesLength) {
      slack(
        `_@${
          getConfigs().slackUsername
        }_ executed custom function on *${index}* of *${branchesLength}* blocks`
      )
    }
  }

  // find

  if (program.find) {
    show(`git checkout ${branch}`)
    find(findConfig.file, findConfig.query, branch)

    if (index !== 0 && (index % 50 === 0 || index === branchesLength)) {
      slack(
        `_@${
          getConfigs().slackUsername
        }_ searched *${index}* of *${branchesLength}* blocks`
      )
    }
  }

  // kill

  if (program.kill && program.kill.length > 0) {
    open(branch)
    kill(program.kill, 'y')

    if (index !== 0 && (index % 10 === 0 || index === branchesLength)) {
      slack(
        `_@${
          getConfigs().slackUsername
        }_ deleted *${index}* of *${branchesLength}* blocks on ${
          program.kill
        } server`
      )
    }
  }

  // replace

  const replaceOptions = replaceConfig
  const republishOptions = {
    server: program.republish,
    skipUpdate: true
  }

  if (program.republish && program.republish.length > 0) {
    replaceOptions['onFinish'] = () => {
      republish(republishOptions)

      if (index !== 0 && (index % 10 === 0 || index === branchesLength)) {
        slack(
          `_@${
            getConfigs().slackUsername
          }_ republished *${index}* of *${branchesLength}* blocks on ${
            program.republish
          } server`
        )
      }
    }
  }

  if (program.replace) {
    open(branch)
    replace(replaceOptions)

    if (index !== 0 && (index % 10 === 0 || index === branchesLength)) {
      slack(
        `_@${
          getConfigs().slackUsername
        }_ replaced data on *${index}* of *${branchesLength}* blocks`
      )
    }
  }

  // init

  if (program.init && program.init.length > 0) {
    open(branch)
    init(program.init)

    if (index !== 0 && (index % 10 === 0 || index === branchesLength)) {
      slack(
        `_@${
          getConfigs().slackUsername
        }_ initialized *${index}* of *${branchesLength}* blocks on ${
          program.republish
        } server`
      )
    }
  }

  // republish

  if (program.republish && program.republish.length > 0 && !program.replace) {
    open(branch)
    republish(republishOptions)

    if (index !== 0 && (index % 10 === 0 || index === branchesLength)) {
      slack(
        `_@${
          getConfigs().slackUsername
        }_ republished *${index}* of *${branchesLength}* blocks on ${
          program.republish
        } server`
      )
    }
  }
})

const end = new Date()
const timeSpent = `${(end - begin) / 1000} seconds`

slack(
  `*_@${getConfigs().slackUsername}_ finished* \`wm-go ${args.join(
    ' '
  )}\` in *${timeSpent}*`
)
