const fs = require('fs')
const prompt = require('prompt-sync')()

const out = require('../utils/out')
const { show } = require('../utils/show')
const { getDomain } = require('../utils/getDomain')
const { save } = require('../save')
// const { getBlock } = require('../utils/getBlock')
const { getBlockID } = require('../utils/getBlockID')
const { login } = require('../login')
const { pr } = require('../pr')

const killFlow = (domain, server) => {
  // const block = getBlock()
  const blockID = getBlockID(domain)

  // if (block.version !== 'prod' && block.version.length > 0) {
  login(`${domain}`)

  show(`wm-cli block remove ${blockID}`)
  show(`wm-cli block purge`)

  save(`kill block on ${server}`)
  pr()
  // } else {
  // out.error(`can't kill block on prod branch`)
  // }
}

module.exports = {
  kill: (server, mementomori) => {
    if (server) {
      out.error('Memento mori! Помни, что смертен! Remember you will die!')

      let areyousure = false

      if (mementomori) {
        areyousure = mementomori
      } else {
        areyousure = prompt(
          'Are you sure you want to remove this block?: ',
          'gitHubToken is undefined'
        )
      }

      if (areyousure === 'y' || areyousure === 'Y') {
        const domain = getDomain(server)

        if (domain === 'all') {
          if (fs.existsSync(`block.https.api.weblium.co`)) {
            killFlow('co', 'stage')
          } else {
            out.error(`block.https.api.weblium.co not found`)
          }
          if (fs.existsSync(`block.https.api.weblium.com`)) {
            killFlow('com', 'prod')
          } else {
            out.error(`block.https.api.weblium.com not found`)
          }
        } else {
          if (fs.existsSync(`block.https.api.weblium.${domain}`)) {
            killFlow(domain, server)
          } else {
            out.error(`block.https.api.weblium.${domain} not found`)
          }
        }
      } else {
        out.gratz('Aborted')
      }
    } else {
      out.error('server is undefined')
    }
  }
}
