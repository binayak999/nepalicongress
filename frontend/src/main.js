import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import CKEditor from "@ckeditor/ckeditor5-vue";
import SweetAlertIcons from "vue-sweetalert-icons";
import "../node_modules/slick-carousel/slick/slick.css";
import VueSocialSharing from "vue-social-sharing";
import VueLazyLoad from "vue-lazyload";
import JsonCSV from "vue-json-csv";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
var CryptoJS = require("crypto-js");
import SecureStorage from "secure-web-storage";

Vue.component("v-selection", vSelect);
Vue.component("downloadCsv", JsonCSV);
Vue.use(VueLazyLoad);
Vue.use(VueSocialSharing);
Vue.use(SweetAlertIcons);

// export const baseUrl = "http://192.168.1.67:3013/api/v1/";
// export const fileUrl = " http://localhost:3000"

export const baseUrl = "https://api.nepalicongress.org/api/v1/";
export const fileUrl = "https://api.nepalicongress.org";

// export const baseUrl = "http://development.nepalicongress.org/api/v1/"
// export const fileUrl = "http://development.nepalicongress.org"

const SECRET_KEY = "_nepalicongresUplift2021binayak999";

export const secureStorage = new SecureStorage(localStorage, {
  hash: function hash(key) {
    key = CryptoJS.SHA256(key, SECRET_KEY);

    return key.toString();
  },
  encrypt: function encrypt(data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);

    data = data.toString();

    return data;
  },
  decrypt: function decrypt(data) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);

    data = data.toString(CryptoJS.enc.Utf8);

    return data;
  },
});

Vue.config.productionTip = false;
Vue.use(CKEditor);
Vue.use(require("vue-moment"));
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
