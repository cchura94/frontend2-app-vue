import Admin from '../views/admin/Admin.vue';
import Categoria from '../views/admin/Categoria.vue';
import Producto from '../views/admin/Producto.vue';

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
    }
  ]