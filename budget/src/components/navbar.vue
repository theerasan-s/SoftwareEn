<template>
  <div>
    <v-app-bar color="#AF281A" dense dark>
      <v-toolbar-title style="margin-top: 0px" class="navbar">ระบบติดตามการใช้จ่ายตามแผนงบประมาณ</v-toolbar-title>
      <v-spacer></v-spacer>
      <a style="color:white" class="mr-5 navbar">หน้าหลัก</a>
        <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <a v-on="on" style="color:white" class="mr-3 navbar">รายละเอียดโครงการ</a>
          </template>
          <v-list>
            <v-list-item v-for="(item,index) in departmentselect" :key="index" :inactive="inactive">
              <v-list-item-content>
                <v-list-item-title v-on:click="selectdepart(index)"><a style="color:black;">{{ item }}</a></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <a style="color:white" class="mr-5 navbar" v-on:click="logoutuser()">ออกจากระบบ</a>
    </v-app-bar>
  </div>
</template>

<style>
  .navbar{
    font-family: "Prompt", sans-serif;
  }
</style>

<script>
import firebase from "firebase"
import { messaging } from 'firebase';
export default {
  bett: "",
  name: "",
  message: "",
  data: () => ({
    departmentselect: [ /* All Department variable */
      "วิศวกรรมโยธา",
      "วิศวกรรมไฟฟ้า",
      "วิศวกรรมการเกษตร",
      "วิศวกรรมอุตสาหการ",
      "วิศวกรรมเครื่องกล",
      "วิศวกรรมสิ่งแวดล้อม",
      "วิศวกรรมคอมพิวเตอร์"
    ],
    inactive:false
     
  }),
  methods:{
    logoutuser(){
     const bett = firebase.auth().currentUser
      console.log(bett);
      firebase.auth().signOut().then(function() {
        window.location.href = "/login"
        }).catch(function(error) {
  // An error happened.
  });
  }
  }

};
</script>