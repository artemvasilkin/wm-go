<!-- // WM-GO API

// const find = require('../src/find')
// const init = require('../src/init')
// const kill = require('../src/kill')
// const login = require('../src/login')
// const open = require('../src/open')
// const pr = require('../src/pr')
// const replace = require('../src/replace')
// const republish = require('../src/republish')
// const save = require('../src/save')
// const update = require('../src/update')

// UTILS FUNCTIONS

// const { filget } = require('../src/utils/figlet')
// const { getBlock } = require('../src/utils/getBlock')
// const { getBlockCategory } = require('../src/utils/getBlockCategory')
// const { getCurrentBranch } = require('../src/utils/getCurrentBranch')
// const { getPackageVersion } = require('../src/utils/getPackageVersion')
// const { getWireframe } = require('../src/utils/getWireframe')
// const { npmInstall } = require('../src/utils/npmInstall')
// const { error, gratz, alert} = require('../src/utils/out')
// const { run } = require('../src/utils/run')
// const { show } = require('../src/utils/show')

module.exports = {
  goConfig: {
    customList: false,
    branches: [
      'w/series-1/extra-counter/dev',
      'w/series-1/extra_cookies/dev',
      'w/series-1/extra_portfolio/dev',
      'w/series-1/interactive-map/dev',
      'w/series-11/contacts/dev',
      'w/series-18/why/dev',
      'w/series-3/cta/dev',
      'w/series-3/social/dev',
      'w/series-6/contacts/dev',
      'w/series-7/cta/dev',
      'w/series-9/gallery/dev'
    ]
  },
  customFunction: {
    enabled: true,
    function: (branches, branch, index) => {
      console.log('Custom Function')
    }
  },
  findConfig: {
    file: 'package.json',
    query: [
      /"category"/
    ]
  },
  replaceConfig: {
    file: 'package.json',
    description: 'editorVersion for reroll',
    original: [
      /"description": "",/
    ],
    replacement: [
      '"description": "",\n  "editorVersion": "4.16.0",'
    ],
    once: true
  }
} -->
