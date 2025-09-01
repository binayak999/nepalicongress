<template>
  <section>
    <v-skeleton-loader
      class="mx-auto mr-btm"
      type="image"
      height="120"
      v-if="loading"
    ></v-skeleton-loader>
    <TitleBreadCrumb
      :breadcrumbs="breadcrumbs"
      :language="selectedLanguage.title"
      v-if="singlePostAll.length != 0 && !loading"
    />

    <v-container fluid>
      <v-row>
        <v-col
          md="9"
          class="boxsingle"
          v-if="
            (singlePostAll == undefined || singlePostAll.length == 0) &&
              !loading
          "
          cols="12"
        >
          <div class="vote">
            <img src="@/assets/images/icons/nodata.svg" alt />
            <h1>Post Not Found Or Not Active</h1>
          </div>
        </v-col>
        <v-col md="9" v-if="loading">
          <v-skeleton-loader
            class="mx-auto mr-btm"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto mr-btm"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto mr-btm"
            type="image"
            height="200"
          ></v-skeleton-loader>
        </v-col>
        <v-col
          md="9"
          class="boxsingle"
          v-if="singlePostAll.length != 0 && !loading"
        >
          <VueSlickCarousel
            v-bind="settings"
            v-if="
              singlePostAll.images.length != 0 &&
                singlePostAll.images != undefined &&
                singlePostAll.attachment.length == 0
            "
          >
            <div v-for="(data, index) in singlePostAll.images" :key="index">
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
              singlePostAll.nep != undefined &&
                selectedLanguage.title === 'Nepali'
            "
            v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }"
          >
            <div class="contentbox">
              <div v-html="singlePostAll.nep.content"></div>
            </div>
          </div>

          <div
            class="about"
            v-if="
              singlePostAll.eng != undefined &&
                selectedLanguage.title !== 'Nepali'
            "
            v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }"
          >
            <div class="contentbox">
              <div v-html="singlePostAll.eng.content"></div>
            </div>
          </div>
          <div class="pdf-files">
            <iframe
              v-for="(data, index) in singlePostAll.attachment"
              :key="index"
              :src="baseUrl + data.fileUrl"
              frameborder="0"
            ></iframe>
          </div>

          <div
            class="pdf-files"
            v-if="
              singlePostAll.externallink != 'default' &&
                singlePostAll.externallink != ''
            "
          >
            <iframe
              v-if="singlePostAll.externallink.indexOf('www.youtube.com') < 1"
              :src="singlePostAll.externallink"
              frameborder="0"
            ></iframe>

            <iframe
              v-if="singlePostAll.externallink.indexOf('www.youtube.com') > 1"
              :src="singlePostAll.externallink"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="video-files">
            <video
              controls
              class="videobox"
              v-for="(data, index) in singlePostAll.videos"
              :key="index"
            >
              <source :src="baseUrl + data.fileUrl" type="video/mp4" />
            </video>
          </div>
        </v-col>

        <v-col md="3" cols="12">
          <SideBox />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import TitleBreadCrumb from "../components/common/TitleBreadCrumb";
import SideBox from "../components/common/SideBox";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { mapGetters, mapActions } from "vuex";
import { fileUrl } from "./../../main";
export default {
  name: "Single",
  data() {
    return {
      slug: this.$route.params.page,
      baseUrl: fileUrl,
      loading: true,
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
        arrows: true,
        autoplay: false,
        fade: false,
        speed: 1000,
        autoplaySpeed: 8000,
        slidesToShow: 1,
        slidesToScroll: 1,
        center: true,
      },
    };
  },
  components: {
    TitleBreadCrumb,
    VueSlickCarousel,
    SideBox,
  },
  methods: {
    ...mapActions(["fetchSingle"]),
  },
  computed: {
    ...mapGetters(["singlePostAll", "selectedLanguage"]),
  },
  async created() {
    let params = {
      page: this.$route.params.page,
      slug: this.$route.params.slug,
    };
    await this.fetchSingle(params);

    this.breadcrumbs.push({
      eng: {
        title: this.singlePostAll.category[0].eng.title,
      },
      nep: {
        title: this.singlePostAll.category[0].nep.title,
      },
      slug: `/${this.singlePostAll.category[0].slug}`,
    });
    this.breadcrumbs.push({
      eng: {
        title: this.singlePostAll.eng.title,
      },
      nep: {
        title: this.singlePostAll.nep.title,
      },
    });

    this.settings.slidesToShow = this.singlePostAll.images.length > 1 ? 1 : 1;
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.boxsingle {
  padding: 30px 15px;
}
iframe {
  width: 100%;
  height: 1000px;
  margin-right: 10px;
  margin-bottom: 20px;
}
img {
  object-fit: contain;
  object-position: top;
  margin-bottom: 20px;
  width: 80%;
  margin: 0 auto;
  // height:550px;
  @media only screen and (max-width: 991px) {
    width: 100%;
  }
}

.nep {
  h2 {
    margin-bottom: 15px;
    letter-spacing: 0;
  }
  .contentbox {
    font-family: $nepalifont;
    font-size: 17px;
    letter-spacing: 0;
    line-height: 25px;
    margin-bottom: 20px;
    word-wrap: break-word;
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
  flex-wrap: wrap;
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
.vote {
  background: $midwhite;
  padding: 100px 20px;
  // margin: 30px 25%;s
  display: flex;
  justify-content: center;
  h1 {
    text-align: center;
    letter-spacing: 1.3px;
    font-size: 35px;
    width: 50%;
    // background: red;
  }
}
.smallimage {
  img {
    width: 200px;
  }
}
</style>
