import axios from "axios";
import store from "..";
import { baseUrl, secureStorage } from "../../main";

const state = {
  generalConvention: [],
  generalConventions: [],
  generalConventionUser: [],
  generalConventionUsers: [],
  generalVoteResult: [],
  generalVoteResults: [],
  generalConvenstionCommitteeMember: [],
};

const getters = {
  allSingleGenerationConvention: (state) => state.generalConvention,
  allGenerationConvention: (state) => state.generalConventions,
  allgeneralConventionUser: (state) => state.generalConventionUser,
  allgeneralConventionUsers: (state) => state.generalConventionUsers,
  allgeneralConventionVote: (state) => state.generalVoteResult,
  allgeneralConventionVotes: (state) => state.generalVoteResults,
  allGeneralConvenstionCommitteeMember: (state) => state.generalConvenstionCommitteeMember,
};

const actions = {
  async createGeneralConvention({ commit }, data) {
    try {
      let formData = new FormData();
      formData.append("title", data.title);
      formData.append("file", data.file);
      formData.append("province", data.province);
      formData.append("district", data.district);

      const response = await axios.post(
        `${baseUrl}generalconventions/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      if (response.status == 201) {
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: `Genernal Convention has been created successfully`,
        };
        this.dispatch("alertNow", info);
      }
      commit("setFilterGeneral", response.data.results);
    } catch (error) {
      console.log(error);
      if (error.response.status == 409) {
        let info = {
          icon: "error",
          status: true,
          title: `Error`,
          message: `Genernal Convention has been created already`,
        };
        this.dispatch("alertNow", info);
      } else {
        let info = {
          icon: "error",
          status: true,
          title: `Error`,
          message: `Something went wrong`,
        };
        this.dispatch("alertNow", info);
        if (error.response.status == 403) {
          store.dispatch("logoutUser");
        }
      }
    }
  },
  async fetchGeneralConvention({ commit }, data) {
    try {
      const response = await axios.post(
        `${baseUrl}generalconventions/filterGeneralConvention`,
        data
      );
      commit("setFilterGeneral", response.data.results);
    } catch (error) {
      if (error.response.status == 403) {
        store.dispatch("logoutUser");
      }
      console.log(error);
    }
  },
  async fetchGeneralConventionCommitteeMember({ commit }, data) {
    try {
      const response = await axios.post(
        `${baseUrl}generalconventions/generalConvenstionCommitteeMember`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      commit("setGeneralCommitteeMember", response.data.results);
    } catch (error) {
      console.log(error);
    }
  },
  async createGeneralConventionUser({ commit }, data) {
    try {
      const response = await axios.post(
        `${baseUrl}generalconventions/createUser`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      if (response.status == 201 || response.status == 200) {
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: response.data.message,
        };
        this.dispatch("alertNow", info);
      }
      commit("setCreateGeneralUser", response.data.results);
    } catch (error) {
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: error.response.data.message,
      };
      this.dispatch("alertNow", info);
    }
  },
  async singleGeneralUser({ commit }, data) {
    try {
      if (data != undefined) {
        const response = await axios.get(
          `${baseUrl}generalconventions/singleUser/${data}`,

          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(secureStorage.getItem("userData")).token
              }`,
            },
          }
        );
        if (response.status == 200) {
          commit("setCreateGeneralUser", response.data.results);
        }
      } else {
        commit("setCreateGeneralUser", {});
      }
    } catch (error) {
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: error.response.data.message,
      };
      this.dispatch("alertNow", info);
    }
  },
  async getGeneralConventionUserList({ commit }, data) {
    try {
      const response = await axios.post(
        `${baseUrl}generalconventions/listOfGeneralConvetionUser`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      commit("setCreateGeneralUserList", response.data);
    } catch (error) {
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: error.response.data.message,
      };
      this.dispatch("alertNow", info);
    }
  },
  async getGeneralConventionVote({ commit }, data) {
    try {
      const response = await axios.post(
        `${baseUrl}generalconventions/listOfGeneralConvetionUser`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      commit("setCreateGeneralUserList", response.data);
    } catch (error) {
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: error.response.data.message,
      };
      this.dispatch("alertNow", info);
      if (error.response.status == 403) {
        store.dispatch("logoutUser");
      }
    }
  },
  async getGeneralSingleConventionVote({ commit }, data) {
    try {
      const response = await axios.get(
        `${baseUrl}generalconventions/singleVote/${data}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      commit("setGeneralVoteResult", response.data);
    } catch (error) {
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: error.response.data.message,
      };
      this.dispatch("alertNow", info);
      if (error.response.status == 403) {
        store.dispatch("logoutUser");
      }
    }
  },
  async createGeneralConventionVote({ commit }, data) {
    try {
      let ind = data.length;
      let response;
      for await (let ele of data) {
        response = await axios.post(
          `${baseUrl}generalconventions/createVote`,
          ele,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(secureStorage.getItem("userData")).token
              }`,
            },
          }
        );
        ind -= 1;
      }
      if (ind <= 0) {
        if (response.status == 201 && response.status == 200) {
          let info = {
            icon: "success",
            status: true,
            title: `Success`,
            message: response.data.message,
          };
          this.dispatch("alertNow", info);
        }
        commit("setCreateGeneralUserList", response.data);
      }
    } catch (error) {
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: error.response.data.message,
      };
      this.dispatch("alertNow", info);
    }
  },
  async createVoteList({ commit }, data) {
    try {
      let ind = data.length;
      let response;
      for await (let ele of data) {
        response = await axios.post(
          `${baseUrl}generalconventions/votelist`,
          ele,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(secureStorage.getItem("userData")).token
              }`,
            },
          }
        );
        ind -= 1;
      }
      if (ind <= 0) {
        if (response.status == 201) {
          let info = {
            icon: "success",
            status: true,
            title: `Success`,
            message: response.data.message,
          };
          this.dispatch("alertNow", info);
        }
        commit("setCreateGeneralUserList", response.data);
      }
    } catch (error) {
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: error.response.data.message,
      };
      this.dispatch("alertNow", info);
    }
  },
  async generateVoteList({ commit }, data) {
    try {
      let response = await axios.post(
        `${baseUrl}generalconventions/votelist`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );

      commit("setGeneralVoteResults", response.data);
    } catch (error) {
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: error.response.data.message,
      };
      this.dispatch("alertNow", info);
    }
  },
  async deleteGeneralData({ commit }, data) {
    try {
      console.log(data);
      let response = await axios.delete(
        `${baseUrl}generalconventions/deleteVote/${data}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      commit("setGeneralVoteResult", response.data);
    } catch (error) {
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: error.response.data.message,
      };
      this.dispatch("alertNow", info);
    }
  },
};

const mutations = {
  setCreateGeneral: (state, data) => (state.generalConvention = data),
  setCreateGeneralUser: (state, data) => (state.generalConventionUser = data),
  setCreateGeneralUserList: (state, data) =>
    (state.generalConventionUsers = data),
  setFilterGeneral: (state, data) => (state.generalConventions = data),
  setGeneralVoteResult: (state, data) => (state.generalVoteResult = data),
  setGeneralVoteResults: (state, data) => (state.generalVoteResults = data),
  setGeneralCommitteeMember: (state, data) => (state.generalConvenstionCommitteeMember = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
