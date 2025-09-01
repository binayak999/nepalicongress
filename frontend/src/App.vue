<template>
  <div id="app">
    <v-app>
      <v-content>
        <router-view :key="$route.fullPath"></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
.contentbox {
  @media only screen and (max-width: 991px) {
    padding: 15px;
  }
}
.nep {
  .contenttitle {
    font-family: $nepalifont !important;
  }
}
.displaynone{
  display: none;
}
.primaryBox{
  min-height: 40px!important;
}
</style>