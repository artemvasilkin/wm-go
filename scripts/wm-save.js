#!/usr/bin/env node

console.time('wm-save')

const program = require('commander')

const { save } = require('../src/save')

const [, , ...args] = process.argv
const message = args.length ? args[0] : false

program.option('-f, --force', 'force', '').parse(process.argv)

save(message, program.force)

console.timeEnd('wm-save')
