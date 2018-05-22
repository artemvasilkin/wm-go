#!/usr/bin/env node

const { kill } = require('../src/kill')

const [, , ...args] = process.argv
const params = args.length ? args : false

const server = params[0]

kill(server)
