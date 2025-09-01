<template>
  <section
    class="historyslider"
    v-if="allDateHistoryHomepage.length != 0"
    v-bind:class="{nep:selectedLanguage.title !== 'English'}"
  >
    <header class="contenttitle" v-if="title">{{title}}</header>
    <div class="contentsection" v-if="showSlider">
      <slick ref="slick1" :options="slickOptions" class="slider-for">
        <div v-for="(datehistory,index) in allDateHistoryHomepage" :key="index" class="sliderbox">
          <a href="#" class="bannerimage" v-if="datehistory.images.length != 0">
            <div class="titles" v-if="selectedLanguage.title === 'English'">
              <h1>{{datehistory.eng.title}}</h1>
              <div v-html="datehistory.eng.content"></div>
            </div>
            <div class="titles" v-if="selectedLanguage.title !== 'English'">
              <h1>{{datehistory.nep.title}}</h1>
              <div v-html="datehistory.nep.content"></div>
            </div>
            <img :src="baseUrl+datehistory.images[0].fileUrl" alt />
          </a>
        </div>
      </slick>
      <slick ref="slick2" :options="slickOptions1" class="slider-nav">
        <div v-for="(datehistory,index) in allDateHistoryHomepage" :key="index">
          <div class="yearbox">{{datehistory.dateofhistory}}</div>
        </div>
      </slick>

      <!-- {{allDateHistoryHomepage}} -->
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Slick from "vue-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import { fileUrl } from "./../../main";
export default {
  name: "HistorySlider",
  props: ["title"],
  components: {
    Slick,
  },
  computed: {
    ...mapGetters(["selectedLanguage", "allDateHistoryHomepage"]),
  },
  data() {
    return {
      baseUrl: fileUrl,
      showSlider: false,
      slickOptions: {
        slidesToShow: 1,
        dots: true,
        asNavFor: ".slider-nav",
        focusOnSelect: true,
         center: true,
      },
      slickOptions1: {
        slidesToShow: 8,
        asNavFor: ".slider-for",
        focusOnSelect: true,
        center: true,
      },
    };
  },
  methods: {
    ...mapActions(["fetchDateHistoryHomepage"]),
    next() {
      this.$refs.slick1.next();
    },

    prev() {
      this.$refs.slick1.prev();
    },

    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick1.reSlick();
        this.$refs.slick2.reSlick();
      });
    },
  },
  created() {
    this.fetchDateHistoryHomepage();
    setTimeout(() => {
      this.showSlider = true;
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.sliderbox {
  position: relative;
  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
}
.yearbox {
  cursor: pointer;
  text-align: center;
  position: relative;
  background: $white;
  width: 100%;
  line-height: 30px;
  padding: 5px 5px 15px 5px;
  border-right: 1px solid;
  border-color: black;
  border-bottom: 1px solid $dark;
  overflow: hidden;
  .slick-active {
    text-decoration: underline;
  }
  &::before {
    content: "||||||||||||||";
    position: absolute;
    letter-spacing: 10px;
    font-size: 25px;
    font-weight: 200;
    left: 50%;
    transform: translateX(-50%);
    bottom: -8px;
    overflow: hidden;
  }
}
.slick-current {
  .yearbox {
    &:after {
      content: "";
      position: absolute;
      left: 95px;
      right: 95px;
      height: 2px;
      background: red;
      top: 30px;
    }
  }
}
</style>