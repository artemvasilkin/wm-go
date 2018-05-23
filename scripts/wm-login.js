#!/usr/bin/env node

const { login } = require('../src/login')

const [, , ...args] = process.argv
const params = args.length ? args : false

const server = params[0]

login(server)
