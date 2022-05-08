<template>
  <v-overlay :value="show">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>