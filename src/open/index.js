const { error } = require('../utils/out')
const { show } = require('../utils/show')
const { getBranchFromBlockName } = require('../utils/getBranchFromBlockName')
const { getBranchFromBlockID } = require('../utils/getBranchFromBlockID')
const { getBranches } = require('../utils/getBranches')
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

    if (query.match(validatorId)) {
      openFlow(getBranchFromBlockID(query))
    } else if (query.match(validatorName)) {
      openFlow(getBranchFromBlockName(query))
    } else if (query.match(validatorShortBranch)) {
      // let promise = new Promise((resolve, reject) => {
      //   const branches = getBranches().filter(
      //     item => item.match(query) && !item.match('/prod')
      //   )

      //   if (branches.length > 1) {
      //     prompt({
      //       type: 'list',
      //       name: 'branch',
      //       message: 'Choose the branch',
      //       choices: branches
      //     }).then(answer => {
      //       resolve(answer.branch)
      //     })
      //   } else {
      //     resolve(branches)
      //   }
      // })

      // let branch = await promise

      // openFlow(branch)

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
