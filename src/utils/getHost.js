const out = require('../utils/out')
const { servers } = require('../../config/globals')

const getHost = server => {
  if (server) {
    return {
      protocol: servers[`${server}`].protocol,
      name: servers[`${server}`].name,
      config: servers[`${server}`].config
    }
  } else {
    out.error('server in undefined')
  }
}

module.exports = {
  getHost: server => getHost(server)
}
