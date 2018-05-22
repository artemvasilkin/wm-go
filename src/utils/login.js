const { show } = require('../utils/show')
const { getDomain } = require('../utils/getDomain')
const { getConfigs } = require('../../src/config')

module.exports = {
  login: server => {
    const configs = getConfigs()
    const domain = getDomain(server)

    show(
      `wm-cli login -u ${configs.wmUserEmail} -p ${
        configs.wmUserPassword
      } -h https://weblium.${domain}`
    )
  }
}
