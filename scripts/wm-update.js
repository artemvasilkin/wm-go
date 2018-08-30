#!/usr/bin/env node

console.time('wm-update')

const { update } = require('../src/update')

update()

console.timeEnd('wm-update')
