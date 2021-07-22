<template>
  <div>
    <h1>Nuestros productos</h1>
    <h2>GETTERS: {{ $store.getters.multiplica }}  </h2>
    <h2>GETTERS2: {{ multi }}</h2>
    <h2>{{ $store.state }}</h2>
    <input type="number" v-model="num">
    <v-btn @click="cambiar()">Cambiar Valor</v-btn>
     <v-btn @click="cambiar2()">Cambiar Valor action</v-btn>
  </div>
</template>

<script>
export default {
  data(){
    return {
      num: 10
    }
  },
  computed: {
    multi(){
      return this.$store.getters.multiplica
    }
  },
  methods: {
    cambiar(){
      this.$store.commit('cambiarValor', this.num)
    },
    cambiar2(){
      this.$store.dispatch('cambiarelvalor', this.num)
    }
  }

}
</script>

<style>

</style>