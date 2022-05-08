<template>
  <v-app>
    <v-app-bar app color="primary" dark v-if="getLogin" flat>
      <div class="d-flex align-center">
        <v-img
          alt="logo cfg createur de solution"
          class="shrink mr-2 hidden-sm-and-up"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="60"
        />

        <v-img
          alt="logo cfg créateur de solution "
          class="shrink mt-1 hidden-xs-only"
          contain
          min-width="100"
          src="./assets/logo.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2 hidden-xs-only">Gilles BOYER</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        text
        color="error"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-icon
        class="hidden-sm-and-up"
        @click="showNavigation = !showNavigation"
        >{{ getIconNav }}</v-icon
      >
    </v-app-bar>

    <v-main>
      <Navigation v-if="showNavigation" />
      <router-view />
    </v-main>
    <v-footer padless fixed color="primary" class="white--text" app>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>MyTasks-v1.0.1</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",

  data: () => ({
    showNavigation: true,
  }),
  components: {
    Navigation,
  },
  watch: {},
  computed: {
    ...mapGetters(["getLogin"]),
    getIconNav() {
      if (!this.showNavigation) {
        return "mdi-menu";
      } else {
        return "mdi-close";
      }
    },
  },
};
</script>
