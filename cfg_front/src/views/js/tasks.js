import { mapGetters, mapActions } from "vuex";
import modalAddOrModTask from "../../components/modal/FormAddTask.vue";
import modalDelete from "../../components/modal/ModalDelete.vue";
import snackBar from "../../components/SnackBar.vue";
import apiTask from "../../service/apiTask";
import overlay from "../../components/Overlay.vue";

export default {
    components: {
        modalAddOrModTask,
        modalDelete,
        snackBar,
        overlay,
    },
    data: () => ({
        showModal: false,
        showModalTask: false,
        showSnackBar: false,
        showOverlay: false,
        showModalOverlay: false,
        search: "",
        SnackBar: {
            color: "",
            message: "",
        },
        defaultSnack: {
            color: "",
            message: "",
        },
        searchFolder: "",
        searchUser: null,
        searchService: "",
        modalDelete: {
            icon: "",
            title: "",
            message: "",
        },
        defaultModalDelete: {
            icon: "",
            title: "",
            message: "",
        },
        headers: [
            { text: "Descriptif de la tache", value: "title", width: "60 %" },
            { text: "Dossier", value: "folder.label" },
            { text: "Service", value: "service" },
            { text: "Date Limite", value: "dateLimit" },
            { text: "Actions", value: "actions" },
        ],
        items: ["Foo", "Bar", "Fizz", "Buzz"],
        editedIndex: -1,
        editedItem: {
            _id: 0,
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
            _id: 0,
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
    }),

    watch: {
        searchService(val) {
            if (val == null) {
                this.searchService = "";
            }
        },
        searchFolder(val) {
            if (val == null) {
                this.searchFolder = "";
            }
        },
    },

    computed: {
        ...mapGetters(["getTasks", "getServices", "getFolders", "getUsers"]),
        filterTasks() {
            if (this.getTasks.length > 0) {
                this.showOverlay = false;
            } else {
                setTimeout(() => {
                    this.showOverlay = false;
                }, 5000);
            }

            var res = this.getTasks.filter((task) => {
                return task.title.toLowerCase().includes(this.search.toLowerCase());
            });

            res = res.filter((task) => {
                if (task.service) {
                    return task.service.name
                        .toLowerCase()
                        .includes(this.searchService.toLowerCase());
                }
            });

            res = res.filter((task) => {
                if (task.folder) {
                    return task.folder.label
                        .toLowerCase()
                        .includes(this.searchFolder.toLowerCase());
                }
            });

            res = res.filter((task) => {
                var result = false;
                if (this.searchUser) {
                    task.userTask.forEach((user) => {
                        if (
                            user.user.firstName.toLowerCase() == this.searchUser.toLowerCase()
                        ) {
                            result = true;
                        }
                    });
                } else {
                    result = true;
                }

                return result;
            });

            return res;
        },
    },
    created() {
        this.showOverlay = true;
        try {
            this.initTasks();
            this.initServices();
            this.initFolders();
            this.initUsers();
        } catch (error) {
            console.log(error.message);
        }
    },

    methods: {
        ...mapActions(["initTasks", "initServices", "initFolders", "initUsers"]),
        closeTask() {
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
            this.showModalTask = false;
            this.showModalOverlay = false;
        },

        setDataSnackBar(color, message) {
            this.SnackBar.color = color;
            this.SnackBar.message = message;
            this.showSnackBar = true;
            setTimeout(() => {
                this.showSnackBar = false;
            }, 2000);
        },
        ColorAndIconChipsByDate(date) {
            var d1 = new Date(date);
            if (this.dayDiff(new Date(), d1) <= 0) {
                return {
                    icon: "mdi-alert-octagon",
                    color: "error",
                };
            } else if (this.dayDiff(new Date(), d1) <= 1) {
                return {
                    icon: "mdi-alert",
                    color: "warning",
                };
            } else {
                return {
                    icon: "mdi-information",
                    color: "info",
                };
            }
        },
        archivedItem(item) {
            this.modalDelete.icon = "mdi-archive";
            this.modalDelete.title = "Archiver une Tache";
            this.modalDelete.message = `Voulez-vous vraiment archiver la tache ${item.title} ?`;
            this.showModal = true;
            this.editedIndex = this.getTasks.indexOf(item);
            this.editedItem = Object.assign({}, item);
        },
        deleteItem(item) {
            this.modalDelete.icon = "mdi-delete";
            this.modalDelete.title = "Supprimer une Tache";
            this.modalDelete.message = `Voulez-vous vraiment supprimer la tache ${item.title} ?`;
            this.showModal = true;
            this.editedIndex = this.getTasks.indexOf(item);
            this.editedItem = Object.assign({}, item);
        },
        closeDelete(bool) {
            this.modalDelete = this.defaultModalDelete;
            this.showModal = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
            this.showModalOverlay = false;
        },
        async deleteItemConfirm(bool) {
            this.showModalOverlay = true;
            if (bool) {
                var res;
                try {
                    if (this.modalDelete.icon == "mdi-delete") {
                        res = await apiTask.delete(this.editedItem._id);
                        this.setDataSnackBar("green", "la tache a été supprimé");
                    } else {
                        res = await apiTask.archived(this.editedItem._id);
                        this.setDataSnackBar("green", "la tache a été archivé");
                    }
                    this.getTasks.splice(this.editedIndex, 1);
                } catch (error) {
                    console.log(error.message);
                    this.setDataSnackBar("red", "une erreur s'est produite");
                }
                this.closeDelete();
            }
        },
        dayDiff(d1, d2) {
            d1 = d1.getTime() / 86400000;
            d2 = d2.getTime() / 86400000;
            return new Number(d2 - d1).toFixed(0);
        },

        editItem(item) {
            this.showModalTask = true;
            this.editedIndex = this.getTasks.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        async saveTask(task) {
            this.showModalOverlay = true;
            if (this.editedIndex > -1) {
                try {
                    var res = await apiTask.update({
                            title: task.title,
                            dateLimit: task.dateLimit,
                            service: task.service._id,
                            folder: task.folder._id,
                            userTask: task.userTask,
                        },
                        task._id
                    );
                    Object.assign(this.getTasks[this.editedIndex], res.data);
                    this.setDataSnackBar("green", "votre tache a été modifié");
                } catch (error) {
                    console.log(error.message);
                    this.setDataSnackBar(
                        "red",
                        "une erreur de modification s'est produite"
                    );
                }
            } else {
                try {
                    var res = await apiTask.create({
                        title: task.title,
                        dateLimit: task.dateLimit,
                        service: task.service._id,
                        folder: task.folder._id,
                        userTask: task.userTask,
                    });
                    this.getTasks.push(res.data);
                    this.setDataSnackBar("green", "votre tache a été créé");
                } catch (error) {
                    console.log(error.message);
                    this.setDataSnackBar("red", "une erreur de creation s'est produite");
                }
            }
            this.closeTask();
        },
    },
};