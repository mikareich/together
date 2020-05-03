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
    <v-form class="mt-2" v-model="valid">
      <v-text-field
        label="Title"
        filled
        prepend-inner-icon="title"
        counter="20"
        clearable
        :rules="[rules.required, rules.max20]"
        v-model="title"
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

    <v-btn
      fixed
      rounded
      bottom
      right
      color="primary"
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
      if (this.valid) {
        this.loadMessage = true
        const postData = {
          author: {
            username: this.user.username,
            uid: this.user.uid
          },
          post: {
            message: this.post,
            title: this.title
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
          })
        this.$emit('snackbar', 'tst', 'ctn')
      }
    }
  }
}
</script>
