import Vue from 'vue'

import VueResource from 'vue-resource'


Vue.use(VueResource)




//公共css
require('./assets/public/common/common.scss')

//路由

import router from './config/_router'
import store from './config/_store'



const app = new Vue({
  router,
  store
}).$mount('#app')
