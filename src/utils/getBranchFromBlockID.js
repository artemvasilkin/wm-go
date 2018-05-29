// blockId-5b066470873fda0027475446

const { run } = require('../utils/run')
const { getBranchFromBlockName } = require('../utils/getBranchFromBlockName')

const getBranchFromBlockID = blockIdQuery => {
  return getBranchFromBlockName(
    run(
      `wm-cli block get ${/^(blockId)-([a-z0-9]{24})$/.exec(blockIdQuery)[2]}`
    )
      .toString()
      .match(
        /(wireframe|design)-(series-\d+|[a-zA-Z0-9_]*)-([a-zA-Z0-9_-]*)/gm
      )[0]
  )
}

module.exports = {
  getBranchFromBlockID: blockIdQuery => getBranchFromBlockID(blockIdQuery)
}
