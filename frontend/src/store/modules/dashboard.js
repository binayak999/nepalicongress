import axios from "axios";
import { baseUrl, secureStorage } from "../../main";

const state = {
  dashboard: undefined,
};

const getters = {
  allDasboard: (state) => state.dashboard,
};

const actions = {
  async getDashboard({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}dashboard`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      console.log(res.data);
      commit("setDashboard", res.data.results);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  setDashboard: (state, data) => (state.dashboard = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
