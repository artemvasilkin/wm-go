const fs = require('fs')
const appRoot = require('app-root-path')

const { save } = require('../save')
const { error, alert, gratz } = require('../utils/out')

const failedList = `${appRoot.path}/logs/failed-to-replace.txt`.replace(
  '/scripts/',
  '/'
)

const replace = options => {
  if (fs.existsSync(options.file)) {
    let finished = false

    for (var i = 0; i < options.original.length; i++) {
      alert(`start searching for ${options.original[i]} in ${options.file}`)
      if (options.original[i].test(fs.readFileSync(options.file).toString())) {
        finished = true

        gratz(`found ${options.original[i]}`)
        while (
          options.original[i].test(fs.readFileSync(options.file).toString())
        ) {
          gratz(
            `replaced ${options.original[i]} with ${
              options.replacement[i]
            } in ${options.file}`
          )
          fs.writeFileSync(
            options.file,
            fs
              .readFileSync(options.file)
              .toString()
              .replace(options.original[i], options.replacement[i])
          )
        }
      } else {
        error(`can't find ${options.original[i]}`)
        if (options.branch) {
          fs.appendFileSync(failedList, `${options.branch}\n`)
        }
      }
    }

    if (finished) {
      save(`auto replace: ${options.description}`, true)
      options.onFinish()
    }
  } else {
    error('no file')
  }
}

module.exports = {
  replace: options => replace(options)
}
