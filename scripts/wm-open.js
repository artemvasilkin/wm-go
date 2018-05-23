#!/usr/bin/env node

const { open } = require('../src/open')

const [, , ...args] = process.argv
const query = args.length ? args[0] : false

open(query)
