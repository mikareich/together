<template>
  <div class="home">
    <header>
      <h1>Togehter</h1>
      <h4>. find together . change together</h4>
      <p>Signd in as {{ user.username }}</p>
    </header>
    <div class="posts">
      <div
        v-for="(post, i) in allPosts"
        :key="i"
        class="post"
        :class="{ me: post.user.uid === user.uid }"
      >
        <span class="message">{{ post.message }}</span>
        <span class="info">{{ post.user.username }}</span>
      </div>
    </div>
    <form class="messageContainer">
      <input type="text" placeholder="Write post..." v-model="currentMessage" />
      <button @click="send()" type="submit">
        <i class="material-icons">send</i>
      </button>
    </form>
    <a @click="logout()">Log out</a>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import firebase from "firebase";
export default {
  name: "Home",
  data() {
    return {
      user: {
        email: "null",
        username: "null",
        uid: firebase.auth().currentUser.uid
      },
      currentMessage: "",
      allPosts: []
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(success => this.$router.replace("/login"));
    },
    send() {
      if (this.currentMessage !== "") {
        let key = firebase
          .database()
          .ref()
          .child("post")
          .push().key;

        let postData = {
          message: this.currentMessage,
          timestamp: new Date().getTime(),
          user: this.user,
          key: key
        };
        
        // send to post
        firebase
          .database()
          .ref(`posts/${key}`)
          .update(postData);
        // send to user
        firebase
          .database()
          .ref(`user/${this.user.uid}/posts`)
          .update({
            message: postData.message,
            key: postData.key,
            timestamp: postData.timestamp
          });
        this.currentMessage = "";
      }
    }
  },
  created() {
    // load posts
    let currentTimestamp = new Date().getTime();

    let posts = firebase.database().ref("posts");
    posts.on("value", msg => {
      this.allPosts = Object.values(msg.val()).filter(
        msg => msg.timestamp != currentTimestamp
      );
    });
    firebase
      .database()
      .ref(`user/${this.user.uid}`)
      .once("value")
      .then(user => {
        this.user.username = user.val().username;
        this.user.email = user.val().email;
      });
  }
};
</script>
<style>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
h1 {
  margin-top: 0px;
}
header {
  padding: 5px;
}
a {
  text-align: center;
}
.posts {
  padding: 5px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
}
.post {
  background-color: #e68383;
  margin-top: 10px;
  border-radius: 5px 5px 5px 0px;
  padding: 10px;
  max-width: 200px;
  width: fit-content;
}
.post.me {
  align-self: flex-end;
  border-radius: 5px 5px 0px 5px;
  background-color: #ac2b2b31;
}
button {
  margin-top: 10px;
  cursor: pointer;
  border-radius: 2px;
  border: none;
  padding: 0px 20px;
  color: white;
  background-color: #ac2b2b;
  border-radius: 3px;
  border: 1px solid transparent;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
input {
  margin: 10px 0px;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 3px;
}
input:focus,
button:focus,
button:active {
  outline: #ab2b2b80 solid 1px;
  border: #ac2b2b solid 1px;
}
button:active {
  background-color: #ac2b2b80;
}
form.messageContainer {
  display: flex;
  justify-content: space-between;
  padding: 0px 5px;
  width: calc(100% - 10px);
}
.messageContainer input {
  width: 100%;
  margin-right: 5px;
}
</style>
