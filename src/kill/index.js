const fs = require('fs')
const prompt = require('prompt-sync')()

const out = require('../utils/out')
const { show } = require('../utils/show')
const { getDomain } = require('../utils/getDomain')
const { getHost } = require('../utils/getHost')
const { save } = require('../save')
const { getBlockID } = require('../utils/getBlockID')
const { login } = require('../login')
const { pr } = require('../pr')

const killFlow = (domain, server, host) => {
  const blockID = getBlockID(host)

  login(`${domain}`)

  show(`wm-cli block remove ${blockID}`)
  show(`wm-cli block purge`)

  save(`kill block on ${server}`)
  pr()
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
        const host = getHost(server)

        if (fs.existsSync(host.config)) {
          killFlow(domain, server, host)
        } else {
          out.error(`${host.config} not found`)
        }
      } else {
        out.gratz('Aborted')
      }
    } else {
      out.error('server is undefined')
    }
  }
}
