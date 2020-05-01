<template>
  <v-app>
    <template>
      <div>
        <v-app-bar
          dark
          v-show="$route.name !== 'SignIn' && $route.name !== 'SignUp'"
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>{{ $route.name }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-app-bar>
      </div>
    </template>

    <v-content>
      <router-view class="pa-2"></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
