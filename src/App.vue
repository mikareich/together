<template>
  <v-app>
    <v-app-bar
      dark
      app
      v-show="$route.name !== 'SignIn' && $route.name !== 'SignUp'"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>{{
        $route.meta ? $route.meta.displayName : ''
      }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer fixed v-model="drawer" temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="user.photoURL || ''"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.username }}</v-list-item-title>
          <v-list-item-subtitle>Together member</v-list-item-subtitle>
        </v-list-item-content> </v-list-item
      ><v-divider></v-divider>
      <v-list nav dense>
        <v-list-item
          link
          v-for="(route, i) in routesForDrawer"
          :key="i"
          :to="{ name: route.name }"
          ><v-list-item-icon>
            <v-icon>{{ route.meta.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ route.meta.displayName }}</v-list-item-title>
          </v-list-item-content></v-list-item
        >
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="primary" @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-content
      ><v-snackbar v-model="snackbarStatus">
        {{ snackbarText }}
        <v-btn color="secondary" right text @click="snackbarStatus = false">
          Close
        </v-btn>
      </v-snackbar>
      <router-view class="pa-2" @snackbar="snackbar">Dismiss</router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase'
import { routes } from '@/router/index'
import EventBus from './views/event-bus'

export default {
  name: 'App',
  computed: {
    ...mapState(['user'])
  },
  data() {
    return {
      drawer: false,
      routesForDrawer: routes.filter(route =>
        route.meta ? route.meta.displayOnDrawer : false
      ),
      snackbarStatus: false,
      snackbarText: ''
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$router.push('/signIn'))
    },
    snackbar(text) {
      this.snackbarStatus = true
      this.snackbarText = text
    }
  },
  mounted() {
    EventBus.$on('snackbar', this.snackbar)
  }
}
</script>
