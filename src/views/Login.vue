<template>
  <form class="login">
    <img src="../assets/login.png" width="200" alt="" />
    <p>Let's log in to together</p>
    <input type="email" placeholder="Email" v-model="email" required />
    <br />
    <input type="password" placeholder="Password" v-model="password" required />
    <br />
    <button type="submit" @click="login">Sign in</button>
    <p v-show="err">Something went wrong. Please check your entries.</p>
    <br />
    <span
      >You don't have an account ? Let's
      <router-link to="/sign-up"> create one </router-link></span
    >
  </form>
</template>
<script>
/* eslint-disable no-unused-vars */
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      err: false
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => this.$router.replace("/home"),
          err => (this.err = true)
        );
    }
  }
};
</script>
<style scoped>
input {
  margin: 10px 0px;
  padding: 15px;
  border: 1px solid lightgray;
  border-radius: 2px;
}
button {
  margin-top: 10px;
  cursor: pointer;
  border-radius: 2px;
  border: none;
  padding: 10px 20px;
  color: white;
  background-color: #ac2b2b;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
