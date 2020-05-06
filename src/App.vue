<template>
  <v-app>
    <v-app-bar
      dark
      app
      v-show="$route.name !== 'SignIn' && $route.name !== 'SignUp'"
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>{{
        appName || $route.meta.displayName
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
    <v-content>
      <v-dialog v-model="dialogStatus" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">{{ dialogTitle }}</v-card-title>
          <v-card-text>{{ dialogText }}</v-card-text>
          <v-card-actions>
            <v-btn text @click="dialogResponse('no')">No</v-btn>

            <v-spacer></v-spacer>

            <v-btn text @click="dialogResponse('yes')">Yes</v-btn>
          </v-card-actions>
        </v-card> </v-dialog
      ><v-snackbar v-model="snackbarStatus">
        {{ snackbarText }}
        <v-btn color="secondary" right text @click="snackbarStatus = false">
          Close
        </v-btn>
      </v-snackbar>
      <router-view class="pa-2">Dismiss</router-view>
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
      snackbarText: '',
      appName: null,
      dialogStatus: false,
      dialogText: null,
      dialogTitle: null
    }
  },
  methods: {
    logout() {
      this.dialog('', 'Sure you want to log out?')
      EventBus.$once('dialogResponse', response => {
        console.log(response)
        response === 'yes'
          ? firebase
              .auth()
              .signOut()
              .then(() => this.$router.push('/signIn'))
          : 'Do not log out'
      })
    },
    snackbar(text) {
      this.snackbarStatus = true
      this.snackbarText = text
    },
    dialog(title, text) {
      this.dialogStatus = true
      this.dialogTitle = title
      this.dialogText = text
    },
    dialogResponse(res) {
      this.dialogStatus = false
      EventBus.$emit('dialogResponse', res)
    }
  },
  mounted() {
    EventBus.$on('snackbar', this.snackbar)
    EventBus.$on('dialog', this.dialog)
    EventBus.$on('appName', name => (this.appName = name))
  }
}
</script>
