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
  configs.wmUserEmail = prompt(
    'Enter wm-cli email: ',
    'wmUserEmail is undefined'
  )
  configs.wmUserPassword = prompt(
    'Enter wm-cli password: ',
    'wmUserPassword is undefined',
    { echo: '*' }
  )

  if (
    configs.gitHubToken &&
    configs.gitHubToken.length === 40 &&
    configs.wmUserEmail &&
    configs.wmUserEmail.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/
    ) &&
    configs.wmUserPassword
  ) {
    fs.writeFileSync(`${configFile}`, JSON.stringify(configs))

    gratz('all set up:')
    alert('You current config file:')
    out(configs.gitHubToken)
    out(configs.wmUserEmail)
    out(configs.wmUserPassword)
  } else {
    if (isNull(configs.gitHubToken)) {
      error('git-hub token is empty')
    }

    if (!isNull(configs.gitHubToken) && configs.gitHubToken.length !== 40) {
      error('git-hub token length must be 40 characters')
    }

    if (isNull(configs.wmUserEmail)) {
      error('wm-cli email is empty')
    }

    if (
      !isNull(configs.wmUserEmail) &&
      !configs.wmUserEmail.match(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/
      )
    ) {
      error('wm-cli email is not a valid email')
    }

    if (isNull(configs.wmUserPassword)) {
      error('wm-cli password is empty')
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
      out(configs.wmUserEmail)
      out(configs.wmUserPassword)
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
