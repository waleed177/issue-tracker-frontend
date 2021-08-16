//#define PREAMBLE
//   This is the client-side of the issue-tracker software.
//   Copyright (C) 2021 waleed177 <potatoxel@gmail.com>
//
//   This program is free software: you can redistribute it and/or modify
//   it under the terms of the GNU Affero General Public License as
//   published by the Free Software Foundation, version 3 of the
//   License only.
//
//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU Affero General Public License for more details.
//
//   You should have received a copy of the GNU Affero General Public License
//   along with this program.  If not, see <https://www.gnu.org/licenses/>.
//#endregion

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
  {
    path: '/legal',
    name: 'legal',
    component: () => import('../views/Legal.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
