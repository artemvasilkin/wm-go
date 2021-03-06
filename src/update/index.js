const prompt = require('prompt-sync')()

const { getPackageVersion } = require('../utils/getPackageVersion')
const fs = require('fs')

const update = skip => {
  if (!skip) {
    const willUpdate = prompt('Do you want to update to major version?')

    if (willUpdate === 'y' || willUpdate === 'Y') {
      const currentVersion = getPackageVersion()

      fs.writeFileSync(
        'package.json',
        fs
          .readFileSync('package.json')
          .toString()
          .replace(
            `"version": "${currentVersion}"`,
            `"version": "${+currentVersion.split('.')[0] + 1}.0.0"`
          )
      )
    }
  }
}

module.exports = {
  update: skip => update(skip)
}
