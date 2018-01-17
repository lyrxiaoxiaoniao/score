// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import common from './wxcommon/common'
import api from './api'
import config from './config'
import * as filters from './filters'

// 全局公共方法
Vue.prototype.common = common
Vue.prototype.$api = api
Vue.prototype.$config = config

// 导入过滤函数 
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 导入MintUI
Vue.use(MintUI)

// 路由导入
Vue.use(VueRouter)
const router = new VueRouter({
  // mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  next()
}) 

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
