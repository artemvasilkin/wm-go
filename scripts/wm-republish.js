#!/usr/bin/env node

console.time('wm-republish')

const { republish } = require('../src/republish')

const [, , ...args] = process.argv
const params = args.length ? args : false

const options = {
  server: params[0],
  commit: params[1]
}

republish(options)

console.timeEnd('wm-republish')
