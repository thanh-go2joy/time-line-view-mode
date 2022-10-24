import Vue from 'vue'

import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import ElementUI from 'element-ui'
ElementUI.Select.computed.readonly = function () {
  // trade-off for IE input readonly problem: https://github.com/ElemeFE/element/issues/10403
  // https://github.com/ElemeFE/element/issues/11397
  const isIE = !this.$isServer && !Number.isNaN(Number(document.documentMode))

  return !(this.filterable || this.multiple || !isIE) && !this.visible
}
Vue.use(ElementUI, { locale })
