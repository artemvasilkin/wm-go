const { execSync } = require('child_process')

module.exports = {
  run: command => {
    return execSync(`${command}`)
  }
}
