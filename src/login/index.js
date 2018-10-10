const { show } = require('../utils/show')
const { getDomain } = require('../utils/getDomain')
const { getHost } = require('../utils/getHost')
const { getConfigs } = require('../../src/config')
const { error } = require('../utils/out')

const login = server => {
  if (server) {
    const configs = getConfigs()
    const domain = getDomain(server)
    const host = getHost(server)

    show(
      `wm-cli login -u ${configs.wmUserEmail[`${domain}`]} -p ${
        configs.wmUserPassword[`${domain}`]
      } -h ${host.protocol}://${host.name}`
    )
  } else {
    error('please, specify the server')
  }
}

module.exports = {
  login: server => login(server)
}
