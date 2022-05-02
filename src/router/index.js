import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home'
import CarCrud from '../pages/CarCrud'
import SeriesCrud from '../pages/SeriesCrud'

Vue.use(VueRouter)

const routes = [
  { path: '/',       name: 'Home',       component: Home       },
  { path: '/cars',   name: 'CarCrud',    component: CarCrud    },
  { path: '/series', name: 'SeriesCrud', component: SeriesCrud }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
