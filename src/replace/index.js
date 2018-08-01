const fs = require('fs')
const appRoot = require('app-root-path')

const { save } = require('../save')
const { error } = require('../utils/out')

const failedList = `${appRoot.path}/logs/failed-to-replace.txt`.replace(
  '/scripts/',
  '/'
)

const replace = (file, original, replacement, branch) => {
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

        save('auto replace')
      } else {
        if (branch) {
          fs.appendFileSync(failedList, `${branch}\n`)
        }
      }
    }
  } else {
    error('no file')
  }
}

module.exports = {
  replace: (file, original, replacement, branch) =>
    replace(file, original, replacement, branch)
}
