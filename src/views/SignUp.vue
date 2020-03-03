<template>
  <form class="sign-up">
    <img src="../assets/login.png" width="200" alt="" />

    <p>Let's sign up to find together</p>
    <input type="text" placeholder="Username" v-model="username" required />
    <br />
    <input type="email" placeholder="Email" v-model="email" required />
    <br />
    <input type="password" placeholder="Password" v-model="password" required />
    <br />
    <button type="submit" @click="signUp">Sign up</button>
    <p v-show="err">Something went wrong. Please check your entries.</p>
    <br />
    <span
      >You have an account ? Let's
      <router-link to="/login">log in</router-link></span
    >
  </form>
</template>
<script>
/* eslint-disable no-unused-vars */
import firebase from "firebase";
export default {
  name: "sign-up",
  data() {
    return {
      email: "",
      password: "",
      username: "",
      err: false
    };
  },
  methods: {
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            firebase.auth().currentUser.updateProfile({
              displayName: this.username
            });

            this.$router.replace("/home");
          },
          err => (this.err = true)
        );
    }
  }
};
</script>
<style scoped>
.sign-up {
  display: flex;
  flex-direction: column;
  align-items: center;
}

span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
