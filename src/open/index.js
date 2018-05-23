const { error } = require('../utils/out')
const { show } = require('../utils/show')
const { getBranchFromBlockName } = require('../utils/getBranchFromBlockName')

const open = query => {
  if (query) {
    let branch = ''

    query.split('/').length < 4
      ? (branch = getBranchFromBlockName(query))
      : (branch = query)

    show(`git checkout ${branch}`)
    show(`git pull origin ${branch}`)
  } else {
    error('no branch specified')
  }
}

module.exports = {
  open: query => open(query)
}
