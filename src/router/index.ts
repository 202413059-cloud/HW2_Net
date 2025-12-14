import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import SignIn from '@/pages/SignIn.vue'
import Popular from '@/pages/Popular.vue'
import Search from '@/pages/Search.vue'
import Wishlist from '@/pages/Wishlist.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/signin', component: SignIn },
    { path: '/', component: Home },
    { path: '/popular', component: Popular },
    { path: '/search', component: Search },
    { path: '/wishlist', component: Wishlist },
  ],
})

export default router

