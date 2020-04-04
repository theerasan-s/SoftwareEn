<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-img :src="require('../assets/loginicon.png')" class="my-3" height="200px" />
            <v-card class="elevation-12">
              <v-toolbar color="#AF281A" dark flat>
                <v-toolbar-title>Register Budget System</v-toolbar-title>
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
                  <v-btn
                    color="#AF2215"
                    v-on:click="writeUserData(firstname,lastname,depart,email,password,role)"
                  >Register</v-btn>
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
import firebase from "firebase";
export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      role: "",
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
    writeUserData(firstname, lastname, depart, email, password, role) {
      const ths = this;
      var username = email.replace(/@.*$/, "");
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .database()
            .ref("users/" + username)
            .set({
              firstname: firstname,
              lastname: lastname,
              depart: depart,
              uid: firebase.auth().currentUser.uid,
              email: email,
              role: role
            });
          window.location.href = "/home";
          console.log("Register Success");
        })
        .catch(function(error) {
          ths.errorshow = error.message;

          console.log(ths.errorshow);
        });
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
