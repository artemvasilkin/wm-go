#!/usr/bin/env node

console.time('wm-republish')

const { republish } = require('../src/republish')
const program = require('commander')

const [, , ...args] = process.argv
const params = args.length ? args : false

program.option('-s, --skip', 'skip', '').parse(process.argv)

const options = {
  server: params[0],
  skipUpdate: program.skip
}

republish(options)

console.timeEnd('wm-republish')
