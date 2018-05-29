#!/usr/bin/env node

const program = require('commander')

const { review } = require('../src/review')

const [, , ...args] = process.argv
const params = args.length ? args : false

let branch = false

branch = typeof params[0] === 'string' ? params[0] : params[1]

program.option('-e, --editor', 'editor mode').parse(process.argv)

review(program.editor, branch)
