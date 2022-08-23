import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index
  },
  // {
  //   path: '/tool',
  //   name: 'tool',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "tool" */ '../views/tool')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
