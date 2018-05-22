const { getBlockCategory } = require('../utils/getBlockCategory')
const { getCurrentBranch } = require('../utils/getCurrentBranch')

module.exports = {
  getBlock: branchName => {
    const branch = branchName || getCurrentBranch()
    const blockData = branch.toLowerCase().split('/')
    const block = {}

    block.version = blockData[3] ? blockData[3] : ''
    block.type =
      blockData[0] === 'd'
        ? 'design'
        : blockData[0] === 'w'
          ? 'wireframe'
          : 'default'
    block.isWireframe = block.type === 'wireframe'
    block.namespace = blockData[1].length ? blockData[1] : 'namespace'
    block.name = blockData[2].length ? blockData[2] : 'name'
    block.category = getBlockCategory(block.name)
    block.roles =
      block.category === 'header'
        ? '--roles=header'
        : block.category === 'footer'
          ? '--roles=footer'
          : ''
    block.branch = branch

    return block
  }
}
