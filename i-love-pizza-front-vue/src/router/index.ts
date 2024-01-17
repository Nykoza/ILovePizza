import { createRouter, createWebHistory } from 'vue-router'
import AssignmentsVue from '@/views/AssignmentsVue.vue'
import LoginVue from '@/views/LoginVue.vue'
import PizzaOrdersVue from '@/views/PizzaOrdersVue.vue'
import { isAuthenticated } from '@/models/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AssignmentsVue
    },
    {
      path: '/login',
      name: 'login',
      component: LoginVue
    },
    {
      path: '/pizzaorders',
      name: 'pizzaorders',
      component: PizzaOrdersVue
    }
  ]
})

router.beforeEach(async (to, from) => {
  const _isAuthenticated = isAuthenticated()

  if (_isAuthenticated && to.name === 'login') {
    return { name: 'home' }
  }

  if (!_isAuthenticated && to.name !== 'login') {
    return { name: 'login' }
  }
})

export default router
