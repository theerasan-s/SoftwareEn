<template>
  <v-app>
    <navbar></navbar>
    <v-content>
      <v-container>
        <v-row align="start" justify="center">
          <v-col cols="12" sm="2" md="2">
            <v-btn color="#AF2215" v-on:click="movetoregister()">Add user</v-btn>
            
          </v-col>
        </v-row>
        <v-row align="start" justify="center">
          <v-col cols="12" sm="8" md="12">
            <p>ชื่อผู้ใช้ทั้งหมด</p>
            <v-card class="elevation-12">
               <v-simple-table fixed-header height="300px" la>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">ชื่อผู้ใช้</th>
                <th class="text-center">สิทธิผู้ใช้</th>
                <th class="text-center">ดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in listusername" :key="item.name">
                <td class="text-center">{{ item.name }}</td>
                <!-- Show miniproject's name -->
                <td class="text-center">แก้ไข</td>
                <td class="text-center">ลบ</td>
                <!-- show miniproject's budget -->

              </tr>
            </tbody>
          </template>
        </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import navbar from "./navbar"
import firebase from "firebase";
export default {
  components: {navbar},
  created() {
    //this.checklogin();
  },
  data() {
    return {
      username: "",
      role: "",
      listusername: []
    };
  },
  props: {
    source: String
  },
  methods: {
    /*checklogin() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          window.location.href = "/admin";
        }
      });
    },*/
    getalluser(){
      var ref = firebase.database().ref("users").once("value")
      var user = ref.val()
      for (i in user){
        this.listusername.push(i.username)
      }
      console.log(listusername)
    },
    movetoregister() {
      window.location.href = "/register";
    }
  }
};
</script>

<style>
.errorshowclass {
  font-size: 15px;
  color: red;
}
</style>
