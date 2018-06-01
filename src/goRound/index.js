const fs = require('fs')

const { report } = require('../../config/globals')

const reportFile = report.replace('/scripts/', '/')

const goRound = (data, func) => {
  data.forEach(async (item, index) => {
    try {
      await func(item, index)
    } catch (error) {
      const dateTime = await new Date()
      const content = await `${dateTime}\n${item}\n${error}\n\n\n\n`
      await fs.appendFileSync(`${reportFile}`, content)
    }
  })
}

module.exports = {
  goRound: (data, func) => goRound(data, func)
}
