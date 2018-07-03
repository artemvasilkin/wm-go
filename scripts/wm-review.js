#!/usr/bin/env node

console.time('wm-review')

const program = require('commander')

const { review } = require('../src/review')

const [, , ...args] = process.argv
const params = args.length ? args : false

let branch = false

if (params.length > 1) {
  branch =
    params[0] !== '-e' && params[0] !== '--editor' ? params[0] : params[1]
}

program.option('-e, --editor', 'editor mode').parse(process.argv)

review(program.editor, branch)

console.timeEnd('wm-review')
