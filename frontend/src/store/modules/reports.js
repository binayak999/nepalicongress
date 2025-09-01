import axios from "axios";
import { baseUrl, secureStorage } from "../../main";
import router from "../../router";

const state = {
  reports: [],
  success: "",
};

const getters = {
  allReports: (state) => state.reports,
};

const actions = {
  async fetchReports({ commit }) {
    try {
      const res = await axios.get(`${baseUrl}report`);
      commit("setReports", res.data.reports);
    } catch (error) {
      console.log(error.response);
      commit("setReports", []);
    }
  },
  async postReports({ commit }, data) {
    try {
      let images = [];
      if (data.images != null) {
        data.images.forEach(async (element) => {
          let fileUpload = new FormData();
          fileUpload.append("file", element);
          fileUpload.append("assignedTo", element.title);
          fileUpload.append("imageFile", "reports");
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
        });
      }
      delete data["images"];
      delete data["imageFile"];
      data = Object.assign(data, { images });
      setTimeout(async () => {
        const res = await axios.post(`${baseUrl}report/create`, data, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(secureStorage.getItem("userData")).token
            }`,
          },
        });
        if (res.status === 201) {
          router.push("/dashboard/reports").catch((err) => {
            console.error(err);
          });
        }
        commit("setSuccess", "Successfully Report Added");
      }, 3000);
    } catch (error) {
      console.log(error);
      commit("setSuccess", "Was Report Unsuccessful");
    }
  },

  async deleteReport({ commit }, data) {
    try {
      const res = await axios.delete(`${baseUrl}report/${data}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      });
      if (res.status === 200) {
        console.log(res.data.message);
        this.dispatch("fetchReports");
        commit("setSuccess", "message");
      }
    } catch (error) {
      console.log(error);
    }
  },

  async postHackton({ commit }, data) {
    try {
      const res = await axios.post(`${baseUrl}forum/hackthon`, data);
      
      if (res.status === 200) {
        let info = {
            icon: "success",
            status: true,
            title: "Congratulations",
            message: res.data.message,
          };
          this.dispatch("alertNow", info);
        commit("setSuccess", res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  setReports: (state, report) => (state.reports = report),
  setSuccess: (state, response) => (state.success = response),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
