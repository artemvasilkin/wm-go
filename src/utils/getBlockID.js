const fs = require('fs')

module.exports = {
  getBlockID: host => {
    return JSON.parse(fs.readFileSync(host.config)).id
  }
}
