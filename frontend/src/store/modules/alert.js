const state = {
  alerts: [],
  loading:false,
  hitcount:1065885
};

const getters = {
  allAlerts: (state) => state.alerts,
  allLoading: (state) => state.loading,
};

const actions = {
  async alertNow({ commit }, data) {
    try {
      if (data) {
        let alert = {
          icon: data.icon,
          status: data.status,
          title: data.title,
          subtitle: data.subtitle,
          message: data.message,
        };
        commit("alertNowMut", alert);
        this.dispatch("alertOff");
      }
    } catch (error) {
      console.log(error.response);
    }
  },
  async alertOff({ commit }) {
    let alertOff = {
      status: false,
    };
    setTimeout(() => {
      commit("alertOffMut", alertOff);
    },3000);
  },
  async loading({commit}){
    commit("loadingMut",true)
  },
  async notloading({commit}){
    commit("loadingMut",false)
  },
  async hitCount({commit}){
    commit("loadingMut",true)
  }
};

const mutations = {
  alertNowMut: (state, newProducts) => (state.alerts = newProducts),
  alertOffMut: (state, newProducts) => (state.alerts = newProducts),
  loadingMut: (state, loading) => (state.loading = loading),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
