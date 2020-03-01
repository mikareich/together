<template>
  <form class="login">
    <img src="../assets/login.png" width="200" alt="" />
    <p>Let's log in to find together</p>
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
.login{
  text-align: center;

}

span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
