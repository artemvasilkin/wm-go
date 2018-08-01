const { localhost } = require('../../config/globals')

const { alert, error } = require('../utils/out')
const { open } = require('../open')
const { show } = require('../utils/show')
const { npmInstall } = require('../utils/npmInstall')

async function reviewFlow (serverMode, branch) {
  try {
    alert(`running in ${serverMode}`)
    branch && (await open(branch))
    npmInstall()
    alert(`server is loading, please check ${localhost}`)
    show(`WM_SANDBOX_MODE=${serverMode} wm-sandbox`)
  } catch (message) {
    error(message)

    return message
  }
}

const review = (editorMode, branch) => {
  reviewFlow(editorMode === true ? 'server-editor' : 'server', branch)
}

module.exports = {
  review: (editorMode, branch) => review(editorMode, branch)
}
