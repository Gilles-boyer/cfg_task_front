import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import fr from "vuetify/lib/locale/fr";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#04153B",
                secondary: "#A09F9F",
                accent: "#FFFFFF",
                error: "#FE001A",
                info: "#2196F3",
                success: "#009788",
                warning: "#FD801F",
            },
        },
    },
    lang: {
        locales: { fr },
        current: "fr",
    },
});