import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'message',
    component: () => import('../views/message.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about.vue')
  },

  {
    path: '/friendLink',
    name: 'friendLink',
    component: () => import('../views/friendLink.vue')
  },
  {
    path: '/modify',
    name: 'modify',
    component: () => import('../views/modify.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

// router.beforeEach(async (to, from) => {
// if (to.path === from.path) {
//   location.reload()
//   next()
// }
// if (
//   // 检查用户是否已登录
//   !isAuthenticated &&
//   //  避免无限重定向
//   to.name !== 'Login'
// ) {
//   // 将用户重定向到登录页面
//   return { name: 'Login' }
// }
// })

export default router
