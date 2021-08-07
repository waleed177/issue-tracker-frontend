import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: import('../views/Projects.vue')
  },
  {
    path: '/projects/:id',
    name: 'project',
    component: () => import('../views/Project.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/issues/:id',
    name: 'issue',
    component: () => import('../views/Issue.vue')
  },
  {
    path: '/new_issue/:id',
    name: 'new_issue',
    component: () => import('../views/NewIssue.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
