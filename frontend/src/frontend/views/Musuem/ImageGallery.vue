<template>
  <section>
    <div v-if="visible" class="boxlight">
      <LightBox
        :media="media"
        :startAt="index"
        :showLightBox="visible"
        ref="ligthbox"
      ></LightBox>
    </div>

    <TitleBreadCrumb
      :breadcrumbs="breadcrumbs"
      :language="selectedLanguage.title"
    />
    <v-container fluid="fluid" class="mediapage">
      <v-row>
        <div
          v-for="(data, index) in allImage"
          :key="index"
          v-bind:class="{ zoombox: data.status }"
        >
          <v-col md="12" v-if="data.status" @click="showImages(index)">
            <!-- <i class="fa fa-search-plus"></i> -->
            <img :src="baseUrl + data.fileLocation" alt class="imagebox" />
            <h5>{{ data.assignedTo }}</h5>
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
  name: "ImageGallery",
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
            title: "Images",
          },
          nep: {
            title: "छविहरू",
          },
        },
      ],
      media: [],
      visible: false,
      index: 0,
    };
  },
  methods: {
    ...mapActions(["getImages"]),
    showImages(index) {
      this.index = index;
      this.visible = true;
      this.$refs.ligthbox.showImage(index);
    },
    handleHide() {
      this.visible = false;
    },
  },
  computed: {
    ...mapGetters(["allImage", "selectedLanguage"]),
  },
  created() {
    this.getImages();
    this.$store.state.post.loading = true;
    setTimeout(() => {
      this.$store.state.post.loading = false;
      this.allImage.forEach((data) => {
        this.media.push({
          // For image
          thumb: this.baseUrl + data.fileLocation,
          src: this.baseUrl + data.fileLocation,
          caption: "caption to display. receive <html> <b>tag</b>", // Optional
          srcset: this.baseUrl + data.fileLocation,
        });
      });
    }, 1500);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.imagebox {
  height: 300px;
  width: 100%;
  object-fit: cover;
  object-position: top center;
  border: 2px solid $green;

  @media only screen and (max-width: 991px) {
    height: auto;
  }
}
.boxlight {
  position: relative;
  z-index: 99999999999999;
}
.mediapage {
  padding: 50px 30px;
}
.zoombox {
  position: relative;
  width: 25%;
  @media only screen and (max-width: 991px) {
    width: 100%;
  }
  .fa {
    color: $white;
    position: absolute;
    right: 30px;
    top: 30px;
    font-size: 20px;
    z-index: 99;
    cursor: pointer;
    height: 40px;
    width: 40px;
    background: #50abf17c;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
}
h5 {
  font-weight: 400;
  letter-spacing: 1.2px;
  margin-top: -10px;
  background: $secondary;
  padding: 20px 15px;
  color: white;
  font-size: 15px;
  z-index: 999;
  position: relative;
  &:hover {
    background: $green;
  }
}
</style>
