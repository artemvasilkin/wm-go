const out = require('../utils/out')

module.exports = {
  getHost: server => {
    let host = {
      protocol: '',
      name: '',
      config: ''
    }

    switch (server) {
      case 'io':
      case 'dev':
        host = {
          protocol: 'https',
          name: 'api.weblium.io',
          config: `.https.api.weblium.io`
        }
        break
      case 'co':
      case 'stage':
        host = {
          protocol: 'https',
          name: 'api.weblium.co',
          config: `.https.api.weblium.co`
        }
        break
      case 'com':
      case 'prod':
        host = {
          protocol: 'https',
          name: 'api.weblium.com',
          config: `.https.api.weblium.com`
        }
        break
      case 'app':
        host = {
          protocol: 'https',
          name: 'api.weblium.app',
          config: `.https.api.weblium.app`
        }
        break
      case 'local':
        host = {
          protocol: 'http',
          name: '192.168.45.90:3000',
          config: `.http.192.168.45.90.3000`
        }
        break
      default:
        host = {
          protocol: '',
          name: '',
          config: ''
        }
        out.error('server in undefined')
    }

    return host
  }
}
