<template>
  <div class="home">
    Welcome {{ email }}
    <br />
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import firebase from "firebase";
export default {
  name: "Home",
  data() {
    return {
      email: firebase.auth().currentUser.email
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(success => this.$router.replace("/login"));
    }
  }
};
</script>
