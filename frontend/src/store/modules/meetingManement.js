import axios from "axios";
import { baseUrl,secureStorage } from "../../main";

const state = {
  committeMembers: [],
  committeMember: undefined,
};

const getters = {
  allCommitteMember: (state) => state.committeMember,
  allCommitteMembers: (state) => state.committeMembers,
};

const actions = {
  async createMember({ commit }, data) {
    try {
      const response = await axios.post(`${baseUrl}meetingmanagement/createMember`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (response.status === 200) {
        this.dispatch("alertNow", response.data.message);
        commit("setCommitteMember", response.data);
      }
    } catch (error) {
      console.log(error.response);
      this.dispatch("alertNow", error.response.data.message);
    }
  },
};

const mutations = {
  setCommitteMember: (state, data) => (state.committeMember = data),
  setCommitteMembers: (state, data) => (state.committeMembers = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
