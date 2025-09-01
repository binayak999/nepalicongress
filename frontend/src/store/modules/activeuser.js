import axios from "axios";
import { baseUrl, secureStorage } from "../../main";
import router from "../../router";

const state = {
  users: [],
  user: [],
  loggedUser: undefined,
  subdomainIdentifier: null,
  optionAction: null,
  visible: null,
  visiblestatus: null,
  loading: false,
  activedatastatus: false,
  activeStatusAll: [],
  singleAciveUser: [],
  provincecount: [],
  districtcount: [],
  houseofrepresentativecount: [],
  pradeshassemblyconstituencycount: [],
  muncipalitycount: [],
  wardcount: [],
  maindistrictlist: [],
  filtercount: [],
  circularQr: undefined,
  
};

const getters = {
  allUserActive: (state) => state.users,
  singleUserActive: (state) => state.singleAciveUser,
  loggedActive: (state) => state.loggedUser,
  newUserActive: (state) => state.user,
  getSubdomainIdentifier: (state) => state.subdomainIdentifier,
  allOptionAction: (state) => state.optionAction,
  allVisible: (state) => state.visible,
  allVisibleStatus: (state) => state.visiblestatus,
  allLoadingActive: (state) => state.loading,
  allActiveDataStatus: (state) => state.activedatastatus,
  allactiveStatusAll: (state) => state.activeStatusAll,

  allprovincecount: (state) => state.provincecount,
  alldistrictcount: (state) => state.districtcount,
  allhouseofrepresentativecount: (state) => state.houseofrepresentativecount,
  allpradeshassemblyconstituencycount: (state) =>
    state.pradeshassemblyconstituencycount,
  allmuncipalitycount: (state) => state.muncipalitycount,
  allwardcount: (state) => state.wardcount,

  allmaindistrict: (state) => state.maindistrictlist,
  allfiltercount: (state) => state.filtercount,

  allCircularQr: (state) => state.circularQr,
};

