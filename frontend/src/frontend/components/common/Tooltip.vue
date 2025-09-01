<template>
  <section class="tooltip" v-if="content">
    <h4>{{title}}</h4>
    <p v-if="content">{{content}}</p>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Tooltip",
  props: ["title", "content"],
  computed: {
    ...mapGetters(["selectedLanguage"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.tooltip {
  position: absolute;
  background: $midlightgray;
  color: $dark;
  z-index: 999;
  bottom: 90%;

  padding: 20px;
  width: 120%;
  left: -10%;
  h4 {
    // margin-bottom: 10px;
  }
  p {
    margin-bottom: 0;
    margin-top: 10px;
    font-size: 12px;
    line-height: 26px;
  }
}
.nep {
  a {
    font-family: $nepalifont !important;
    font-size: 16px !important;
  }
  h4 {
    // margin-bottom: 10px;
    font-family: $nepalifont !important;
  }
  p {
    margin-bottom: 0;
    margin-top: 10px;
    font-size: 12px;
    line-height: 26px;
    font-family: $nepalifont !important;
  }
}
</style>