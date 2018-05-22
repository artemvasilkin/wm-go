#!/usr/bin/env node

const { execSync: run } = require('child_process')

module.exports = {
  getCurrentBranch: () => {
    return run(`git branch`)
      .toString()
      .split('\n')
      .filter(branch => branch.match(/\*/i))[0]
      .replace('* ', '')
      .trim()
  }
}
