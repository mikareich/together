<template>
  <div>
    <v-card outlined class="card">
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="post.author.photoURL"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ post.post.title }}</v-list-item-title>
          <v-list-item-subtitle
            >by
            <a :href="`/account/${post.author.uid}`">{{
              post.author.username
            }}</a>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-text class="body-2">
        {{ post.post.message }}
      </v-card-text>
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
export default {
  props: ['post']
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
