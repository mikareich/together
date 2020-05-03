<template>
  <div>
    <v-card outlined>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="post.author.photoURL"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ post.post.title }}</v-list-item-title>
          <v-list-item-subtitle
            >by {{ post.author.username }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-card-text>
        {{ post.post.message }}
      </v-card-text>
      <v-card-actions>
        <v-btn rounded text color="primary">
          Mark
          <v-icon right>bookmark_border</v-icon>
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
.text-truncation--multi {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
