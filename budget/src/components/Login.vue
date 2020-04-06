<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-img :src="require('../assets/loginicon.png')" class="my-3" height="200px" />
            <v-card class="elevation-12">
              <v-toolbar color="#AF281A" dark flat>
                <v-toolbar-title>Login Budget System</v-toolbar-title>
                <v-spacer />
              </v-toolbar>

              <div style="padding:16px;">
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="E-mail"
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
                  <v-btn color="#AF281A" dark @keyup.enter="loginUserData()" v-on:click="loginUserData()">Login</v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import admin from "./admin";
import firebase from "firebase";
export default {
  created() {
  },
  data() {
    return {
      username: "",
      password: "",
      depart: "",
      email: "",
      errorshow: ""
    };
  },
  props: {
    source: String
  },
  methods: {
    loginUserData() {
      const vm = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log("Login Success");
          var userId = this.email.replace(/@.*$/, "");
          return firebase
            .database()
            .ref("/users/" + userId)
            .once("value")
            .then(function(snapshot) {
              if (snapshot.val().role == "Admin"){
                vm.$router.push("/admin");
              }
              else{
                vm.$router.push("/home");
              }
            });
        })
        .catch(function(error) {
          vm.errorshow = error.message;

          console.log(vm.errorshow);
        });
    },
  },
  mounted(){
    const vm =this
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        firebase.database().ref('users').once('value')
        .then(snapshot => {
          const data = snapshot.val()
          for(let i in data){
            if(data[i].uid == user.uid){
              if(data[i].role != "Admin"){
                vm.$router.push('/home')
              }
              else{
                vm.$router.push('/admin')
              }
            }
          }
        })
      }
    })
  }
};
</script>

<style>
.errorshowclass {
  font-size: 15px;
  color: red;
}
</style>
