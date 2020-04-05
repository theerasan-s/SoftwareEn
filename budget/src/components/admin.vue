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
                      <td class="text-center">{{ item.firstname +" "+ item.lastname }}</td>
                      <td class="text-center">{{item.role}}</td>
                      <td class="text-center">
                        <v-btn v-on:click="edituser(item.name)">แก้ไข</v-btn>
                        <v-btn v-on:click="removeuser(item.name)">ลบ</v-btn>
                      </td>
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
import { mapGetters } from "vuex";
import edituser from "./edituser";
import navbar from "./navbar";
import firebase from "firebase";
export default {
  components: { navbar },
  computed: {
    ...mapGetters({
      username: 'getUserdataname',
    })
  },
  created() {
    this.getalluser();
  },
  data() {
    return {
      role: "",
      listusername: [],
      firstname: "",
      lastname: ""
    };
  },
  methods: {
    edituser(name) {
      this.$store.commit({
        type: "setUserdataname",
        username: name,
      });
      this.$router.push({ name: 'edituser' });
    },
    removeuser(name) {
      firebase
        .database()
        .ref("users/" + name)
        .remove();
    },
    /*checklogin() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          window.location.href = "/admin";
        }
      });
    },*/
    async getalluser() {
      const ths = this;
      const ref = firebase.database().ref("users");
      const data = await ref.once("value");
      const userdata = data.val();
      for (let i in userdata) {
        firebase
          .database()
          .ref("users/" + i)
          .once("value")
          .then(function(snapshot) {
            let aname = {
              firstname: snapshot.val().firstname,
              lastname: snapshot.val().lastname,
              name: i,
              role: snapshot.val().role
            };
            ths.listusername.push(aname);
          });
      }
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
