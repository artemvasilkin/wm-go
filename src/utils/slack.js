const { run } = require('./run')
const { getConfigs } = require('../config')

const slackWebhook = getConfigs().slackWebhook

module.exports = {
  slack: message => {
    return run(
      `curl -X POST -H 'Content-type: application/json' --data '{"text":"${message}"}' ${slackWebhook}`
    )
  }
}
