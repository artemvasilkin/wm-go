const appRoot = require('app-root-path')

const devServer = 'dev'
const stageServer = 'stage'
const prodServer = 'prod'
const appServer = 'app'

const servers = [`${devServer}`, `${stageServer}`, `${prodServer}`]

const devDomain = 'io'
const stageDomain = 'co'
const prodDomain = 'com'
const appDomain = 'app'

const domains = [
  `${devDomain}`,
  `${stageDomain}`,
  `${prodDomain}`,
  `${appDomain}`
]

const baseFile = `block.https.weblium.`
const devFile = `${baseFile}${devDomain}`
const stageFile = `${baseFile}${stageDomain}`
const prodFile = `${baseFile}${prodDomain}`
const appFile = `${baseFile}${appDomain}`

const categories = [
  'About',
  'Awards',
  'Blog',
  'Careers',
  'Contacts',
  'Cover',
  'CTA',
  'Events',
  'FAQ',
  'Footer',
  'Gallery',
  'Header',
  'Numbers',
  'Partners',
  'Pricing',
  'Process',
  'Projects',
  'Quote',
  'Services',
  'Schedule',
  'Follow-us',
  'Team',
  'Testimonials',
  'Text',
  'Why',
  'Table',
  'Menu',
  'History',
  'Extra',
  'Simple',
  'Counter'
]

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
  categories: categories,
  history: history,
  localhost: localhost,
  report: report,
  wmConfig: wmConfig
}
