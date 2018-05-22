const figletRunner = require('figlet')

const out = require('../utils/out')

module.exports = {
  figlet: message => {
    out.alert(figletRunner.textSync(message))
  }
}
