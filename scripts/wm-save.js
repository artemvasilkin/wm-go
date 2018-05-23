#!/usr/bin/env node

const { save } = require('../src/save')

const [, , ...args] = process.argv
const message = args.length ? args[0] : false

save(message)
