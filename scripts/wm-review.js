#!/usr/bin/env node

const program = require('commander')

const { review } = require('../src/review')

program.option('-e, --editor', 'editor mode').parse(process.argv)

review(program.editor)
