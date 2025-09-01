<template>
  <v-app class="app">
    <Header />
    <div class="dashboard-box">
      <Menu class="section-left" />
      <router-view :key="$route.fullPath" class="section-right"></router-view>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import Header from "./components/includes/Header";
import Menu from "./components/includes/Menu";
import Footer from "./components/includes/Footer";
import { mapGetters } from "vuex";
import { secureStorage } from "../main";

export default {
  name: "App",

  components: {
    Header,
    Menu,
    Footer,
  },

  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(["logged"]),
  },
  created() {
    if (secureStorage.getItem("userData")) {
      this.$store.state.user.loggedUser = JSON.parse(
        secureStorage.getItem("userData")
      );
    } else {
      this.$router
        .push("/login")
        .catch((error) =>
          console.log(error, "Your are not subdomain or admin !")
        );
    }
    // console.log(this.logged.user.role !== 'admin' || this.logged.user.role !== 'subdomain')
    if (
      this.logged.user.role !== "admin" &&
      this.logged.user.role !== "subdomain" &&
      this.logged.user.role !== "activecontrol" &&
      this.logged.user.role !== "activeviewer" &&
      this.logged.user.role !== "onlinemember"
    ) {
      this.$router
        .push("/")
        .catch((error) =>
          console.log(error, "Your are not subdomain or admin !")
        );
    }
    // if(this.logged.user.role !== 'admin' || this.logged.user.role === 'subdomain' || this.logged.user.role !== 'activecontrol' || this.logged.user.role !== 'activeviewer'){
    //   this.$router.push('/').catch(error=>console.log(error,"Your are not subdomain or admin !"));
    // }
    // if(this.logged.user.role === 'admin' || this.logged.user.role === 'subdomain' || this.logged.user.role !== 'activecontrol' || this.logged.user.role !== 'activeviewer'){
    //   this.$router.push('/').catch(error=>console.log(error,"Your are not subdomain or admin !"));
    // }
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.dashboard-box {
  display: flex;
  .section {
    &-left {
      width: 15%;
      @media screen and (max-width: 1024px) {
        width: 20%;
      }
    }
    &-right {
      width: 85%;
      @media screen and (max-width: 1024px) {
        width: 80%;
      }
    }
  }
}
</style>
