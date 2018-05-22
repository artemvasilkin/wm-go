const fs = require('fs')

module.exports = {
  getBlockID: domain => {
    return JSON.parse(fs.readFileSync(`block.https.weblium.${domain}`)).id
  }
}
