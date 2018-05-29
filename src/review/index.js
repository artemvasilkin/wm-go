const { localhost } = require('../../config/globals')

const { alert, error } = require('../utils/out')
const { open } = require('../open')
const { show } = require('../utils/show')
const { getCurrentBranch } = require('../utils/getCurrentBranch')
const { npmInstall } = require('../utils/npmInstall')

const reviewFlow = (serverMode, branch) => {
  try {
    alert(`running in ${serverMode}`)
    error(branch)
    branch ? open(branch) : show(`git pull origin ${getCurrentBranch()}`)
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
