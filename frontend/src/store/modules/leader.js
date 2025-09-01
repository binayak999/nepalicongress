import axios from "axios";
import { baseUrl, secureStorage } from "../../main";
import router from "../../router";

const state = {
  leaders: [],
  committees: [],
  discommittees: [],
  committeeFrontend: [],
  discommitteeFrontend: [],
  success: "",
  singleCommittee: [],
  singleDisCommittee: [],
  centraloffice: [],
  singleCentraloffice: [],
  centralFrontend: [],
};

const getters = {
  allLeader: (state) => state.leaders,
  allCommittee: (state) => state.committees,
  allDisCommittee: (state) => state.discommittees,
  allCommitteefrontend: (state) => state.committeeFrontend,
  allSingleCommittee: (state) => state.singleCommittee,
  allSingleDisCommittee: (state) => state.singleDisCommittee,
  allCentral: (state) => state.centraloffice,
  allCentralfrontend: (state) => state.centralFrontend,
  allSingleCentral: (state) => state.singleCentraloffice,
  allDisCommitteeFrontend: (state) => state.discommitteeFrontend,
};

const actions = {
  async fetchLeader({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}leader`);
      // console.log(res.data.leaders);
      commit("setLeader", res.data.leaders);
    } catch (error) {
      console.log(error.response);
      commit("setLeader", []);
    }
  },
  async fetchCommittee({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}centralcommittee`);
      // console.log(res.data.leaders);
      commit("setCommitttee", res.data.centralcommittee);
    } catch (error) {
      console.log(error.response);
      commit("setCommitttee", []);
    }
  },
  async fetchSingleCommittee({ commit }, data) {
    try {
      const res = await axios.get(`${baseUrl}centralcommittee/single/${data}`);
      // console.log(res.data.leaders);
      commit("setCommitteeSingle", res.data.centralcommittee);
    } catch (error) {
      console.log(error.response);
      commit("setCommitteeSingle", []);
    }
  },

  async fetchCommitteeFrontend({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}centralcommittee/frontend`);
      // console.log(res.data.leaders);
      if (res.status === 200) {
        commit("setCommittteeFrontend", res.data.centralcommittee);
      }
    } catch (error) {
      console.log(error.response);
      commit("setCommittteeFrontend", []);
    }
  },
  async fetchDisCommitteeFrontend({ commit }, data) {
    try {
      const res = await axios.get(
        `${baseUrl}districtcommittee/frontend/${data}`
      );
      // console.log(res.data.leaders);
      if (res.status === 200) {
        commit(
          "setDistrictCommitteeFrontend",
          res.data.districtcentralcommittee
        );
      }
    } catch (error) {
      console.log(error.response);
      commit("setCommittteeFrontend", []);
    }
  },
  async createLeader({ commit }, data) {
    try {
      let images = [];

      if (data.images.length == undefined) {
        let fileUpload = new FormData();
        fileUpload.append("file", data.images);
        fileUpload.append("assignedTo", data.eng.title);
        fileUpload.append("imageFile", "leaders");
        fileUpload.append("fileType", "images");
        console.log(fileUpload);
        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.status === 201) {
          images.push({ fileUrl: res.data.filePath });
        }
      }
      delete data["images"];
      delete data["imageFile"];
      data = Object.assign(data, { images });
      setTimeout(async () => {
        const res = await axios.post(`${baseUrl}leader/create`, data, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
        if (res.status === 201) {
          router.push("/dashboard/leaders").catch((err) => {
            console.error(err);
          });
        }
        commit("setSuccess", "Successfully Report Added");
      }, 2000);
    } catch (error) {
      console.log(error);
      commit("setSuccess", "Was Report Unsuccessful");
    }
  },

  async updateCentralCommittee({ commit }, data) {
    try {
      let images = data.oldImage;
      let attachment = data.oldAttachment;

      let attachupd = 0;

      if (data.attachment != undefined) {
        attachupd = data.attachment.length;
      }
      if (data.images.length == undefined) {
        images = [];
        let fileUpload = new FormData();
        fileUpload.append("file", data.images);
        fileUpload.append("assignedTo", data.eng.title);
        fileUpload.append("imageFile", "centralcommittee");
        fileUpload.append("fileType", "images");

        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.status === 201) {
          images.push({ fileUrl: res.data.filePath });
        }
      }

      if (attachupd > 0) {
        data.attachment.forEach(async (element) => {
          let fileUpload = new FormData();
          fileUpload.append("file", element);
          fileUpload.append("assignedTo", data.eng.title);
          fileUpload.append("imageFile", "centralcommittee");
          fileUpload.append("fileType", "pdf");

          const res = await axios.post(
            `${baseUrl}fileupload/postimage`,
            fileUpload,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          if (res.status === 201) {
            attachment.push({ fileUrl: res.data.filePath });
            attachupd -= 1;
          }
        });
      }

      delete data["images"];
      delete data["attachment"];
      delete data["imageFile"];
      delete data["oldImage"];
      delete data["oldAttachment"];

      data = Object.assign(data, { images }, { attachment });

      commit("setSuccess", "Successfully Central Committee Added");

      let box = setInterval(async () => {
        if (attachupd === 0) {
          clearInterval(box);
          const res = await axios.put(
            `${baseUrl}centralcommittee/updateCommittee`,
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
            router.push("/dashboard/centralcommittee").catch((err) => {
              console.error(err);
            });
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Successfully updated central committee`,
            };
            this.dispatch("alertNow", info);
          }
          commit("setSuccess", "Successfully Central Committee Added");
        }
      }, 2000);
    } catch (error) {
      console.log(error);
      commit("setSuccess", "Was Central Committee Unsuccessful To Add");
      let info = {
        icon: "error",
        status: true,
        title: `Opps`,
        message: `Something went wrong`,
      };
      this.dispatch("alertNow", info);
    }
  },

  async createCommittee({ commit }, data) {
    try {
      let images = [];
      let attachment = [];
      let attachupd = 0;
      if (data.attachment.length > 0) {
        attachupd = data.attachment.length;
      }

      if (data.images.length == undefined) {
        let fileUpload = new FormData();
        fileUpload.append("file", data.images);
        fileUpload.append("assignedTo", data.eng.title);
        fileUpload.append("imageFile", "centralcommittee");
        fileUpload.append("fileType", "images");

        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.status === 201) {
          images.push({ fileUrl: res.data.filePath });
        }
      }
      if (data.attachment.length > 0) {
        data.attachment.forEach(async (element) => {
          let fileUpload = new FormData();
          fileUpload.append("file", element);
          fileUpload.append("assignedTo", data.eng.title);
          fileUpload.append("imageFile", "centralcommittee");
          fileUpload.append("fileType", "pdf");

          const res = await axios.post(
            `${baseUrl}fileupload/postimage`,
            fileUpload,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          if (res.status === 201) {
            attachment.push({ fileUrl: res.data.filePath });
            attachupd -= 1;
          }
        });
      }

      delete data["images"];
      delete data["imageFile"];
      delete data["attachment"];
      data = Object.assign(data, { images }, { attachment });
      let box = setInterval(async () => {
        if (attachupd === 0) {
          clearInterval(box);
          const res = await axios.post(
            `${baseUrl}centralcommittee/create`,
            data,
            {
              headers: {
                Authorization: `Bearer ${
                  JSON.parse(secureStorage.getItem("userData")).token
                }`,
              },
            }
          );
          if (res.status === 201) {
            router.push("/dashboard/centralcommittee").catch((err) => {
              console.error(err);
            });
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Added in Central Working Committe`,
            };
            this.dispatch("alertNow", info);
          }
        }
        commit("setSuccess", "Successfully Central Committee Added");
      }, 1000);
    } catch (error) {
      console.log(error);
      commit("setSuccess", "Was Central Committee Unsuccessful To Add");
      let info = {
        icon: "error",
        status: true,
        title: `Opps`,
        message: `Something Went Wrong`,
      };
      this.dispatch("alertNow", info);
    }
  },

  async deleteCommittee({ commit }, data) {
    try {
      const res = await axios.delete(
        `${baseUrl}centralcommittee/single/${data}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      if (res.status === 200) {
        this.dispatch("fetchCommittee");
        commit("setSuccess", "message");
      }
    } catch (error) {
      console.log(error);
    }
  },

  async deleteCentral({ commit }, data) {
    try {
      const res = await axios.delete(`${baseUrl}centraloffice/single/${data}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status === 200) {
        this.dispatch("fetchCentralOffice");
        commit("setSuccess", "message");
      }
    } catch (error) {
      console.log(error);
    }
  },

  async deleteLeader({ commit }, data) {
    try {
      const res = await axios.delete(`${baseUrl}leader/delete/${data}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status === 200) {
        this.dispatch("fetchLeader");
        commit("setSuccess", "message");
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: `Deleted Leader`,
        };
        this.dispatch("alertNow", info);
      }
    } catch (error) {
      console.log(error);
      let info = {
        icon: "error",
        status: true,
        title: `Error`,
        message: `Something went wrong!`,
      };
      this.dispatch("alertNow", info);
    }
  },

  async fetchSingleDisCommittee({ commit }, data) {
    try {
      const res = await axios.get(`${baseUrl}districtcommittee/single/${data}`);
      // console.log(res.data.leaders);
      commit("setDisCommitteeSingle", res.data.districtcentralcommittee);
    } catch (error) {
      console.log(error.response);
      commit("setDisCommitteeSingle", []);
    }
  },
  async fetchDisCommittee({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}districtcommittee`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      // console.log(res.data.leaders);
      commit("setDisCommitttee", res.data.districtcentralcommittee);
    } catch (error) {
      console.log(error.response);
      commit("setDisCommitttee", []);
    }
  },

  async createDisCommittee({ commit }, data) {
    try {
      let images = [];
      let attachment = [];
      let attachupd = 0;
      if (data.attachment.length > 0) {
        attachupd = data.attachment.length;
      }

      if (data.images.length == undefined) {
        let fileUpload = new FormData();
        fileUpload.append("file", data.images);
        fileUpload.append("assignedTo", data.eng.title);
        fileUpload.append("imageFile", "districtcommittee");
        fileUpload.append("fileType", "images");

        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.status === 201) {
          images.push({ fileUrl: res.data.filePath });
        }
      }
      if (data.attachment.length > 0) {
        data.attachment.forEach(async (element) => {
          let fileUpload = new FormData();
          fileUpload.append("file", element);
          fileUpload.append("assignedTo", data.eng.title);
          fileUpload.append("imageFile", "districtcommittee");
          fileUpload.append("fileType", "pdf");

          const res = await axios.post(
            `${baseUrl}fileupload/postimage`,
            fileUpload,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          if (res.status === 201) {
            attachment.push({ fileUrl: res.data.filePath });
            attachupd -= 1;
          }
        });
      }

      delete data["images"];
      delete data["imageFile"];
      delete data["attachment"];
      data = Object.assign(data, { images }, { attachment });

      let box = setInterval(async () => {
        if (attachupd === 0) {
          clearInterval(box);
          const res = await axios.post(
            `${baseUrl}districtcommittee/create`,
            data,
            {
              headers: {
                Authorization: `Bearer ${
                  JSON.parse(secureStorage.getItem("userData")).token
                }`,
              },
            }
          );
          if (res.status === 201) {
            router.push("/dashboard/workingcommittee").catch((err) => {
              console.error(err);
            });
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Added in District Working Committe`,
            };
            this.dispatch("alertNow", info);
          }
          commit("setSuccess", "Successfully District Committee Added");
        }
      }, 1000);
    } catch (error) {
      console.log(error);
      commit("setSuccess", "Was District Committee Unsuccessful To Add");
      let info = {
        icon: "error",
        status: true,
        title: `Opps`,
        message: `Something Went Wrong`,
      };
      this.dispatch("alertNow", info);
    }
  },

  async updateDisCentralCommittee({ commit }, data) {
    try {
      let images = data.oldImage;
      let attachment = data.oldAttachment;

      let attachupd = 0;

      if (data.attachment != undefined) {
        attachupd = data.attachment.length;
      }
      if (data.images.length == undefined) {
        images = [];
        let fileUpload = new FormData();
        fileUpload.append("file", data.images);
        fileUpload.append("assignedTo", data.eng.title);
        fileUpload.append("imageFile", "districtcommittee");
        fileUpload.append("fileType", "images");

        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.status === 201) {
          images.push({ fileUrl: res.data.filePath });
        }
      }

      if (attachupd > 0) {
        data.attachment.forEach(async (element) => {
          let fileUpload = new FormData();
          fileUpload.append("file", element);
          fileUpload.append("assignedTo", data.eng.title);
          fileUpload.append("imageFile", "districtcommittee");
          fileUpload.append("fileType", "pdf");

          const res = await axios.post(
            `${baseUrl}fileupload/postimage`,
            fileUpload,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          if (res.status === 201) {
            attachment.push({ fileUrl: res.data.filePath });
            attachupd -= 1;
          }
        });
      }

      delete data["images"];
      delete data["attachment"];
      delete data["imageFile"];
      delete data["oldImage"];
      delete data["oldAttachment"];

      data = Object.assign(data, { images }, { attachment });

      commit("setSuccess", "Successfully District Working Committee Added");

      let box = setInterval(async () => {
        if (attachupd === 0) {
          clearInterval(box);
          const res = await axios.put(
            `${baseUrl}districtcommittee/updateCommittee`,
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
            router.push("/dashboard/workingcommittee").catch((err) => {
              console.error(err);
            });
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Successfully updated central committee`,
            };
            this.dispatch("alertNow", info);
          }
          commit("setSuccess", "Successfully Central Committee Added");
        }
      }, 2000);
    } catch (error) {
      console.log(error);
      commit("setSuccess", "Was Central Committee Unsuccessful To Add");
      let info = {
        icon: "error",
        status: true,
        title: `Opps`,
        message: `Something went wrong`,
      };
      this.dispatch("alertNow", info);
    }
  },

  async deleteDisCommittee({ commit }, data) {
    try {
      const res = await axios.delete(
        `${baseUrl}districtcommittee/single/${data}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        }
      );
      if (res.status === 200) {
        this.dispatch("fetchDisCommittee");
        let info = {
          icon: "success",
          status: true,
          title: `Success`,
          message: `Successfully Deleted Working Committee`,
        };
        this.dispatch("alertNow", info);
        commit("setSuccess", "message");
      }
    } catch (error) {
      console.log(error);

      console.log(error.response.status);
      this.dispatch("fetchDisCommittee");
      let info = {
        icon: "error",
        status: true,
        title: `Success`,
        message: `Opps Something went wrong`,
      };
      this.dispatch("alertNow", info);
      commit("setSuccess", "message");
    }
  },

  //central office
  async createOffice({ commit }, data) {
    try {
      let images = [];
      let attachment = [];
      let attachupd = 0;

      if (data.attachment.length > 0) {
        attachupd = data.attachment.length;
      }

      if (data.images.length == undefined) {
        let fileUpload = new FormData();
        fileUpload.append("file", data.images);
        fileUpload.append("assignedTo", data.eng.title);
        fileUpload.append("imageFile", "centraloffice");
        fileUpload.append("fileType", "images");

        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.status === 201) {
          images.push({ fileUrl: res.data.filePath });
        }
      }

      if (data.attachment.length > 0) {
        data.attachment.forEach(async (element) => {
          let fileUpload = new FormData();
          fileUpload.append("file", element);
          fileUpload.append("assignedTo", data.eng.title);
          fileUpload.append("imageFile", "centraloffice");
          fileUpload.append("fileType", "pdf");

          const res = await axios.post(
            `${baseUrl}fileupload/postimage`,
            fileUpload,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          if (res.status === 201) {
            attachment.push({ fileUrl: res.data.filePath });
            attachupd -= 1;
          }
        });
      }

      delete data["images"];
      delete data["imageFile"];
      delete data["attachment"];
      data = Object.assign(data, { images }, { attachment });

      let box = setInterval(async () => {
        if (attachupd === 0) {
          clearInterval(box);
          const res = await axios.post(`${baseUrl}centraloffice/create`, data, {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(secureStorage.getItem("userData")).token
              }`,
            },
          });
          if (res.status === 201) {
            router.push("/dashboard/centraloffice").catch((err) => {
              console.error(err);
            });
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Added in Central Working Committe`,
            };
            this.dispatch("alertNow", info);
          }
          commit("setSuccess", "Successfully Central Committee Added");
        }
      }, 2000);
    } catch (error) {
      console.log(error);
      commit("setSuccess", "Was Central Committee Unsuccessful To Add");
      let info = {
        icon: "error",
        status: true,
        title: `Opps`,
        message: `Something Went Wrong`,
      };
      this.dispatch("alertNow", info);
    }
  },

  async fetchCentralOffice({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}centraloffice`);
      // console.log(res.data.leaders);
      commit("setCentral", res.data.centralcommittee);
    } catch (error) {
      console.log(error.response);
      commit("setCentral", []);
    }
  },
  async fetchSingleCentral({ commit }, data) {
    try {
      const res = await axios.get(`${baseUrl}centraloffice/single/${data}`);
      // console.log(res.data.leaders);
      commit("setCentralSingle", res.data.centralcommittee);
    } catch (error) {
      console.log(error.response);
      commit("setCentralSingle", []);
    }
  },

  async fetchCentralFrontend({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}centraloffice/frontend`);
      // console.log(res.data.leaders);
      if (res.status === 200) {
        commit("setCentralFrontend", res.data.centralcommittee);
      }
    } catch (error) {
      console.log(error.response);
      commit("setCentralFrontend", []);
    }
  },

  async updateCentralOffice({ commit }, data) {
    try {
      let images = data.oldImage;
      let attachment = data.oldAttachment;

      let attachupd = 0;

      if (data.attachment != undefined) {
        attachupd = data.attachment.length;
      }
      if (data.images.length == undefined) {
        images = [];
        let fileUpload = new FormData();
        fileUpload.append("file", data.images);
        fileUpload.append("assignedTo", data.eng.title);
        fileUpload.append("imageFile", "centraloffice");
        fileUpload.append("fileType", "images");

        const res = await axios.post(
          `${baseUrl}fileupload/postimage`,
          fileUpload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.status === 201) {
          images.push({ fileUrl: res.data.filePath });
        }
      }

      if (attachupd > 0) {
        data.attachment.forEach(async (element) => {
          let fileUpload = new FormData();
          fileUpload.append("file", element);
          fileUpload.append("assignedTo", data.eng.title);
          fileUpload.append("imageFile", "centraloffice");
          fileUpload.append("fileType", "pdf");

          const res = await axios.post(
            `${baseUrl}fileupload/postimage`,
            fileUpload,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          if (res.status === 201) {
            attachment.push({ fileUrl: res.data.filePath });
            attachupd -= 1;
          }
        });
      }

      delete data["images"];
      delete data["attachment"];
      delete data["imageFile"];
      delete data["oldImage"];
      delete data["oldAttachment"];

      data = Object.assign(data, { images }, { attachment });

      commit("setSuccess", "Successfully Central Office Committee Added");

      let box = setInterval(async () => {
        if (attachupd === 0) {
          clearInterval(box);
          const res = await axios.put(
            `${baseUrl}centraloffice/updateCentral`,
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
            router.push("/dashboard/centraloffice").catch((err) => {
              console.error(err);
            });
            let info = {
              icon: "success",
              status: true,
              title: `Success`,
              message: `Successfully updated central committee`,
            };
            this.dispatch("alertNow", info);
          }
          commit("setSuccess", "Successfully Central Committee Added");
        }
      }, 2000);
    } catch (error) {
      console.log(error);
      commit("setSuccess", "Was Central Committee Unsuccessful To Add");
      let info = {
        icon: "error",
        status: true,
        title: `Opps`,
        message: `Something went wrong`,
      };
      this.dispatch("alertNow", info);
    }
  },
};

const mutations = {
  setLeader: (state, report) => (state.leaders = report),
  setCommitttee: (state, report) => (state.committees = report),
  setDisCommitttee: (state, report) => (state.discommittees = report),
  setCommittteeFrontend: (state, report) => (state.committeeFrontend = report),
  setDistrictCommitteeFrontend: (state, report) =>
    (state.discommitteeFrontend = report),
  setCommitteeSingle: (state, committee) => (state.singleCommittee = committee),
  setDisCommitteeSingle: (state, committee) =>
    (state.singleDisCommittee = committee),
  setSuccess: (state, response) => (state.success = response),
  setCentral: (state, report) => (state.centraloffice = report),
  setCentralFrontend: (state, report) => (state.centralFrontend = report),
  setCentralSingle: (state, report) => (state.singleCentraloffice = report),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
