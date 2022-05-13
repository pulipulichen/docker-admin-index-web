/* global Node */
import GadgetCard from './GadgetCard/GadgetCard.vue'

let Index = {
  props: ['config', 'localConfig', 'utils'],
  data () {    
    this.$i18n.locale = this.config.localConfig
    return {
      baseHostname: 'dev_local',
      appGadgets: ['app', 'console', 'data'],
      //paasModules: ['paas_git_jobs', 'paas_git_deploy', 'paas_quay', 'paas_argocd', 'paas_rencher']
    }
  },
  components: {
    'GadgetCard': GadgetCard
  },
  computed: {
    computedAppURL () {
      if (this.config.baseHostname === 'dev-local') {
        return 'http://localhost:' + this.config.ENV_DEV_LOCAL_PORTS['app']
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
    },
    enabledPaasModules () {
      return this.paasModules.filter(module => {
        return (window[`ENV_` + module.toUpperCase()])
      })
    },
    modules () {
      let modules = [].concat(this.appGadgets)

      if (this.config.ENV_DATABASE_DRIVERS) {
        modules = modules.concat(this.config.ENV_DATABASE_DRIVERS)
      }

      if (this.config.ENV_PAAS_SERVICES) {
        modules = modules.concat(Object.keys(this.config.ENV_PAAS_SERVICES))
      }

      //console.log(modules)

      return modules
    },
    modulesNotInHistory () {
      return this.modules.filter(m => (this.localConfig.history.indexOf(m) === -1))
    },
    sortedStaredModules () {
      let modules = []
      
      this.localConfig.history.forEach(module => {
        if (this.localConfig.starred.indexOf(module) === -1) {
          return false
        }
        modules.push(module)
      })

      this.modulesNotInHistory.forEach(module => {
        if (this.localConfig.starred.indexOf(module) === -1) {
          return false
        }
        modules.push(module)
      })
      //console.log(modules)
      return modules
    },
    sortedModules () {
      let modules = []
      
      this.localConfig.history.forEach(module => {
        if (this.localConfig.starred.indexOf(module) > -1) {
          return false
        }
        modules.push(module)
      })

      this.modulesNotInHistory.forEach(module => {
        if (this.localConfig.starred.indexOf(module) > -1) {
          return false
        }
        modules.push(module)
      })
      //console.log(modules)
      return modules
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
      
      this.config.ENV_DATABASE_DRIVERS = this.stringToObject(window.ENV_DATABASE_DRIVERS)
      //console.log('aaa')
      this.config.ENV_DEV_LOCAL_PORTS = this.stringToObject(window.ENV_DEV_LOCAL_PORTS)
      //console.log('2aaa')
      this.config.ENV_PAAS_SERVICES = this.stringToObject(window.ENV_PAAS_SERVICES)
      //this.config.ENV_PAAS_SERVICES = this.stringToObject("{\"paas_argocd\":\"https://argocd.nccu.syntixi.dev/applications/deploybot-test20220428-2220-pudding\",\"paas_git_jobs\":\"https://gitlab.nccu.syntixi.dev/pudding/test20220428-2220/-/jobs\",\"paas_quay\":\"https://quay.nccu.syntixi.dev/repository/dlll/test20220428-2220-pudding?tab=tags\",\"paas_rencher\":\"https://rancher.nccu.syntixi.dev/dashboard/c/local/explorer/apps.deployment/default/app-deployment-pudding-test20220428-2220#pods\"}")
      //console.log("{\"paas_argocd\":\"https://argocd.nccu.syntixi.dev/applications/deploybot-test20220428-2220-pudding\",\"paas_git_jobs\":\"https://gitlab.nccu.syntixi.dev/pudding/test20220428-2220/-/jobs\",\"paas_quay\":\"https://quay.nccu.syntixi.dev/repository/dlll/test20220428-2220-pudding?tab=tags\",\"paas_rencher\":\"https://rancher.nccu.syntixi.dev/dashboard/c/local/explorer/apps.deployment/default/app-deployment-pudding-test20220428-2220#pods\"}")
      //console.log(this.config.ENV_PAAS_SERVICES)
    },
    stringToObject (str) {
      if (typeof(str) === 'string') {
        //console.log('go1')
        try {
          str = eval(str)
        } catch (e) {
          //console.log(e)
        }
        
        //console.log('go2')
        if (typeof(str) === 'string') {
          str = JSON.parse(str)
        }
        //console.log(str)
        return this.stringToObject(str)
      }
      return str
    },
    setupBaseHostname () {
      if (location.href.indexOf('.paas.') === -1 && 
          location.href.indexOf('.paas-vpn.') === -1) {
        this.config.baseHostname = 'dev-local'
        this.config.baseHostnameShort = 'dev-local'
        //this.config.baseImage = 'https://pulipulichen.github.io/docker-admin-index-web'
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
      //this.config.baseImage = 'https://pulipulichen.github.io/docker-admin-index-web'
    },
    buildModuleURL (module, group) {
      if (group === 'paas') {
        let url = this.config.ENV_PAAS_SERVICES[module]
        //url = url.replace(`{SERVICE_NAME}`, this.config.baseHostnameShort)
        return url
      }

      if (group === 'database') {
        module = module + '_admin'
      }

      if (this.config.baseHostname === 'dev-local') {
        return 'http://localhost:' + this.config.ENV_DEV_LOCAL_PORTS[module]
      }
      else {
        if (module === 'app') {
          return 'http://' + this.config.baseHostname + '/'
        }

        let {port} = new URL(location.href)

        if (port !== '') {
          port = ":" + port
        }

        return 'http://' + module + '.' + this.config.baseHostname + port + '/'
      }
    }
  }
}

export default Index
