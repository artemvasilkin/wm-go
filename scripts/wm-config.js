#!/usr/bin/env node

const program = require('commander')

const { editConfigs, showConfigs } = require('../src/config')

program.option('-e, --edit', 'edit config').parse(process.argv)

if (program.edit) {
  editConfigs()
}

showConfigs()
