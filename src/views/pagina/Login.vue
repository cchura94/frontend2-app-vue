<template>

     <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                   <v-toolbar-title>Ingresar</v-toolbar-title>
                </v-toolbar>

                <v-card-text>
                   <v-form>
                    <v-text-field
                      label="Ingrese su correo"
                      name="login"
                      prepend-icon="mdi-account"
                      type="email"
                      v-model="usuario.email"
                    ></v-text-field>
  
                    <v-text-field
                      id="password"
                      label="Ingrese su Contraseña"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="usuario.password"
                    ></v-text-field>
                  </v-form>
                  {{ $store.state }}
                </v-card-text>
                 <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary"  @click="ingresar()">Ingresar</v-btn>
                  <v-btn color="primary"  @click="ingresar2()">Ingresar Vuex</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            absolute
            top
            color="red lighten-1"
            elevation="24"
          >
            {{ text }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="light"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Cerrar
              </v-btn>
            </template>
          </v-snackbar>

     </v-container>



</template>

<script>
import * as authService from "./../../services/authService"

export default {
  data(){
    return {
      usuario: {
        email: "",
        password: ""
      },
      snackbar: false,
      timeout: 3000,
      text: "Credenciales Incorrectas"
    }
  },
  methods: {
    async ingresar(){
      try{
        let {data} = await authService.login(this.usuario)

        if(data){
          // almacenar el localStorage
          localStorage.setItem("authUser", btoa(JSON.stringify(data)))
          this.$router.push("admin")
        }

      }catch(error){
        console.log("Error al Autenticar")
        this.snackbar = true
      }
    },
    ingresar2(){
      this.$store.dispatch('login', this.usuario)
      // this.$router.push("admin")
    }
  }

}
</script>

<style>

</style>