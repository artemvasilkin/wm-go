const { getBlockCategory } = require('../utils/getBlockCategory')
const { getCurrentBranch } = require('../utils/getCurrentBranch')

module.exports = {
  getBlock: branchName => {
    const branch = branchName || getCurrentBranch()
    const blockData = branch.toLowerCase().split('/')
    const block = {}
    const blockApi = {}

    if (blockData.length === 4) {
      block.version = blockData[3] ? blockData[3] : ''
      block.type =
        blockData[0] === 'd'
          ? 'design'
          : blockData[0] === 'w'
            ? 'wireframe'
            : 'default'
      block.isWireframe = block.type === 'wireframe'
      block.namespace =
        blockData[1] && blockData[1].length ? blockData[1] : 'undefined'
      block.name =
        blockData[2] && blockData[2].length ? blockData[2] : 'undefined'
      block.category = getBlockCategory(block.name)
      block.roles =
        block.category === 'header'
          ? '--roles=header'
          : block.category === 'footer'
            ? '--roles=footer'
            : ''
      block.branch = branch

      blockApi.call = 'block'
      blockApi.name = `--name=${block.type}-${block.namespace}-${block.name}`
      blockApi.category = `-c ${block.category}`
      blockApi.wireframe = `--wireframe=${block.isWireframe}`
      blockApi.roles = block.roles

      block.api = blockApi
    } else if (blockData.length === 3) {
      block.version = blockData[2]
      block.type = blockData[0] === 'theme' ? blockData[0] : 'undefined'
      block.isWireframe = false
      block.namespace = null
      block.name =
        blockData[1] && blockData[1].length ? blockData[1] : 'undefined'
      block.category = 'other'
      block.roles = null
      block.branch = branch

      blockApi.call = 'block'
      blockApi.name = `--name=${block.name}`
      blockApi.category = `-c ${block.category}`
      blockApi.wireframe = `--wireframe=${block.isWireframe}`
      blockApi.roles = ''

      block.api = blockApi
    }

    return block
  }
}
