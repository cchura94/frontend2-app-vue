<template>
 
<div>
  <div id="nav">
    <router-link to="/admin">Administrador Principal</router-link> |
    <router-link to="/admin/categoria">Categoria</router-link> |
    <router-link to="/admin/producto">Producto</router-link>
  </div>

   <router-view/>
 
</div>

</template>

<script>
export default {

}
</script>

<style>

</style>