<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="show" :color="Data.color" centered>
      {{ Data.message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="$emit('close')">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script src="./js/snackBar">
</script>