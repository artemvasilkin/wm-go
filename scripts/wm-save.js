#!/usr/bin/env node

console.time('wm-save')

const { save } = require('../src/save')

const [, , ...args] = process.argv
const message = args.length ? args[0] : false

save(message)

console.timeEnd('wm-save')
