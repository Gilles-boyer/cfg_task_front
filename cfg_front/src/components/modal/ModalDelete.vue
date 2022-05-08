<template>
  <v-dialog v-model="show" max-width="500px" persistent>
    <overlay :show="overlay" />
    <v-card>
      <v-card-title style="background-color: #04153b">
        <v-icon left class="white--text">{{ Data.icon }}</v-icon>
        <span class="text-h5 white--text">{{ Data.title }} </span>
      </v-card-title>
      <v-card-text class="text-h5">{{ Data.message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script src="./js/modalDelete">
</script>