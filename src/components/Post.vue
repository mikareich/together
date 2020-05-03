<template>
  <div>
    <v-card outlined>
      <v-list-item>
        <v-list-item-avatar>
          <v-img
            src="https://api.adorable.io/avatars/285/Mika Reich.png"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Post XY</v-list-item-title>
          <v-list-item-subtitle>Mika Reich</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-text class="d-inline-block text-truncate">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo
        laborum perferendis optio. Iusto molestiae rem, est deserunt quia
        corporis ut asperiores magnam temporibus voluptatem cum consequuntur
        aspernatur perferendis nobis sed.
      </v-card-text>
      <v-card-actions>
        <v-btn text>Read more</v-btn>
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
export default {}
</script>

<style lang="scss" scoped>
.text-truncation--multi {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
