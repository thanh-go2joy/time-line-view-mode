import Vue from 'vue'
import VueI18n from 'vue-i18n'
import vnMessage from './vn-file'
import enMessage from './en-file'
Vue.use(VueI18n)
const messages = {
  vi: vnMessage,
  en: enMessage
}
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'vi', // set locale
  fallbackLocale: 'vi', // set fallback locale
  messages // set locale messages
})

export default i18n
