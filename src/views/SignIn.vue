<template>
  <div>
    <v-banner two-line>
      <v-avatar slot="icon" color="warning" size="40">
        <v-icon color="white">
          info_outline
        </v-icon>
      </v-avatar>
      Sign in to enjoy the benefits of being together.
    </v-banner>

    <v-form class="mt-2" v-model="valid">
      <v-text-field
        filled
        label="Email"
        prepend-inner-icon="alternate_email"
        v-model="email"
        :rules="[rules.email]"
      ></v-text-field>
      <v-text-field
        filled
        label="Password"
        prepend-inner-icon="vpn_key"
        v-model="password"
        :append-icon="showPassword ? 'visibility' : 'visibility_off'"
        @click:append="showPassword = !showPassword"
        :type="showPassword ? 'text' : 'password'"
        :rules="[rules.password]"
      ></v-text-field>
      <div class="d-flex">
        <v-btn class="mr-auto" color="primary" @click="signUp">Submit</v-btn>
        <v-btn color="secondary" @click="reset">Reset</v-btn>
      </div>
    </v-form>
    <p class="overline text-center mt-3">
      You don't have an account ? <a href="/signup">Click here</a> to sign up.
    </p>
    <v-snackbar
      v-model="openSnackbar"
      :timeout="5000"
      @click="openSnackbar = false"
    >
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      email: null,
      password: null,
      valid: false,
      showPassword: false,
      snackbarText: null,
      openSnackbar: false,
      rules: {
        email: v =>
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
            v
          ) || 'Email must be valid',
        password: v =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) ||
          'Password must contain at least one digit, one upper-, one lower case and eight characters'
      }
    }
  },
  methods: {
    signUp() {
      if (this.valid) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push('/')
          })
          .catch(err => {
            this.snackbarText = err.message
            this.openSnackbar = true
          })
      } else {
        this.snackbarText = 'Please check your entries.'
        this.openSnackbar = true
      }
    },
    reset() {
      this.email = null
      this.password = null
    }
  }
}
</script>

<style lang="scss" scoped></style>
