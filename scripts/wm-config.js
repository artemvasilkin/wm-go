#!/usr/bin/env node

console.time('wm-config')

const program = require('commander')

const { editConfigs, showConfigs } = require('../src/config')

program.option('-e, --edit', 'edit config').parse(process.argv)

if (program.edit) {
  editConfigs()
}

showConfigs()

console.timeEnd('wm-config')
