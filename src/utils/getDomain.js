const { servers } = require('../../config/globals')

const getDomain = input => {
  return servers[input] ? servers[input].domain || '' : undefined
}

module.exports = {
  getDomain: input => getDomain(input)
}
