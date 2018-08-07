#!/usr/bin/env node

console.time('wm-go')

const program = require('commander')

const { figlet } = require('../src/utils/figlet')
const { getBranches } = require('../src/utils/getBranches')

const { goRound: go } = require('../src/goRound')
const { find } = require('../src/find')
const { file: searchFile, query } = require('../config/find')
const { replace } = require('../src/replace')
const {
  file: replaceFile,
  description,
  original,
  replacement
} = require('../config/replace')
const { kill } = require('../src/kill')
const { init } = require('../src/init')
const { republish } = require('../src/republish')
const { open } = require('../src/open')
const { show } = require('../src/utils/show')

const [, , ...args] = process.argv
const pattern = args.length ? args[0] : false

program
  .option('-f, --find', 'find', '')
  .option('-k, --kill [server]', 'kill', '')
  .option('-p, --replace', 'replace', '')
  .option('-i, --init [server]', 'init', '')
  .option('-r, --republish [server]', 'republish', '')
  .parse(process.argv)

const branches = getBranches(pattern).filter(branch =>
  branch.match(
    /^(w)(\/)(series-\d+|zapdos|lucario)(\/)([a-zA-Z0-9_-]*)(\/)(dev)$/
  )
)
// const branches = getBranches(pattern).filter(branch => branch.match(/^(d)(\/)([a-zA-Z0-9_]*)(\/)([a-zA-Z0-9_-]*)(\/)(dev)$/))
// const branches = [
//   `w/lucario/cover/dev`
// ]
const branchesLength = branches.length

figlet(`${branchesLength} branches found`)

go(branches, (branch, index) => {
  figlet(`${index + 1} of ${branchesLength}`)

  // find

  if (program.find) {
    show(`git checkout ${branch}`)
    find(searchFile, query, branch)
  }

  // kill

  if (program.kill && program.kill.length > 0) {
    open(branch)
    kill(program.kill, 'y')
  }

  // replace

  const replaceOptions = {
    file: replaceFile,
    description: description,
    original: original,
    replacement: replacement,
    branch: branch
  }

  if (program.republish && program.republish.length > 0) {
    replaceOptions['onFinish'] = () => {
      republish(program.republish)
    }
  }

  if (program.replace) {
    open(branch)
    replace(replaceOptions)
  }

  // init

  if (program.init && program.init.length > 0) {
    open(branch)
    init(program.init)
  }

  // republish

  if (program.republish && program.republish.length > 0 && !program.replace) {
    open(branch)
    republish(program.republish)
  }
})

console.timeEnd('wm-go')
