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

const republishFlow = (domain, commit, skipUpdate) => {
  try {
    update(skipUpdate)
    npmInstall()
    login(domain)
    show(`wm-cli block commit ${commit || ''}`)
    show(`wm-cli block publish`)
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
      const blockVersion = getBlock().version

      if (blockVersion) {
        const domain = getDomain(options.server)

        if (
          (blockVersion === 'prod' && domain === 'com') ||
          (blockVersion === 'dev' &&
            (domain === 'co' || domain === 'io' || domain === 'app'))
        ) {
          const host = getHost(options.server)
          const customFile = host.config

          fs.existsSync(customFile)
            ? republishFlow(domain, options.commit, options.skipUpdate)
            : error(`${customFile} not found`)
        } else {
          error(
            'Use /dev branch to republish on dev or stage server\nUse prod branch to republish on prod server'
          )
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
