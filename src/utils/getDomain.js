const out = require('../utils/out')

module.exports = {
  getDomain: input => {
    let domain = ''

    switch (input) {
      case 'io':
      case 'dev':
        domain = 'io'
        break
      case 'co':
      case 'stage':
        domain = 'co'
        break
      case 'com':
      case 'prod':
        domain = 'com'
        break
      case 'all':
        domain = 'all'
        break
      case 'app':
        domain = 'app'
        break
      default:
        domain = ''
        out.error('server in undefined')
    }

    return domain
  }
}
