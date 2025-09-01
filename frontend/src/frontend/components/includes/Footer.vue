<template>
  <div v-bind:class="{ displaynone: conditionheader }">
    <section v-bind:class="{ nep: selectedLanguage.title !== 'English' }">
      <v-container fluid>
        <div class="footersection"></div>
        <div class="footersection">
          <div
            class="menubox"
            v-if="selectedLanguage.title !== 'Nepali'"
            v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }"
          >
            <h3>{{ allFooterAbout[0].eng.title }}</h3>
            <ul class="footermenu">
              <li
                v-for="(submenu, index) in allFooterAbout[0].eng.subMenu"
                :key="index"
              >
                <span v-if="!submenu.path">{{ submenu.title }}</span>
              </li>
            </ul>
          </div>
          <div
            class="menubox"
            v-if="selectedLanguage.title === 'Nepali'"
            v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }"
          >
            <h3>{{ allFooterAbout[0].nep.title }}</h3>
            <ul class="footermenu">
              <li
                v-for="(submenu, index) in allFooterAbout[0].nep.subMenu"
                :key="index"
              >
                <span v-if="!submenu.path">{{ submenu.title }}</span>
              </li>
            </ul>
          </div>
          <!-- {{allFooterMenu}}  -->
          <template
            v-if="selectedLanguage.title !== 'Nepali'"
            v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }"
          >
            <div
              v-for="(menu, index) in allFooterMenu"
              :key="index"
              class="menubox"
            >
              <h3>{{ menu.title }}</h3>

              <ul class="footermenu">
                <li v-if="menu.neptitle == 'क्वीक लिंक्स'">
                  <a href="https://library.nepalicongress.org">
                    Nepali Congress Central Library
                  </a>
                </li>
                <li v-for="(submenu, index) in menu.subMenu" :key="index">
                  <router-link
                    v-if="submenu.slug != undefined"
                    :to="submenu.slug"
                    >{{ submenu.eng.title }}</router-link
                  >
                  <a
                    v-if="submenu.href != undefined"
                    :href="submenu.href"
                    target="_blank"
                    >{{ submenu.eng.title }}</a
                  >
                  <span v-if="!submenu.path">{{ submenu.title }}</span>
                </li>
                <li v-if="menu.title === 'Quick Links'">
                  <router-link to="/deleteAccount">
                    Delete Account
                  </router-link>
                </li>
              </ul>
            </div>
          </template>
          <template
            v-if="selectedLanguage.title === 'Nepali'"
            v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }"
          >
            <div
              v-for="(menu, index) in allFooterMenu"
              :key="index"
              class="menubox"
            >
              <h3>{{ menu.neptitle }}</h3>
              <ul class="footermenu">
                <li v-if="menu.neptitle == 'क्वीक लिंक्स'">
                  <a href="http://library.nepalicongress.org">
                    नेपाली कांग्रेस केन्द्रीय पुस्तकालय
                  </a>
                </li>
                <li v-for="(submenu, index) in menu.subMenu" :key="index">
                  <router-link
                    v-if="submenu.slug != undefined"
                    :to="submenu.slug"
                    >{{ submenu.nep.title }}</router-link
                  >
                  <a
                    v-if="submenu.href != undefined"
                    :href="submenu.href"
                    target="_blank"
                    >{{ submenu.nep.title }}</a
                  >
                  <span v-if="!submenu.path">{{ submenu.title }}</span>
                </li>
                <li v-if="menu.neptitle == 'क्वीक लिंक्स'">
                  <router-link to="/deleteAccount">
                    खाता बन्द गर्नुहोस्
                  </router-link>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </v-container>
      <footer>
        <ul>
          <li>
            &copy; 1999 - {{ new Date().getFullYear() }} Nepali Congress. All
            rights reserved.
          </li>
          <li>
            <ul>
              <a href="http://upliftsolutions.info/" class="infolink"
                >Uplift Solutions Pvt.Ltd.</a
              >
              <a href="https://upliftsolutions.com.np/" class="infolink"
                >Uplift Solutions Pvt.Ltd.</a
              >
            </ul>
          </li>
          <li>
            Visitor's
            <u>
              <strong>{{ allhitcount }}</strong>
            </u>
            since 1999
          </li>
        </ul>
      </footer>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Footer",
  data() {
    return {
      conditionheader: false,
    };
  },
  computed: {
    ...mapGetters([
      "allFooterMenu",
      "allFooterAbout",
      "selectedLanguage",
      "allhitcount",
    ]),
  },
  methods: {
    ...mapActions(["getFooterMenus"]),
  },
  created() {
    if (this.$route.query.nohead) {
      this.conditionheader = true;
    }
    this.getFooterMenus();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
section {
  background: $white;
  letter-spacing: 1px;
  box-shadow: 0px 5px 10px $ligtgray;
  h3 {
    margin-bottom: 20px;
    letter-spacing: 1.2px;
    font-family: $mon;
  }
  .footermenu {
    list-style: none;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;

    li {
      position: relative;
      font-family: $mon;
      width: 50%;
      @media only screen and (max-width: 991px) {
        width: 100%;
      }
      a {
        font-size: 14px;
        text-decoration: none;
        letter-spacing: 1px;
        color: $text;
        margin-left: 20px;
      }
      &::after {
        content: "\f101";
        font-family: "Fontawesome";
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}
.footersection {
  display: flex;
  padding: 30px 0;
  @media only screen and (max-width: 991px) {
    flex-flow: column;
  }
  .menubox {
    @media only screen and (max-width: 991px) {
      margin-bottom: 20px;
    }
    li {
      margin-bottom: 10px;
    }
    &:first-of-type {
      width: 25%;
      .footermenu {
        li {
          width: 100%;
          &::after {
            display: none;
          }
          span {
            font-size: 14px;
          }
        }
      }
      @media only screen and (max-width: 991px) {
        width: 100%;
      }
    }
    &:nth-of-type(2) {
      width: 40%;
      @media only screen and (max-width: 991px) {
        width: 100%;
      }
    }
    &:nth-of-type(3) {
      width: 15%;
      .footermenu {
        li {
          width: 100%;
        }
      }
      @media only screen and (max-width: 991px) {
        width: 100%;
      }
    }
    &:nth-of-type(4) {
      width: 25%;
      @media only screen and (max-width: 991px) {
        width: 100%;
      }
    }
  }
}
footer {
  background: $secondary;
  padding: 10px 20px;
  @media only screen and (max-width: 991px) {
    padding-top: 30px;
  }
  ul {
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    list-style: none;
    margin-bottom: 0;
    @media only screen and (max-width: 991px) {
      width: 100%;
      flex-flow: column;
      text-align: center;
    }
    li {
      letter-spacing: 1px;
      font-family: $mon;
      @media only screen and (max-width: 991px) {
        margin-bottom: 10px;
      }
      &:nth-of-type(2) {
        text-align: center;
        ul {
          display: flex;
          li {
            padding: 0 5px;
            a {
              text-decoration: none;
              letter-spacing: 1px;
              font-family: $mon;
            }
          }
        }
      }
      font-size: 14px;
      color: $white;
      a {
        color: $white;
      }
    }
  }
}
.nep {
  h3 {
    letter-spacing: 0;
    font-family: $nepalifont !important;
  }
  ul {
    li {
      letter-spacing: 0;
      font-family: $nepalifont !important;
      a {
        letter-spacing: 0;
        font-family: $nepalifont !important;
      }
    }
  }
  p {
    letter-spacing: 0;
    font-family: $nepalifont !important;
  }
}
.infolink {
  color: $secondary;
  width: 0;
  font-size: 1px;
}
</style>
