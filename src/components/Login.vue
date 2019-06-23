<template>    
<div style='{ background-image: url("/src/assets/background_logo.jpg"), }'>

 <div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
              <v-card-text>
                <v-form @keyup.enter="iniciarSesion">
                  <v-text-field required="" v-model="user.username" prepend-icon="person" name="login" label="Username" type="text"></v-text-field>
                  <v-text-field required="" v-model="user.password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" success @click.native='iniciarSesion'>Iniciar Sesion</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</div>
</template>

<script>
import router from '../router'
  export default {
    data: () => ({
        user:{
            username:null,
            password:null
        }

    }),
    methods:{
 iniciarSesion(){
        console.log("entro");
        if(this.user.username === "marc" && this.user.password==="12345"){
           console.log("logueado");
           this.$router.push({name:'Home'})
        }
    }

    }


   


  }
</script>
