<template>
  <div class="home">
    <header>
      <h1>Togehter</h1>
      <h4>. find together . change together</h4>
    </header>
    <div class="posts">
      <div v-for="(post, i) in allPosts" :key="i">{{ post.message }}</div>
      <i v-show="allPosts.length === 0">Write the first post...</i>
    </div>
    <form class="messageContainer">
      <input type="text" placeholder="Write post..." v-model="currentMessage" />
      <button @click="send()" type="submit">
        <i class="material-icons">send</i>
      </button>
    </form>
    <br />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import firebase from "firebase";
export default {
  name: "Home",
  data() {
    return {
      email: firebase.auth().currentUser.email,
      uid: firebase.auth().currentUser.uid,
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
        let postData = {
          uid: this.uid,
          message: this.currentMessage,
          timestamp: new Date().getTime()
        };
        let key = firebase
          .database()
          .ref()
          .child("post")
          .push().key;
        firebase
          .database()
          .ref(`posts/${key}`)
          .update(postData, err => console.log(err));
        this.currentMessage = "";
      }
    },
    loadPosts() {
      let posts = firebase.database().ref("posts");
      posts.on("value", msg => {
        this.allPosts = Object.values(msg.val());
      });
    }
  },
  created() {
    this.loadPosts();
  }
};
</script>
<style>
.home {
  width: 100%;
  height: 100%;
}
h1 {
  margin-top: 0px;
}
header {
  padding: 5px;
}
.posts {
  padding: 5px;
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
  position: absolute;
  bottom: 0;
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
