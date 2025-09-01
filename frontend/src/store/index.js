import Vue from 'vue'
import Vuex from 'vuex'
import dashboardmenu from './modules/dashboardmenu';
import frontendmenu from './modules/frontendmenu';
import dashcategories from './modules/dashcategories';
import category from './modules/category';
import post from './modules/post';
import user from './modules/user';
import activeuser from './modules/activeuser';
import reports from './modules/reports';
import file from './modules/file';
import vote from './modules/vote';
import forum from './modules/forum';
import leader from './modules/leader';
import alert from './modules/alert';
import notification from './modules/notification';
import tree from './modules/tree';
import generalconvention from './modules/generalconvention';
import signature from './modules/signature';
import dashboard from './modules/dashboard';
import meetingManement from './modules/meetingManement';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    dashboardmenu,
    frontendmenu,
    dashcategories,
    post,
    category,
    user,
    reports,
    vote,
    file,
    forum,
    leader,
    alert,
    activeuser,
    notification,
    tree,
    generalconvention,
    signature,
    dashboard,
    meetingManement
  }
})
