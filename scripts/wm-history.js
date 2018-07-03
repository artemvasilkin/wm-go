#!/usr/bin/env node

console.time('wm-history')

const { showHistory } = require('../src/history')

showHistory()

console.timeEnd('wm-history')
