const fs = require('fs')

const { baseFile } = require('../../config/globals')

const { updateHistory } = require('../history')

const { alert, error } = require('../utils/out')
const { show } = require('../utils/show')
const { getDomain } = require('../utils/getDomain')
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
        (block.version === 'dev' &&
          (domain === 'co' || domain === 'io' || domain === 'app'))
      ) {
        npmInstall()
        login(`${domain}`)

        show(
          `wm-cli block init --name=${block.type}-${block.namespace}-${
            block.name
          } -c ${block.category} --wireframe=${block.isWireframe} ${
            block.roles
          } `
        )
        show(`wm-cli block publish`)
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

      if (!fs.existsSync(`${baseFile}${domain}`)) {
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
