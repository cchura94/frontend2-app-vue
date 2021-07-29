<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  mounted(){
    setInterval(function(){
        console.log("Verificando...")
        // obtener el token
        // obtener el tiempo de expiracion
        // refresh el token

    },60000);
  }
};
</script>
