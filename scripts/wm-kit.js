#!/usr/bin/env node

const program = require('commander')

const { login } = require('../src/utils/login')
const { pr } = require('../src/utils/pr')
const { save } = require('../src/utils/save')
const { open } = require('../src/utils/open')

program
  .option('-l, --login [server]', 'login', '')
  .option('-o, --open [branch]', 'open block', '')
  .option('-p, --pr', 'create pull request', '')
  .option('-s, --save [message]', 'save changes', '')
  .parse(process.argv)

if (program.login) {
  login(program.login)
}

if (program.open) {
  open(program.open)
}

if (program.pr) {
  pr('com')
}

if (program.save) {
  save(program.save)
}
