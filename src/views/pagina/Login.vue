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
                </v-card-text>
                 <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary"  @click="ingresar()">Ingresar</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
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