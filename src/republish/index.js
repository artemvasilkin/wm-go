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

      if (blockVersion) {
        const domain = getDomain(server)

        if (
          (blockVersion === 'prod' && domain === 'com') ||
          (blockVersion === 'dev' && (domain === 'co' || domain === 'io'))
        ) {
          const customFile = `${baseFile}${domain}`

          fs.existsSync(customFile)
            ? republishFlow(domain, commit)
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
  republish: (server, commit) => republish(server, commit)
}
