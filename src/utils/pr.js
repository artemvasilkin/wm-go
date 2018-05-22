const { show } = require('../utils/show')
const out = require('../utils/out')
const { getDomain } = require('../utils/getDomain')

const { getConfigs } = require('../../src/config')

module.exports = {
  pr: server => {
    if (getDomain(server) === 'com') {
      show(
        `GITHUB_AUTH_TYPE=token GITHUB_TOKEN=${
          getConfigs().gitHubToken
        } WM_SANDBOX_MODE=publish wm-sandbox`
      )
      out.alert(`pull request created`)
    } else {
      out.alert(`no pull request required`)
    }
  }
}
