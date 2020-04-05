<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-img :src="require('../assets/loginicon.png')" class="my-3" height="200px" />
            <v-card class="elevation-12">
              <v-toolbar color="#AF281A" dark flat>
                <v-toolbar-title>Edit Budget System</v-toolbar-title>
                <v-spacer />
              </v-toolbar>

              <div style="padding:16px;">
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="ชื่อ"
                      name="firstname"
                      id="firstname"
                      type="text"
                      v-model="firstname"
                    />
                    <v-text-field
                      label="นามสกุล"
                      name="lastname"
                      id="lastname"
                      type="text"
                      v-model="lastname"
                    />

                    <v-radio-group label="สาขาวิชา" v-model="depart">
                      <v-radio label="วิศวกรรมโยธา" value="ce"></v-radio>
                      <v-radio label="วิศวกรรมไฟฟ้า" value="ee"></v-radio>
                      <v-radio label="วิศวกรรมการเกษตร" value="ae"></v-radio>
                      <v-radio label="วิศวกรรมอุตสาหการ" value="ie"></v-radio>
                      <v-radio label="วิศวกรรมเครื่องกล" value="me"></v-radio>
                      <v-radio label="วิศวกรรมสิ่งแวดล้อม" value="envi"></v-radio>
                      <v-radio label="วิศวกรรมเคมี" value="chem"></v-radio>
                      <v-radio label="วิศวกรรมคอมพิวเตอร์" value="coe"></v-radio>
                    </v-radio-group>
                    <v-radio-group label="หน้าที่" v-model="role">
                      <v-radio label="ผู้บริหาร" value="Manager"></v-radio>
                      <v-radio label="ผู้ดูแล" value="Keeper"></v-radio>
                    </v-radio-group>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <p class="errorshowclass">{{username}}</p>
                  <v-btn
                    color="#AF2215"
                    v-on:click="editUserData(firstname,lastname,depart,role)"
                  >Update</v-btn>
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
import { mapGetters } from 'vuex'
import admin from "./admin"
import firebase from "firebase";
export default {
    created(){
        this.getdetailuser()
    },
  data() {
    return {
      firstname: "",
      lastname: "",
      role: "",
      depart: "",
      errorshow: ""
    };
  },
  computed: {
    ...mapGetters({
      username: 'getUserdataname',
    })
  },
  methods: {
    getdetailuser() {
      const ths = this;
      console.log(this.username)
      firebase
        .database()
        .ref("users/" + this.username)
        .once("value")
        .then(function(snapshot) {
            ths.firstname = snapshot.val().firstname
            ths.lastname = snapshot.val().lastname
            ths.depart = snapshot.val().depart
            ths.role = snapshot.val().role
        });
    },
    editUserData(firstname, lastname, depart, role) {
      const ths = this;
      firebase.database().ref("users/" + ths.username).update({
              firstname: firstname,
              lastname: lastname,
              depart: depart,
              role: role
            })
            this.$router.push({ name: 'admin' });
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
