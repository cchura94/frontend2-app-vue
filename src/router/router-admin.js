import Admin from '../views/admin/Admin.vue';
import Categoria from '../views/admin/Categoria.vue';
import Producto from '../views/admin/Producto.vue';
import Personal from '../views/admin/Personal.vue';
import Persona from '../views/admin/Persona.vue';
import User from '../views/admin/User.vue';

export const routerAdmin = [
    {
      path: '',
      name: 'Admin',
      component: Admin
    },
    {
      path: 'categoria',
      name: 'Categoria',
      component: Categoria,
      meta: {requireAuth: true},
    },
    {
      path: 'producto',
      name: 'Producto',
      component: Producto
    },
    {
      path: 'personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: 'persona',
      name: 'Persona',
      component: Persona
    },
    {
      path: 'usuario',
      name: 'Usuario',
      component: User
    }
  ]