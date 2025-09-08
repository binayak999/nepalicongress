import axios from "axios";
import { baseUrl, secureStorage } from "../../main";
import router from "../../router";

const state = {
  subdomains: [],
  users: [],
  members: [],
  success: [],
  user: [],
  subdomain: [],
  subdomainspecific: [],
  subdomainspecificchetra: [],
  subdomainsingle: [],
  loggedUser: undefined,
  loadingSubdomain: true,
  subdomainProfile: [],
  chetra: [],
  optionAction: false,
  onlinemember: undefined,
  jansasamparkaMember: undefined,
  importData: undefined,
};

const getters = {
  allSubdomain: (state) => state.subdomains,
  allUser: (state) => state.users,
  allMember: (state) => state.members,
  logged: (state) => state.loggedUser,
  newUser: (state) => state.user,
  subdomainAll: (state) => state.subdomain,
  chetraAll: (state) => state.chetra,
  subdomainSpeicfic: (state) => state.subdomainspecific,
  subdomainSpeicficChetra: (state) => state.subdomainspecificchetra,
  subdomainSingle: (state) => state.subdomainsingle,
  allloadingSubdomain: (state) => state.loadingSubdomain,
  allsubdomainProfile: (state) => state.subdomainProfile,
  optionActionUpdate: (state) => state.subdomainProfile,
  allOnlineMember: (state) => state.onlinemember,
  allJanasamparkaMember: (state) => state.jansasamparkaMember,
  allImportData: (state) => state.importData,
};

