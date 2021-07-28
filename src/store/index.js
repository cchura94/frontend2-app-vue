import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from "./../router/index"
import { urlbase } from "./../config"
Vue.use(Vuex)

axios.defaults.baseURL = urlbase

export default new Vuex.Store({
  state: {
    // data
    valor: 6,
    saludo: "Hola desde Vuex",
    user: null
  },
  mutations: {
    cambiarValor(state, nuevovalor){
      state.valor = nuevovalor
    },
    actualizaUsuario(state, datosU){
      state.user = datosU
      
    },
    borrarUsuario(state){
      localStorage.removeItem("authUser")
      state.user =null
      // location.reload()
    }
  },
  actions: {
    // methods
    cambiarelvalor({commit}, nv){
      commit('cambiarValor', nv)
    },
    async login({commit}, datos){
      const {data} = await axios.post("/auth/login", datos);

      localStorage.setItem("authUser", btoa(JSON.stringify(data)))
      commit('actualizaUsuario', data.usuario)
      router.push("/admin")
    },

    logout({commit}){
      commit('borrarUsuario')
      router.push("/login")
    }


  },
  getters: {
    multiplica: state => {
      return state.valor * 5;
    }
  },
  modules: {
  }
})
