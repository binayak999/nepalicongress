import axios from "axios";
import { baseUrl } from "../../main";
import router from "../../router";

const state = {
    images: [],
    imageAll: [],
    videoAll: [],
    videos: [],
};

const getters = {
    allImage: (state) => state.images,
    allImages: (state) => state.imageAll,
    allVideos: (state) => state.videoAll,
    allVideo: (state) => state.videos,
};

const actions = {
    async getAllImage({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}fileupload/files`);
            if (res.status == 200) {
                commit("setAllImage", res.data.files);
            }
        } catch (error) {
            console.log(error);
            commit("setSuccess", "Was Unsuccessful");
        }
    },
    async getAllVideo({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}fileupload/videos`);
            if (res.status == 200) {
                commit("setNewVideo", res.data.videos);
            }
        } catch (error) {
            console.log(error);
            commit("setSuccess", "Was Unsuccessful");
        }
    },
    async getImages({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}fileupload/images`);
            if (res.status == 200) {
                commit("setNewImage", res.data.images);
            }
        } catch (error) {
            console.log(error);
            commit("setSuccess", "Was Unsuccessful");
        }
    },
    async createImage({ commit }, data) {
        try {
            let fileUpload = new FormData();
            fileUpload.append('file', data.images);
            fileUpload.append('assignedTo', data.title);
            fileUpload.append('imageFile', data.imageFile);
            fileUpload.append('fileType', "images");
            console.log(fileUpload)
            const res = await axios.post(`${baseUrl}fileupload/postimage`, fileUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.status == 201) {
                router.push('/dashboard/medias').catch(err => { console.error(err) });
            }
            commit("setSuccess", "Successfully Uploaded");

        } catch (error) {
            console.log(error);
            commit("setSuccess", "Was Unsuccessful");
        }
    },
    async createVoters({ commit }, data) {
        try {
            let fileUpload = new FormData();
            fileUpload.append('file', data.csvfile);
            fileUpload.append('votingGroup', data.votingGroup);
            const res = await axios.post(`${baseUrl}fileupload/uploadVoters`, fileUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.status == 201) {
                router.push('/dashboard/voters').catch(err => { console.error(err) });
            }
            commit("setSuccess", "Successfully Uploaded");

        } catch (error) {
            console.log(error);
            commit("setSuccess", "Was Unsuccessful");
        }
    },

    async createCandidates({ commit }, data) {
        try {
            let fileUpload = new FormData();
            fileUpload.append('file', data.csvfile);
            fileUpload.append('voteCandidateGroup', data.voteCandidateGroup);
            const res = await axios.post(`${baseUrl}fileupload/voteCandidates`, fileUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.status == 201) {
            //     router.push('/dashboard/voters').catch(err => { console.error(err) });
            }
            commit("setSuccess", "Successfully Uploaded");

        } catch (error) {
            console.log(error);
            commit("setSuccess", "Was Unsuccessful");
        }
    },
    async createImageFrontend({ commit }, data) {
        try {
            let fileUpload = new FormData();
            fileUpload.append('file', data.images);
            fileUpload.append('assignedTo', data.title);
            fileUpload.append('imageFile', data.imageFile);
            fileUpload.append('fileType', "images");
            console.log(fileUpload)
            const res = await axios.post(`${baseUrl}fileupload/postimage`, fileUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.status == 201) {
                router.push('/').catch(err => { console.error(err) });
            }
            commit("setSuccess", "Successfully Uploaded");

        } catch (error) {
            console.log(error);
            commit("setSuccess", "Was Unsuccessful");
        }
    },
    async createVideo({ commit }, data) {
        try {
            let fileUpload = new FormData();
            fileUpload.append('file', data.videos);
            fileUpload.append('assignedTo', data.title);
            fileUpload.append('imageFile', data.imageFile);
            fileUpload.append('fileType', "videos");

            const res = await axios.post(`${baseUrl}fileupload/postimage`, fileUpload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.status == 201) {
                router.push('/dashboard/medias').catch(err => { console.error(err) });
            }
            commit("setSuccess", "Successfully Uploaded");
        } catch (error) {
            console.log(error);
            commit("setSuccess", "Was Unsuccessful");
        }
    },
    
    async uploadImage({ commit }, data) {
        try {
            data.images.forEach(async element => {
                let fileUpload = new FormData();
                fileUpload.append('file', element);
                fileUpload.append('assignedTo', data.title);
                fileUpload.append('imageFile', data.imageFile);
                fileUpload.append('fileType', "images");
                fileUpload.append('status', false);
                console.log(fileUpload)
                const res = await axios.post(`${baseUrl}fileupload/postimage`, fileUpload, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                console.log(res);
            });
            commit("setSuccess", "Successfully Uploaded");
        } catch (error) {
            console.log(error);
            commit("setSuccess", "Was Unsuccessful");
        }
    },
    async updateFile({ commit }, data) {
        try {
            const res = await axios.put(`${baseUrl}fileupload/files/${data.id}`, data);
            if (res.status === 200) {
                console.log(res);
                this.dispatch('getAllImage');
            }
            commit("setSuccess", "Successfully Uploaded");
        } catch (error) {
            console.log(error);
            commit("setSuccess", "Was Unsuccessful");
        }
    },
    async deleteFile({ commit }, data) {
        try {
            const res = await axios.delete(`${baseUrl}fileupload/files/${data.id}`);
            if (res.status === 200) {
                console.log(res);
                this.dispatch('getAllImage');
            }
            commit("setSuccess", "Successfully Uploaded");
        } catch (error) {
            console.log(error);
            commit("setSuccess", "Was Unsuccessful");
        }
    },
};

const mutations = {
    setAllImage: (state, image) => (state.imageAll = image),
    setAllVideo: (state, image) => (state.videoAll = image),
    setNewImage: (state, post) => (state.images = post),
    setNewVideo: (state, post) => (state.videos = post),
    setSuccess: (state, response) => (state.success = response),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
