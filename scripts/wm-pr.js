#!/usr/bin/env node

console.time('wm-pr')

const { pr } = require('../src/pr')

pr()

console.timeEnd('wm-pr')
