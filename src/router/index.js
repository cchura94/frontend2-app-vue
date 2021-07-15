import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PlantillaPagina from '../views/layouts/PlantillaPagina.vue'
import Inicio from '../views/pagina/Inicio.vue';
import Productos from '../views/pagina/Productos.vue';
import Login from '../views/pagina/Login.vue';

import { routerAdmin } from './router-admin';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    //name: 'Home',
    component: PlantillaPagina,
    children: [
      {
        path: '',
        name: 'Inicio',
        component: Inicio
      },
      {
        path: 'productos',
        name: 'Productos',
        component: Productos
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      }
    ]
  },
  {
    path: '/admin',
    // name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admin" */ '../views/layouts/PlantillaAdmin.vue'),
    children: routerAdmin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
