/* global Node */
let Index = {
  props: ['config', 'localConfig', 'utils'],
  data () {    
    this.$i18n.locale = this.config.localConfig
    return {
      fieldTitle: `布丁布丁吃什麼？`,
      fieldFavicon: `https://blog.pulipuli.info/favicon.ico`,
      fieldFindFavicon: '',
      faviconRationCorrect: true,
      presetForm: [
        'https://lh3.googleusercontent.com/-wnyoHaAvRK0/YVk47pyjGOI/AAAAAAAFBpA/yFsr8jfP7XkkLJu-Fu6dMKgQvH72Se2WQCLcBGAsYHQ/s1600/sheet-Alecive-Flatwoken-Apps-Google-Drive-Forms.png',
        'https://lh3.googleusercontent.com/-QzjgpOBowlg/YVk8oRqDgSI/AAAAAAAFBpM/fQwGZB6eztI6yx1MVPBe8GQ36D_VpYrRwCLcBGAsYHQ/s1600/sheet-yellow-Alecive-Flatwoken-Apps-Google-Drive-Forms.png',
        'https://lh3.googleusercontent.com/-E85g18o8SG0/YVk8oWDBNiI/AAAAAAAFBpQ/bmL0gX7ooKIw44s-Lmiz0HhYITCt87pIwCLcBGAsYHQ/s1600/sheet-pink-Alecive-Flatwoken-Apps-Google-Drive-Forms.png',
        'https://lh3.googleusercontent.com/-KggvrRwyGXA/YVk8ocMehyI/AAAAAAAFBpI/beeiCgBqKQQL6RVG-8DCV6-2D-afb6J0ACLcBGAsYHQ/s1600/sheet-blue-Alecive-Flatwoken-Apps-Google-Drive-Forms.png',
        'https://lh3.googleusercontent.com/-xfQx6yrdsuM/YVk8-BAU-xI/AAAAAAAFBpg/W13l0RFbMzcWwICoQRa9nD0RkxuEFBi2QCLcBGAsYHQ/s1600/sheet-Alecive-Flatwoken-Apps-Google-Drive-Forms-red.png'
      ],
      presetSlide: [
        'https://lh3.googleusercontent.com/-f6XuWkPsrEk/Ycq9X8RiDuI/AAAAAAAFEVQ/BYUhx02M45UMVbt3LpwvHUdBP8t-WiVjQCNcBGAsYHQ/s1600/slides-icon-6-yellow.jpg',
        'https://lh3.googleusercontent.com/-1CgE5pWZeAs/Ycq9X7asC4I/AAAAAAAFEVY/lm6ESmREnnkRiFShs79QMbhqXZqXnttqgCNcBGAsYHQ/s1600/slides-icon-6-green.jpg',
        'https://lh3.googleusercontent.com/-85cciDhiyJc/Ycq9XwVnjCI/AAAAAAAFEVU/pwOkigjtkDIAS__aYC7VAw5tfciTLatmgCNcBGAsYHQ/s1600/slides-icon-6-blue.jpg',
        'https://lh3.googleusercontent.com/-2veas9B3Y60/Ycq9X9RBbRI/AAAAAAAFEVc/Ndb2TpBLtGsrY568e1aw8Ev6UDEbg_LmACNcBGAsYHQ/s1600/slides-icon-6-red.jpg',
        'https://lh3.googleusercontent.com/-WqA0AZAmyjk/Ycq9XwpNxCI/AAAAAAAFEVM/xe6bhZ3umTgoNupaHANcCO20VNvjpiZHwCNcBGAsYHQ/s1600/slides-icon-6-gray.jpg'
      ],
      presetDoc: [
        'https://lh3.googleusercontent.com/-3VWx8YodNfU/YcrAMBrI0bI/AAAAAAAFEWA/xw13o-kGx5Mq2eh_XXNZZn85zPmCYcWoACNcBGAsYHQ/s1600/google-drive-docs-blue.png',
        'https://lh3.googleusercontent.com/-VXebmgMD4YI/YcrALAC2yEI/AAAAAAAFEV0/Een_1-Mo_WUJSSH5fEEt6t6f4htKMT_SgCNcBGAsYHQ/s1600/google-drive-docs-green.png',
        'https://lh3.googleusercontent.com/-lY-8xi6YnH4/YcrAK55ofGI/AAAAAAAFEVw/cXDKz5J4foY67YHKgUGwNFy9m_Jwi0rbACNcBGAsYHQ/s1600/google-drive-docs-red.png',
        'https://lh3.googleusercontent.com/-z2_QkX_8BUY/YcrALBw2SnI/AAAAAAAFEV4/ksiiGadc9rQG0bdk8puki8g4fojAlAOMgCNcBGAsYHQ/s1600/google-drive-docs-yellow.png',
        'https://lh3.googleusercontent.com/-b1LLQ-Ac22A/YcrALP6DVcI/AAAAAAAFEV8/trGSFLUwtMcPOygoCFJdeeobpx9PX5DvACNcBGAsYHQ/s1600/google-drive-docs-gray.png'
      ]
    }
  },
//  components: {
//  },
  computed: {
    faviconName () {
      if (this.localConfig.fieldFavicon)
      {
         let u = new URL(this.localConfig.fieldFavicon)
         return u.pathname
      }
      return "";
    },
    linkFavicon () {
      let url = this.localConfig.fieldFavicon.trim()
      let icon = this.fieldFaviconResized
      let filename = this.faviconName
      //console.log(filename)
      if (filename.endsWith('.ico')) {
        // https://blog.pulipuli.info/favicon.ico
        return `<link href="${icon}" rel="icon" type="image/x-icon">`
      }
      else if (filename.endsWith('.png')) {
        // https://lh3.googleusercontent.com/-tkBPlsBsFJg/V0M0b-gPKNI/AAAAAAACw9Y/Y-2BGg4z3H4/Image.jpg?imgmax=800
        return `<link rel="icon" type="image/png" href="${icon}" />`
      }
      else if (url.startsWith('https://blogger.googleusercontent.com/img/a/')) {
        // https://blogger.googleusercontent.com/img/a/AVvXsEhYezHn2JYaLzJ66yXkj2mKIgQal4NLFF-B49GclB-k_lCbX_92POMABLo8W9HouT90uPSTivtDCuhjvFM3FXUSYNpLEJTvo0Hv7ukEnCjGh9JrAM3-cCPwziVu1ihs-pp7PLTanmZToRii2Z4NVggyy_4etvxIkN-6W7WlZL81bBJCmM0910I
        return `<link rel="icon" type="image/png" href="${icon}" />`
      }
      else if (url.startsWith('https://imgur.com/a/')) {
        // https://blogger.googleusercontent.com/img/a/AVvXsEhYezHn2JYaLzJ66yXkj2mKIgQal4NLFF-B49GclB-k_lCbX_92POMABLo8W9HouT90uPSTivtDCuhjvFM3FXUSYNpLEJTvo0Hv7ukEnCjGh9JrAM3-cCPwziVu1ihs-pp7PLTanmZToRii2Z4NVggyy_4etvxIkN-6W7WlZL81bBJCmM0910I
        return `<link rel="icon" type="image/png" href="${url}.png" />`
      }
      else if (filename.endsWith('.jpg')
              || filename.endsWith('.jpeg')) {
        return `<link rel="icon" type="image/jpeg" href="${icon}" />`
      }
      else if (filename.endsWith('.gif')) {
        return `<link rel="icon" type="image/gif" href="${icon}" />`
      }
      return ''
    },
    fieldFaviconResized () {
      let icon = this.localConfig.fieldFavicon.trim()
      
      // https://lh3.googleusercontent.com/-XbSdu-ANc-0/YRIs-lEv0YI/AAAAAAAFBIE/kDgHDim7xNQsBbGCLK-FiK_1m8QifyIrQCLcBGAsYHQ/s256/Picture3.png
      if (icon.startsWith('https://lh3.googleusercontent.com/') 
              && icon.indexOf('/s1600/') > -1) {
        icon = icon.split('/s1600/').join('/s256/')
      }
      // https://blogger.googleusercontent.com/img/a/AVvXsEhWN4vJFmeSfDkLgSyOgxuyqTzfPhwbdvwrRrqH4dtcdpRpWnk9YNxySCsV6t5DOavFtWPk3Gx5pcsI3nEfoBJhsMqaKavBVGZdZ8EcbuJY5GG3kTdEw5bWjE82H3O4Fc6m3p1X-p9p-6JBS6brz5qI654y9l75etUnSnYmMF6yePLyP4VaVw8
      else if (icon.startsWith('https://blogger.googleusercontent.com/img/a/') 
              && !icon.endsWith('=s256')) {
        icon = icon + '=s256'
      }
      
      return icon
    },
    fieldOutput () {
      /*
      return `<head>
  <title>${this.localConfig.fieldTitle}</title>
  ${this.linkFavicon}
  <link rel="manifest" href="https://pulipulichen.github.io/Chrome-Shortcut-Head-Modifier/manifest-for-link.json">
</head>`
      */
      return `<head>
  <title>${this.localConfig.fieldTitle}</title>
  ${this.linkFavicon}
</head>`
    },
    fieldFindFaviconEncoded () {
      return encodeURIComponent(this.fieldFindFavicon.trim())
    },
    linkFindIcon () {
      return `https://findicons.com/search/` + this.fieldFindFaviconEncoded
    },
    linkIconNinja () {
      return `https://www.iconninja.com/tag/` + this.fieldFindFaviconEncoded + '-icon'
    },
    linkFlaticon () {
      // https://www.flaticon.com/search?word=sleep&type=icon&color=color&order_by=4
      return `https://www.flaticon.com/search?word=${this.fieldFindFaviconEncoded}&type=icon&color=color&order_by=4`
    },
    presetList () {
      let list = [
        'presetForm',
        'presetSlide',
        'presetDoc'
      ]

      //console.log(list)

      let first = this.localConfig.lastPreset
      if (list.indexOf(first) > -1) {
        list.sort(function(x,y){ return x == first ? -1 : y == first ? 1 : 0; });
      }

      return list.map((item) => {
        return {
          item,
          links: this[item + 'Sorted']
        }
      })
    },
    presetDocSorted () {
      return this.sortPreset(this.presetDoc, this.localConfig.presetDocLast)
    },
    presetSlideSorted () {
      return this.sortPreset(this.presetSlide, this.localConfig.presetSlideLast)
    },
    presetFormSorted () {
      return this.sortPreset(this.presetForm, this.localConfig.presetFormLast)
    }
  },
  mounted () {
    this.config.inited = true
    $('.tabular.menu .item').tab()
  },
  methods: {
    copyFieldOutput () {
      this.utils.ClipboardUtils.copyPlainString(this.fieldOutput)
    },
    sortPreset (list, first) {
      list = list.join(',').split(',')
      if (list.indexOf(first) > -1) {
        list.sort(function(x,y){ return x == first ? -1 : y == first ? 1 : 0; });
      }
      return list
    },
    setPresetLink (item, link) {
      this.localConfig.lastPreset = item
      this.localConfig[item + 'Last'] = link
      this.localConfig.fieldFavicon = link

      let prefix = this.getCurrentMMDD() + ' '
      let title = this.localConfig.fieldTitle

      if (title.startsWith(prefix)) {
        return true
      }
      if (title[4] !== ' ') {
        this.localConfig.fieldTitle = prefix + title.trim()
      }
      else if (title[4] === ' ' && isNaN(title.slice(0, 4)) === false) {
        title = title.slice(5).trim()
        this.localConfig.fieldTitle = prefix + title.trim()
      }

    },
    getCurrentMMDD() {
      let d = new Date()
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [month, day].join('');
    },
    checkFaviconRatio () {
      let img = this.$refs.faviconPreview
      console.log(img.width, img.height)
      this.faviconRationCorrect = (img.width === img.height)
    }
  }
}

export default Index