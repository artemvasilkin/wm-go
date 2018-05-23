const fs = require('fs')

const { report } = require('../../config/globals')

const reportFile = report.replace('/scripts/', '/')

const goRound = (data, func) => {
  data.forEach((item, index) => {
    try {
      func(item, index)
    } catch (error) {
      const dateTime = new Date()
      const content = `${dateTime}\n${item}\n${error}\n\n\n\n`
      fs.appendFileSync(`${reportFile}`, content)
    }
  })
}

module.exports = {
  goRound: (data, func) => goRound(data, func)
}
