#!/usr/bin/env node

const { execSync: run } = require('child_process')

module.exports = {
  getBranches: pattern => {
    return run(`git branch -r`)
      .toString()
      .split('\n')
      .map(branch => branch.replace('origin/', '').trim())
      .slice(1)
      .filter(
        branch => (pattern ? branch.match(new RegExp(pattern, 'i')) : true)
      )
      .filter(branch => !branch.match('uikit') && !branch.match('default'))
  }
}
