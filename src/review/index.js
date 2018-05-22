const { localhost } = require('../../config/globals')

const { alert, error } = require('../utils/out')
const { show } = require('../utils/show')
const { getCurrentBranch } = require('../utils/getCurrentBranch')
const { npmInstall } = require('../utils/npmInstall')

const reviewFlow = serverMode => {
  try {
    alert(`running in ${serverMode}`)
    show(`git pull origin ${getCurrentBranch()}`)
    npmInstall()
    alert(`server is loading, please check ${localhost}`)
    show(`WM_SANDBOX_MODE=${serverMode} wm-sandbox`)
  } catch (message) {
    error(message)

    return message
  }
}

const review = editorMode => {
  reviewFlow(editorMode === true ? 'server-editor' : 'server')
}

module.exports = {
  review: editorMode => review(editorMode)
}
