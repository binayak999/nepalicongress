<template>
  <section class="relvideobox">
    <video controls class="imagebox">
      <source :src="url" type="video/mp4" />
    </video>

    <h4>{{text}}</h4>
  </section>
</template>

<script>
import Vue from "vue";
import VueYoutube from "vue-youtube";

Vue.use(VueYoutube);
export default {
  name: "Videobox",
  props: ["url","text"],
  data() {
    return {
      videoId: "onOZSrl49IU",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.relvideobox {
  position: relative;
  iframe {
    width: 100%;
  }
  .playicon {
    position: absolute;
    top: 37%;
    left: 49.9%;
    transform: translate(-50%);
  }
  .pauseicon {
    position: absolute;
    top: 37%;
    left: 49.9%;
    transform: translate(-50%);
  }
  h4 {
    letter-spacing: 0.5px;
    margin-bottom: 0;
    font-family: $mon;
    color: $dark;
    font-size: 16px;
    font-weight: 500;
  }
}
video {
  height: 250px;
  width: 100%;
  object-fit: cover;
}
</style>