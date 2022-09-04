import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'

const routes = [
  {
    path: '/',
    name: '',
    meta: { unauth : true },
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { unauth : true },
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: { auth : true },
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: { auth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function (to, _, next) {
  if(to.meta.auth && !store.getters.isAuthenticated) {
    next('/')
  } else if(to.meta.unauth && store.getters.isAuthenticated) {
    next('/home')
  } else {
    next()
  }
});


export default router
