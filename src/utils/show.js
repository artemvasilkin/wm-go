const { execSync } = require('child_process')

const out = require('../utils/out')

module.exports = {
  show: command => {
    const output = execSync(`${command}`).toString()

    out.default(output)

    return output
  }
}
