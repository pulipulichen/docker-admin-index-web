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
        return '//localhost:' + this.config.ENV_DEV_LOCAL_PORTS['app']
      }
      else {
        return '//' + this.config.baseHostname + '/'
      }
    },
    computedConsoleURL () {
      return this.buildModuleURL('console')
    },
    computedDataURL () {
      return this.buildModuleURL('data')
    },
    computedHelpURL () {
      return 'https://github.com/pulipulichen/dlll-paas-starter/wiki'
    },
    
    enabledPaasModules () {
      return this.paasModules.filter(module => {
        return (window[`ENV_` + module.toUpperCase()])
      })
    },
    modules () {
      let modules = ['help'].concat(this.appGadgets)

      if (this.config.ENV_DATABASE_DRIVERS) {
        modules = modules.concat(this.config.ENV_DATABASE_DRIVERS)
      }

      if (this.config.ENV_PAAS_SERVICES) {
        modules = modules.concat(Object.keys(this.config.ENV_PAAS_SERVICES))
      }

      // console.log(modules)

      return modules
    },
    modulesNotInHistory () {
      return this.modules.filter(m => (this.localConfig.history.indexOf(m) === -1))
    },
    sortedStaredModules () {
      let modules = []
      
      this.localConfig.history.forEach(module => {
        if (this.localConfig.starred.indexOf(module) === -1 || 
            this.modules.indexOf(module) === -1) {
          return false
        }
        modules.push(module)
      })

      this.modulesNotInHistory.forEach(module => {
        if (this.localConfig.starred.indexOf(module) === -1 || 
            this.modules.indexOf(module) === -1) {
          return false
        }
        modules.push(module)
      })

      // console.log('sortedStaredModules', modules)

      return modules
    },
    sortedModules () {
      let modules = []
      
      this.localConfig.history.forEach(module => {
        if (this.localConfig.starred.indexOf(module) > -1 || 
            this.modules.indexOf(module) === -1) {
          return false
        }
        modules.push(module)
      })

      this.modulesNotInHistory.forEach(module => {
        if (this.localConfig.starred.indexOf(module) > -1 || 
            this.modules.indexOf(module) === -1) {
          return false
        }
        modules.push(module)
      })
      //console.log(modules)

      // console.log('sortedModules', modules)

      return modules
    },
    groupedModules () {
      let groupJSON = {}

      this.modules.forEach((module) => {
        let group = this.getModuleGroup(module)

        if (!groupJSON[group]) {
          groupJSON[group] = []
        }
        groupJSON[group].push(module)
      })

      return Object.keys(groupJSON).map(group => groupJSON[group])
    }
  },
  watch: {
    'config.baseHostname' () {
      //console.log('asas')
      document.title = 'admin-' + this.config.baseHostnameShort
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

      this.config.ENV_APP_SERVICES = this.stringToObject(window.ENV_APP_SERVICES)

      this.config.ENV_DATABASE_SERVICES = this.stringToObject(window.ENV_DATABASE_SERVICES)
      //this.config.ENV_PAAS_SERVICES = this.stringToObject("{\"paas_argocd\":\"https://argocd.nccu.syntixi.dev/applications/deploybot-test20220428-2220-pudding\",\"paas_git_jobs\":\"https://gitlab.nccu.syntixi.dev/pudding/test20220428-2220/-/jobs\",\"paas_quay\":\"https://quay.nccu.syntixi.dev/repository/dlll/test20220428-2220-pudding?tab=tags\",\"paas_rencher\":\"https://rancher.nccu.syntixi.dev/dashboard/c/local/explorer/apps.deployment/default/app-deployment-pudding-test20220428-2220#pods\"}")
      //console.log("{\"paas_argocd\":\"https://argocd.nccu.syntixi.dev/applications/deploybot-test20220428-2220-pudding\",\"paas_git_jobs\":\"https://gitlab.nccu.syntixi.dev/pudding/test20220428-2220/-/jobs\",\"paas_quay\":\"https://quay.nccu.syntixi.dev/repository/dlll/test20220428-2220-pudding?tab=tags\",\"paas_rencher\":\"https://rancher.nccu.syntixi.dev/dashboard/c/local/explorer/apps.deployment/default/app-deployment-pudding-test20220428-2220#pods\"}")
      //console.log(this.config.ENV_PAAS_SERVICES)
    },
    stringToObject (str) {
      if (typeof(str) === 'string') {
        //console.log('go1')
        try {
          //str = atob(str)
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

      if (hostname.startsWith('admin-')) {
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
      // https://dlll-paas-starter-pudding.paas.dlll.pulipuli.info/
      // https://admin-dlll-paas-starter-pudding.paas.dlll.pulipuli.info/
      
      let tempParts = []
      for (let i = 0; i < parts.length; i++) {
        let part = parts[i]
        if (part === 'paas' || part === 'paas-vpn') {
          break
        }
        tempParts.push(part)
      }
      parts = tempParts

      this.config.baseHostnameShort = parts.join('-')
      document.title = this.config.baseHostname
      //this.config.baseImage = 'https://pulipulichen.github.io/docker-admin-index-web'
    },
    getSuffix (module) {
      let suffix = ''
      // console.log(module)
      // console.log(this.config.ENV_DATABASE_SERVICES[module])

      // 不可以用if else ，一定要個別if!!
      if (this.config.ENV_DATABASE_SERVICES[module] && 
          this.config.ENV_DATABASE_SERVICES[module].admin_suffix) {
        suffix = this.config.ENV_DATABASE_SERVICES[module].admin_suffix
      }
      if (this.config.ENV_DATABASE_SERVICES[module] && 
          this.config.ENV_DATABASE_SERVICES[module].admin_suffix_dev_local && 
          this.config.baseHostname === 'dev-local') {
        suffix = this.config.ENV_DATABASE_SERVICES[module].admin_suffix_dev_local
      }

      if (this.config.ENV_APP_SERVICES[module] && 
        this.config.ENV_APP_SERVICES[module].admin_suffix) {
        suffix = this.config.ENV_APP_SERVICES[module].admin_suffix
      }
      if (this.config.ENV_APP_SERVICES[module] && 
        this.config.ENV_APP_SERVICES[module].admin_suffix_dev_local && 
        this.config.baseHostname === 'dev-local') {
        suffix = this.config.ENV_APP_SERVICES[module].admin_suffix_dev_local
      }

      if (suffix !== '') {
        suffix = suffix.replace(`{{ BASE_HOSTNAME }}`, this.config.baseHostname)
        let urlObject = (new URL(location.href))
        let currentPort = urlObject.port
        if (currentPort === '') {
          if (urlObject.protocol === 'http:') {
            currentPort = '80'
          }
          else {
            currentPort = '443'
          }
        }
        suffix = suffix.replace(`{{ PORT }}`, currentPort)

        if (suffix.startsWith('/')) {
          suffix = suffix.slice(1)
        }
      }

      return suffix
    },
    buildModuleURL (module, group) {
      if (group === 'paas') {
        let url = this.config.ENV_PAAS_SERVICES[module]
        //url = url.replace(`{SERVICE_NAME}`, this.config.baseHostnameShort)
        return url
      }

      if (module === 'help') {
        return this.computedHelpURL
      }

      let suffix = this.getSuffix(module)
      // console.log({suffix})
      // console.log(this.config.baseHostname)

      if (this.config.baseHostname === 'dev-local') {

        let port = this.config.ENV_DEV_LOCAL_PORTS[module + '_admin']
        if (!port) {
          port = this.config.ENV_DEV_LOCAL_PORTS[module]
        }
        return '//localhost:' + port + '/' + suffix
      }
      else if (module === 'app') {
        let baseHostname = this.config.baseHostname
        baseHostname = baseHostname.replace('.paas-vpn.', '.paas.')
        return '//' + baseHostname + '/' + suffix
      }
      else {
        
        let {port} = new URL(location.href)

        if (port !== '') {
          port = ":" + port
        }

        return '//' + module + '-' + this.config.baseHostname + port + '/' + suffix
      }
    },
    imageURL (module) {
      return this.config.baseImage + '/img/module/' + module + '.png'
    },
    getModuleGroup (module) {
      if (this.appGadgets.indexOf(module) > -1) {
        return 'app'
      }
      if (this.config.ENV_DATABASE_DRIVERS 
        && this.config.ENV_DATABASE_DRIVERS.indexOf(module) > -1) {
        return 'database'
      }
      if (this.config.ENV_PAAS_SERVICES 
        && Object.keys(this.config.ENV_PAAS_SERVICES).indexOf(module) > -1) {
        return 'paas'
      }
      return 'app'
    },
  }
}

export default Index
