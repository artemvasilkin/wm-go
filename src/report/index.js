const fs = require('fs')

const report = require('../../config/globals')

const { alert, gratz, error } = require('../utils/out')

const reportFile = report.replace('/scripts/', '/')

const getReport = () => {
  try {
    const result = fs.existsSync(`${reportFile}`)
      ? alert(fs.readFileSync(`${reportFile}`).toString())
      : alert('report is empty')

    return result
  } catch (message) {
    error(message)

    return message
  }
}

const clearReport = () => {
  try {
    if (fs.existsSync(`${reportFile}`)) {
      fs.unlinkSync(`${reportFile}`)
      gratz('report has been cleared')
    } else {
      error('no report to clear')
    }
  } catch (message) {
    error(message)

    return message
  }
}

module.exports = {
  getReport: () => getReport(),
  clearReport: () => clearReport()
}
