<template>
  <v-app>
    <v-container>
      <v-col cols="12">
        <v-img :src="require('../assets/loginicon.png')" class="my-3" contain height="350" />
      </v-col>
    </v-container>
    <v-card class="cardadd" color="#F1F1F1">
      <v-row justify="center">
        <v-col cols="12" sm="8">
          <v-text-field label="Username" outlined background-color="#FFFFFF"></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
          <v-col cols="12" sm="8">
          <v-text-field
          background-color="#FFFFFF"
            outlined
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center"><v-btn style="margin:0px; background-color:#AF281A; color:#FFFF;">Login</v-btn></v-row>
    </v-card>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      show1: false,
      password: "Password"
    };
  }
};
</script>
<style>
button{
    margin: 0px;
}
.cardadd {
  padding: 20px;
  margin-left: 450px;
  margin-right: 450px;
}
</style>