const fs = require('fs')

const { updateHistory } = require('../history')

const { alert, error } = require('../utils/out')
const { show } = require('../utils/show')
const { getDomain } = require('../utils/getDomain')
const { getHost } = require('../utils/getHost')
const { getBlock } = require('../utils/getBlock')
const { save } = require('../save')
const { npmInstall } = require('../utils/npmInstall')
const { login } = require('../login')
const { pr } = require('../pr')

const initFlow = (server, domain) => {
  try {
    const block = getBlock()

    if (block.version.length > 0) {
      if (
        (block.version === 'prod' && domain === 'com') ||
        (block.version === 'dev' && domain !== 'com')
      ) {
        npmInstall()
        login(`${domain}`)

        show(
          `wm-cli ${block.api.call} init ${block.api.name} ${
            block.api.category
          } ${block.api.wireframe} ${block.api.roles}`
        )
        show(`wm-cli ${block.api.call} publish`)
        save(`init on ${server}`)
        pr()
        updateHistory(domain, block, new Date())
      } else {
        error(
          'Use /dev branch to init on dev or stage server\nUse prod branch to init on prod server'
        )
      }
    } else {
      error(`can't detect branch version`)
    }
  } catch (message) {
    error(message)

    return message
  }
}

const init = server => {
  try {
    if (server) {
      const domain = getDomain(server)
      const host = getHost(server)

      if (!fs.existsSync(host.config)) {
        initFlow(server, domain)
      } else {
        alert('already published')
      }
    } else {
      error('server is undefined')
    }
  } catch (message) {
    error(message)

    return message
  }
}

module.exports = {
  init: server => init(server)
}
