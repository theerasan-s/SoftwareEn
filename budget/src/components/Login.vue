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
                    name="email"
                    id="email"
                    type="text"
                    v-model="email"
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
                <p class="errorshowclass">{{errorshow}}</p>
                <v-btn color="#AF281A" dark
                 v-on:click="loginUserData()">Login</v-btn>
                 <v-btn color="#AF2215" v-on:click="writeUserData(username,depart,email,password,role)">Writedata</v-btn>
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
      password: '',
      depart:'',
      email:'',
      errorshow:'',
      }
      },
    props: {
      source: String,
    },
    methods: {
      loginUserData(){
        const ths = this
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=>{
          console.log("Login Success")
        }).catch(function(error) {
          ths.errorshow = error.message;
          
          console.log(ths.errorshow);
        
  });
        
        
        
      },
      writeUserData(username,depart,email,password,role) {
        firebase.auth().createUserWithEmailAndPassword(email,password).then(() =>{
          firebase.database().ref('users/' + username).set({
          username: username,
          depart: depart,
          uid: firebase.auth().currentUser.uid,
          email: email,
          role: role});
          console.log("Register Success")

        }).catch(function(error) {
          ths.errorshow = error.message;
          
          console.log(ths.errorshow);
        
  });
          
}
    }
  }
</script>

<style>
.errorshowclass{
  font-size: 15px;
  color: red;
}

</style>
