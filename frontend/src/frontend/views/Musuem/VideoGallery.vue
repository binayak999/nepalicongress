<template>
  <section>
    <div v-if="visible" class="boxlight">
      <LightBox
        :media="media"
        :startAt="index"
        :showLightBox="visible"
        ref="ligthbox"
        :showThumbs="false"
      ></LightBox>
    </div>
    <TitleBreadCrumb
      :breadcrumbs="breadcrumbs"
      :language="selectedLanguage.title"
    />
    <v-container fluid="fluid" class="mediapage">
      <v-row>
        <div
          v-for="(data, index) in allVideo"
          :key="index"
          v-bind:class="{ zoombox: data.status }"
        >
          <v-col md="12" v-bind:class="{ boxpad: !data.status }">
            <video
              :controls="false"
              class="imagebox"
              v-if="data.status"
              @click="showImages(index)"
            >
              <source :src="baseUrl + data.fileLocation" type="video/mp4" />
            </video>
            <h5 v-if="data.status">{{ data.assignedTo }}</h5>
          </v-col>
        </div>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapActions, mapGetters } from "vuex";
import { fileUrl } from "./../../../main";
import LightBox from "vue-image-lightbox";
require("vue-image-lightbox/dist/vue-image-lightbox.min.css");
export default {
  name: "VideoGallery",
  components: {
    TitleBreadCrumb,
    LightBox,
  },
  data() {
    return {
      baseUrl: fileUrl,
      breadcrumbs: [
        {
          eng: {
            title: "Home",
          },
          nep: {
            title: "गृहपृष्ठ",
          },
          slug: "/",
        },
        {
          eng: {
            title: "Online Museum",
          },
          nep: {
            title: "अनलाइन संग्रहालय",
          },
          slug: "onlinemuseum",
        },
        {
          eng: {
            title: "Videos",
          },
          nep: {
            title: "भिडियोहरू",
          },
        },
      ],
      media: [],
      visible: false,
      index: 0,
    };
  },
  methods: {
    ...mapActions(["getAllVideo"]),
    showImages(index) {
      this.index = index;
      this.visible = true;
      this.$refs.ligthbox.showImage(index);
    },
  },
  computed: {
    ...mapGetters(["allVideo", "selectedLanguage"]),
  },
  created() {
    this.getAllVideo();
    this.$store.state.post.loading = true;
    setTimeout(() => {
      this.$store.state.post.loading = false;

      this.allVideo.forEach((data) => {
        this.media.push({
          // For video
          thumb: "http://localhost:8080/img/logo.2f3f710f.svg",
          sources: [
            {
              src: this.baseUrl + data.fileLocation,
              type: "video/mp4",
            },
          ],
          type: "video",
          caption: `<h4>${data.assignedTo}</h4>`,
          width: 800, // required
          height: 600, // required
          autoplay: true, //Optional to autoplay video when lightbox opens
        });
      });
    }, 1500);
  },
};
</script>

<style lang="scss" scoped>
.imagebox {
  width: 100%;
  height: 300px;
  width: 100%;
  object-fit: cover;
  @media only screen and (max-width: 991px) {
    height: auto;
  }
}
.mediapage {
  padding: 50px 30px;
}
h5 {
  font-weight: 400;
  letter-spacing: 1.2px;
  margin-top: 10px;
}
.zoombox {
  position: relative;
  width: 25%;
  @media only screen and (max-width: 991px) {
    width: 100%;
  }
}
.boxpad {
  padding: 0;
}
</style>