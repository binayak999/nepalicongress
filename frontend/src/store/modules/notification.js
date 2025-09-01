import axios from "axios";
import {baseUrl, secureStorage} from "../../main";
import router from "../../router";

const state = {
    notifications: [],
    notificationhistory: [],
    notification: undefined,
    sendNotification: undefined
};

const getters = {
    allnotifications: (state) => state.notifications,
    allnotificationhistory: (state) => state.notificationhistory,
    allnotification: (state) => state.notification
};

const actions = {
    async createNotification({
        commit
    }, data) {
        try {
            if (data.images != undefined && data.images.length != 0) {
                let images = [];
                let fileUpload = new FormData();
                fileUpload.append('file', data.images);
                fileUpload.append('assignedTo', data.title);
                fileUpload.append('imageFile', 'notifications');
                fileUpload.append('fileType', "images");

                const res = await axios.post(`${baseUrl}fileupload/postimage`, fileUpload, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (res.status === 201) {
                    images.push({fileUrl: res.data.filePath});

                }
                delete data['images'];
                delete data['imageFile'];
                data = Object.assign(data, {images});
            }

            setTimeout(async () => {
                const res = await axios.post(`${baseUrl}notification/create`, data, {
                    headers: {
                        Authorization: `Bearer ${
                            JSON.parse(secureStorage.getItem("userData")).token
                        }`
                    }
                });
                if (res.status === 201) {
                    let info = {
                        icon: "success",
                        status: true,
                        title: `Success`,
                        message: `Notification Has been created`
                    };
                    this.dispatch("alertNow", info);
                    router.push("/dashboard/notifications").catch((err) => {
                        console.error(err);
                    });
                }
                commit("setUser", res.data);
            }, 1000);
        } catch (error) {
            console.log(error);
            let info = {
                icon: "error",
                status: true,
                title: `Opps`,
                message: `Something went wrong !`
            };
            this.dispatch("alertNow", info);
        }


    },

    async fetchNotification({commit}) {
        try {
            const res = await axios.get(`${baseUrl}notification`, {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(secureStorage.getItem("userData")).token
                    }`
                }
            });
            commit("setNotification", res.data.notifications);
        } catch (error) {
            console.log(error.response);
            commit("setNotification", []);
        }
    },
    async fetchNotificationHistory({commit}) {
        try {
            const res = await axios.get(`${baseUrl}notification/history`, {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(secureStorage.getItem("userData")).token
                    }`
                }
            });
            commit("setNotificationHistory", res.data.notifications);
        } catch (error) {
            console.log(error.response);
            commit("setNotificationHistory", []);
        }
    },
    async sendNotification({commit},data) {
        try {
            const res = await axios.post(`${baseUrl}notification/sendnotification`,data, {
                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(secureStorage.getItem("userData")).token
                    }`
                }
            });
            commit("sendNotification", res.data.status);
        } catch (error) {
            console.log(error.response);
            commit("sendNotification", []);
        }
    }
};

const mutations = {
    setNotification: (state, notification) => (state.notifications = notification),
    setNotificationHistory: (state, notification) => (state.notificationhistory = notification),
    setUserLogged: (state) => state.loggedUser,
    sendNotification: (state, data) => state.sendNotification = data
};

export default {state, getters, actions, mutations};
