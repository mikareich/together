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
    }
  },
  mutations: {
    SET_USER(state, { displayName, email, uid, photoURL }) {
      state.user = {
        username: displayName,
        email,
        uid,
        photoURL
      }
    }
  },
  actions: {},
  modules: {}
})
