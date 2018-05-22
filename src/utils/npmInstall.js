#!/usr/bin/env node

const fs = require('fs')

const out = require('../utils/out')
const { show } = require('../utils/show')
const { getWireframe } = require('../utils/getWireframe')
const { getBlock } = require('../utils/getBlock')
const { getCurrentBranch } = require('../utils/getCurrentBranch')

module.exports = {
  npmInstall: () => {
    const isWireframe = getBlock(getCurrentBranch()).isWireframe

    if (isWireframe) {
      if (!fs.existsSync(`node_modules`)) {
        show(`npm i`)
        out.gratz(`node_modules installed`)
      } else {
        out.alert(`node_modules are already installed`)
      }
    } else {
      const wireframe = getWireframe()

      if (!fs.existsSync(`node_modules/${wireframe}`)) {
        show(`npm i`)
        out.gratz(`wireframe installed`)
      } else {
        out.alert(`wireframe is already installed`)
      }
    }
  }
}
