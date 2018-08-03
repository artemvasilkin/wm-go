const { error } = require('../utils/out')
const { show } = require('../utils/show')
const { getBranchFromBlockName } = require('../utils/getBranchFromBlockName')
const { getBranchFromBlockID } = require('../utils/getBranchFromBlockID')
const { getBranches } = require('../utils/getBranches')
const { getCurrentBranch } = require('../utils/getCurrentBranch')
const inquirer = require('inquirer')
const prompt = inquirer.createPromptModule()

const openFlow = branch => {
  show(`git checkout ${branch}`)
  show(`git pull origin ${branch}`)
}

const open = query => {
  if (query) {
    const validatorId = /(blockId)-([a-z0-9]{24})/
    const validatorName = /^(wireframe|design)-(series-\d+|[a-zA-Z0-9_]*)-([a-zA-Z0-9_-]*)$/
    const validatorShortBranch = /^(d|w)?(\/)?(series-\d+|[a-zA-Z0-9_]*)?(\/)?([a-zA-Z0-9_-]*)?(\/)?(dev|prod)?$/
    let result = ''

    if (query.match(validatorId)) {
      result = getBranchFromBlockID(query)
    } else if (query.match(validatorName)) {
      result = getBranchFromBlockName(query)
    } else if (query.match(validatorShortBranch)) {
      const branches = getBranches().filter(
        item => item.match(query) && !item.match('/prod')
      )

      if (branches.length > 1) {
        prompt({
          type: 'list',
          name: 'branch',
          message: 'Choose the branch',
          choices: branches
        }).then(answer => {
          result = answer.branch
        })
      } else {
        result = branches
      }
    } else {
      result = query
    }

    if (result.toString() !== getCurrentBranch()) {
      openFlow(result)
    } else {
      error(`Already on ${result}`)
    }
  } else {
    error('no branch specified')
  }
}

module.exports = {
  open: async query => {
    await open(query)
  }
}
