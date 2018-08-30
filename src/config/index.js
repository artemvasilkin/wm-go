const fs = require('fs')
const prompt = require('prompt-sync')()

const { wmConfig } = require('../../config/globals')

const { gratz, alert, default: out, error } = require('../utils/out')

const configFile = wmConfig.replace('/scripts/', '/')

const isNull = value => {
  return typeof value === 'undefined' || value === null || value.length === 0
}

const makeConfig = () => {
  const configs = {}

  configs.gitHubToken = prompt(
    'Enter github-token: ',
    'gitHubToken is undefined'
  )

  configs.wmUserEmail = {}
  configs.wmUserPassword = {}

  configs.wmUserEmail.io = prompt(
    'Enter wm-cli email for dev server: ',
    'wmUserEmail is undefined'
  )
  configs.wmUserPassword.io = prompt(
    'Enter wm-cli password for dev server: ',
    'wmUserPassword is undefined',
    { echo: '*' }
  )
  configs.wmUserEmail.co = prompt(
    'Enter wm-cli email for stage server: ',
    'wmUserEmail is undefined'
  )
  configs.wmUserPassword.co = prompt(
    'Enter wm-cli password for stage server: ',
    'wmUserPassword is undefined',
    { echo: '*' }
  )
  configs.wmUserEmail.com = prompt(
    'Enter wm-cli email for prod server: ',
    'wmUserEmail is undefined'
  )
  configs.wmUserPassword.com = prompt(
    'Enter wm-cli password for prod server: ',
    'wmUserPassword is undefined',
    { echo: '*' }
  )
  configs.wmUserEmail.app = prompt(
    'Enter wm-cli email for app server: ',
    'wmUserEmail is undefined'
  )
  configs.wmUserPassword.app = prompt(
    'Enter wm-cli password for app server: ',
    'wmUserPassword is undefined',
    { echo: '*' }
  )

  if (
    configs.gitHubToken &&
    configs.gitHubToken.length === 40 &&
    configs.wmUserEmail.io &&
    configs.wmUserEmail.io.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/
    ) &&
    configs.wmUserEmail.co &&
    configs.wmUserEmail.co.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/
    ) &&
    configs.wmUserEmail.com &&
    configs.wmUserEmail.com.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/
    ) &&
    configs.wmUserEmail.app &&
    configs.wmUserEmail.app.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/
    ) &&
    configs.wmUserPassword.io &&
    configs.wmUserPassword.co &&
    configs.wmUserPassword.com &&
    configs.wmUserPassword.app
  ) {
    fs.writeFileSync(`${configFile}`, JSON.stringify(configs))

    gratz('all set up:')
    alert('You current config file:')
    out(configs.gitHubToken)
    out(configs.wmUserEmail.io)
    out(configs.wmUserPassword.io)
    out(configs.wmUserEmail.co)
    out(configs.wmUserPassword.co)
    out(configs.wmUserEmail.com)
    out(configs.wmUserPassword.com)
    out(configs.wmUserEmail.app)
    out(configs.wmUserPassword.app)
  } else {
    if (isNull(configs.gitHubToken)) {
      error('git-hub token is empty')
    }

    if (!isNull(configs.gitHubToken) && configs.gitHubToken.length !== 40) {
      error('git-hub token length must be 40 characters')
    }

    if (isNull(configs.wmUserEmail.io)) {
      error('wm-cli email for dev server is empty')
    }

    if (isNull(configs.wmUserEmail.co)) {
      error('wm-cli email for stage server is empty')
    }

    if (isNull(configs.wmUserEmail.com)) {
      error('wm-cli email for prod server is empty')
    }

    if (isNull(configs.wmUserEmail.app)) {
      error('wm-cli email for app server is empty')
    }

    if (
      !isNull(configs.wmUserEmail.io) &&
      !configs.wmUserEmail.io.match(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/
      )
    ) {
      error('wm-cli email for dev server is not a valid email')
    }

    if (
      !isNull(configs.wmUserEmail.co) &&
      !configs.wmUserEmail.co.match(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/
      )
    ) {
      error('wm-cli email for stage server is not a valid email')
    }

    if (
      !isNull(configs.wmUserEmail.com) &&
      !configs.wmUserEmail.com.match(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/
      )
    ) {
      error('wm-cli email for prod server is not a valid email')
    }

    if (
      !isNull(configs.wmUserEmail.app) &&
      !configs.wmUserEmail.app.match(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/
      )
    ) {
      error('wm-cli email for app server is not a valid email')
    }

    if (isNull(configs.wmUserPassword.io)) {
      error('wm-cli password for prod dev is empty')
    }

    if (isNull(configs.wmUserPassword.co)) {
      error('wm-cli password for prod stage is empty')
    }

    if (isNull(configs.wmUserPassword.com)) {
      error('wm-cli password for prod server is empty')
    }

    if (isNull(configs.wmUserPassword.app)) {
      error('wm-cli password for app server is empty')
    }
  }
}

const createConfigs = () => {
  try {
    if (!fs.existsSync(`${configFile}`)) {
      makeConfig()
    } else {
      error('config already exists')
    }
  } catch (message) {
    error(message)

    return message
  }
}

const editConfigs = () => {
  try {
    if (fs.existsSync(`${configFile}`)) {
      makeConfig()
    } else {
      error('no config file to edit')
    }
  } catch (message) {
    error(message)

    return message
  }
}

const getConfigs = () => {
  try {
    const result = fs.existsSync(`${configFile}`)
      ? JSON.parse(fs.readFileSync(`${configFile}`))
      : makeConfig()

    return result
  } catch (message) {
    error(message)

    return message
  }
}

const showConfigs = () => {
  try {
    const configs = getConfigs()

    if (fs.existsSync(configFile) && configs) {
      alert('You current config file:')
      out(configs.gitHubToken)
      out(configs.wmUserEmail.io)
      out(configs.wmUserPassword.io)
      out(configs.wmUserEmail.co)
      out(configs.wmUserPassword.co)
      out(configs.wmUserEmail.com)
      out(configs.wmUserPassword.com)
      out(configs.wmUserEmail.app)
      out(configs.wmUserPassword.app)
    }
  } catch (message) {
    error(message)

    return message
  }
}

module.exports = {
  createConfigs: () => createConfigs(),
  editConfigs: () => editConfigs(),
  getConfigs: () => getConfigs(),
  showConfigs: () => showConfigs()
}
