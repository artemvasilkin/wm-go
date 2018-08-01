#!/usr/bin/env node

console.time('wm-go')

const program = require('commander')

const { figlet } = require('../src/utils/figlet')
const { getBranches } = require('../src/utils/getBranches')

const { goRound: go } = require('../src/goRound')
const { replace } = require('../src/replace')
const { file, original, replacement } = require('../config/replace')
const { kill } = require('../src/kill')
const { init } = require('../src/init')
const { republish } = require('../src/republish')
const { open } = require('../src/open')

const [, , ...args] = process.argv
const pattern = args.length ? args[0] : false

program
  .option('-k, --kill [server]', 'kill', '')
  .option('-r, --replace', 'replace', '')
  .option('-i, --init [server]', 'init', '')
  .option('-r, --republish [server]', 'republish', '')
  .parse(process.argv)

// const branches = getBranches(pattern).filter(branch => branch.match('/dev'))
const branches = [
  'w/zapdos/about/dev',
  'w/series-4/careers/dev',
  'w/zapdos/cover/dev'
]
const branchesLength = branches.length

figlet(`${branchesLength} branches found`)

go(branches, (branch, index) => {
  figlet(`${index + 1} of ${branchesLength}`)
  open(branch)

  if (program.kill && program.kill.length > 0) {
    kill(program.kill, 'y')
  }

  if (program.replace) {
    replace(file, original, replacement, branch)
  }

  if (program.init && program.init.length > 0) {
    init(program.init)
  }

  if (program.republish && program.republish.length > 0) {
    republish(program.republish)
  }
})

console.timeEnd('wm-go')
