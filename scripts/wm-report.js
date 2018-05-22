#!/usr/bin/env node

const program = require('commander')

const { clearReport, getReport } = require('../src/report')

program.option('-c, --clear', 'clear report').parse(process.argv)

program.clear ? clearReport() : getReport()
