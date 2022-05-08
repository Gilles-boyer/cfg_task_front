import { mapGetters } from "vuex";
import overlay from "../../Overlay.vue";

export default {
    components: {
        overlay,
    },
    name: "FormAddTask",
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        overlay: {
            type: Boolean,
            default: false,
        },
        editedItemTask: {
            type: Object,
            default: {
                _id: null,
            },
        },
    },
    watch: {
        editedItemTask(val) {
            if (val._id) {
                this.editedItem = val;
            }
        },
    },
    data() {
        return {
            rules: {
                required: (value) => !!value || "Requis.",
                min3: (value) => value.length >= 3 || "min 3 charactère.",
                string: (value) =>
                    typeof value == "string" || "merci de saisir du texte.",
                object: (value) =>
                    typeof value == "object" || "merci de choisir un object.",
                service: (value) =>
                    (value.name.length > 0 && value._id.length > 0) ||
                    "merci de choisir un object",
                folder: (value) =>
                    (value.label.length > 0 && value._id.length > 0) ||
                    "merci de choisir un object",
                date: (value) =>
                    (value instanceof Date && !isNaN(value.valueOf())) ||
                    "merci de choisir une date",
                users: (value) => value.length > 0 || "merci de choisir un utilisateur",
            },
            valid: true,
            menu: false,
            modal: false,
            menu2: false,
            dialog: false,
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10),
            editedIndex: -1,
            editedItem: {
                title: "",
                service: {
                    name: "",
                    icon: "",
                    color: "",
                },
                dateLimit: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10),
                folder: {
                    label: "",
                },
                userTask: [],
            },
            defaultItem: {
                _id: "",
                title: "",
                service: {
                    name: "",
                    icon: "",
                    color: "",
                },
                dateLimit: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10),
                folder: {
                    label: "",
                },
                userTask: [],
            },
        };
    },
    computed: {
        ...mapGetters(["getServices", "getFolders", "getUsers"]),
        formTitle() {
            return this.editedItemTask._id === 0 ?
                {
                    title: "Nouvelle Tache",
                    icon: "mdi-new-box",
                } :
                {
                    title: "Modifier une Tache",
                    icon: "mdi-pencil",
                };
        },
        computedDateFormatted() {
            return this.formatDate(this.editedItem.dateLimit);
        },
    },
    methods: {
        formatDate(date) {
            if (!date) return null;
            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        },
        save() {
            if (this.$refs.form.validate()) {
                this.$emit("saveData", this.editedItem);
                this.clearForm();
            }
        },
        close() {
            this.$emit("close");
            this.clearForm();
        },
        clearForm() {
            this.$refs.form.resetValidation();
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
    },
};