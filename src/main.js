/* eslint-disable no-unused-vars */
import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import firebase from "firebase/app";

Vue.config.productionTip = false;

let app = "";

const config = {
  apiKey: "AIzaSyBpupHTLfgOcJaapDqCdwJXNqm6bpPnlp4",
  authDomain: "together-dbed1.firebaseapp.com",
  databaseURL: "https://together-dbed1.firebaseio.com",
  projectId: "together-dbed1",
  storageBucket: "together-dbed1.appspot.com",
  messagingSenderId: "172668297160",
  appId: "1:172668297160:web:50deee8e8cdc0380392afd",
  measurementId: "G-FS8J22CDTW"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function() {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
