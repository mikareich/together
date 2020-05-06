<template>
  <div>
    <v-banner two-line>
      <v-avatar slot="icon" color="warning" size="40">
        <v-icon color="white">
          info_outline
        </v-icon>
      </v-avatar>
      What you write here can read by everyone with valid account.
    </v-banner>
    <v-form class="mt-2" v-model="valid" ref="form">
      <v-text-field
        label="Title"
        filled
        prepend-inner-icon="title"
        counter="20"
        :counter-value="v => (v ? v.trim().length : 0)"
        clearable
        :rules="[rules.required, rules.max20]"
        v-model.trim="title"
      ></v-text-field>
      <v-textarea
        label="Post"
        prepend-inner-icon="chat"
        filled
        clearable
        auto-grow
        rows="2"
        counter="200"
        :rules="[rules.required, rules.max200]"
        v-model="post"
      ></v-textarea>
    </v-form>
    <v-btn fixed rounded large bottom left color="primary" @click="cancel">
      <span>Cancel</span>
      <v-icon right>clear</v-icon>
    </v-btn>
    <v-btn
      fixed
      rounded
      bottom
      right
      color="secondary"
      large
      :loading="loadMessage"
      :disabled="loadMessage"
      @click="send"
    >
      <span>Send</span>
      <v-icon right>send</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { required, max20, max200 } from './registrationRules'
import firebase from 'firebase'
import { mapState } from 'vuex'
import EventBus from './event-bus'
export default {
  data() {
    return {
      loadMessage: false,
      valid: false,
      post: null,
      title: null,
      rules: {
        required,
        max20,
        max200
      }
    }
  },
  computed: mapState(['user']),
  methods: {
    send() {
      this.$refs.form.validate()
      if (this.valid) {
        this.loadMessage = true
        const postData = {
          author: {
            username: this.user.username,
            uid: this.user.uid,
            photoURL: this.user.photoURL
          },
          post: {
            message: this.post,
            title: this.title,
            likes: 0
          },
          timestamp: new Date().getTime()
        }
        const postKey = firebase
          .database()
          .ref('/posts')
          .push().key

        firebase
          .database()
          .ref(`posts/${postKey}`)
          .set(postData)
          .then(() => {
            this.loadMessage = false
            EventBus.$emit('snackbar', 'Post sent')
            this.$router.push('/home')
          })
          .catch(err => {
            this.loadMessage = false
            EventBus.$emit('snackbar', err.message)
          })
      }
    },
    cancel() {
      EventBus.$emit('dialog', '', 'Sure you want to Cancel')
      EventBus.$once('dialogResponse', res =>
        res === 'yes' ? this.$router.back() : 'Stay at side'
      )
    }
  }
}
</script>
