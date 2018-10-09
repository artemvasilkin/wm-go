const fs = require('fs')

module.exports = {
  getBlockID: domain => {
    return JSON.parse(fs.readFileSync(`block.https.api.weblium.${domain}`)).id
  }
}
