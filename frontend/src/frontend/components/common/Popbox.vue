<template>
  <section v-if="showslide">
    <div class="popcontent">
      <div class="closebutton" @click="closepop">
        <i class="fa fa-close"></i>
      </div>

      <slick ref="slick" :options="slickOptions">
        <div v-for="(poppost, index) in allPoppostsHomepage" :key="index">
          <div>
            <h3 v-if="selectedLanguage.title == 'English'">
              {{ poppost.eng.title }}
            </h3>
            <p
              v-if="
                selectedLanguage.title == 'English' &&
                  poppost.images.length == 0
              "
              v-html="poppost.eng.content"
            ></p>
            <h3 v-if="selectedLanguage.title == 'Nepali'">
              {{ poppost.nep.title }}
            </h3>
            <p
              v-if="
                selectedLanguage.title == 'Nepali' && poppost.images.length == 0
              "
              v-html="poppost.nep.content"
            >
              {
            </p>
          </div>
          <img
            v-if="poppost.videos.length == 0 && poppost.images.length != 0"
            :src="baseUrl + poppost.images[0].fileUrl"
            alt=""
          />
          <video
            v-if="poppost.videos.length != 0"
            class="w-100"
            data-autopause="false"
            data-fill-mode="fill"
            loop="true"
            alt="Video Banner"
            controls
          >
            <source
              id="mp4"
              :src="baseUrl + poppost.videos[0].fileUrl"
              type="video/mp4"
            />
          </video>
        </div>
      </slick>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Slick from "vue-slick";
import { fileUrl } from "./../../../main";
export default {
  name: "Popbox",
  computed: {
    ...mapGetters(["allPoppostsHomepage", "selectedLanguage"]),
  },
  components: {
    Slick,
  },
  data() {
    return {
      showslide: false,
      slickOptions: {
        slidesToShow: 1,
        fade: true,
        autoplay: false,
        slidespeed: 20000,
        // Any other options that can be got from plugin documentation
      },
      baseUrl: fileUrl,
    };
  },
  methods: {
    ...mapActions(["fetchPoppostsHomepage"]),

    closepop() {
      this.$emit("clicked", true);
    },
    next() {
      this.$refs.slick.next();
    },

    prev() {
      this.$refs.slick.prev();
    },

    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    },
  },
  created() {
    this.fetchPoppostsHomepage();
    setTimeout(() => {
      this.showslide = true;
    }, 3000);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
section {
  h3 {
    margin-bottom: 20px;
    @media only screen and (max-width: 991px) {
      font-size: 12px;
    }
  }

  display: flex;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // transform: translate(-35%);
  text-align: center;
  background: rgba(0, 0, 0, 0.3) !important;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 991px) {
    padding-top: 30px;
    align-items: flex-start;
  }
  .popcontent {
    background: $white !important;
    position: relative;
    height: auto;
    padding: 30px !important;
    width: 60%;
    @media only screen and (max-width: 991px) {
        width: 90%;
    }
    .closebutton {
      height: 35px;
      width: 35px;
      position: absolute;
      right: -15px;
      top: -15px;
      background: $secondary;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: $white;
      // padding-left: 3px;
    }
  }
  img {
    width: 100%;
    height: 400px;
    object-fit: contain;
  }
  video {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  .closebutton {
    cursor: pointer;
  }
}
</style>
