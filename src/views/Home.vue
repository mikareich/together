<template>
  <div class="home">
    <Post
      v-for="(postKey, i) in posts"
      :key="i"
      :post="posts[i].post"
      :author="posts[i].author"
      class="ma-2"
    ></Post>
    <v-btn
      fixed
      fab
      bottom
      right
      color="primary"
      link
      :to="{ name: 'WritePost' }"
    >
      <v-icon large="">add</v-icon>
    </v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: { Post },
  computed: mapState(['posts'])
}
</script>
