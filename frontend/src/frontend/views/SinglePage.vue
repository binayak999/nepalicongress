<template>
  <section class="singlepage">
    <TitleBreadCrumb
      :breadcrumbs="breadcrumbs"
      :language="selectedLanguage.title"
    />

    <v-container fluid>
      <v-row>
        <v-col md="12" class="boxsingle" v-if="singlePageAll.images">
          <VueSlickCarousel
            v-bind="settings"
            :arrows="true"
            :dots="false"
            :v-if="timerLoad"
          >
            <div
              v-for="(data, index) in singlePageAll.images"
              :key="index"
              class="imagebox"
            >
              <img
                :src="
                  data.fileUrl != undefined
                    ? baseUrl + data.fileUrl
                    : 'https://nepalicongress.org/img/aboutimage.6d9fbb33.jpg'
                "
                alt
              />
            </div>
          </VueSlickCarousel>

          <div
            class="about"
            v-if="
              singlePageAll.nep != undefined &&
              selectedLanguage.title === 'Nepali'
            "
            v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }"
          >
            <div class="contentbox">
              <div v-html="singlePageAll.nep.content"></div>
            </div>
          </div>

          <div
            class="about"
            v-if="
              singlePageAll.eng != undefined &&
              selectedLanguage.title !== 'Nepali'
            "
            v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }"
          >
            <div class="contentbox">
              <div v-html="singlePageAll.eng.content"></div>
            </div>
          </div>
          <div class="pdf-files">
            <iframe
              v-for="(data, index) in singlePageAll.attachment"
              :key="index"
              :src="baseUrl + data.fileUrl"
              frameborder="0"
            ></iframe>
          </div>
          
          <div class="video-files">
            <video
              controls
              class="videobox"
              v-for="(data, index) in singlePageAll.videos"
              :key="index"
            >
              <source :src="baseUrl + data.fileUrl" type="video/mp4" />
            </video>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import TitleBreadCrumb from "../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import { fileUrl } from "./../../main";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  name: "SinglePage",
  components: {
    TitleBreadCrumb,
    VueSlickCarousel,
  },
  data() {
    return {
      baseUrl: fileUrl,
      timerLoad: false,
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
      ],
      settings: {
        dots: false,
        infinite: true,
        pauseOnHover: true,
        arrows: false,
        autoplay: false,
        fade: true,
        speed: 1000,
        autoplaySpeed: 8000,
        slidesToShow: 2,
        slidesToScroll: 1,
        center: true,
      },
    };
  },
  methods: {
    ...mapActions(["singlePage"]),
  },
  computed: {
    ...mapGetters(["selectedLanguage", "singlePageAll"]),
  },
  created() {
    this.singlePage(this.$route.params.slug);

    setTimeout(() => {
      this.breadcrumbs.push({
        eng: {
          title: this.singlePageAll.eng.title,
        },
        nep: {
          title: this.singlePageAll.nep.title,
        },
      });
      this.timerLoad = true;
    }, 1000);
    this.$store.state.post.loading = true;
    setTimeout(() => {
      this.$store.state.post.loading = false;
      this.settings = {
        slidesToShow: this.singlePageAll.images.length > 1 ? 2 : 1,
      };
    }, 1500);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.boxsingle {
  // padding: 30px 15px;
}
.imagebox {
  // padding: 20px;
}
// .image-box{
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
// }

img {
  object-fit: cover;
  object-position: top;
  margin-bottom: 20px;
  width: 100%;
  // max-height: 500px;
}

.nep {
  h2 {
    margin-bottom: 15px;
    letter-spacing: 0;
    font-family: $nepalifont !important;
  }
  .contentbox {
    font-family: $nepalifont;
    font-size: 24px;
    letter-spacing: 0;
    line-height: 25px;
    margin-bottom: 20px;
    font-family: $nepalifont !important;
    word-wrap: break-word;
    p,
    strong {
      font-family: $nepalifont !important;
    }

    line-height: 40px !important;
  }
}
h2 {
  margin-bottom: 15px;
  letter-spacing: 1.1px;
}
.contentbox {
  font-size: 14px;
  letter-spacing: 1.3px;
  line-height: 25px;
  margin-bottom: 20px;
  font-family: $mon;
}

.titleborder {
  border-bottom: 1px solid $green;
  margin-bottom: 20px;
}
.sidebox {
  margin-bottom: 30px;
  section {
    padding: 0;
    margin-bottom: 20px;
  }
}
.pdf-files {
  display: flex;
  width: 100%;
  padding: 30px;
  iframe {
    width: 100%;
    height: 100vh;
  }
  a {
    margin-right: 15px;
  }
}
.video-files {
  .videobox {
    margin-right: 15px;
    height: 700px;
    width: 100%;
    object-fit: cover;
  }
}
.contentbox {
  padding: 0 20px;
}
</style>