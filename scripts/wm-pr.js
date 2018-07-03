#!/usr/bin/env node

console.time('wm-pr')

const { pr } = require('../src/pr')

pr('com')

console.timeEnd('wm-pr')
