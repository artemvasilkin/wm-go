const fs = require('fs')

const { wmConfig } = require('../../config/globals')

const { alert, default: out, error } = require('../utils/out')

const configFile = wmConfig.replace('/scripts/', '/')

const makeConfig = () => {
  const configs = {}
  fs.writeFileSync(`${configFile}`, JSON.stringify(configs))
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
      out(configs)
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
