#!/usr/bin/env node

console.time('wm-report')

const program = require('commander')

const { clearReport, getReport } = require('../src/report')

program.option('-c, --clear', 'clear report').parse(process.argv)

program.clear ? clearReport() : getReport()

console.timeEnd('wm-report')
