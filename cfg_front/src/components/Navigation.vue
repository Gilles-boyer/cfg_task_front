<template class="mx-0">
  <div>
    <v-bottom-navigation
      v-model="value"
      color="red"
      dark
      width="100%"
      background-color="primary"
      class="hidden-xs-only"
    >
      <v-btn value="tasks" icon>
        <span>Taches</span>

        <v-icon>mdi-calendar-check</v-icon>
      </v-btn>

      <v-btn value="archives" icon>
        <span>Archive</span>

        <v-icon>mdi-archive-arrow-down</v-icon>
      </v-btn>

      <v-btn value="admin" icon>
        <span>Admin</span>

        <v-icon>mdi-school</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-bottom-navigation
      v-model="value"
      color="red"
      dark
      background-color="primary"
      class="hidden-sm-and-up"
      height="100%"
      width="100%"
      horizontal
    >
      <div class="d-flex flex-column my-auto">
        <v-btn value="recent" icon class="mt-2">
          <span>Recent</span>

          <v-icon>mdi-history</v-icon>
        </v-btn>

        <v-btn value="favorites" icon class="my-2">
          <span>Favorites</span>

          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn value="nearby" icon class="mb-2">
          <span>Nearby</span>

          <v-icon>mdi-map-marker</v-icon>
        </v-btn>
      </div>
    </v-bottom-navigation>
  </div>
</template>

<script src="./js/navigation">
</script>