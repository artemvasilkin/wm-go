const { error } = require('../utils/out')
const { show } = require('../utils/show')

const getBranchFromBlockName = blockName => {
  const validator = /^(wireframe|design)-(series-\d+|[a-zA-Z0-9_]*)-([a-zA-Z0-9_-]*)$/
  const groups = validator.exec(blockName)
  const blockType = groups[1].match('wireframe') ? 'w' : 'd'

  return `${blockType}/${groups[2]}/${groups[3]}/dev`
}

const superCheckout = query => {
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
  superCheckout: query => superCheckout(query)
}
