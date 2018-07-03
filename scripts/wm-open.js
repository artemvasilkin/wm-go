#!/usr/bin/env node

console.time('wm-open')

const { open } = require('../src/open')

const [, , ...args] = process.argv
const query = args.length ? args[0] : false

open(query)

console.timeEnd('wm-open')
