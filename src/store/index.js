import firebase from 'firebase'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: null,
      email: null,
      uid: null,
      photoURL: null
    },
    posts: []
  },
  mutations: {
    SET_USER(state, { displayName, email, uid, photoURL }) {
      state.user = {
        username: displayName,
        email,
        uid,
        photoURL
      }
    },
    UPDATE_POSTS(state, posts) {
      state.posts = posts
    }
  },
  actions: {
    listenOnPosts({ commit }) {
      firebase
        .database()
        .ref('/posts/')
        .on('value', function(snapshot) {
          commit('UPDATE_POSTS', snapshot.toJSON())
        })
    }
  },
  modules: {}
})
