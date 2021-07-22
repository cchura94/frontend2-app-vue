<template>
    <div>
        <v-app-bar color="deep-purple accent-4" dark>
            
            <v-toolbar-title>Empresa</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon to="/">
                <v-icon>mdi-home</v-icon>
            </v-btn>

             <v-btn icon to="/productos">
                <v-icon>mdi-post</v-icon>
            </v-btn>

            <v-btn icon to="/login" v-if="$store.state.user == null">
                <v-icon>mdi-account</v-icon>
            </v-btn>

            <v-btn icon to="/admin" v-if="$store.state.user != null">
                <v-icon>mdi-account</v-icon>
            </v-btn>
            
        </v-app-bar>

    </div>
</template>

<script>

export default {
    data(){
        return {
            auth: false
        }
    },
    methods: {
        //estaAuthenticado
    }
}
</script>

<style>

</style>