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

    <v-form class="mt-2" v-model="valid" ref="form">
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
  </div>
</template>

<script>
import firebase from 'firebase'
import { email, password } from './registrationRules'
import EventBus from './event-bus'
export default {
  data() {
    return {
      email: null,
      password: null,
      valid: false,
      showPassword: false,
      rules: {
        email,
        password
      }
    }
  },
  methods: {
    signUp() {
      this.$refs.form.validate()

      if (this.valid) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(({ user }) => {
            EventBus.$emit('snackbar', `Welcome ${user.displayName}`)
            this.$router.push('/')
          })
          .catch(err => {
            EventBus.$emit('snackbar', err.message)
          })
      } else {
        EventBus.$emit('snackbar', 'Please check your entries')
      }
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
