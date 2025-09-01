import axios from "axios";
import { baseUrl, secureStorage } from "../../main";

const state = {
  reports: [],
};

const getters = {
  allReportsTree: (state) => state.reports,
};

const actions = {
  async reportGeneration({ commit }, data) {
    try {
      const response = await axios.post(
        `${baseUrl}circular/reportGenerationTree`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );

      commit("reportGenerationMut", response.data);
    } catch (error) {
      console.log(error.response);
    }
  },
};

const mutations = {
  reportGenerationMut: (state, reports) => (state.reports = reports),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
