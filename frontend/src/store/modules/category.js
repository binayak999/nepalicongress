import axios from "axios";
import { baseUrl, secureStorage } from "../../main";
import router from "../../router";

const state = {
    categories: [],
    success: [],
    socialprofile:[],
    socialprofiles:[]
};

const getters = {
    allCategory: (state) => Object.assign(state.categories),
    allSuccess: (state) => state.success,
    allSocialProfile: (state) => state.socialprofile,
    allSocialProfiles:(state)=>state.socialprofiles
};

const actions = {
    async fetchCategories({ commit }) {
        try {
            const res = await axios.get(`${baseUrl}category`);
            // console.log(res.data.categories);
            commit("setCategories", res.data.categories);
        } catch (error) {
            console.log(error.response);
            commit("setCategories", []);
        }
    },
    async postCategory({ commit },data) {
        try {
            // console.log(data);
            const res = await axios.post(`${baseUrl}category/create`,data,{
                headers: {
                    'Authorization':`Bearer ${JSON.parse(secureStorage.getItem('userData')).token}`
                }
              });
              if(res.status === 201){
                  router.push('/dashboard/categories').catch(err=>{console.error(err) })
              }
            commit("setSuccess", "Successfully Added");
        } catch (error) {
            console.log(error.response.status);
            commit("setSuccess", "Was Unsuccessful");
        }
    },
    async createSocialProfile({ commit },data) {
        try {
            // console.log(data);
            const res = await axios.post(`${baseUrl}socialprofile/create`,data,{
                headers: {
                    'Authorization':`Bearer ${JSON.parse(secureStorage.getItem('userData')).token}`
                }
              });
              if(res.status === 201){
                  router.push('/').catch(err=>{console.error(err) })
              }
            commit("setSuccess", "Successfully Added");
        } catch (error) {
            console.log(error.response.status);
            commit("setSuccess", "Was Unsuccessful");
        }
    },
    async getSocialProfiles({ commit },data) {
        try {
            // console.log(data);
            const res = await axios.post(`${baseUrl}socialprofile/socialprofile`,data,{
                headers: {
                    'Authorization':`Bearer ${JSON.parse(secureStorage.getItem('userData')).token}`
                }
              });
            commit("setSocialProfiles", res.data);
        } catch (error) {
            console.log(error.response.status);
            commit("setSocialProfiles", []);
        }
    },

};

const mutations = {
    setCategories: (state, category) => (state.categories = category),
    setSuccess: (state,response) => (state.success = response),
    setSocialProfile: (state,response) => (state.socialprofile = response),
    setSocialProfiles: (state,response) => (state.socialprofiles = response),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
