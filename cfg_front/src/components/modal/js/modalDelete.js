import overlay from "../../Overlay.vue";
export default {
    name: "ModalDelete",
    data() {
        return {
            dialogDelete: true,
        };
    },
    components: {
        overlay,
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        overlay: {
            type: Boolean,
            default: false,
        },
        Data: {
            type: Object,
            default: {
                icon: "",
                title: "",
                message: "",
            },
        },
    },
    name: "ModalDelete",

    methods: {
        deleteItemConfirm() {
            this.$emit("confirm", true);
        },
        closeDelete() {
            this.$emit("close", false);
        },
    },
};