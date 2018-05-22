const appRoot = require('app-root-path')

module.exports = {
  devFile: 'block.https.weblium.io',
  stageFile: 'block.https.weblium.co',
  prodFile: 'block.https.weblium.com',
  baseFile: 'block.https.weblium.',
  history:
    'https://raw.githubusercontent.com/webliumteam/blocks/history/historia_vitae_magistra.json',
  localhost: 'http://localhost:9999/',
  report: `${appRoot.path}/logs/report.txt`,
  wmConfig: `${appRoot.path}/config/wm-config.json`
}
