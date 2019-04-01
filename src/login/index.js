const { show } = require('../utils/show')
const { getHost } = require('../utils/getHost')
const { getConfigs } = require('../../src/config')
const { error } = require('../utils/out')

const login = server => {
  if (server) {
    const configs = getConfigs()
    const host = getHost(server)

    show(
      `wm-cli login -u ${configs.wmUserEmail[`${server}`]} -p ${
        configs.wmUserPassword[`${server}`]
      } -h ${host.protocol}://${host.name}`
    )

    console.log(
      `wm-cli login -u ${configs.wmUserEmail[`${server}`]} -p ${
        configs.wmUserPassword[`${server}`]
      } -h ${host.protocol}://${host.name}`
    )
  } else {
    error('please, specify the server')
  }
}

module.exports = {
  login: server => login(server)
}
