import { createRouter, createWebHistory } from 'vue-router'
import AssignmentsVue from '@/views/AssignmentsVue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AssignmentsVue
    }
  ]
})

export default router
