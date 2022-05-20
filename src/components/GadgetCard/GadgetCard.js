let GadgetCard = {
  props: ['config', 'localConfig', 'utils', 
      'module'],
  data () {    
    this.$i18n.locale = this.localConfig.locale
    return {
    }
  },
  watch: {
    'localConfig.locale'() {
      this.$i18n.locale = this.localConfig.locale;
    },
  },
  computed: {
    moduleGroup () {
      if (this.$parent.appGadgets.indexOf(this.module) > -1) {
        return 'app'
      }
      if (this.config.ENV_DATABASE_DRIVERS && this.config.ENV_DATABASE_DRIVERS.indexOf(this.module) > -1) {
        return 'database'
      }
      if (this.config.ENV_PAAS_SERVICES && Object.keys(this.config.ENV_PAAS_SERVICES).indexOf(this.module) > -1) {
        return 'paas'
      }
    },
    searchKeyword () {
      let keyword = this.localConfig.searchKeyword 
      keyword = keyword.toLowerCase().trim()

      return keyword
    },
    link () {
      return this.$parent.buildModuleURL(this.module, this.moduleGroup)
    },
    imageURL () {
      return this.config.baseImage + '/img/module/' + this.module + '.png'
    },
    visible () {
      if (this.searchKeyword === '') {
        return true
      }

      if (this.module.toLowerCase().indexOf(this.searchKeyword) > -1 || 
          this.moduleGroup.toLowerCase().indexOf(this.searchKeyword) > -1 || 
          this.$t(this.module + '.header').toLowerCase().indexOf(this.searchKeyword) > -1 ||
          this.$t(this.module + '.description').toLowerCase().indexOf(this.searchKeyword) > -1) {
        return true
      }
    },
    labelType () {
      if (this.moduleGroup === 'app') {
        return 'teal'
      }
      if (this.moduleGroup === 'database') {
        return 'orange'
      }
      if (this.moduleGroup === 'paas') {
        return 'blue'
      }
    },
    notInStarred () {
      return (this.localConfig.starred.indexOf(this.module) === -1)
    },
    moduleDisplay () {
      let module = this.module

      if (module.startsWith('paas_')) {
        module = module.slice(5)
      }

      return module
    }
  },
  methods: {
    toggleStarred () {
      this.$el.blur()
      if (this.notInStarred === false) {
        this.localConfig.starred = this.localConfig.starred.filter(m => (m !== this.module))
      }
      else {
        this.localConfig.starred.unshift(this.module)
        this.addHistory(0)
      }
      //console.log(this.localConfig.starred)
    },
    addHistory: async function (sleep = 100) {
      this.$el.blur()
      let module = this.module
      await this.utils.AsyncUtils.sleep(sleep)
      if (this.localConfig.history.indexOf(module) > -1) {
        this.localConfig.history = this.localConfig.history.filter(m => (m !== module))
      }
      this.localConfig.history.unshift(module)
      
      //console.log(this.localConfig.history)
    }
  }
  // mounted() {
    
  // },
  // methods: {
    
  // }
}

export default GadgetCard