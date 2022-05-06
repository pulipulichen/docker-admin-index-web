/* global Node */
import GadgetCard from './GadgetCard/GadgetCard.vue'

let Index = {
  props: ['config', 'localConfig', 'utils'],
  data () {    
    this.$i18n.locale = this.config.localConfig
    return {
      baseHostname: 'dev_local',
      webappModules: ['webapp', 'console', 'backup']
    }
  },
  components: {
    'GadgetCard': GadgetCard
  },
  computed: {
    computedWebappURL () {
      if (this.config.baseHostname === 'dev-local') {
        return 'http://localhost:' + this.config.ENV_DEV_LOCAL_PORTS['webapp']
      }
      else {
        return 'http://' + this.config.baseHostname + '/'
      }
    },
    computedConsoleURL () {
      return this.buildModuleURL('console')
    },
    computedBackupURL () {
      return this.buildModuleURL('backup')
    }
  },
  watch: {
    'config.baseHostname' () {
      //console.log('asas')
      document.title = this.config.baseHostname
    }
  },
  mounted () {
    this.setupENV()
    this.setupBaseHostname()
  },
  methods: {
    setupENV () {
      this.config.ENV_DATABASE_DRIVERS = window.ENV_DATABASE_DRIVERS
      this.config.ENV_DEV_LOCAL_PORTS = window.ENV_DEV_LOCAL_PORTS
    },
    setupBaseHostname () {
      if (location.href.indexOf('.paas.') === -1 && 
          location.href.indexOf('.paas-vpn.') === -1) {
        this.config.baseHostname = 'dev-local'
        this.config.baseHostnameShort = 'dev-local'
        return true
      }

      let {hostname} = new URL(location.href)

      if (hostname.startsWith('admin.')) {
        this.config.baseHostname = hostname.slice(6)
      }
      else {
        this.config.baseHostname = hostname
      }

      if (hostname.indexOf('.paas.') > -1) {
        hostname = hostname.slice(0, hostname.indexOf('.paas.'))
      }
      if (hostname.indexOf('.paas-vpn.') > -1) {
        hostname = hostname.slice(0, hostname.indexOf('.paas-vpn.'))
      }

      let parts = hostname.split('.')
      if (parts.length > 2) {
        parts = parts.splice(-2)
      }
      this.config.baseHostnameShort = parts.join('.')
      document.title = this.config.baseHostname
      this.config.baseImage = 'https://pulipulichen.github.io/docker-admin-index-web'
    },
    buildModuleURL (module, group) {
      if (group === 'database') {
        module = module + '_admin'
      }

      if (this.config.baseHostname === 'dev-local') {
        return 'http://localhost:' + this.config.ENV_DEV_LOCAL_PORTS[module]
      }
      else {
        return 'http://' + module + '.' + this.config.baseHostname + '/'
      }
    }
  }
}

export default Index