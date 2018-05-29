const getBranchFromBlockName = blockName => {
  const validator = /^(wireframe|design)-(series-\d+|[a-zA-Z0-9_]*)-([a-zA-Z0-9_-]*)$/
  const groups = validator.exec(blockName)
  const blockType = groups[1].match('wireframe') ? 'w' : 'd'

  return `${blockType}/${groups[2]}/${groups[3].replace('-', '_')}/dev`
}

module.exports = {
  getBranchFromBlockName: blockName => getBranchFromBlockName(blockName)
}
