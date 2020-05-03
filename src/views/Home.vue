<template>
  <div class="home">
    <Post
      v-for="(postKey, i) in posts"
      :key="i"
      :post="posts[i]"
      class="ma-2"
    ></Post>
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
