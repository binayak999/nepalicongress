import axios from "axios";
import { baseUrl, secureStorage } from "../../main";

const state = {
  signature: undefined,
  signatures: [],
};

const getters = {
  allSignature: (state) => state.signature,
  allSignatures: (state) => state.signatures,
};

const actions = {
  async postSignature({ commit }, data) {
    try {
      const response = await axios.post(baseUrl + "signature/create", data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (response.status == 201 || response.status == 200) {
        commit("setSignature", response.data.results);
      }
    } catch (error) {
      console.log(error.response);
    }
  },
  async getSignatures({ commit }, data) {
    try {
      const response = await axios.post(baseUrl + "signature/list", data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (response.status == 200) {
        commit("setSignatures", response.data.results);
      }
    } catch (error) {
      console.log(error.response);
    }
  },
  async deleteSignature({ commit }, data) {
    try {
      const response = await axios.delete(baseUrl + "signature/" + data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`
        },
      });
      if (response.status == 200) {
        commit("setSignatures", response.data.results);
      }
    }catch(error){
      console.log(error.response)
    }
  },
};

const mutations = {
  setSignature: (state, data) => (state.signature = data),
  setSignatures: (state, data) => (state.signatures = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
