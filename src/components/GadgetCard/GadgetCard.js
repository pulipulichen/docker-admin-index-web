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
      if (this.$parent.webappModules.indexOf(this.module) > -1) {
        return 'webapp'
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
      if (this.moduleGroup === 'webapp') {
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
        this.addHistory()
      }
      //console.log(this.localConfig.starred)
    },
    addHistory () {
      this.$el.blur()
      if (this.localConfig.history.indexOf(this.module) > -1) {
        this.localConfig.history = this.localConfig.history.filter(m => (m !== this.module))
      }
      this.localConfig.history.unshift(this.module)
      
      //console.log(this.localConfig.history)
    }
  }
  // mounted() {
    
  // },
  // methods: {
    
  // }
}

export default GadgetCard