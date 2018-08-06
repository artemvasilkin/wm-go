const fs = require('fs')

const { stageFile, prodFile, baseFile } = require('../../config/globals')

const { getBlock } = require('../utils/getBlock')
const { getDomain } = require('../utils/getDomain')
const { error } = require('../utils/out')
const { npmInstall } = require('../utils/npmInstall')
const { login } = require('../login')
const { show } = require('../utils/show')
const { save } = require('../save')
const { pr } = require('../pr')

const republishFlow = (domain, commit, force) => {
  try {
    npmInstall()
    login(domain)
    show(`wm-cli block commit ${commit || ''}`)
    show(`wm-cli block publish`)
    save('update version', force)
    pr(domain)
  } catch (message) {
    error(message)

    return message
  }
}

const republish = (server, commit, force) => {
  try {
    if (server) {
      const blockVersion = getBlock().version

      if (blockVersion && blockVersion !== 'prod') {
        const domain = getDomain(server)
        const customFile = `${baseFile}${domain}`

        if (domain === 'all') {
          fs.existsSync(stageFile)
            ? republishFlow('co', commit, force)
            : error(`${stageFile} not found`)
          fs.existsSync(prodFile)
            ? republishFlow('com', commit, force)
            : error(`${prodFile} not found`)
        } else {
          fs.existsSync(customFile)
            ? republishFlow(domain, commit, force)
            : error(`${customFile} not found`)
        }
      } else {
        error(`can't republish on prod branch`)
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
  republish: (server, commit, force) => republish(server, commit, force)
}
