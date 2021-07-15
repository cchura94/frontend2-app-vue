<template>
  <div>

    <h1>Login</h1>
  <p>{{ usuario }}</p>
  <form action="">
      <label for="">Ingrese Correo: </label>
      <input type="email" required v-model="usuario.email">
      <br>
      <label for="">Ingrese Contraseña: </label>
      <input type="password" required v-model="usuario.password">
    <br>
      <button type="button" @click="ingresar()">Ingresar</button>
  </form>
  
  </div>

</template>

<script>
import * as authService from "./../../services/authService"

export default {
  data(){
    return {
      usuario: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    async ingresar(){
      try{
        let {data} = await authService.login(this.usuario)
        console.log(data);
      }catch(error){
        console.log("Error al Autenticar")
      }
    }
  }

}
</script>

<style>

</style>