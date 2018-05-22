const { gratz, error } = require('../utils/out')
const { show } = require('../utils/show')
const { getCurrentBranch } = require('../utils/getCurrentBranch')

const save = message => {
  try {
    if (message && typeof message === 'string') {
      const currentBranch = getCurrentBranch()

      show(`git add .`)
      show(`git commit -m "${message}"`)

      try {
        show(`git push`)
        gratz(`pushed to ${currentBranch}`)
      } catch (error) {
        if (error.toString().includes('has no upstream branch')) {
          show(`git push --set-upstream origin ${currentBranch}`)
          gratz(`new remote branch ${currentBranch} created`)
        } else {
          error(error)
        }
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
  save: message => save(message)
}
