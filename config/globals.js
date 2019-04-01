const appRoot = require('app-root-path')

const servers = {
  dev: {
    alias: 'dev',
    domain: 'io',
    protocol: 'https',
    name: 'api.weblium.io',
    config: '.https.api.weblium.io'
  },
  stage: {
    alias: 'stage',
    domain: 'co',
    protocol: 'https',
    name: 'api.weblium.co',
    config: '.https.api.weblium.co'
  },
  prod: {
    alias: 'prod',
    domain: 'com',
    protocol: 'https',
    name: 'api.weblium.com',
    config: '.https.api.weblium.com'
  },
  local: {
    alias: 'local',
    domain: 'local',
    protocol: 'http',
    name: '192.168.45.90:3000',
    config: '.http.192.168.45.90.3000'
  },
  app: {
    alias: 'app',
    domain: 'app',
    protocol: 'https',
    name: 'api.weblium.app',
    config: '.https.api.weblium.app'
  },
  structures: {
    alias: 'structures',
    domain: 'com',
    protocol: 'https',
    name: 'api.weblium.com',
    config: '.https.api.weblium.com'
  }
}

const categories = [
  'about',
  'awards',
  'blog',
  'careers',
  'contacts',
  'countdown',
  'cover',
  'cta',
  'other',
  'faq',
  'social',
  'footer',
  'gallery',
  'header',
  'timeline',
  'menu',
  'numbers',
  'partners',
  'pricing',
  'process',
  'projects',
  'quote',
  'schedule',
  'services',
  'elements',
  'team',
  'testimonials',
  'description',
  'features',
  'embed',
  'simple'
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
  categories: categories,
  history: history,
  localhost: localhost,
  report: report,
  wmConfig: wmConfig
}
