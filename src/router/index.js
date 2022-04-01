import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pedidos from '../views/Requests.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Ebook from '../views/Ebook.vue'
import Guard from '../services/middleware'

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: Guard.auth,
    component: Home
  },
  {
    path: '/pedidos',
    name: 'Requests',
    beforeEnter: Guard.auth,
    component: Pedidos
  },
  {
    path: '/profile',
    name: 'Profile',
    beforeEnter: Guard.auth,
    component: Profile
  },
  {
    path: '/ebook',
    name: 'Ebook',
    beforeEnter: Guard.auth,
    component: Ebook
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
