const appRoot = require('app-root-path')

const devServer = 'dev'
const stageServer = 'stage'
const prodServer = 'prod'

const servers = [`${devServer}`, `${stageServer}`, `${prodServer}`]

const devDomain = 'io'
const stageDomain = 'co'
const prodDomain = 'com'

const domains = [`${devDomain}`, `${stageDomain}`, `${prodDomain}`]

const baseFile = `block.https.weblium.`
const devFile = `${baseFile}${devDomain}`
const stageFile = `${baseFile}${stageDomain}`
const prodFile = `${baseFile}${prodDomain}`

const history =
  'https://raw.githubusercontent.com/webliumteam/blocks/history/historia_vitae_magistra.json'

const localhost = 'http://localhost:9999/'

const report = `${appRoot.path}/logs/report.txt`.replace('/scripts/', '/')
const wmConfig = `${appRoot.path}/config/wm-config.json`.replace(
  '/scripts/',
  '/'
)

module.exports = {
  servers: servers,
  devServer: devServer,
  stageServer: stageServer,
  prodServer: prodServer,
  domains: domains,
  baseFile: baseFile,
  devFile: devFile,
  stageFile: stageFile,
  prodFile: prodFile,
  history: history,
  localhost: localhost,
  report: report,
  wmConfig: wmConfig
}
