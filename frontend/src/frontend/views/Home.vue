<template>
  <div class="home">
    <Popbox
      @clicked="closePop"
      v-if="
        popbox &&
          allPoppostsHomepage.length != 0 &&
          allPoppostsHomepage != undefined
      "
    />
    <v-container class="bannersection" fluid>
      <div>
        <div>
          <div class="contentsection topshare">
            <ul class="sociallinks">
              <li>
                <a
                  href="https://www.facebook.com/nepalicongresshq"
                  target="_blank"
                >
                  <i class="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/NepaliCongress" target="_blank">
                  <i class="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCbEMIE6Zz1IFX-F2u2dbTWw"
                  target="_blank"
                >
                  <i class="fa fa-youtube"></i>
                </a>
              </li>
            </ul>
            <!-- <img :src="require('@/assets/images/icons/socialhomecon.svg')" alt /> -->
          </div>
          <div v-if="loading">
            <v-skeleton-loader
              class="mx-auto mt-10"
              type="image"
              height="200"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="mx-auto"
              type="image"
              height="200"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="mx-auto"
              type="image"
              height="200"
            ></v-skeleton-loader>
          </div>
          <Banner
            :buttontxt="
              selectedLanguage.title === 'English'
                ? 'Read More'
                : 'सबै हेर्नुहोस्'
            "
            :listdata="allPostHomepage"
            :language="selectedLanguage.title"
            v-if="!loading"
          />
        </div>
      </div>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col md="12">
          <PresidentMessage
            :title="
              selectedLanguage.title === 'English'
                ? 'President Message'
                : 'सभापति सन्देश'
            "
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="sectionbox">
      <v-row>
        <v-col md="8" v-if="loading">
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
        </v-col>
        <v-col md="8" cols="12" v-if="!loading">
          <ListBoxImage
            :title="
              selectedLanguage.title === 'English'
                ? 'Press Release'
                : 'प्रेस विज्ञप्ति'
            "
            :buttontxt="
              selectedLanguage.title === 'English'
                ? 'Read More'
                : 'सबै हेर्नुहोस्'
            "
            :listdata="allPressReleaseHomepage"
            :language="selectedLanguage.title"
            slug="press-release"
          />
        </v-col>
        <v-col md="4" v-if="loading">
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="100"
          ></v-skeleton-loader>
        </v-col>
        <v-col md="4" class="backbox" cols="12" v-if="!loading">
          <ImageBox
            :title="
              selectedLanguage.title === 'English'
                ? 'Congress Work'
                : 'कांग्रेसको कर्म'
            "
            :buttontxt="
              selectedLanguage.title === 'English'
                ? 'Read More'
                : 'सबै हेर्नुहोस्'
            "
            :listdata="allNewsHomepage"
            :language="selectedLanguage.title"
            slug="news"
          />
        </v-col>
      </v-row>
    </v-container>
    <IconBox class="sectionbox" />

    <v-container fluid>
      <v-row>
        <v-col md="12">
          <HistorySlider
            :title="
              selectedLanguage.title === 'English'
                ? 'Timeline History'
                : 'टाइमलाइन ईतिहास'
            "
          />
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="sectionbox">
      <v-row>
        <v-col md="6" v-if="loading">
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="30"
          ></v-skeleton-loader>
        </v-col>
        <v-col md="6" cols="12" class="bottommargin" v-if="!loading">
          <ImageBoxSide
            :title="
              selectedLanguage.title === 'English'
                ? 'Upcoming Events'
                : 'आगामी कार्यक्रमहरु'
            "
            :buttontxt="
              selectedLanguage.title === 'English'
                ? 'Read More'
                : 'सबै हेर्नुहोस्'
            "
            :listdata="allEventsHomepage"
            :language="selectedLanguage.title"
            slug="events"
          />
        </v-col>
        <v-col md="3" v-if="loading">
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="30"
          ></v-skeleton-loader>
        </v-col>
        <v-col md="3" cols="12" class="bottommargin" v-if="!loading">
          <ListBox
            :title="
              selectedLanguage.title === 'English'
                ? 'Rules and Regulation'
                : 'नियम र नियमन'
            "
            :buttontxt="
              selectedLanguage.title === 'English'
                ? 'Read More'
                : 'सबै हेर्नुहोस्'
            "
            :listdata="allRulesandRegulationHomepage"
            :language="selectedLanguage.title"
            slug="rules-and-regulations"
          />
        </v-col>
        <v-col md="3" v-if="loading">
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="30"
          ></v-skeleton-loader>
        </v-col>
        <v-col md="3" cols="12" class="bottommargin" v-if="!loading">
          <ListBox
            :title="selectedLanguage.title === 'English' ? 'Posts' : 'पोष्टहरू'"
            :buttontxt="
              selectedLanguage.title === 'English'
                ? 'Read More'
                : 'सबै हेर्नुहोस्'
            "
            :listdata="allPostHomepage"
            :language="selectedLanguage.title"
            slug="posts"
          />
        </v-col>
        <v-col md="4" v-if="loading">
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="30"
          ></v-skeleton-loader>
        </v-col>
        <v-col md="4" cols="12" class="bottommargin" v-if="!loading">
          <ListBox
            :title="
              selectedLanguage.title === 'English' ? 'Manifesto' : 'घोषणापत्र'
            "
            :buttontxt="
              selectedLanguage.title === 'English'
                ? 'Read More'
                : 'सबै हेर्नुहोस्'
            "
            :listdata="allNoticeHomepage"
            :language="selectedLanguage.title"
            slug="notice"
          />
        </v-col>
        <v-col md="4" v-if="loading">
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="30"
          ></v-skeleton-loader>
        </v-col>
        <v-col md="4" cols="12" class="bottommargin" v-if="!loading">
          <Twitterbox
            :title="
              selectedLanguage.title === 'English' ? 'Twitter' : 'Twitter'
            "
          />
        </v-col>

        <v-col v-if="false"></v-col>
        <v-col md="4" v-if="loading">
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            height="200"
          ></v-skeleton-loader>
        </v-col>
        <v-col md="4" cols="12" class="bottommargin" v-if="!loading">
          <Facebookbox
            :title="
              selectedLanguage.title === 'English' ? 'Facebook' : 'Facebook'
            "
          />
          <div
            v-bind:class="{ nep: selectedLanguage.title !== 'English' }"
            v-if="false"
          >
            <header class="contenttitle">
              {{
                selectedLanguage.title === "English"
                  ? "Social Media"
                  : "सामाजिक संजाल"
              }}
            </header>
            <div class="contentsection">
              <ul class="sociallinks">
                <li>
                  <a
                    href="https://www.facebook.com/nepalicongresshq"
                    target="_blank"
                  >
                    <i class="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/NepaliCongress" target="_blank">
                    <i class="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCbEMIE6Zz1IFX-F2u2dbTWw"
                    target="_blank"
                  >
                    <i class="fa fa-youtube"></i>
                  </a>
                </li>
              </ul>
              <!-- <img :src="require('@/assets/images/icons/socialhomecon.svg')" alt /> -->
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <VideoSection
      class="sectionbox"
      :title="
        selectedLanguage.title === 'English'
          ? 'Nepali Congress Histroy'
          : 'नेपाली कांग्रेसको इतिहास'
      "
      :buttontxt="
        selectedLanguage.title === 'English' ? 'Read More' : 'सबै हेर्नुहोस्'
      "
      slug="rules-and-regulations"
    />
    <v-container fluid class="sectionbox">
      <v-row>
        <v-col md="8" cols="12" v-if="allHistoryHomepage.length != 0">
          <ThreePicture
            :title="
              selectedLanguage.title === 'English'
                ? 'Nepali Congress Histroy'
                : 'नेपाली कांग्रेसको इतिहास'
            "
            :buttontxt="
              selectedLanguage.title === 'English'
                ? 'Read More'
                : 'सबै हेर्नुहोस्'
            "
            :listdata="allHistoryHomepage"
            :language="selectedLanguage.title"
            slug="history"
          />
        </v-col>
        <v-col md="4" cols="12" v-if="allOurInspirationHomepage.length != 0">
          <HighlistContent
            :title="
              selectedLanguage.title === 'English'
                ? 'Our Inspiration'
                : 'हाम्रो प्रेरणा'
            "
            :buttontxt="
              selectedLanguage.title === 'English'
                ? 'Read More'
                : 'सबै हेर्नुहोस्'
            "
            :listdata="allOurInspirationHomepage"
            :language="selectedLanguage.title"
            slug="our-inspiration"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import IconBox from "../components/common/Iconbox";
