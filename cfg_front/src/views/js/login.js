export default {
    data() {
        return {
            password: null,
            email: null,
            show4: false,
            valid: false,
            rules: {
                required: (value) => !!value || "Requis.",
                email: (value) => {
                    const pattern =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Invalid e-mail.";
                },
                password: (value) => {
                    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
                    return pattern.test(value) || "Invalid password.";
                },
            },
        };
    },
    name: "Login",
    components: {},
};