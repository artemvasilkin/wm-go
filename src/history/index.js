const fs = require('fs')
const cTable = require('console.table')

const { gratz, error, alert } = require('../utils/out')
const { run } = require('../utils/run')
const { history: historyFile } = require('../../config/globals')

const { show } = require('../utils/show')
const { save } = require('../save')

const getHistory = () => {
  try {
    const history = run(`curl ${historyFile}`)
    gratz(`historia vitae magistra`)

    return history
  } catch (message) {
    error(message)

    return message
  }
}

const showHistory = () => {
  try {
    const history = JSON.parse(getHistory())

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dece'
    ]
    const now = new Date()

    let total = history.length
    let month = 0
    let today = 0

    history.map(entity => {
      const publishDate = entity['Publish date'].split(' ')

      if (
        parseInt(publishDate[3]) === now.getFullYear() &&
        publishDate[1].match(months[now.getMonth()])
      ) {
        month++

        if (publishDate[2].match(now.getDate())) {
          today++
        }
      }
    })

    console.table(history)

    alert(`today: ${today}`)
    alert(`this month: ${month}`)
    alert(`total: ${total}`)
  } catch (message) {
    error(message)

    return message
  }
}

const updateHistory = (domain, block, date) => {
  try {
    if (
      domain === 'com' &&
      fs.existsSync(`block.https.api.weblium.${domain}`)
    ) {
      show(`git checkout history`)
      show(`git pull origin history`)

      const entity = {
        'Block full name': `${block.type}-${block.namespace}-${block.name}`,
        'Publish date': `${date}`,
        'Block parameters': {
          Branch: `=HYPERLINK("https://github.com/webliumteam/blocks/tree/${
            block.branch
          }","${block.branch}")`,
          'Block type': `${block.type}`,
          'Block namespace': `${block.namespace}`,
          'Block name': `${block.name}`,
          'Block category': `${block.category}`,
          'Block roles': `${block.roles}`,
          'Block version': `${block.version}`,
          'Block isWireframe': `${block.isWireframe}`
        }
      }

      const history = JSON.parse(
        fs.readFileSync(`historia_vitae_magistra.json`).toString()
      )

      let exists = false

      history.map(item => {
        if (item['Block full name'].includes(`${entity['Block full name']}`)) {
          exists = true
        }
      })

      if (!exists) {
        history.push(entity)

        fs.writeFileSync(
          `historia_vitae_magistra.json`,
          JSON.stringify(history)
        )

        save(`${entity['Block full name']}`)

        show(`git checkout -`)

        gratz(`historia vitae magistra`)
      } else {
        show(`git checkout -`)

        error(`already exists in history file`)
      }
    }
  } catch (message) {
    error(message)

    return message
  }
}

module.exports = {
  getHistory: () => getHistory(),
  showHistory: () => showHistory(),
  updateHistory: (domain, block, date) => updateHistory(domain, block, date)
}
