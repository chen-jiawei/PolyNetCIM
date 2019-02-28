import Vue from 'vue'
import VueI18n from 'vue-i18n'
import helper from '../helper'
const locales = ['zh-CN', 'en-US']

Vue.use(VueI18n)

let messages = {}
locales.forEach(v => {
  messages[v] = require(`./${v}/index`).default
})
const i18n = new VueI18n({
  locale: helper.ls.get('locale', 'en-US'),
  silentTranslationWarn: true,
  messages
})

export default i18n
