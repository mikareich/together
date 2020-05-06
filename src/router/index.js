import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'
import EventBus from '@/views/event-bus'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      displayName: 'Home',
      displayOnDrawer: true,
      icon: 'dashboard'
    }
  },
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/markedPosts',
    name: 'MarkedPosts',
    component: () => import('../views/MarkedPosts.vue'),
    meta: {
      requiresAuth: true,
      displayName: 'Marked posts',
      displayOnDrawer: true,
      icon: 'bookmark'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: {
      requiresAuth: true,
      displayName: 'Settings',
      displayOnDrawer: true,
      icon: 'settings'
    }
  },
  {
    path: '/account/:id',
    name: 'Account',
    component: () => import('../views/Account.vue'),
    meta: {
      requiresAuth: true,
      displayName: 'Account'
    }
  },
  {
    path: '/posts/:id',
    name: 'Post',
    component: () => import('../views/Post.vue'),
    meta: {
      requiresAuth: true,
      displayName: 'Post'
    }
  },
  {
    path: '/writePost',
    name: 'WritePost',
    component: () => import('../views/WritePost.vue'),
    meta: {
      requiresAuth: true,
      displayName: 'Write Post'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  EventBus.$emit('appName', null)

  if (currentUser && !requiresAuth) next('/')
  else if (!currentUser && requiresAuth) next('/signin')
  else next()
})
export { routes }
export default router
