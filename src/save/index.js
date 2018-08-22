const fs = require('fs')

const { gratz, error } = require('../utils/out')
const { show } = require('../utils/show')
const { getCurrentBranch } = require('../utils/getCurrentBranch')
const { pr } = require('../pr')

const save = (message, force) => {
  try {
    if (message && typeof message === 'string') {
      if (
        !fs.existsSync('undefined') &&
        !fs.existsSync('wm-config.json') &&
        !fs.existsSync('wm-config')
      ) {
        const currentBranch = getCurrentBranch()

        show(`git add .`)
        force
          ? show(`git commit -n -m "${message}"`)
          : show(`git commit -m "${message}"`)

        try {
          show(`git push`)
          gratz(`pushed to ${currentBranch}`)
        } catch (error) {
          if (error.toString().includes('has no upstream branch')) {
            show(`git push --set-upstream origin ${currentBranch}`)
            pr('com')
            gratz(`new remote branch ${currentBranch} created`)
            gratz(`pull request created`)
          } else {
            error(error)
          }
        }
      } else {
        error('ERROR! REMOVE DANGEROOUS FILES!')
      }
    } else {
      error('please, specify commit message')
    }
  } catch (message) {
    error(message)

    return message
  }
}

module.exports = {
  save: (message, force) => save(message, force)
}
