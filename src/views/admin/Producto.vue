<template>
  <div>
    <h1>Lista</h1>
    
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
      <v-toolbar
        flat
      >
        <v-toolbar-title>PRODUCTOS</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

         <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nuevo Producto
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ form_titulo }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="item_producto.nombre"
                      label="Ingrese Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="item_producto.precio"
                      label="Precio"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="item_producto.stock"
                      label="Cantidad"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >

                    <v-textarea
                      v-model="item_producto.descripcion"
                      label="Descripción"
                    ></v-textarea>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <input type="file" ref="img" @change="imagenSeleccionada">
                  
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="guardarProducto()"
              >
                Guardar Producto
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">¿Está seguro de eliminar este Producto?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">SI</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>

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
    <code>
      <pre>
        {{$refs}}
      </pre>
    </code>

  </div>
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
      dialog: false,
      dialogDelete: false,
      titulo_form: 'Nuevo Producto',
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
      editedIndex: -1,
      id_eliminar: 0
    }
  },
  computed: {
      form_titulo () {
        return this.editedIndex === -1 ? 'Nuevo Producto' : 'Editar Producto'
      },
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
    imagenSeleccionada(event){
      //console.log(event.target.files[0])
      this.item_producto.imagen = event.target.files[0]
    },
    async guardarProducto(){

      let formdata = new FormData();
      formdata.append("nombre", this.item_producto.nombre)
      formdata.append("precio", this.item_producto.precio)
      formdata.append("stock", this.item_producto.stock)
      formdata.append("descripcion", this.item_producto.descripcion)
      formdata.append("categoria_id", this.item_producto.categoria_id)
      formdata.append("imagen", this.item_producto.imagen, this.item_producto.imagen.name)


       if (this.editedIndex > -1) {
          //Object.assign(this.lista_productos[this.editedIndex], this.item_producto)
    const {data} = await prodService.modificar(this.item_producto.id, formdata)
        console.log(data)
        } else {
          
      
      const {data} = await prodService.store(formdata)
      
      this.lista_productos.push(data.data)
        }
        this.close()

    },
    close(){
      this.dialog = false
      this.$nextTick(() => {
          this.item_producto = Object.assign({}, this.default_item_producto)
          this.editedIndex = -1
          this.$refs.img.value = null
        })
    },
    editItem (item) {
        this.editedIndex = this.lista_productos.indexOf(item)
        this.item_producto = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.id_eliminar = item.id
        this.editedIndex = this.lista_productos.indexOf(item)
        this.item_producto = Object.assign({}, item)
        this.dialogDelete = true

      },
    async deleteItemConfirm () {
        const {data} = prodService.destroy(this.id_eliminar)
        console.log(data)
        this.lista_productos.splice(this.editedIndex, 1)
        this.id_eliminar = 0
        this.closeDelete()
      },
    closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.item_producto = Object.assign({}, this.default_item_producto)
          this.editedIndex = -1
        })
      },
  },
  updated(){
    console.log("UPDATE: ", this.$refs)
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
  

}
</script>

<style>

</style>