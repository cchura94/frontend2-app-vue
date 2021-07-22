import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created(){
    try{
      const authUser = JSON.parse(atob(localStorage.getItem("authUser")))

      if(authUser && authUser.token){
          this.$store.commit("actualizaUsuario", authUser.usuario)
      }else{
        this.$store.dispatch("logout")
      }

  }catch(error){
      this.$store.dispatch("logout")
      
  }
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')
