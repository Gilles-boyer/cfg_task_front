import api from "./api";

export default {
    index() {
        return api.get("task/all");
    },
    create(task) {
        return api.post("task/create", task);
    },
    update(task, id) {
        return api.put(`task/update/${id}`, task);
    },
    archived(id) {
        return api.get(`task/archived/${id}`);
    },
    delete(id) {
        return api.delete(`task/delete/${id}`);
    },
};