const actions = {
  async loginUser({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}user/login`, data);
      if (res.status === 200) {
        let info = {
          icon: "success",
          status: true,
          title: `Welcome ${res.data.user.first_name} ${res.data.user.last_name}`,
          message: "To Nepali Congress ",
        };
        this.dispatch("alertNow", info);
        commit("setUserLogged", res.data);
        if (secureStorage.getItem("registerAsMember")) {
          router.push("/registermember").catch((err) => {
            console.error(err);
          });
        } else {
          router.push("/").catch((err) => {
            console.error(err);
          });
        }
      }
      secureStorage.setItem("userData", JSON.stringify(res.data));
      this.state.loggedUser = JSON.parse(secureStorage.getItem("userData"));
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status == 443) {
        let info = {
          icon: "warning",
          status: true,
          title: `Warning`,
          message: "Please verify your account",
        };
        secureStorage.setItem("input", data.input),
          router.push("/verification");
        this.dispatch("resendOTP");
        this.dispatch("alertNow", info);
      } else if (error.response.status == 403) {
        let info = {
          icon: "warning",
          status: true,
          title: `Warning`,
          message: error.response.data.message,
        };
        secureStorage.setItem("input", data.input),
          // this.dispatch("resendOTP");
          this.dispatch("alertNow", info);
      } else {
        let info = {
          icon: "error",
          status: true,
          title: `Error`,
          message: "Username Password Not Matched",
        };
        this.dispatch("alertNow", info);
      }
    }
  },
  async loginSubdomain({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}user/loginsub`, data);
      if (res.status === 200) {
        let info = {
          icon: "success",
          status: true,
          title: `Welcome ${res.data.user.name}`,
          message: "To Nepali Congress",
        };
        this.dispatch("alertNow", info);
        commit("setUserLogged", res.data);
        router.push("/").catch((err) => {
          console.error(err);
        });
      }
      secureStorage.setItem("userData", JSON.stringify(res.data));
      this.state.loggedUser = JSON.parse(secureStorage.getItem("userData"));
    } catch (error) {
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: "Username Password Not Matched",
      };
      this.dispatch("alertNow", info);
    }
  },
  async loginGeneralConvention({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}generalconventions/login`, data);
      if (res.status === 200) {
        let info = {
          icon: "success",
          status: true,
          title: `Welcome ${res.data.user.first_name}`,
          message: "To Nepali Congress",
        };
        this.dispatch("alertNow", info);
        commit("setUserLogged", res.data);
        router.push("/vote-result-entry").catch((err) => {
          console.error(err);
        });
      }
      secureStorage.setItem("userData", JSON.stringify(res.data));
      this.state.loggedUser = JSON.parse(secureStorage.getItem("userData"));
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
  async logoutUser({ commit }) {
    try {
      const res = await axios.post(
        `${baseUrl}user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      if (res.status === 200) {
        state.loggedUser = undefined;
        router.push("/login").catch((err) => {
          console.error(err);
        });
        commit("setUserLogged", undefined);
        secureStorage.clear();
      }
    } catch (error) {
      console.log(error);
      // Clear storage if token is expired (401) or unauthorized (403)
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        state.loggedUser = undefined;
        router.push("/login").catch((err) => {
          console.error(err);
        });
        commit("setUserLogged", undefined);
        secureStorage.clear();

        let info = {
          icon: "warning",
          status: true,
          title: `Session Expired`,
          message: "Your session has expired. Please login again.",
        };
        this.dispatch("alertNow", info);
      } else {
        // For other errors, still log out locally
        state.loggedUser = undefined;
        router.push("/login").catch((err) => {
          console.error(err);
        });
        commit("setUserLogged", undefined);
        secureStorage.clear();
      }
    }
  },
  async fetchSubDomain({ commit }) {
    try {
      this.dispatch("notloadingsubdomain");
      const res = await axios.get(`${baseUrl}subdomain`);
      commit("setSubDomain", res.data.subdomains);
    } catch (error) {
      console.log(error.response);
      commit("setSubDomain", []);
    }
    this.dispatch("loadingsubdomain");
  },
  async updateOptionAction({ commit }, data) {
    try {
      this.dispatch("notloadingsubdomain");
      const res = await axios.post(`${baseUrl}subdomain/updatedAction`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      commit("setSubDomain", res.data.subdomains);
    } catch (error) {
      console.log(error);
    }
    this.dispatch("loadingsubdomain");
  },
  async updateShowPublic({ commit }, data) {
    try {
      this.dispatch("notloadingsubdomain");
      const res = await axios.post(
        `${baseUrl}subdomain/updatedShowPublic`,
        data,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      commit("setSubDomain", res.data.subdomains);
    } catch (error) {
      console.log(error);
    }
    this.dispatch("loadingsubdomain");
  },
  async fetchChetra({ commit }, data) {
    try {
      const res = await axios.get(`${baseUrl}subdomain/chetra/${data}`);
      commit("setChetra", res.data.subdomains);
    } catch (error) {
      console.log(error.response);
      commit("setChetra", []);
    }
  },
  async fetchSubDomainSpecific({ commit }) {
    commit("setSubDomainSpecific", []);
    this.dispatch("loadingsubdomain");
    try {
      const res = await axios.get(`${baseUrl}subdomain/specific`);
      commit("setSubDomainSpecific", res.data.subdomains);
    } catch (error) {
      console.log(error.response);
      commit("setSubDomainSpecific", []);
    }
    this.dispatch("notloadingsubdomain");
  },
  async fetchSubDomainSpecificGroup({ commit }) {
    commit("setSubDomainSpecific", []);
    this.dispatch("loadingsubdomain");
    try {
      const res = await axios.get(`${baseUrl}subdomain/specificcategory`);
      commit("setSubDomainSpecific", res.data.subdomains);
    } catch (error) {
      console.log(error.response);
      commit("setSubDomainSpecific", []);
    }
    this.dispatch("notloadingsubdomain");
  },

  async fetchSubDomainZilla({ commit }) {
    this.dispatch("loadingsubdomain");
    try {
      const res = await axios.get(`${baseUrl}subdomain/zilla`);
      commit("setSubDomainSpecific", res.data.subdomains);
    } catch (error) {
      console.log(error.response);
    }
    this.dispatch("notloadingsubdomain");
  },
  async fetchSubDomainChetra({ commit }) {
    this.dispatch("loadingsubdomain");
    try {
      const res = await axios.get(`${baseUrl}subdomain/chetra`);
      commit("setSubDomainSpecificChetra", res.data.subdomains);
    } catch (error) {
      console.log(error.response);
    }
    this.dispatch("notloadingsubdomain");
  },
  async fetchUsers({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}user/users`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      commit("setUsers", res.data.users);
    } catch (error) {
      console.log(error.response);
      commit("setUsers", []);
    }
  },
  async fetchMembers({ commit }) {
    try {
      let res;
      if (
        JSON.parse(secureStorage.getItem("userData")).user.role == "subdomain"
      ) {
        res = await axios.get(`${baseUrl}user/members`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      } else {
        res = await axios.get(`${baseUrl}user/membersadmin`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
      }

      commit("setMembers", res.data.member);
    } catch (error) {
      console.log(error.response);
      commit("setMembers", []);
    }
  },
  async fetchSubdomainProfile({ commit }) {
    try {
      let res = await axios.get(`${baseUrl}subdomain/profile`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      commit("setSubdoaminProfile", res.data);
    } catch (error) {
      console.log(error.response);
      commit("setSubdoaminProfile", []);
    }
  },
  async fetchSubdomainProfileCard({ commit }) {
    try {
      let res = await axios.get(`${baseUrl}subdomain/profileSub`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("cardUserData")).token
          }`,
        },
      });
      commit("setSubdoaminProfile", res.data);
    } catch (error) {
      console.log(error.response);
      commit("setSubdoaminProfile", []);
    }
  },

  async createSubDomain({ commit }, data) {
    try {
      let image;
      let imageCond = true;
      if (data.image != null) {
        imageCond = false;
        image = [];
        let fileUpload = new FormData();
        fileUpload.append("file", data.image);
        fileUpload.append("assignedTo", data.name);
        fileUpload.append("imageFile", "subdomain");
        fileUpload.append("fileType", "images");

        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.status === 201) {
          image.push({ fileUrl: res.data.filePath });
          imageCond = true;
        }
      }

      delete data["image"];

      data = Object.assign(data, { image });

      if (imageCond) {
        const res = await axios.post(`${baseUrl}subdomain/create`, data, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
        if (res.status === 201) {
          router.push("/dashboard/subdomain").catch((err) => console.log(err));
        }
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: `${data.name} has been successfully created`,
        };
        this.dispatch("alertNow", info);
        commit("setSuccess", "Successfully Added");
      }
    } catch (error) {
      console.log(error.response.status);
      commit("setSuccess", "Was Unsuccessful");

      let info = {
        icon: "error",
        status: true,
        title: `Opps`,
        message: `Something went wrong !`,
      };
      this.dispatch("alertNow", info);
    }
  },

  async updateSubdomain({ commit }, data) {
    try {
      let image = data.oldImage;
      if (data.image != null) {
        image = [];
        let fileUpload = new FormData();
        fileUpload.append("file", data.image);
        fileUpload.append("assignedTo", data.name);
        fileUpload.append("imageFile", "subdomain");
        fileUpload.append("fileType", "images");

        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.status === 201) {
          image.push({ fileUrl: res.data.filePath });
        }
      }

      delete data["image"];
      delete data["oldImage"];
      data = Object.assign(data, { image });

      const res = await axios.post(`${baseUrl}subdomain/update`, data, {
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
          message: `${data.name} has been successfully updated`,
        };
        this.dispatch("alertNow", info);
        router.push("/dashboard/subdomain").catch((err) => console.log(err));
      }
      commit("setSuccess", "Successfully Added");
    } catch (error) {
      console.log(error.response.status);
      commit("setSuccess", "Was Unsuccessful");
      let info = {
        icon: "error",
        status: true,
        title: `Opps`,
        message: `Something went wrong !`,
      };
      this.dispatch("alertNow", info);
    }
  },
  async updateSubdomainBySubdomain({ commit }, data) {
    try {
      let image = data.oldImage;
      if (data.image != null) {
        image = [];
        let fileUpload = new FormData();
        fileUpload.append("file", data.image);
        fileUpload.append("assignedTo", data.name);
        fileUpload.append("imageFile", "subdomain");
        fileUpload.append("fileType", "images");

        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.status === 201) {
          image.push({ fileUrl: res.data.filePath });
        }
      }

      delete data["image"];
      delete data["oldImage"];
      data = Object.assign(data, { image });

      const res = await axios.post(`${baseUrl}subdomain/update`, data, {
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
          message: `${data.name} has been successfully updated`,
        };
        this.dispatch("alertNow", info);
        router
          .push("/dashboard/updateSubdomain")
          .catch((err) => console.log(err));
      }
      commit("setSuccess", "Successfully Added");
    } catch (error) {
      console.log(error.response.status);
      commit("setSuccess", "Was Unsuccessful");
      let info = {
        icon: "error",
        status: true,
        title: `Opps`,
        message: `Something went wrong !`,
      };
      this.dispatch("alertNow", info);
    }
  },

  async createUser({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}user/register`, data);
      if (res.status === 201) {
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: `Please enter the otp code to verify your account`,
        };
        this.dispatch("alertNow", info);
        router.push("/verification").catch((err) => console.log(err));
      }
      secureStorage.setItem("input", data.phone);
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
  async verifyOtp({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}user/verify`, data);
      if (res.status === 200) {
        router.push("/login").catch((err) => console.log(err));
        secureStorage.removeItem("input");
        commit("setSuccess", "Successfully Verified");
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: `You have been successfully verified`,
        };
        this.dispatch("alertNow", info);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async updateAsMember({ commit }, data) {
    let res;
    try {
      let fileUpload = new FormData();
      fileUpload.append("citizenship_front", data.citizenship_front);
      fileUpload.append("citizenship_back", data.citizenship_back);
      fileUpload.append("passportphoto", data.passportphoto);
      fileUpload.append("applyMemberShipFor", data.applyMemberShipFor);

      res = await axios.put(`${baseUrl}user/applyformembership`, fileUpload, {
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
          message: `Thanks Applying You Will be notified soon`,
        };
        this.dispatch("alertNow", info);
        commit("setSuccess", "Successfully Verified");
        router.push("/").catch((error) => console.log(error));
      } else {
        let info = {
          icon: "warning",
          status: true,
          title: `Error`,
          message: `You have already Applied`,
        };
        this.dispatch("alertNow", info);
      }
    } catch (error) {
      console.log(error);
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: `Something went wrong !`,
      };
      this.dispatch("alertNow", info);
    }
  },
  async subdomainFrontend({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}subdomain/frontend`);
      if (res.status == 200) {
        // console.log(res.data);
        commit("setSubDomainFrontend", res.data.subdomain);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async subdomainFrontendSingle({ commit }, data) {
    state.subdomainsingle = [];
    try {
      const res = await axios.get(`${baseUrl}subdomain/frontend/${data}`);
      if (res.status == 200) {
        // console.log(res.data);
        commit("setSubDomainFrontendSingle", res.data.subdomain);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async subdomainDashboardSingle({ commit }, data) {
    try {
      const res = await axios.get(`${baseUrl}subdomain/dashbaord/${data}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status == 200) {
        // console.log(res.data);
        commit("setSubDomainFrontendSingle", res.data.subdomain);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async forgetPassword({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}user/forgetPassword`, {
        input: data,
      });
      if (res.status === 200) {
        commit("setSuccess", "Success");
        router.push("/forgetpassword").catch((error) => console.log(error));
        secureStorage.setItem("input", data);

        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: `Please enter the otp to change the password`,
        };
        this.dispatch("alertNow", info);
      }
    } catch (error) {
      console.log(error);
      let info = {
        icon: "error",
        status: true,
        title: `Opps`,
        message: `Something went wrong !`,
      };
      this.dispatch("alertNow", info);
    }
  },
  async forgetNewPassword({ commit }, data) {
    try {
      const res = await axios.put(`${baseUrl}user/updatePassword`, data);
      if (res.status === 200) {
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: `Your Password Has Been Updated`,
        };
        this.dispatch("alertNow", info);
        commit("setSuccess", "Success");
        router.push("/login").catch((error) => console.log(error));
        secureStorage.removeItem("input");
      }
    } catch (error) {
      console.log(error);
      let info = {
        icon: "error",
        status: true,
        title: `Opps`,
        message: `Something went wrong !`,
      };
      this.dispatch("alertNow", info);
    }
  },
  async resendOTP({ commit }) {
    try {
      const res = await axios.post(`${baseUrl}user/resendotp`, {
        input: secureStorage.getItem("input"),
      });
      if (res.status === 200) {
        commit("setSuccess", "Success");
        router.push("/login").catch((error) => console.log(error));
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: `New OTP has Been Sent`,
        };
        this.dispatch("alertNow", info);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        let info = {
          icon: "error",
          status: true,
          title: `Opps`,
          message: `Your OTP is Incorrect`,
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
  async approveMember({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}user/approveMember`, data, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status === 200) {
        commit("setSuccess", "Success");
        router.push("/dashboard/members").catch((error) => console.log(error));
        this.dispatch("fetchMembers");
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: `User has been approved for member for subdomain`,
        };
        this.dispatch("alertNow", info);
      }
    } catch (error) {
      console.log(error);
      let info = {
        icon: "error",
        status: true,
        title: `Opps`,
        message: `Something went wrong !`,
      };
      this.dispatch("alertNow", info);
    }
  },
  async getOnlineMember({ commit }, data) {
    try {
      const response = await axios.get(`${baseUrl}member/onlineMember/${data}`);
      if (response.status === 200) {
        commit("setOnlineMember", response.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getOnlineMemberUser({ commit }, data) {
    try {
      const response = await axios.get(
        `${baseUrl}member/onlineMemberUser/${data}`
      );
      if (response.status === 200) {
        commit("setOnlineMember", response.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async approveOnlineMember({ commit }, data) {
    try {
      const response = await axios.get(
        `${baseUrl}member/approveOnlineMember/${data}`
      );
      if (response.status === 200) {
        commit("setOnlineMember", response.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async importCsvFile({ commit }, data) {
    try {
      const response = await axios.put(`${baseUrl}circular/importData`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (response.status === 200) {
        console.log(response, "response");
        commit("setImportData", response?.data?.renewData);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async approveJanasamparkaMember({ commit }, data) {
    try {
      const response = await axios.put(
        `${baseUrl}member/approveJanasamparkarMembership`,
        {
          _id: data,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      if (response.status === 200) {
        commit("setJanasamparkaMember", response.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async disapproveJanasamparkaMember({ commit }, data) {
    try {
      const response = await axios.put(
        `${baseUrl}member/disApproveJanasamparkarMembership`,
        {
          _id: data,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      if (response.status === 200) {
        commit("setJanasamparkaMember", response.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async loadingsubdomain({ commit }) {
    commit("loadingMutSubdomain", true);
  },
  async notloadingsubdomain({ commit }) {
    commit("loadingMutSubdomain", false);
  },
  async postOnlineMember({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}member/create`, data);
      if (res.status == 201) {
        window.open(res.data.results.paymentUrl, "_self");
      }
      commit("setOnlineMember", res.data.results[0]);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  },

  async postOnlineMemberJana({ commit }, data) {
    try {
      console.log("data", data);
      const res = await axios.post(
        `${baseUrl}member/createjanasamparkarmembership `,
        data
      );
      if (res.status == 201) {
        window.open(res.data.results.paymentUrl, "_self");
      }
      commit("setOnlineMember", res.data.results[0]);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  },

  async rePayOnlineMember({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}member/reIntiatePayment`, data);
      if (res.status == 200 || res.status == 201) {
        if (res.data.results.paymentUrl == "https://nepalicongress.org") {
          alert("You have already paid for the member");
        } else {
          window.open(res.data.results.paymentUrl, "_self");
        }
      }
      commit("setOnlineMember", res.data.results[0]);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  },
  async paidNotAMember({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}member/paidNotAMember`, data);
      if (res.status == 200) {
        console.log(res.data.results.paymentUrl);
        window.open(res.data.results.paymentUrl, "_self");
      }
      commit("setOnlineMember", res.data.results[0]);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  },
  async verifyOnlineMember({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}member/onlineMemberVerify`, data);
      if (res.status == 200) {
        commit("setOnlineMember", res.data.message);
      }
    } catch (error) {
      console.log(error);
      commit("setOnlineMember", error.response.data.message);
    }
  },
  async postSmsOnlineMemberUserSMS({ commit }, data) {
    try {
      const res = await axios.get(
        `${baseUrl}member/onlineMemberUserSMS/${data}`
      );
      if (res.status == 200) {
        commit("setOnlineMember", res.data.message);
      }
    } catch (error) {
      console.log(error);
      commit("setOnlineMember", error.response.data.message);
    }
  },
  async deleteUser({ commit }) {
    try {
      const res = await axios.delete(`${baseUrl}user/deleteAccount`, {
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
          message: `User has been deleted`,
        };
        this.dispatch("alertNow", info);
        this.dispatch("fetchUsers");
      }
      commit("setSuccess", "Successfully Deleted");
    } catch (error) {
      console.log(error);
      let info = {
        icon: "error",
        status: true,
        title: `Opps`,
        message: `Something went wrong !`,
      };
      this.dispatch("alertNow", info);
      commit("setSuccess", "Was Unsuccessful");
    }
  },
};

const mutations = {
  setSubDomain: (state, subdomain) => (state.subdomains = subdomain),
  setChetra: (state, subdomain) => (state.chetra = subdomain),
  setSubDomainSpecific: (state, subdomain) =>
    (state.subdomainspecific = subdomain),
  setSubDomainSpecificChetra: (state, subdomain) =>
    (state.subdomainspecificchetra = subdomain),
  setUserLogged: (state, user) => (state.loggedUser = user),
  setUsers: (state, user) => (state.users = user),
  setMembers: (state, member) => (state.members = member),
  setUser: (state, member) => (state.newUser = member),
  setSuccess: (state, response) => (state.success = response),
  setSubDomainFrontend: (state, response) => (state.subdomain = response),
  setSubDomainFrontendSingle: (state, response) =>
    (state.subdomainsingle = response),
  loadingMutSubdomain: (state, logo) => (state.loadingSubdomain = logo),
  setSubdoaminProfile: (state, profile) => (state.subdomainProfile = profile),
  setOnlineMember: (state, member) => (state.onlinemember = member),
  setJanasamparkaMember: (state, member) =>
    (state.jansasamparkaMember = member),
  setImportData: (state, member) => (state.importData = member),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
