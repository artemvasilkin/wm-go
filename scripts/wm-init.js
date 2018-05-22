#!/usr/bin/env node

const { init } = require('../src/init')

const [, , ...args] = process.argv
const params = args.length ? args : false

const server = params[0]

init(server)
