<template>
  <v-app>
    
    <Menu></Menu>

    <v-main>
      <router-view/>
      
    </v-main>

  </v-app>

</template>

<script>
import Menu from "@/components/navegacion/Menu.vue"
export default {
  components: {
    Menu
  }

}
</script>

<style>

</style>