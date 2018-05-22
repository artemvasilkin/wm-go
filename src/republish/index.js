const fs = require('fs')

const { stageFile, prodFile, baseFile } = require('../../config/globals')

const { getBlock } = require('../utils/getBlock')
const { getDomain } = require('../utils/getDomain')
const { error } = require('../utils/out')
const { npmInstall } = require('../utils/npmInstall')
const { login } = require('../utils/login')
const { show } = require('../utils/show')
const { save } = require('../utils/save')
const { pr } = require('../utils/pr')

const republishFlow = (domain, commit) => {
  try {
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

const republish = (server, commit) => {
  try {
    if (server) {
      const blockVersion = getBlock().version

      if (blockVersion && blockVersion !== 'prod') {
        const domain = getDomain(server)
        const customFile = `${baseFile}${domain}`

        if (domain === 'all') {
          fs.existsSync(stageFile)
            ? republishFlow('co', commit)
            : error(`${stageFile} not found`)
          fs.existsSync(prodFile)
            ? republishFlow('com', commit)
            : error(`${prodFile} not found`)
        } else {
          fs.existsSync(customFile)
            ? republishFlow(domain, commit)
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
  republish: (server, commit) => republish(server, commit)
}
