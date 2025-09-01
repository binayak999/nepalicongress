<template>
  <div
    class="bannerbox"
    v-bind:class="{ nep: selectedLanguage.title !== 'English' }"
  >
    <VueSlickCarousel
      :arrows="true"
      :dots="true"
      v-bind="settings"
      v-if="language == 'English' && listdata.length != 0"
    >
      <div v-for="(list, index) in listdata" :key="index">
        <v-row v-if="list.status">
          <v-col md="8" class="backBanner">
            <img
              :src="
                list.images[0].fileUrl != undefined
                  ? baseUrl + list.images[0].fileUrl
                  : 'https://nepalicongress.org/img/aboutimage.6d9fbb33.jpg'
              "
              alt
            />
          </v-col>
          <v-col md="4" class="background-content">
            <small>{{ list.eng.date }}</small>
            <h3>{{ list.eng.title }}</h3>
            <p
              v-html="
                list.eng.content.length > 300
                  ? list.eng.content.slice(0, 300) + ' [...]'
                  : list.eng.content
              "
            ></p>
            <button class="btn-more">
              <router-link
                :to="`/single/${list.category[0].slug}/${list.slug}`"
                >{{ buttontxt }}</router-link
              >
            </button>
          </v-col>
        </v-row>
      </div>
    </VueSlickCarousel>
    <VueSlickCarousel
      :arrows="true"
      :dots="true"
      v-bind="settings"
      v-if="language != 'English' && listdata.length != 0"
    >
      <div v-for="(list, index) in listdata" :key="index">
        <v-row v-if="list.status">
          <v-col md="8" class="backBanner">
            <img
              :src="
                list.images[0] != undefined
                  ? baseUrl + list.images[0].fileUrl
                  : 'https://nepalicongress.org/img/aboutimage.6d9fbb33.jpg'
              "
              alt
            />
          </v-col>
          <v-col md="4" class="background-content">
            <small>{{ list.nep.date }}</small>
            <h3>{{ list.nep.title }}</h3>
            <p
              v-html="
                list.nep.content.length > 300
                  ? list.nep.content.slice(0, 300) + ' [...]'
                  : list.nep.content
              "
            ></p>
            <button class="btn-more">
              <router-link
                :to="`/single/${list.category[0].slug}/${list.slug}`"
                >{{ buttontxt }}</router-link
              >
            </button>
          </v-col>
        </v-row>
      </div>
    </VueSlickCarousel>
    <div class="bannerboxwitoout" v-if="!timerLoad"></div>
    <div class="leaders">
      <v-col>
        <Leaders :selectedLanguage="selectedLanguage" />
      </v-col>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { fileUrl } from "./../../../main";
import Leaders from "../common/Leaders";
import { mapGetters } from "vuex";
export default {
  name: "Banner",
  components: { VueSlickCarousel, Leaders },
  props: ["buttontxt", "listdata", "language"],
  computed: { ...mapGetters(["selectedLanguage"]) },
  data() {
    return {
      baseUrl: fileUrl,
      timerLoad: false,
      settings: {
        dots: false,
        infinite: true,
        pauseOnHover: false,
        arrows: false,
        autoplay: true,
        fade: false,
        speed: 1000,
        autoplaySpeed: 8000,
        slidesToShow: 1,
        slidesToScroll: 1,
        center: true,
      },
    };
  },
  created() {
    // setTimeout(() => {
    //   this.timerLoad = true;
    // }, 1500);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.subdomainbanner {
  img {
    height: 500px;
    border: 1px solid $secondary;
    object-fit: contain;
    border-right: 0;
  }
}
.bannerboxwitoout {
  background: $text;
  // height: 550px;
}
.bannerbox {
  margin-top: 50px;
  margin-bottom: -10px;
  .row {
    margin: 0;
    @media only screen and (max-width: 991px) {
      flex-flow: column;
    }
  }
}
.col {
  padding: 0;
}
img {
  width: 100%;
  height: 640px;
  object-fit: contain;
  object-position: center;
  @media only screen and (max-width: 991px) {
    height: auto;
  }
}
.backBanner {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    height: 100%;
    background: url("~@/assets/images/bgpattern.jpg");
    width: 100%;
    opacity: 0.6;
  }
  img{
    position: relative;
  }
}
.background-content {
  background: url("~@/assets/images/bgpattern.jpg");
  padding: 30px;
  color: $secondary;
  display: flex;
  flex-flow: column;
  justify-content: center;
  small {
    // margin-bottom: 5px;
    display: block;
    letter-spacing: 0.5px;
    font-family: $mon;
    font-size: 14px;
    color: $text;
  }
  h3 {
    margin-bottom: 5px;
    letter-spacing: 0.5px;
    font-family: $mon;
    font-size: 26px;
    line-height: 35px;
    font-weight: 500;
  }
  p {
    margin-bottom: 0;
    letter-spacing: 1.2px;
    font-family: $mon;
    font-size: 18px;
    line-height: 28px;
    font-weight: 400;
  }
  .btn-more {
    padding: 8px 20px;
    border: 1px solid $secondary;
    font-size: 14px;
    letter-spacing: 1.3px;
    margin-top: 10px;
    width: 140px;
    background: $secondary;
    transition: background-color 0.5s ease-out;

    a {
      color: $white;
      text-decoration: none;
      font-family: $mon;
    }
    &:hover {
      background: transparent;
      a {
        color: $secondary !important;
      }
    }
  }
}
.leaders {
  margin-top: 50px;
  @media only screen and (max-width: 991px) {
    margin-bottom: 150px;
  }
}
.nep {
  small {
    margin-bottom: 10px;
    display: block;
    letter-spacing: 0.5px;
    font-family: $nepalifont;
    font-size: 14px;
    color: $text;
  }
  h3 {
    margin-bottom: 5px;
    letter-spacing: 0.5px;
    font-family: $nepalifont;
    font-size: 26px;
    line-height: 35px;
    font-weight: 500;
  }
  p {
    margin-bottom: 0;
    letter-spacing: 1.2px;
    font-family: $nepalifont;
    font-size: 18px;
    line-height: 28px;
    font-weight: 400;
  }
  .btn-more {
    letter-spacing: 0;
    font-family: $nepalifont !important;
  }
}
</style>
