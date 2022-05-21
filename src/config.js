let config = {
  appName: 'docker-admin-index-web',
  inited: false,
  
  debug: {
    enableRestore: true
  },
  viewportSize: {
    width: null,
    height: null,
    ratio: null
  },

  baseHostname: '',
  baseHostnameShort: '',
  //baseImage: 'https://pulipulichen.github.io/docker-admin-index-web',
  baseImage: 'https://test-thinkpad.puli.ml',
  ENV_DATABASE_DRIVERS: [],
  ENV_DEV_LOCAL_PORTS: {},
  ENV_DATABASE_SERVICES: {}
}

import styleConfig from './styles/style.config.js'
config.styleConfig = styleConfig

//import readingConfig from './../config/reading.js'
//config.readingConfig = readingConfig

import productionConfig from './config.production.js'
if (process.env.NODE_ENV === 'production') {
  for (let name in productionConfig) {
    config[name] = productionConfig[name]
  }
}

export default config