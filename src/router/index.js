import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PlantillaPagina from '../views/layouts/PlantillaPagina.vue'
import Inicio from '../views/pagina/Inicio.vue';
import Productos from '../views/pagina/Productos.vue';
import Login from '../views/pagina/Login.vue';

import { routerAdmin } from './router-admin';
import { authGuard } from '../guards/authGuard';
import { estaAuthenticado } from "../config/index"

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
        component: Inicio,
        meta: {requireAuth: true}
      },
      {
        path: 'productos',
        name: 'Productos',
        component: Productos
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: {
          redirectAuth: true
        }
      }
    ]
  },
  {
    path: '/admin',
    // name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {requireAuth: true},
    component: () => import(/* webpackChunkName: "admin" */ '../views/layouts/PlantillaAdmin.vue'),
    beforeEnter: authGuard,
    children: routerAdmin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  console.log(to.meta)
  /*if(to.meta.redirectAuth){
    next({name: 'Admin'})
  }*/
  if(to.meta.requireAuth){

    try{
      let auth = await estaAuthenticado();
      console.log("AUTH: ", auth);
      const authUser = JSON.parse(atob(localStorage.getItem("authUser")))
      if(authUser && authUser.token && auth){
        
          next()
      }else{
          next({name: 'Login'})
      }

  }catch(error){

      localStorage.clear()
      next({name: 'Login'})
  }

  }

  next();
})

export default router
