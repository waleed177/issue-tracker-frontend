import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects/:id',
    name: 'project',
    component: () => import('../views/Project.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/Projects.vue')
  },
  {
    path: '/issues/:id',
    name: 'issue',
    component: () => import('../views/Issue.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
