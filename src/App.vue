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
    <v-navigation-drawer v-model="drawer" absolute temporary>
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
        <v-list-item link :to="{ name: 'Home' }"
          ><v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content></v-list-item
        >
        <v-list-item link :to="{ name: 'WritePost' }"
          ><v-list-item-icon>
            <v-icon>create</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Write post</v-list-item-title>
          </v-list-item-content></v-list-item
        >
        <v-list-item link :to="{ name: 'MarkedPosts' }"
          ><v-list-item-icon>
            <v-icon>bookmark</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Marked posts</v-list-item-title>
          </v-list-item-content></v-list-item
        >
        <v-list-item link :to="{ name: 'Settings' }"
          ><v-list-item-icon>
            <v-icon>settings</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content></v-list-item
        >
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="primary" @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-content>
      <router-view class="pa-2" @snackbar="openSnackbar"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase'
export default {
  name: 'App',
  computed: mapState(['user']),
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$router.push('/signIn'))
    },
    openSnackbar(title, content) {
      console.log(title, content)
    }
  }
}
</script>
