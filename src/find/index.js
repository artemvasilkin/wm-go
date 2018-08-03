const fs = require('fs')
const appRoot = require('app-root-path')

const { error, gratz } = require('../utils/out')

const foundList = `${appRoot.path}/logs/found.txt`.replace('/scripts/', '/')

const find = (file, query, branch) => {
  if (fs.existsSync(file)) {
    for (var i = 0; i < query.length; i++) {
      if (query[i].test(fs.readFileSync(file).toString())) {
        gratz(`found ${query}!`)

        if (branch) {
          fs.appendFileSync(foundList, `${branch} - ${query[i]}\n`)
        }
      } else {
        error('not found')
      }
    }
  } else {
    error('no file')
  }
}

module.exports = {
  find: (file, query, branch) => find(file, query, branch)
}
