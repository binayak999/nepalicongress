<template>
  <section class="mainbox">
    <PopboxSubdomain
      :poppostdata="subdomainSingle.popposts"
      @clicked="closePop"
      v-if="
        popbox &&
          subdomainSingle.popposts != undefined &&
          subdomainSingle.popposts.length != 0
      "
    />
    <div class="contentsection topshare">
      <ul class="sociallinks">
        <li>
          <a :href="subdomainSingle.facebookUrl" target="_blank">
            <i class="fa fa-facebook"></i>
          </a>
        </li>
        <li>
          <a :href="subdomainSingle.twitterUrl" target="_blank">
            <i class="fa fa-twitter"></i>
          </a>
        </li>
        <li>
          <a :href="subdomainSingle.instagramUrl" target="_blank">
            <i class="fa fa-youtube"></i>
          </a>
        </li>
      </ul>
    </div>

    <v-container fluid class="backgroundtitle">
      <v-row v-bind:class="{ nep: selectedLanguage.title !== 'English' }">
        <v-col
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          cols="12"
        >
          <h1
            class="text-center"
            v-if="selectedLanguage.title !== 'English'"
            v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }"
          >
            <span
              v-if="
                breadcrumb.nep.maintitle != 'भातृ संस्था' &&
                  breadcrumb.nep.maintitle != 'शुभेच्छुक संस्था' &&
                  breadcrumb.eng.maintitle !=
                    'Central Policy , Research and Training' &&
                  breadcrumb.eng.maintitle != 'Central Election Committee' &&
                  breadcrumb.eng.maintitle !=
                    'Nepali Congress Federal Parliamentary Party' &&
                  (subdomainSingle.parentSubdomain == false ||
                    subdomainSingle.parentSubdomain == undefined) &&
                  subdomainSingle.category ==
                    'Nepali Congress District Working Committee'
              "
              >{{ subdomainSingle.categoryNep }},</span
            >
            <span
              v-if="
                subdomainSingle.parentSubdomain != false &&
                  subdomainSingle.parentSubdomain != undefined
              "
              >नेपाली कांग्रेस
              {{
                subdomainSingle.parentSubdomain ==
                "Nepali Public Relations Committee Coordination Department"
                  ? "जनसम्पर्क समिति "
                  : "क्षेत्रीय कार्य समिति"
              }}
            </span>

            {{ subdomainSingle.nepname }}
          </h1>
          <h1 class="text-center" v-if="selectedLanguage.title === 'English'">
            <span
              v-if="
                breadcrumb.eng.maintitle != 'Sister Organization' &&
                  breadcrumb.eng.maintitle != 'Well Wisher Organization' &&
                  breadcrumb.eng.maintitle !=
                    'Central Policy , Research and Training' &&
                  breadcrumb.eng.maintitle != 'Central Election Committee' &&
                  breadcrumb.eng.maintitle !=
                    'Nepali Congress Federal Parliamentary Party' &&
                  (subdomainSingle.parentSubdomain == false ||
                    subdomainSingle.parentSubdomain == undefined) &&
                  subdomainSingle.category ==
                    'Nepali Congress District Working Committee'
              "
              >{{ subdomainSingle.category }},</span
            >
            <span
              v-if="
                subdomainSingle.parentSubdomain != false &&
                  subdomainSingle.parentSubdomain != undefined
              "
            >
              Nepali Congress {{
                subdomainSingle.parentSubdomain ==
                "Nepali Public Relations Committee Coordination Department"
                  ? "Public Relations Committee"
                  : " Regional Working Committee"
              }},</span
            >
            {{ subdomainSingle.name }}
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12">
          <ul class="address">
            <li>
              <span v-if="selectedLanguage.title !== 'English'">ठेगाना</span>
              <span v-if="selectedLanguage.title === 'English'">Address</span> :
              {{ subdomainSingle.address }}
            </li>
            <li>
              <span v-if="selectedLanguage.title !== 'English'">ईमेल</span>
              <span v-if="selectedLanguage.title === 'English'">Email</span> :
              {{ subdomainSingle.email }}
            </li>
            <li>
              <span v-if="selectedLanguage.title !== 'English'">फोन</span>
              <span v-if="selectedLanguage.title === 'English'">Phone</span> :
              {{ subdomainSingle.phone }}
            </li>
            <li
              v-if="
                subdomainSingle.externalLink != '' &&
                  subdomainSingle.externalLink != undefined
              "
            >
              <a
                :href="subdomainSingle.externalLink"
                target="_blank"
                v-if="selectedLanguage.title !== 'English'"
              >
                वेबसाइट भ्रमण गर्नुहोस्</a
              >
              <a
                :href="subdomainSingle.externalLink"
                target="_blank"
                v-if="selectedLanguage.title === 'English'"
                >Visit Website</a
              >
            </li>
            <li>
              <span v-if="selectedLanguage.title !== 'English'">
                कार्यसमिति :
              </span>
              <span v-if="selectedLanguage.title === 'English'"
                >Working Committee</span
              >

              <router-link
                :to="'/districtworkingcommittee/' + slug"
                v-if="selectedLanguage.title === 'English'"
                class="btnbox"
              >
                View</router-link
              >
              <router-link
                :to="'/districtworkingcommittee/' + slug"
                v-if="selectedLanguage.title !== 'English'"
                class="btnbox"
              >
                हेर्नुहोस्</router-link
              >
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      fluid
      class="backgroundul"
      v-if="subdomainSingle.posts == undefined"
    >
      <v-row>
        <v-col md="12">
          <Leaders :selectedLanguage="selectedLanguage" />
        </v-col>
      </v-row>
    </v-container>
    <div class="home">
      <v-container
        class="bannersection"
        fluid
        v-if="subdomainSingle.posts != undefined"
      >
        <div>
          <!-- {{subdomainSingle}} -->
          <Banner
            v-if="subdomainSingle.posts != undefined"
            :buttontxt="
              selectedLanguage.title === 'English'
                ? 'Read More'
                : 'सबै हेर्नुहोस्'
            "
            :listdata="subdomainSingle.posts"
            :language="selectedLanguage.title"
            class="subdomainbanner"
          />
        </div>
      </v-container>

      <div>
        <div
          v-if="
            subdomainSingle.parentSubdomain == undefined && chetraAll.length > 0
          "
        >
          <div
            v-for="(breadcrumb, index) in breadcrumbs"
            :key="index"
            cols="12"
          >
            <h2 v-if="selectedLanguage.title === 'English'" class="titlebox">
              {{ breadcrumb.eng.title }}
              <span
                v-if="
                  subdomainSingle.category ==
                    'Nepali Congress District Working Committee'
                "
                >Regional</span
              >
              Working Committee
            </h2>
            <h2 v-if="selectedLanguage.title !== 'English'" class="titlebox">
              {{ breadcrumb.nep.title }}
              <span
                v-if="
                  subdomainSingle.category ==
                    'Nepali Congress District Working Committee'
                "
                >क्षेत्रीय</span
              >
              कार्यसमिति
            </h2>
          </div>
        </div>
        <div>
          <ul class="domainlist" v-if="selectedLanguage.title === 'English'">
            <div v-for="(chetra, index) in chetraAll" :key="index">
              <li>
                <router-link
                  :to="'/subdomain/' + chetra.slug"
                  v-if="selectedLanguage.title === 'English'"
                >
                  <img
                    v-if="chetra.image[0]"
                    :src="baseUrl + chetra.image[0].fileUrl"
                    alt
                  />
                  <span>{{ chetra.name }}</span>
                </router-link>
              </li>
            </div>
          </ul>
        </div>
        <ul class="domainlist" v-if="selectedLanguage.title !== 'English'">
          <div v-for="(chetra, index) in chetraAll" :key="index">
            <li>
              <router-link
                :to="'/subdomain/' + chetra.slug"
                v-if="selectedLanguage.title !== 'English'"
              >
                <img
                  v-if="chetra.image[0]"
                  :src="baseUrl + chetra.image[0].fileUrl"
                  alt
                />
                <span>{{ chetra.nepname }}</span>
              </router-link>
            </li>
          </div>
        </ul>
      </div>
      <v-container fluid class="sectionbox">
        <v-row>
          <v-col md="8" cols="12">
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
              :listdata="subdomainSingle.pressrelease"
              :language="selectedLanguage.title"
              v-if="subdomainSingle.pressrelease != undefined"
              slug="press-release"
            />
          </v-col>
          <v-col md="4" class="backbox" cols="12">
            <ImageBox
              :title="
                selectedLanguage.title === 'English' ? 'Latest News' : 'समाचार'
              "
              :buttontxt="
                selectedLanguage.title === 'English'
                  ? 'Read More'
                  : 'सबै हेर्नुहोस्'
              "
              :listdata="subdomainSingle.news"
              :language="selectedLanguage.title"
              slug="news"
              v-if="subdomainSingle.news != undefined"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid class="sectionbox">
        <v-row>
          <v-col md="6" class="backbox" cols="12">
            <ListBox
              :title="
                selectedLanguage.title === 'English' ? 'Events' : 'कार्यक्रमहरु'
              "
              :buttontxt="
                selectedLanguage.title === 'English'
                  ? 'Read More'
                  : 'सबै हेर्नुहोस्'
              "
              :listdata="subdomainSingle.events"
              :language="selectedLanguage.title"
              slug="news"
              v-if="subdomainSingle.events != undefined"
            />
          </v-col>
          <v-col md="6" class="backbox" cols="12">
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
              :listdata="subdomainSingle.history"
              :language="selectedLanguage.title"
              slug="history"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import TitleBreadCrumb from "../components/common/TitleBreadCrumb";
