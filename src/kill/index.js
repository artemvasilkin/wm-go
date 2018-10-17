const fs = require('fs')
const prompt = require('prompt-sync')()

const out = require('../utils/out')
const { show } = require('../utils/show')
const { getDomain } = require('../utils/getDomain')
const { getHost } = require('../utils/getHost')
const { save } = require('../save')
const { getBlock } = require('../utils/getBlock')
const { login } = require('../login')
const { pr } = require('../pr')

const killFlow = (domain, server, apiCall) => {
  login(`${domain}`)

  show(`wm-cli ${apiCall} purge`)

  save(`kill ${apiCall} on ${server}`)
  pr()
}

module.exports = {
  kill: (server, mementomori) => {
    if (server) {
      const apiCall = getBlock().api.call

      out.error('Memento mori! Помни, что смертен! Remember you will die!')

      let areyousure = false

      if (mementomori) {
        areyousure = mementomori
      } else {
        areyousure = prompt(
          `Are you sure you want to remove this ${apiCall}?: `,
          'gitHubToken is undefined'
        )
      }

      if (areyousure === 'y' || areyousure === 'Y') {
        const domain = getDomain(server)
        const host = getHost(server)

        if (fs.existsSync(`${apiCall}${host.config}`)) {
          killFlow(domain, server, apiCall)
        } else {
          out.error(`${apiCall}${host.config} not found`)
        }
      } else {
        out.gratz('Aborted')
      }
    } else {
      out.error('server is undefined')
    }
  }
}
