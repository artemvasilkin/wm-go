const { show } = require('../utils/show')
const out = require('../utils/out')
const { getBlock } = require('../utils/getBlock')

const { getConfigs } = require('../../src/config')

const pr = server => {
  if (getBlock().version === 'prod') {
    out.alert(`no pull request required`)
  } else {
    show(
      `GITHUB_AUTH_TYPE=token GITHUB_TOKEN=${
        getConfigs().gitHubToken
      } WM_SANDBOX_MODE=publish wm-sandbox`
    )
    out.alert(`pull request created`)
  }
}

module.exports = {
  pr: () => pr()
}
