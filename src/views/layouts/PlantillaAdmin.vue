<template>
 
<div>

   <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawerRight"
        app
        clipped
        left
      >

       <v-list>
      <div v-for="(menu, index) in menus" :key="index">

      <v-list-item v-if="!menu.submenu" :to="menu.url">
        <v-list-item-icon>
          <v-icon>{{ menu.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-title>{{ menu.nombre }}</v-list-item-title>
      </v-list-item>

      <v-list-group
        :prepend-icon="menu.icon"
        value="true" v-if="menu.submenu"
      >

      <template v-slot:activator>
          <v-list-item-title>{{ menu.nombre }}</v-list-item-title>
        </template>

      <v-list-item v-for="(menu2, index) in menu.submenu" :key="index"  :to="menu2.url">
        <v-list-item-icon>
          <v-icon>{{ menu2.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-title>{{ menu2.nombre }}</v-list-item-title>
      </v-list-item>
      

      </v-list-group>
      </div>
    </v-list>

      </v-navigation-drawer>

      <v-app-bar
        app
        clipped-left
        color="blue-grey"
        dark
      >
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
        <v-toolbar-title>ADMIN</v-toolbar-title>
        <v-spacer></v-spacer>
        
      </v-app-bar>

       <v-main>

        <router-view/>
       </v-main>

   </v-app>



  <div id="nav">
    <router-link to="/admin">Administrador Principal</router-link> |
    <router-link to="/admin/categoria">Categoria</router-link> |
    <router-link to="/admin/producto">Producto</router-link>
  </div>

 
</div>

</template>

<script>
export default {
  data(){
    return {
      drawerRight: null,
      menus: [
        {
          nombre: 'ADMIN',
          icon: 'mdi-home',
          url: '/admin'
        },
        {
          nombre: 'PRODUCTOS',
          icon: 'mdi-post',
          submenu: [
            {
              nombre: 'Lista Productos',
              icon: 'mdi-product',
              url: '/admin/producto'
            },
            {
              nombre: 'Nuevo Producto',
              icon: 'mdi-product',
              url: '/admin/producto/nuevo'
            }
          ]
        },
         {
          nombre: 'CATEGORIA',
          icon: 'mdi-widgets',
          url: '/admin/categoria'
        },
      ]
    }
  }

}
</script>

<style>

</style>