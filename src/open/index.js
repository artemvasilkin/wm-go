const { error } = require('../utils/out')
const { show } = require('../utils/show')
const { getBranchFromBlockName } = require('../utils/getBranchFromBlockName')
const { getBranchFromBlockID } = require('../utils/getBranchFromBlockID')
const { getBranches } = require('../utils/getBranches')
const { getCurrentBranch } = require('../utils/getCurrentBranch')
const inquirer = require('inquirer')
const prompt = inquirer.createPromptModule()

const openFlow = branch => {
  if (branch.toString() !== getCurrentBranch()) {
    show(`git checkout ${branch}`)
    show(`git pull origin ${branch}`)
  } else {
    error(`Already on ${branch}`)
  }
}

const open = query => {
  if (query) {
    const validatorId = /(blockId)-([a-z0-9]{24})/
    const validatorName = /^(wireframe|design)-(series-\d+|[a-zA-Z0-9_]*)-([a-zA-Z0-9_-]*)$/
    const validatorBlockBranch = /^(d|w)?(\/)?(series-\d+|[a-zA-Z0-9_]*)?(\/)?([a-zA-Z0-9_-]*)?(\/)?(dev|prod)?$/
    const validatorThemeBranch = /^(theme)?(\/)?([a-zA-Z0-9_]*)?(\/)?(dev|prod)$/
    const validatorUikitBranch = /^(uikit)?(\/)?([a-zA-Z0-9_]*)?(\/)?(dev|prod)?$/

    if (query.match(validatorId)) {
      openFlow(getBranchFromBlockID(query))
    } else if (query.match(validatorName)) {
      openFlow(getBranchFromBlockName(query))
    } else if (
      query.match(validatorBlockBranch) ||
      query.match(validatorThemeBranch) ||
      query.match(validatorUikitBranch)
    ) {
      const branches = getBranches().filter(item => item.match(query))

      if (branches.length > 1) {
        prompt({
          type: 'list',
          name: 'branch',
          message: 'Choose the branch',
          choices: branches
        }).then(answer => {
          openFlow(answer.branch)
        })
      } else {
        openFlow(branches)
      }
    } else {
      openFlow(query)
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
