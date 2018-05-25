const { categories } = require('../../config/globals')

const getBlockCategory = blockName => {
  blockName =
    blockName.split('_').length > 1 ? blockName.split('_')[0] : blockName

  for (var i = 0; i < categories.length; i++) {
    if (blockName.match(categories[i].toLowerCase())) {
      return categories[i].toLowerCase()
    }
  }
}

module.exports = {
  getBlockCategory: blockName => getBlockCategory(blockName)
}
