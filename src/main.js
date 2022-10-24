import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import './mixins'
import './modules'
import { i18n } from './plugins'
import './assets/styles/main.scss'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
