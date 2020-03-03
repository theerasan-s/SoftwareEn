import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDjv0obqMn58mT14x4ygrODRHliwsXJy40",
  authDomain: "budget-tracking-bb832.firebaseapp.com",
  databaseURL: "https://budget-tracking-bb832.firebaseio.com",
  projectId: "budget-tracking-bb832",
  storageBucket: "budget-tracking-bb832.appspot.com",
  messagingSenderId: "398045197523",
  appId: "1:398045197523:web:213bfb8de4700777ad1026"
};

firebase.initializeApp(firebaseConfig)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
