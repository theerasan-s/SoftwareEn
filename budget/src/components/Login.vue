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
                <v-toolbar-title>Login Budjet System</v-toolbar-title>
                <v-spacer />
               
              </v-toolbar>
              
              <div style="padding:16px;"><v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                   
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="#AF281A" dark
                flat>Login</v-btn>
              </v-card-actions></div>
              
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
  }
</script>

<style>


</style>