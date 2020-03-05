<template>
  <v-app >
     
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
      
       
    
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
 <v-img :src="require('../assets/loginicon.png')" class="my-3" height="200px" />
            <v-card class="elevation-12">
              
              <v-toolbar
                color="#AF281A"
                dark
                flat
                
              >
                <v-toolbar-title>Login Budget System</v-toolbar-title>
                <v-spacer />
               
              </v-toolbar>
              
              <div style="padding:16px;"><v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    id="username"
                    type="text"
                    v-model="username"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"

                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="#AF281A" dark
                flat v-on:click="submit">Login</v-btn>
              </v-card-actions></div>
              
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase"
  export default {
    data () {
    return {
      username: '',
      password: '',}
      },
    props: {
      source: String,
    },
    methods: {
      submit(){
        console.log("ID = "+ this.username);
        console.log("Password = " + this.password)
        
      }
    }
  }
</script>

<style>


</style>
