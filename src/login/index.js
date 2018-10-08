const { show } = require('../utils/show')
const { getDomain } = require('../utils/getDomain')
const { getConfigs } = require('../../src/config')
const { error } = require('../utils/out')

// {
//   "gitHubToken": "вашТокен",
//   "wmUserEmail": {
//     "io": "мылоДляПрода",
//     "co": "мылоДляПрода",
//     "com": "мылоДляПрода"
//   },
//   "wmUserPassword": {
//     "co": "парольДляПрода",
//     "co": "парольДляПрода",
//     "com": "парольДляПрода"
//   }
// }

const login = server => {
  if (server) {
    const configs = getConfigs()
    const domain = getDomain(server)

    show(
      `wm-cli login -u ${configs.wmUserEmail[`${domain}`]} -p ${
        configs.wmUserPassword[`${domain}`]
      } -h https://api.weblium.${domain}`
    )
  } else {
    error('please, specify the server')
  }
}

module.exports = {
  login: server => login(server)
}
