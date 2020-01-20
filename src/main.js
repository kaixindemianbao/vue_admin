import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/common/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import '@/mock' // simulation data
import 'codemirror/lib/codemirror.css'
import 'vue-codemirror'
Vue.use(ElementUI, { locale })
Vue.use('vue-codemirror')
import Axios from 'axios'
import Qs from 'qs'
Vue.use(ElementUI)
Vue.prototype.$axios = Axios
Vue.config.productionTip = false
Vue.prototype.qs = Qs
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
