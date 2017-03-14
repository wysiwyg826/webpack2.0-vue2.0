/**
 * 路由配置
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import index from '../views/index.vue'
import demo from '../views/demo.vue'

let routes = [
  {
    path: '/',
    component: demo,
    meta: { requiresAuth: true }//需要验证是否登录 或者 权限是否满足
  }, {
    path: '/demo',
    component: demo
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!loggedIn()) {
      console.log("to", to)
      next({
        path: '/demo',
        // query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

function loggedIn() {
  console.log("check login")
  return false
}

export default router