const actions = {
  async getQrCode({ commit }, data) {
    try {
      const res = await axios.get(`${baseUrl}qrcode`, data);
      if (res.status == 200) {
        commit("setCircularQr", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getActiveDataStatusAll({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}circular/activedataall`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      commit("setVisibleStatusAll", res.data.results);
    } catch (error) {
      console.log(error);
      commit("setVisibleStatusAll", false);
    }
  },
  async getActiveDataStatus({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}circular/activedata`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      commit("setAcitveData", res.data.results);
    } catch (error) {
      console.log(error);
      commit("setAcitveData", false);
    }
  },
  async getVisibleFunc({ commit }, data) {
    this.dispatch("loadingFunc");
    try {
      const res = await axios.post(
        `${baseUrl}circular/toggleVisibilityStatus`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      this.dispatch("getActiveDataStatus", data);
      this.dispatch("getActiveDataStatusAll");
      commit("setVisible", res.data.results);
    } catch (error) {
      console.log(error);
      commit("setVisible", false);
    }
    this.dispatch("notloadingFunc");
  },
  async getSingleActive({ commit }, data) {
    this.dispatch("loadingFunc");
    try {
      const res = await axios.get(`${baseUrl}activeuser/singleUser/${data}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      commit("setSingleActiveUser", res.data);
    } catch (error) {
      console.log(error);
      commit("setSingleActiveUser", false);
    }
    this.dispatch("notloadingFunc");
  },
  async getVisibleFuncStatus({ commit }, data) {
    try {
      this.dispatch("loadingFunc");
      const res = await axios.post(
        `${baseUrl}circular/toggleVisibility`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      this.dispatch("fetchSubDomain");
      commit("setVisibleStatus", res.data.subdomains);
    } catch (error) {
      console.log(error);
      commit("setVisibleStatus", false);
    }
    this.dispatch("notloadingFunc");
  },
  async getOptionActionFunc({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}subdomain/optionAction`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      commit("setOptionAction", res.data.results);
    } catch (error) {
      console.log(error);
      commit("setOptionAction", false);
    }
  },
  async fetchSubdomainId({ commit }, data) {
    try {
      const res = await axios.get(`${baseUrl}circular/getProviceData/${data}`);
      commit("setSubdomainData", res.data.results);
    } catch (error) {
      console.log(error);
    }
  },
  async createActiveUser({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}activeuser/create`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status === 201) {
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: `Accout Has been created`,
        };
        this.dispatch("alertNow", info);
        // router.push("/dashboard/activeloginlist").catch((err) => {
        //   console.error(err);
        // });
      }
      commit("setUser", res.data);
    } catch (error) {
      console.log(error);
      if (error.response.status == 409) {
        let info = {
          icon: "error",
          status: true,
          title: `Opps`,
          message: `Your phone or email has been already used`,
        };
        this.dispatch("alertNow", info);
      } else {
        let info = {
          icon: "error",
          status: true,
          title: `Opps`,
          message: `Something went wrong !`,
        };
        this.dispatch("alertNow", info);
      }
    }
  },
  async updateActiveUser({ commit }, data) {
    try {
      const res = await axios.put(
        `${baseUrl}activeuser/updateActiveUser`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      if (res.status === 200) {
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: `Accout Has been created`,
        };
        this.dispatch("alertNow", info);
        router.push("/dashboard/activeloginlist").catch((err) => {
          console.error(err);
        });
      }
      commit("setUser", res.data);
    } catch (error) {
      console.log(error);
      if (error.response.status == 409) {
        let info = {
          icon: "error",
          status: true,
          title: `Opps`,
          message: `Your phone or email has been already used`,
        };
        this.dispatch("alertNow", info);
      } else {
        let info = {
          icon: "error",
          status: true,
          title: `Opps`,
          message: `Something went wrong !`,
        };
        this.dispatch("alertNow", info);
      }
    }
  },
  async changeStatus({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}activeuser/accountstatus`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status === 200) {
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: res.data.message,
        };
        this.dispatch("alertNow", info);
        this.dispatch("fetchActiveUsers");
      }
      commit("setUser", res.data);
    } catch (error) {
      console.log(error);
      if (error.response.status == 409) {
        let info = {
          icon: "error",
          status: true,
          title: `Opps`,
          message: `Your phone or email has been already used`,
        };
        this.dispatch("alertNow", info);
      } else {
        let info = {
          icon: "error",
          status: true,
          title: `Opps`,
          message: `Something went wrong !`,
        };
        this.dispatch("alertNow", info);
      }
    }
  },
  async forgetPasswordActive({ commit }, data) {
    try {
      const res = await axios.post(
        `${baseUrl}activeuser/forgetpassword`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      if (res.status === 200) {
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: res.data.message,
        };
        this.dispatch("alertNow", info);
        // location.reload();
      }
      commit("setUser", res.data);
    } catch (error) {
      console.log(error);
      if (error.response.status == 409) {
        let info = {
          icon: "error",
          status: true,
          title: `Opps`,
          message: `Your phone or email has been already used`,
        };
        this.dispatch("alertNow", info);
      } else {
        let info = {
          icon: "error",
          status: true,
          title: `Opps`,
          message: `Something went wrong !`,
        };
        this.dispatch("alertNow", info);
      }
    }
  },
  async fetchActiveUsers({ commit }, data) {
    try {
      const res = await axios.get(`${baseUrl}activeuser/userlists/${data}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      commit("setActiveUser", res.data.activeusers);
    } catch (error) {
      console.log(error.response);
      commit("setActiveUser", []);
    }
  },
  async loginActiveUser({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}activeuser/login`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status === 200) {
        let info = {
          icon: "success",
          status: true,
          title: `Welcome ${res.data.user.first_name} ${res.data.user.last_name}`,
          message: "To Nepali Congress ",
        };
        this.dispatch("alertNow", info);
        commit("setUserLogged", res.data);
        location.reload();
      }
      secureStorage.setItem("activeUserData", JSON.stringify(res.data));
      this.state.loggedUser = JSON.parse(secureStorage.getItem("userData"));
    } catch (error) {
      console.log(error);
      if (error.response.status == 404) {
        let info = {
          icon: "warning",
          status: true,
          title: `Warning`,
          message: error.response.data.message,
        };

        this.dispatch("alertNow", info);
      } else {
        let info = {
          icon: "error",
          status: true,
          title: `Error`,
          subtitle: error.response.data.message,
        };
        this.dispatch("alertNow", info);
      }
    }
  },
  async loginCommitteeUser({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}activeuser/logincommittee`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status === 200) {
        let info = {
          icon: "success",
          status: true,
          title: `Welcome ${res.data.user.first_name} ${res.data.user.last_name}`,
          message: "To Nepali Congress ",
        };
        this.dispatch("alertNow", info);
        commit("setUserLogged", res.data);
        location.reload();
      }
      secureStorage.setItem("committeeMember", JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
      if (error.response.status == 404) {
        let info = {
          icon: "warning",
          status: true,
          title: `Warning`,
          message: error.response.data.message,
        };

        this.dispatch("alertNow", info);
      } else {
        let info = {
          icon: "error",
          status: true,
          title: `Error`,
          subtitle: error.response.data.message,
        };
        this.dispatch("alertNow", info);
      }
    }
  },
  async loginCardUser({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}activeuser/logincard`, data);
      if (res.status === 200) {
        let info = {
          icon: "success",
          status: true,
          title: `Welcome ${res.data.user.first_name} ${res.data.user.last_name}`,
          message: "To Nepali Congress ",
        };
        this.dispatch("alertNow", info);
        commit("setUserLogged", res.data);
        // location.reload();
      }
      secureStorage.setItem("cardUserData", JSON.stringify(res.data));
      this.state.loggedUser = JSON.parse(secureStorage.getItem("userData"));
    } catch (error) {
      console.log(error);
      if (error.response.status == 404) {
        let info = {
          icon: "warning",
          status: true,
          title: `Warning`,
          message: error.response.data.message,
        };

        this.dispatch("alertNow", info);
      } else {
        let info = {
          icon: "error",
          status: true,
          title: `Error`,
          subtitle: error.response.data.message,
        };
        this.dispatch("alertNow", info);
      }
    }
  },
  async logoutActiveUser({ commit }) {
    try {
      state.loggedUser = undefined;
      router.push("/login").catch((err) => {
        console.error(err);
      });
      commit("setUserLogged", undefined);
      secureStorage.clear();
    } catch (error) {
      console.log(error);
    }
  },
  async getprovincecount({ commit }) {
    try {
      this.dispatch("loadingFunc");
      const response = await axios.get(`${baseUrl}circular/provinceanalysis`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      commit("setProviceAnalysis", response.data);
    } catch (error) {
      console.log(error);
      commit("setProviceAnalysis", []);
    }
    this.dispatch("notloadingFunc");
  },
  async getdistrictcount({ commit }, data) {
    try {
      this.dispatch("loadingFunc");
      commit("setDistrictAnalysis", []);
      commit("setHouseOfRepresentativeAnalysis", []);
      commit("setMunicipalityAnalysis", []);
      commit("setWardAnalysis", []);
      const response = await axios.post(
        `${baseUrl}circular/districtanalysis`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      commit("setDistrictAnalysis", response.data);
    } catch (error) {
      console.log(error);
      commit("setDistrictAnalysis", []);
    }
    this.dispatch("notloadingFunc");
  },
  async gethouseofrepresentativecount({ commit }, data) {
    try {
      this.dispatch("loadingFunc");
      commit("setHouseOfRepresentativeAnalysis", []);
      commit("setMunicipalityAnalysis", []);
      commit("setWardAnalysis", []);
      const response = await axios.post(
        `${baseUrl}circular/houseofrepresentativeanalysis`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      commit("setHouseOfRepresentativeAnalysis", response.data);
    } catch (error) {
      console.log(error);
      commit("setHouseOfRepresentativeAnalysis", []);
    }
    this.dispatch("notloadingFunc");
  },
  async getpradeshassemblyconstituencycount({ commit }, data) {
    try {
      this.dispatch("loadingFunc");
      commit("setPradeshAssemblyConstituencyCountAnalysis", []);
      commit("setMunicipalityAnalysis", []);
      commit("setWardAnalysis", []);
      const response = await axios.post(
        `${baseUrl}circular/pradeshassemblyconstituencyanalysis`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      commit("setPradeshAssemblyConstituencyCountAnalysis", response.data);
    } catch (error) {
      console.log(error);
      commit("setPradeshAssemblyConstituencyCountAnalysis", []);
    }
    this.dispatch("notloadingFunc");
  },
  async getmunicipality({ commit }, data) {
    try {
      this.dispatch("loadingFunc");
      commit("setMunicipalityAnalysis", []);
      commit("setWardAnalysis", []);
      const response = await axios.post(
        `${baseUrl}circular/municipalityanalysis`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      commit("setMunicipalityAnalysis", response.data);
    } catch (error) {
      console.log(error);
      commit("setMunicipalityAnalysis", []);
    }
    this.dispatch("notloadingFunc");
  },
  async getWard({ commit }, data) {
    this.dispatch("loadingFunc");
    commit("setWardAnalysis", []);
    try {
      console.log(data);
      const response = await axios.post(
        `${baseUrl}circular/wardanalysis`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      commit("setWardAnalysis", response.data);
    } catch (error) {
      console.log(error);
      commit("setWardAnalysis", []);
    }
    this.dispatch("notloadingFunc");
  },
  async getMainDistrict({ commit }) {
    try {
      this.dispatch("loadingFunc");
      const response = await axios.get(
        `${baseUrl}circular/maindistrict`,

        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      commit("setMainDistrict", response.data);
    } catch (error) {
      console.log(error);
    }
    this.dispatch("notloadingFunc");
  },
  async getFilterCount({ commit }, data) {
    this.dispatch("loadingFunc");
    try {
      console.log(data);
      const response = await axios.post(
        `${baseUrl}circular/checkTheLimit`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      commit("setFilterData", response.data);
    } catch (error) {
      console.log(error);
    }
    this.dispatch("notloadingFunc");
  },
  loadingFunc({ commit }) {
    commit("setLoadingActiveStatus", true);
  },
  notloadingFunc({ commit }) {
    commit("setLoadingActiveStatus", false);
  },
};

const mutations = {
  setActiveUser: (state, activeuser) => (state.users = activeuser),
  setOptionAction: (state, optionaction) => (state.optionAction = optionaction),
  setUserLogged: (state) => state.loggedUser,
  setSubdomainData: (state, data) => (state.subdomainIdentifier = data),
  setLoadingActiveStatus: (state, data) => (state.loading = data),
  setVisible: (state, data) => (state.visible = data),
  setVisibleStatus: (state, data) => (state.visiblestatus = data),
  setVisibleStatusAll: (state, data) => (state.activeStatusAll = data),
  setAcitveData: (state, data) => (state.activedatastatus = data),
  setSingleActiveUser: (state, data) => (state.singleAciveUser = data),

  setProviceAnalysis: (state, data) => (state.provincecount = data),
  setDistrictAnalysis: (state, data) => (state.districtcount = data),
  setHouseOfRepresentativeAnalysis: (state, data) =>
    (state.houseofrepresentativecount = data),
  setPradeshAssemblyConstituencyCountAnalysis: (state, data) =>
    (state.pradeshassemblyconstituencycount = data),
  setMunicipalityAnalysis: (state, data) => (state.muncipalitycount = data),
  setWardAnalysis: (state, data) => (state.wardcount = data),
  setFilterData: (state, data) => (state.filtercount = data),
  setMainDistrict: (state, data) => (state.maindistrictlist = data),

  setCircularQr: (state, data) => (state.circularQr = data),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
