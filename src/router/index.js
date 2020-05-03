import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      displayName: 'Home'
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
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: {
      requiresAuth: true,
      displayName: 'Settings'
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
    path: '/markedPosts',
    name: 'MarkedPosts',
    component: () => import('../views/MarkedPosts.vue'),
    meta: {
      requiresAuth: true,
      displayName: 'Marked posts'
    }
  },
  {
    path: '/writePost',
    name: 'WritePost',
    component: () => import('../views/Settings.vue'),
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

  if (currentUser && !requiresAuth) next('/')
  else if (!currentUser && requiresAuth) next('/signin')
  else next()
})

export default router
