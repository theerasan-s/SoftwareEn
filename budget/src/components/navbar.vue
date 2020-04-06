<template>
  <div>
    <v-app-bar color="#AF281A" dense dark>
      <v-toolbar-title style="margin-top: 0px" class="navbar">ระบบติดตามการใช้จ่ายตามแผนงบประมาณ</v-toolbar-title>
      <v-spacer></v-spacer>
      <a style="color:white" class="mr-5 navbar" v-on:click="movetohome()">หน้าหลัก</a>
        <div class="text-center">
            <a  style="color:white" class="mr-3 navbar" @click="moveBudgetInfo">รายละเอียดโครงการ</a>
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
  created(){
    //this.checklogin() ถ้าทำเสร็จแล้ว ฝากเปิดให้มันใช้งานด้วย
  },
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
    moveBudgetInfo(){
      this.$router.push('/budgetInfo')
    },
    movetohome(){
      this.$router.push("/home")
  },
    logoutuser(){
     const bett = firebase.auth().currentUser
      console.log(bett);
      firebase.auth().signOut().then(function() {
         this.$router.push("/")
        }).catch(function(error) {

        })
      },
    },
    created(){
      firebase.auth().onAuthStateChanged(user => {
        if(!user){
          this.$router.push('/')
        }
      })
    } 
}
</script>