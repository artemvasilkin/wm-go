#!/usr/bin/env node

console.time('wm-find')

const { find } = require('../src/find')
const { file, query } = require('../config/find')

find(file, query)

console.timeEnd('wm-find')
