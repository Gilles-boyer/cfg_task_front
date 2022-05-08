export default {
    data() {
        return {
            password: null,
            confirmPassword: null,
            email: null,
            show4: false,
            valid: false,
            rules: {
                required: (value) => !!value || "Requis.",
                password: (value) => {
                    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
                    return pattern.test(value) || "Invalid password.";
                },
                confirm: (value) => !(value != this.password) || "password different.",
            },
        };
    },
    name: "ResetPassword",
    components: {},
};