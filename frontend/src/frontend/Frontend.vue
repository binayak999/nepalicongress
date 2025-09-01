<template>
  <v-app class="app">
    <Header />
    <router-view :key="$route.fullPath"></router-view>
    <Footer />
  </v-app>
</template>
<script>
import Header from "./components/includes/Header";
import Footer from "./components/includes/Footer";

export default {
  name: "App",

  components: {
    Header,
    Footer,
  },
  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
.loader {
  position: fixed;
  background: $white;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  z-index: 9999999;
  .logo {
    width: 100px;
  }
  .loading{
    width: 120px;
  }
}
</style>