import VideoSection from "../components/VideoSection";
import ThreePicture from "../components/ThreePicture";
import HighlistContent from "../components/HighlistContent";
import Twitterbox from "../components/Twitterbox";
import HistorySlider from "../components/HistorySlider";
import PresidentMessage from "../components/PresidentMessage";
import Facebookbox from "../components/Facebookbox";
import ListBox from "../components/ListBox";
import ImageBox from "../components/ImageBox";
import ImageBoxSide from "../components/ImageBoxSide";
import ListBoxImage from "../components/ListBoxImage";
import Banner from "../components/includes/Banner";
import Popbox from "../components/common/Popbox";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    IconBox,
    VideoSection,
    ThreePicture,
    HighlistContent,
    ListBox,
    Twitterbox,
    Facebookbox,
    ListBoxImage,
    Banner,
    ImageBox,
    ImageBoxSide,
    Popbox,
    PresidentMessage,
    HistorySlider,
  },
  data() {
    return {
      popbox: true,
      loading: true,
    };
  },
  computed: mapGetters([
    "selectedLanguage",
    "allPressReleaseHomepage",
    "allNewsHomepage",
    "allNoticeHomepage",
    "allRulesandRegulationHomepage",
    "allOurInspirationHomepage",
    "allHistoryHomepage",
    "allEventsHomepage",
    "allPostHomepage",
    "allPoppostsHomepage",
  ]),
  methods: {
    ...mapActions([
      "fetchPressReleaseHomepage",
      "fetchNewsHomepage",
      "fetchRulesNregulationHomepage",
      "fetchInspirationHomepage",
      "fetchNoticeHomepage",
      "fetchHistoryHomepage",
      "fetchEventsHomepage",
      "fetchPostsHomepage",
      "fetchPoppostsHomepage",
    ]),
    closePop() {
      this.popbox = false;
      console.log("hey");
      // sessionStorage.setItem('popseen',true);
    },
  },
  async created() {
    await this.fetchPressReleaseHomepage();
    await this.fetchNewsHomepage();
    await this.fetchRulesNregulationHomepage();
    await this.fetchInspirationHomepage();
    await this.fetchNoticeHomepage();
    await this.fetchHistoryHomepage();
    await this.fetchEventsHomepage();
    await this.fetchPostsHomepage();
    await this.fetchPoppostsHomepage();
    this.loading = false;
    // this.$store.state.post.loading = true;
    // setTimeout(() => {
    //   this.$store.state.post.loading = false;
    // }, 2300);

    if (sessionStorage.getItem("popseen") == undefined) {
      this.popbox = true;
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.sectionbox {
  margin-bottom: 0;
  margin-top: 50px;
  .contentsection {
    padding: 20px;
    img {
      margin-bottom: -10px;
    }
  }
}
.bannersection {
  background: $white;
  @media only screen and (max-width: 991px) {
    margin-bottom: -150px;
  }
}
.sociallinks {
  list-style: none;
  padding-left: 0;
  display: flex;
  li {
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    border-radius: 3px;
    .fa {
      color: $white;
      font-size: 22px;
    }
    &:nth-of-type(1) {
      background: #3b5999;
    }
    &:nth-of-type(2) {
      background: #55acee;
    }
    &:nth-of-type(3) {
      background: #cd201f;
    }
  }
}
.nep {
  header {
    letter-spacing: 0;
  }
}
.topshare {
  margin-top: 10px;
  background: transparent;
  display: flex;
  justify-content: flex-end;
  margin-bottom: -40px;
  li {
    padding: 10px;
    height: 40px !important;
    width: 40px !important;
    font-size: 15px !important;
    &:last-of-type {
      margin-right: 0;
    }
    .fa {
      font-size: 15px !important;
    }
  }
}
.twitterscroll {
  height: 400px;
  overflow-y: scroll;
}

.bottommargin {
  margin-bottom: 40px;
}
</style>
