import axios from "axios";
import { baseUrl, secureStorage } from "../../main";
import router from "../../router";

const state = {
    forums: [],
    leaders: [],
    letters: [],
    success: ''
};

const getters = {
    allForum: (state) => state.forums,
    allLeaders: (state) => state.leaders,
    allLetters: (state) => state.letters,
};

const actions = {
    async fetchForums({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}forum`);
            // console.log(res.data.forums);
            commit("setForum", res.data.forums);
        } catch (error) {
            console.log(error.response);
            commit("setForum", []);
        }
    },
    async postForum({ commit }, data) {

        try {
            let images = [];

            let fileUpload = new FormData();
            fileUpload.append('file', data.images);
            fileUpload.append('assignedTo', data.title);
            fileUpload.append('imageFile', 'forums');
            fileUpload.append('fileType', "images");
            console.log(fileUpload)
            const res = await axios.post(`${baseUrl}fileupload/postimage`, fileUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.status === 201) {
                images.push({ fileUrl: res.data.filePath });

            }

            delete data['images'];
            delete data['imageFile'];
            data = Object.assign(data, { images });
            setTimeout(async () => {


                const res = await axios.post(`${baseUrl}forum/create`, data, {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(secureStorage.getItem('userData')).token}`
                    }
                });
                if (res.status === 201) {
                    router.push('/').catch(err => { console.error(err) });
                }
                commit("setSuccess", "Successfully Report Added");

                let info = {
                    icon: "success",
                    status: true,
                    title: `Success`,
                    message: `Your Forum Posted You will hear back from us soon`,
                };
                this.dispatch("alertNow", info);


            }, 1000)
        } catch (error) {
            console.log(error);
            commit("setSuccess", "Was Report Unsuccessful");
            let info = {
                icon: "error",
                status: true,
                title: `Error`,
                message: `Something went wrong!`,
            };
            this.dispatch("alertNow", info);
        }
    },
    async replyindiscuss({ commit }, data) {

        try {

            const res = await axios.post(`${baseUrl}forum/replyindiscuss`, data, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(secureStorage.getItem('userData')).token}`
                }
            });
            if (res.status === 201) {
                // router.push('/').catch(err => { console.error(err) });
            }
            commit("setSuccess", "Successfully Report Added");

            let info = {
                icon: "success",
                status: true,
                title: `Success`,
                message: `You have successfully replied`,
            };
            this.dispatch("alertNow", info);
            this.dispatch("fetchForums");

        } catch (error) {
            commit("setSuccess", "Was Report Unsuccessful");
            let info = {
                icon: "error",
                status: true,
                title: `Error`,
                message: `Something went wrong!`,
            };
            this.dispatch("alertNow", info);
        }
    },
    async postLetter({ commit }, data) {
        try {

            const res = await axios.post(`${baseUrl}forum/createlettertoleader`, data, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(secureStorage.getItem('userData')).token}`
                }
            });
            if (res.status === 201) {
                router.push('/').catch(err => { console.error(err) });
                let info = {
                    icon: "success",
                    status: true,
                    title: `Success`,
                    message: `Your letter has been submited`,
                };
                this.dispatch("alertNow", info);
            }
            commit("setSuccess", "Successfully Report Added");
        } catch (error) {
            console.log(error)
            let info = {
                icon: "error",
                status: true,
                title: `Error`,
                message: `Something went wrong!`,
            };
            this.dispatch("alertNow", info);
        }

    },
    async getLeaders({ commit }) {
        try {
            let res;
            if(secureStorage.getItem('userData')){
                res = await axios.get(`${baseUrl}leader/frontend`, {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(secureStorage.getItem('userData')).token}`
                    }
                })
                if (res.status === 200) {
                    commit("setLeaders", res.data.leaders);
                }
            }else{
                commit("setLeaders", []);
            }
            
            
        } catch (error) {
            console.log(error);
        }
    },
    async getLetters({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}forum/letters`, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(secureStorage.getItem('userData')).token}`
                }
            })
            if (res.status === 200) {
                commit("setLetters", res.data.letters);
            }
        } catch (error) {
            console.log(error);
        }
    }
};

const mutations = {
    setForum: (state, report) => (state.forums = report),
    setSuccess: (state, response) => (state.success = response),
    setLeaders: (state, response) => (state.leaders = response),
    setLetters: (state, response) => (state.letters = response),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
