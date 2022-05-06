let GadgetCard = {
  props: ['config', 'localConfig', 'utils', 
      'module', 'moduleGroup'],
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
    }
  },
  // mounted() {
    
  // },
  // methods: {
    
  // }
}

export default GadgetCard