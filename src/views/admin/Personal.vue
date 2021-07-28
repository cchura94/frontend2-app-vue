<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Nuevo Personal
        </v-btn>
      </template>
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <span class="text-h5">Datos Personales</span>

                  <v-row>
                    <v-col cols="12" sm="6" md="5">
                      <v-text-field
                        label="Nombre Completo *"
                        required
                        :rules="nombreRules"
                        v-model="personal.nombres"
                        :error-messages="errores.nombres"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="7">
                      <v-text-field
                        label="Apellidos"
                        hint="Ingrese Apellidos"
                        :rules="nombreRules"
                        v-model="personal.apellidos"
                        :error-messages="errores.apellidos"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Ci / Nit"
                        hint="Ingrese ci o nit"
                        v-model="personal.ci_nit"
                        @keyup="limpiarerror()"
                        :error-messages="errores.ci_nit"
                      ></v-text-field>
                      <!--v-text-field
                      label="Ci / Nit"
                      hint="Ingrese ci o nit"
                      v-model="personal.ci_nit"
                      :error-messages="errores.ci_nit"
                      @keyup="consultarCI()"
                    ></v-text-field-->
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Telefono"
                        hint="Ingrese telefono"
                        v-model="personal.telefono"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <span class="text-h5">Datos Usuario</span>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Email*"
                        required
                        :rules="emailRules"
                        v-model="personal.email"
                        :error-messages="errores.email"
                        @keyup="limpiarerror()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Password*"
                        type="password"
                        :rules="(editedIndex != -1)?[]:passwordRules"
                        v-model="personal.password"
                        :error-messages="errores.password"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <span class="text-h5">Datos del Personal</span>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Codigo del Item"
                    hint="Item"
                    v-model="personal.item"
                    :error-messages="errores.item"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>* indica campos obligatorios</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="guardarPersonal"
              :disabled="!valid"
            >
              Guardar Personal
            </v-btn>
          </v-card-actions>
        </v-form>
        {{ valid }}
      </v-card>
    </v-dialog>

    <v-data-table
    dense
    :headers="headers"
    :items="lista_personal"
    item-key="name"
    class="elevation-1"
  >
  
  <template v-slot:[`item.acciones`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>

  </v-data-table>

    <v-alert type="success" v-if="alerta"> Guardando </v-alert>
  </div>
</template>

<script>
import * as personalService from "./../../services/personalService";

export default {
  data() {
    return {
      dialog: false,
      lista_personal: [],
      // validacion
      valid: false,
      nombres: "",
      nombreRules: [
        (v) => !!v || "El nombre y Apellido es obligatorio",
        (v) =>
          (v && v.length <= 30) ||
          "El nombre o apellido debe ser menos de 30 caracteres",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "Correo Obligatorio",
        (v) => /.+@.+\..+/.test(v) || "El correo no es valido",
      ],
      passwordRules: [(v) => !!v || "Contraseña Obligatorio"],
      personal: {
        nombres: "",
        apellidos: "",
        ci_nit: "",
        telefono: "",
        email: "",
        password: "",
        item: "",
      },
      alerta: false,
      errores: {},
      headers: [
        {
          text: 'CI',
          align: 'start',
          value: 'persona.ci_nit',
        },
        {
          text: 'Nombres',
          value: 'persona.nombres',
        },
        { text: 'Apellidos', value: 'persona.apellidos' },
        { text: 'Correo', value: 'user.email' },
        { text: 'Item', value: 'item' },
        { text: 'ACCIONES', value: 'acciones', sortable: "false"}
      ],
      editedIndex: -1
    };
  },
  mounted() {
    this.inicializarDatos();
  },
  methods: {
    async inicializarDatos() {
      const { data } = await personalService.index();
      console.log(data);
      this.lista_personal = data;
    },
    /*validate () {
        console.log(this.$refs.form.validate())
        this.$refs.form.validate()
      },*/
    async guardarPersonal() {
      if (this.$refs.form.validate()) {
        try {
          await personalService.store(this.personal);

          this.alerta = true;
          this.dialog = false;
          this.$refs.form.reset;
        } catch (error) {
          this.errores = error.response.data.errors;
          console.log(error.response.data.errors);
        }
      }
    },
    limpiarerror() {
      this.errores = {};
    },
    async consultarCI() {
      try {
        let res = await personalService.store(this.personal);
        console.log(res);
        this.alerta = true;
      } catch (error) {
        this.errores = error.response.data.errors;
        console.log(error.response.data.errors);
      }
    },
    editItem (item) {
        let item2 = {          
          nombres: item.persona.nombres,
          apellidos: item.persona.apellidos,
          ci_nit: item.persona.ci_nit,
          telefono: item.persona.telefono,
          email: item.user.email,
          item: item.item,
        }
        this.editedIndex = this.lista_personal.indexOf(item)
        this.personal = Object.assign({}, item2)
        this.dialog = true
      },
  },
};
</script>

<style>
</style>