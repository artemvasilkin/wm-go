const fs = require('fs')

const { error } = require('../utils/out')

const replace = (file, original, replacement) => {
  if (fs.existsSync(file)) {
    for (var i = 0; i < original.length; i++) {
      if (original[i].test(fs.readFileSync(file).toString())) {
        fs.writeFileSync(
          file,
          fs
            .readFileSync(file)
            .toString()
            .replace(original[i], replacement[i])
        )
      }
    }
  } else {
    error('no component')
  }
}

module.exports = {
  replace: (file, original, replacement) => replace(file, original, replacement)
}
