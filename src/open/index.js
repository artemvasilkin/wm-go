const { error } = require('../utils/out')
const { show } = require('../utils/show')
const { getBranchFromBlockName } = require('../utils/getBranchFromBlockName')
const { getBranchFromBlockID } = require('../utils/getBranchFromBlockID')

const open = query => {
  if (query) {
    let branch = ''

    if (query.match(/(blockId)-([a-z0-9]{24})/)) {
      branch = getBranchFromBlockID(query)
    } else if (
      query.match(
        /^(wireframe|design)-(series-\d+|[a-zA-Z0-9_]*)-([a-zA-Z0-9_-]*)$/
      )
    ) {
      branch = getBranchFromBlockName(query)
    } else {
      branch = query
    }

    show(`git checkout ${branch}`)
    show(`git pull origin ${branch}`)
  } else {
    error('no branch specified')
  }
}

module.exports = {
  open: query => open(query)
}
