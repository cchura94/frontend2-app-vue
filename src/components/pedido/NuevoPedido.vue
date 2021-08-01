<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="8">

          <v-card-text>
            <v-data-table
              :headers="columnas"
              :items="lista_productos"
              :page="page"
              :options.sync="opciones"
              :loading="cargando"
              :server-items-length="total_productos"
              sort-by="id"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title> LISTA PRODUCTOS</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>

                </v-toolbar>
              </template>

              <template v-slot:[`item.acciones`]="{ item }">
                <img
                  width="100px"
                  :src="`http://localhost/backlaravelapp/public/${item.imagen}`"
                  alt=""
                />
                <v-icon small class="mr-2" @click="addCarrito(item)">
                  mdi-pencil
                </v-icon>
                </template>
            </v-data-table>
          </v-card-text>

      </v-col>

      <v-col cols="4">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title v-text="'Carrito'"></v-card-title>

              <v-card-text>
                <table border="1">
                  <tr>
                    <td>PROD</td>
                    <td>PRECIO</td>
                    <td>S. TOTAL</td>
                    <td>ACCION</td>
                  </tr>
                  <tr v-for="(c, index) in carrito" :key="index">
                    <td>{{ c.nombre }}</td>
                    <td>{{ c.precio }}</td>
                    <td>{{ c.precio * 1 }}</td>
                    <td>
                      <v-btn>x</v-btn>
                    </td>
                  </tr>
                </table>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>


                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title v-text="'Cliente'"></v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as prodService from "./../../services/productoService"
export default {
  data(){
    return {
      columnas: [
        { text: 'ID', value: 'id' },
        { text: 'NOMBRE', value: 'nombre' },
        { text: 'PRECIO', value: 'precio' },
        { text: 'CANTIDAD', value: 'stock' },
        { text: 'CATEGORIA', value: 'categoria_id' },
        { text: 'ACCIONES', value: 'acciones', sortable: false },
      ],
      lista_productos: [],
      opciones: {
        itemsPerPage: 5
      },
      cargando: true,
      page: 1,
      total_productos: 0,
      item_producto: {
        nombre: '',
        precio: 0,
        stock: 0,
        descripcion: '',
        categoria_id: 1,
        imagen: '',
      },
      default_item_producto: {
        nombre: '',
        precio: 0,
        stock: 0,
        descripcion: '',
        categoria_id: 1,
        imagen: '',
      },
      carrito: []
    }
  },
  mounted(){
    this.inicializarDatos()
  },
  methods: {
    async inicializarDatos(){
      this.cargando = true;
      const { page, itemsPerPage } = this.opciones
      let nro_pagina = page
      const {data} = await prodService.index(nro_pagina, itemsPerPage)
      this.lista_productos = data.data 
      
      this.total_productos = data.total
      this.cargando = false
      
    },
    addCarrito(item){
      this.carrito.push(item);
    }
  },
  watch: {
    opciones: {
      handler(){
        this.inicializarDatos();
      }
    },
    dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
  }
};
</script>

<style>
</style>