#!/usr/bin/env node

console.time('wm-replace')

const { replace } = require('../src/replace')
const { file, original, replacement } = require('../config/replace')

replace(file, original, replacement)

console.timeEnd('wm-replace')
