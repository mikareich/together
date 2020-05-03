<template>
  <div class="home">
    <Post
      :post="{
        author: {
          photoURL: 'https://api.adorable.io/avatars/285/Mika Reich.png',
          uid: '2xnLOjeQmMOxHjpkgyvtg9Sbkrq2',
          username: 'Mika Reich'
        },
        post: {
          message: 'YAY!!! This is my first post 🎉🎉🎉',
          title: 'First Post',
          posts: 0
        },
        timestamp: 1588502969290
      }"
    ></Post>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue'
export default {
  name: 'Home',
  components: { Post }
}
</script>
