<template>
  <div>
    <div class=" text-center mt-8">
      <v-avatar size="130">
        <img :src="profilePhoto" :alt="username" />
      </v-avatar>
    </div>

    <v-banner two-line>
      <v-avatar slot="icon" color="warning" size="40">
        <v-icon color="white">
          info_outline
        </v-icon>
      </v-avatar>
      Sign up to enjoy the benefits of being together.
    </v-banner>

    <v-form class="mt-2" v-model="valid" ref="form">
      <v-text-field
        filled
        label="Username"
        prepend-inner-icon="account_circle"
        v-model="username"
        :rules="[rules.required]"
      ></v-text-field>
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
        <v-btn class="mr-auto" color="primary" @click="signIn">Submit</v-btn>
        <v-btn color="secondary" @click="reset">Reset</v-btn>
      </div>
    </v-form>
    <p class="overline text-center mt-3">
      Already have an account ? <a href="/signin">Click here</a> to sign in.
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
import { email, password, required } from './registrationRules'

export default {
  data() {
    return {
      username: null,
      email: null,
      password: null,
      valid: false,
      showPassword: false,
      snackbarText: null,
      openSnackbar: false,
      rules: {
        required,
        email,
        password
      }
    }
  },
  methods: {
    signIn() {
      this.$refs.form.validate()

      if (this.valid) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(userCredential => {
            userCredential.user.updateProfile({
              displayName: this.username,
              photoURL: this.profilePhoto
            })
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
      this.$refs.form.reset()
    }
  },
  computed: {
    profilePhoto() {
      return `https://api.adorable.io/avatars/285/${this.username}.png`
    }
  }
}
</script>
