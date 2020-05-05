<template>
  <div>
    <v-card outlined class="card">
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="author.photoURL"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ post.title }}</v-list-item-title>
          <v-list-item-subtitle
            >by
            <a :href="`/account/${author.uid}`"
              ><span v-if="author.uid === user.uid">me</span
              ><span v-else>{{ author.displayName }}</span></a
            >
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item> {{ post.message }}</v-list-item>
      <v-card-actions>
        <v-btn icon color="primary">
          <v-icon>bookmark_border</v-icon>
        </v-btn>
        <v-btn icon color="primary">
          <v-icon>reply</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          rounded
          color="purple darken-2
"
        >
          200
          <v-icon right>favorite_border</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['post', 'author'],
  computed: mapState(['user'])
}
</script>

<style lang="scss" scoped>
.card {
  border-radius: 5px !important;
}
.card:active {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.185) !important;
}
</style>
