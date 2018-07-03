#!/usr/bin/env node

console.time('wm-republish')

const { republish } = require('../src/republish')

const [, , ...args] = process.argv
const params = args.length ? args : false

const server = params[0]
const commit = params[1]

republish(server, commit)

console.timeEnd('wm-republish')
