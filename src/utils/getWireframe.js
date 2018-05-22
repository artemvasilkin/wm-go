#!/usr/bin/env node

const fs = require('fs')

module.exports = {
  getWireframe: () => {
    return Object.keys(
      JSON.parse(fs.readFileSync(`package.json`)).dependencies
    ).filter(dependency => dependency.match('wireframe'))[0]
  }
}
