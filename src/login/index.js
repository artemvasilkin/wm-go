const { show } = require('../utils/show')
const { getDomain } = require('../utils/getDomain')
const { getConfigs } = require('../../src/config')
const { error } = require('../utils/out')

const login = server => {
  if (server) {
    const configs = getConfigs()

    show(
      `wm-cli login -u ${configs.wmUserEmail} -p ${
        configs.wmUserPassword
      } -h https://weblium.${getDomain(server)}`
    )
  } else {
    error('please, specify the server')
  }
}

module.exports = {
  login: server => login(server)
}
