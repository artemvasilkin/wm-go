#!/usr/bin/env node

const program = require('commander')

const { figlet } = require('../src/utils/figlet')
const { getBranches } = require('../src/utils/getBranches')
const { open } = require('../src/utils/open')

const { goRound: go } = require('../src/goRound')
const { kill } = require('../src/kill')
const { init } = require('../src/init')
const { republish } = require('../src/republish')

const [, , ...args] = process.argv
const pattern = args.length ? args[0] : false

program
  .option('-i, --init [server]', 'init', '')
  .option('-r, --republish [server]', 'republish', '')
  .option('-k, --kill [server]', 'kill', '')
  .parse(process.argv)

const branches = getBranches(pattern)
const branchesLength = branches.length

figlet(`${branchesLength} branches found`)

go(branches, (branch, index) => {
  figlet(`${index + 1} of ${branchesLength}`)
  open(branch)

  if (program.kill && program.kill.length > 0) {
    kill(program.kill, 'y')
  }

  if (program.init && program.init.length > 0) {
    init(program.init)
  }

  if (program.republish && program.republish.length > 0) {
    republish(program.republish)
  }
})
