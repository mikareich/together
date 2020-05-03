import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyBpupHTLfgOcJaapDqCdwJXNqm6bpPnlp4',
  authDomain: 'together-dbed1.firebaseapp.com',
  databaseURL: 'https://together-dbed1.firebaseio.com',
  projectId: 'together-dbed1',
  storageBucket: 'together-dbed1.appspot.com',
  messagingSenderId: '172668297160',
  appId: '1:172668297160:web:50deee8e8cdc0380392afd',
  measurementId: 'G-FS8J22CDTW'
}

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(() => {
  if (firebase.auth().currentUser)
    store.commit('SET_USER', firebase.auth().currentUser)
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
