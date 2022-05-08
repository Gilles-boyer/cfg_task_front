import Vue from "vue";
import Vuex from "vuex";
import apiTask from "../service/apiTask";
import apiService from "../service/apiService";
import apiFolder from "../service/apiFolder";
import apiUser from "../service/apiUser";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        connected: true,
        tasks: [],
        users: [],
        folders: [],
        services: [],
    },
    getters: {
        getLogin: (state) => {
            return state.connected;
        },
        getTasks: (state) => {
            return state.tasks;
        },
        getUsers: (state) => {
            return state.users;
        },
        getFolders: (state) => {
            return state.folders;
        },
        getServices: (state) => {
            return state.services;
        },
    },
    mutations: {
        SET_TASKS(state, data) {
            state.tasks = data;
        },
        SET_USERS(state, data) {
            state.users = data;
        },
        SET_FOLDERS(state, data) {
            state.folders = data;
        },
        SET_SERVICES(state, data) {
            state.services = data;
        },
    },
    actions: {
        initTasks: async(context) => {
            try {
                var res = await apiTask.index();
                context.commit("SET_TASKS", res.data);
            } catch (e) {
                console.log(e.message);
            }
        },
        initUsers: async(context) => {
            try {
                var res = await apiUser.index();
                context.commit("SET_USERS", res.data);
            } catch (e) {
                console.log(e.message);
            }
        },
        initFolders: async(context) => {
            try {
                var res = await apiFolder.index();
                context.commit("SET_FOLDERS", res.data);
            } catch (e) {
                console.log(e.message);
            }
        },
        initServices: async(context) => {
            try {
                var res = await apiService.index();
                context.commit("SET_SERVICES", res.data);
            } catch (e) {
                console.log(e.message);
            }
        },
    },
    modules: {},
});