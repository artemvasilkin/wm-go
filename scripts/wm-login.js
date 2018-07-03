#!/usr/bin/env node

console.time('wm-login')

const { login } = require('../src/login')

const [, , ...args] = process.argv
const params = args.length ? args : false

const server = params[0]

login(server)

console.timeEnd('wm-login')
