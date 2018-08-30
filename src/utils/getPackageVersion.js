#!/usr/bin/env node

const fs = require('fs')

module.exports = {
  getPackageVersion: () => {
    return JSON.parse(fs.readFileSync(`package.json`)).version
  }
}
