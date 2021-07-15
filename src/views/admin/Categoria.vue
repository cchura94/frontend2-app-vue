<template>
  <div>
     <h1>Categoria</h1>

  <form >
    <label for="">Nombre:</label>
    <input type="text" v-model="categoria.nombre">
    <br>
    <label for="">Detalle:</label>
    <input type="text" v-model="categoria.detalle">
    <br>

    <button type="button" @click="guardarCategoria()">Guardar Categoria</button>
  </form>

  <v-data-table
    :headers="headers"
    :items="lista_categorias"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
  
  <table border=1>
    <thead>
      <tr>
        <td>ID</td>
        <td>NOMBRE</td>
        <td>DETALLE</td>
        <td>ACCIONES</td>
      </tr>      
    </thead>
    <tbody>
      <tr v-for="cat in lista_categorias" :key="cat.id">
        <td>{{ cat.id }}</td>
        <td>{{ cat.nombre }}</td>
        <td>{{ cat.detalle }}</td>
        <td>
          
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import * as catService from "./../../services/categoriaService";
export default {
  data(){
    return {
      lista_categorias: [],
      categoria: {
        nombre: "",
        detalle: ""
      },
      headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: true,
            value: 'id',
          },
          { text: 'Nombre', value: 'nombre' },
          { text: 'Detalle', value: 'detalle' },
          { text: 'Acciones', value: 'acciones' },
        ],
    }
  },
  async mounted(){
    let {data} = await catService.index();
    this.lista_categorias = data.data
    console.log(data)
  },
  methods: {
    async guardarCategoria(){
      await catService.store(this.categoria);
      this.lista_categorias.push(this.categoria)
    }
  }

}
</script>

<style>

</style>