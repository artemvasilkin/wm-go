#!/usr/bin/env node

const program = require('commander')

const { login } = require('../src/utils/login')
const { pr } = require('../src/utils/pr')

program
  .option('-l, --login [server]', 'login', '')
  .option('-p, --pr', 'create pull request', '')
  .parse(process.argv)

if (program.login) {
  login(program.login)
}

if (program.pr) {
  pr('com')
}
