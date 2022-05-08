export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        Data: {
            type: Object,
            default: {
                color: "",
                message: "",
            },
        },
    },
};