import Banner from "../components/includes/Banner";
import ListBox from "../components/ListBox";
import ListBoxImage from "../components/ListBoxImage";
import Leaders from "../components/common/Leaders";
import ImageBox from "../components/ImageBox";
import ThreePicture from "../components/ThreePicture";
import PopboxSubdomain from "../components/common/PopboxSubdomain";
export default {
  name: "SubdomainSingle",
  components: {
    // TitleBreadCrumb,
    ListBox,
    Banner,
    ListBoxImage,
    Leaders,
    ImageBox,
    ThreePicture,
    PopboxSubdomain,
  },
  data() {
    return {
      breadcrumbs: [],
      slug: this.$route.params.name,
      popbox: true,
    };
  },
  computed: {
    ...mapGetters(["subdomainSingle", "selectedLanguage", "chetraAll"]),
  },
  methods: {
    ...mapActions(["subdomainFrontendSingle", "fetchChetra"]),
    closePop() {
      this.popbox = false;
      console.log("hey");
      // sessionStorage.setItem('popseen',true);
    },
  },
  created() {
    this.subdomainFrontendSingle(this.$route.params.name);
    this.fetchChetra(this.$route.params.name);
    setTimeout(() => {
      this.breadcrumbs.push({
        eng: {
          title: this.subdomainSingle.name,
          maintitle: this.subdomainSingle.category,
        },
        nep: {
          title: this.subdomainSingle.nepname,
          maintitle: this.subdomainSingle.categoryNep,
        },
      });
    }, 1000);
    this.$store.state.post.loading = true;
    setTimeout(() => {
      this.$store.state.post.loading = false;
    }, 1500);

    if (sessionStorage.getItem("popseen") == undefined) {
      this.popbox = true;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.titlebox {
  text-align: center;
}
.bannersection {
  margin-top: -50px;

  margin-bottom: 50px;
}
.backgroundtitle {
  background: $whitegray;
  padding: 5px 0;
  margin-top: 40px;
  .nep {
    h1 {
      font-family: $nepalifont !important;
      font-size: 35px;
      color: $secondary;
    }
    h3 {
      font-family: $nepalifont !important;
      font-size: 20px;
      color: $secondary;
    }
  }
  h1 {
    font-size: 25px;
    color: $secondary;
    letter-spacing: 1.3px;
  }
  h3 {
    font-size: 20px;
    color: $secondary;
    letter-spacing: 1.3px;
  }
}
.domainlist {
  padding-left: 0;
  margin-left: 0;
  list-style: none;
  margin: 30px 0;
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  li {
    // width: 25%;
    box-sizing: border-box;
    padding: 10px;
  }
  a {
    display: block;
    background: $white;
    width: 100%;
    color: $secondary;
    text-align: center;
    text-decoration: none;
    padding: 10px 20px;
    letter-spacing: 2px;
  }
}
.home {
  padding: 50px 0;
}

.sociallinks {
  list-style: none;
  padding-left: 0;
  display: flex;
  background: $whitegray;
  position: absolute;
  padding: 10px;
  @media only screen and (max-width: 991px) {
    padding: 10px;
    left: 0;
    top: 138px;
    background: transparent;
  }
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
  // margin-top:10px;

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
.address {
  display: flex;
  padding-left: 0;
  list-style: none;
  padding-left: 0;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  color: $secondary;
  font-size: 13px;
  letter-spacing: 1px;
  // border-top: 1px solid;
  flex-wrap: wrap;
  li {
    margin: 0 20px;
    @media only screen and (max-width: 991px) {
      margin: 10px 10px;
      width: auto;
    }
  }
}
.btnbox {
  border: 1px solid $secondary;
  padding: 10px;
  color: $secondary;
  text-decoration: none;
}
a {
  color: $secondary;
}
.domainlist {
  padding-left: 0;
  margin-left: 0;
  list-style: none;
  margin: 30px 0;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  @media only screen and (max-width: 991px) {
    flex-flow: column;
  }
  div {
    width: 25%;
    @media only screen and (max-width: 991px) {
      width: 100%;
    }
  }
  li {
    // width: 25%;
    font-family: $mon;
    box-sizing: border-box;
    padding: 10px;
    height: 100%;
    a {
      height: 100%;
    }
    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      margin-bottom: -10px;
      filter: brightness(50%);
    }
    @media only screen and (max-width: 991px) {
      width: 100%;
    }
  }
  a {
    overflow: hidden;
    border-radius: 10px;
    display: block;
    border: 1px solid $secondary;
    width: 100%;
    color: $text;
    text-align: center;
    text-decoration: none;
    min-height: 50px;
    letter-spacing: 2px;
    font-family: $mon;
    &:hover {
      background: $secondary;
      color: $white;
      span {
        background: $secondary;
      }
    }
    position: relative;
    span {
      padding: 15px 20px;
      display: block;
      position: absolute;
      z-index: 999;
      left: 0;
      right: 30px;
      left: 30px;
      top: 50%;
      transform: translateY(-50%);
      background: $white;
    }
  }
}
</style>
