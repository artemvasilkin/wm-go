const fs = require('fs')

const { getBlock } = require('../utils/getBlock')
const { getDomain } = require('../utils/getDomain')
const { getHost } = require('../utils/getHost')
const { error } = require('../utils/out')
const { update } = require('../update')
const { npmInstall } = require('../utils/npmInstall')
const { login } = require('../login')
const { show } = require('../utils/show')
const { save } = require('../save')
const { pr } = require('../pr')

const republishFlow = (skipUpdate, domain, apiCall) => {
  try {
    update(skipUpdate)
    npmInstall()
    login(domain)
    show(`wm-cli ${apiCall} commit`)
    show(`wm-cli ${apiCall} publish`)
    save('update version')
    pr(domain)
  } catch (message) {
    error(message)

    return message
  }
}

const republish = options => {
  try {
    if (options.server) {
      const block = getBlock()
      const blockVersion = block.version
      const apiCall = block.api.call

      if (blockVersion) {
        const domain = getDomain(options.server)

        if (
          blockVersion === 'prod' ||
          (blockVersion === 'dev' && domain !== 'com') ||
          (blockVersion === 'test' && domain !== 'com')
        ) {
          const host = getHost(options.server)
          const customFile = `${apiCall}${host.config}`

          fs.existsSync(customFile)
            ? republishFlow(options.skipUpdate, domain, apiCall)
            : error(`${customFile} not found`)
        } else {
          error('Use prod branch to republish on prod server')
        }
      } else {
        error(`can't detect branch version`)
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
  republish: options => republish(options)
}
