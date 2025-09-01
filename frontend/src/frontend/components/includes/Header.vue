<template>
  <div v-bind:class="{ displaynone: conditionheader }">
    <section v-bind:class="{ nep: selectedLanguage.title !== 'English' }">
      <AlertNotification />
      <div class="loader" v-if="loadingall">
        <img
          :src="require(`@/assets/images/icons/loading.svg`)"
          alt
          class="loading"
        />
      </div>
      <v-container fluid>
        <v-row class="topme">
          <v-col md="2" class="logo" cols="12">
            <router-link to="/">
              <img :src="require(`@/assets/images/logo.svg`)" alt />
            </router-link>
          </v-col>
          <v-col
            class="boxdiv"
            md="10"
            cols="12"
            v-bind:class="{ nep: selectedLanguage.title !== 'English' }"
          >
            <div class="relbox">
              <ul class="langugaes">
                <li
                  v-for="(lang, index) in allSecondFrontend[0].languageChange"
                  :key="index"
                  @click="changeLang(lang)"
                  class="changeLang"
                  v-bind:class="{
                    activelang:
                      selectedLanguage.title ==
                      (lang.showtitle == 'नेपाली' ? 'Nepali' : lang.showtitle),
                  }"
                >
                  {{ lang.showtitle }}
                </li>
              </ul>
            </div>
            <!-- {{logged}} -->
            <router-link
              to="/login"
              class="primary-me"
              v-if="logged == undefined && selectedLanguage.title !== 'English'"
            >
              <i class="fa fa-user-circle"></i>
              {{ allSecondFrontend[0].actionButton.neptitle }}
            </router-link>
            <router-link
              to="/login"
              class="primary-me"
              v-if="logged == undefined && selectedLanguage.title === 'English'"
            >
              <i class="fa fa-user-circle"></i>
              {{ allSecondFrontend[0].actionButton.engtitle }}
            </router-link>

            <ul class="emailbox">
              <li>
                <a
                  v-if="selectedLanguage.title === 'English'"
                  href="https://s580.sgp8.mysecurecloudhost.com:2096/"
                  target="_blank"
                  >Email</a
                >
                <a
                  v-if="selectedLanguage.title !== 'English'"
                  href="https://s580.sgp8.mysecurecloudhost.com:2096/"
                  target="_blank"
                  >ईमेल</a
                >
              </li>
            </ul>
            <div v-if="logged != undefined">
              <ul class="mainul">
                <li>
                  <ul class="profilebox">
                    <li>
                      <i class="fa fa-user-circle"></i>
                    </li>
                    <li v-if="logged.user.role !== 'subdomain'">
                      {{ logged.user.first_name }} {{ logged.user.last_name }}
                    </li>
                    <li v-if="logged.user.role === 'subdomain'">
                      {{ logged.user.name }}
                    </li>
                  </ul>
                </li>

                <li @click="logoutButton">
                  <i class="fa fa-power-off"></i> Logout
                </li>
              </ul>
              <ul class="menubox" v-if="logged != undefined">
                <li
                  v-if="
                    logged.user.role === 'admin' ||
                      logged.user.role == 'activecontrol'
                  "
                >
                  <router-link to="/dashboard">
                    <i class="fa fa-dashboard"></i>
                  </router-link>
                </li>
                <li v-if="logged.user.role === 'activeviewer'">
                  <router-link to="/dashboard/activeMembersubdomain">
                    <i class="fa fa-dashboard"></i>
                  </router-link>
                </li>
                <li v-if="logged.user.role === 'onlinemember'">
                  <router-link to="/dashboard/onlineusers">
                    <i class="fa fa-dashboard"></i>
                  </router-link>
                </li>
                <li v-if="logged.user.role === 'subdomain'">
                  <router-link to="/dashboard">
                    <i class="fa fa-dashboard"></i>
                  </router-link>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>
        <v-row v-bind:class="{ scrollheader: scroll }">
          <v-col md="12" v-if="loading">
            <v-skeleton-loader
              class="mx-auto"
              type="image"
              height="60"
            ></v-skeleton-loader>
          </v-col>
          <v-col md="12" cols="12" v-if="!loading">
            <i class="fa fa-navicon" @click="menuopen" v-if="!showmenu"></i>
            <i class="fa fa-close" @click="menuopen" v-if="showmenu"></i>
            <ul class="menu-primary" v-bind:class="{ activemenu: showmenu }">
              <li v-for="(menu, index) in allMenuFrontend" :key="index">
                <router-link
                  :to="menu.slug"
                  v-if="
                    menu.slug &&
                      menu.children != undefined &&
                      menu.children.length == 0
                  "
                >
                  <template v-if="selectedLanguage.title === 'Nepali'">
                    {{ menu.nep.title }}
                  </template>
                  <template v-if="selectedLanguage.title === 'English'">
                    {{ menu.eng.title }}
                  </template>
                </router-link>
                <div
                  class="menunolink"
                  v-if="menu.children != undefined && menu.children.length != 0"
                >
                  <template v-if="selectedLanguage.title === 'Nepali'">
                    {{ menu.nep.title }}
                  </template>
                  <template v-if="selectedLanguage.title === 'English'">
                    {{ menu.eng.title }}
                  </template>

                  <i
                    class="fa fa-angle-down"
                    v-if="
                      menu.children != undefined && menu.children.length != 0
                    "
                  ></i>
                  <ul v-if="menu.children != undefined">
                    <li v-for="(submenu, index) in menu.children" :key="index">
                      <router-link :to="submenu.slug" v-if="submenu.slug">
                        <template v-if="selectedLanguage.title === 'Nepali'">
                          {{ submenu.nep.title }}
                        </template>
                        <template v-if="selectedLanguage.title === 'English'">
                          {{ submenu.eng.title }}
                        </template>
                      </router-link>
                    </li>
                  </ul>
                </div>

                <span v-if="!menu.slug">{{ menu.title }}</span>
                <ul class="menu-secondary">
                  <li v-for="(men, index) in menu.submenu" :key="index">
                    <router-link :to="men.slug">{{ men.title }}</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </v-col>
        </v-row>

  
        <router-link
          class="btn-primary-fix"
          to="/vote-results"
          v-if="$route.name != 'Election Vote Result' && logged != undefined &&
            logged.user.district != undefined &&
              
              logged.user.userFor == 'Election Officer'
          "
          >Go To Vote Entry Table
          <v-icon> mdi-chevron-right </v-icon></router-link
        >
              <router-link
          class="btn-primary-fix"
          to="/vote-result-entry"
          v-if="$route.name != 'Election Vote Result Add' && logged != undefined &&
            logged.user.district != undefined &&
              
              logged.user.userFor == 'Election Officer'
          "
          >Go To Vote Entry Form
          <v-icon> mdi-chevron-right </v-icon></router-link
        >
      </v-container>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { secureStorage } from "../../../main";
import AlertNotification from "../common/AlertBox";
export default {
  name: "Header",
  components: { AlertNotification },
  methods: {
    ...mapActions(["getHeaderMenus"]),
    changeLang(data) {
      this.languageSelected = data;
      this.$store.dispatch("languageChange", data);
    },
    logoutButton() {
      this.$store.dispatch("logoutUser");
    },
    menuopen() {
      this.showmenu = !this.showmenu;
    },
    handleScroll() {
      if (window.scrollY > 100) {
        this.scroll = true;
      }
      if (window.scrollY < 150) {
        this.scroll = false;
      }
    },
  },
  data() {
    return {
      showmenu: false,
      scroll: false,
      conditionheader: false,
      loading: true,
    };
  },
  computed: {
    ...mapGetters([
      "allMenuFrontend",
      "allSecondFrontend",
      "selectedLanguage",
      "logged",
      "loadingall",
    ]),
  },
  async created() {

    if (this.$route.query.nohead) {
      this.conditionheader = true;
    }
    await this.getHeaderMenus();
    this.loading = false;
    if (secureStorage.getItem("userData")) {
      this.$store.state.user.loggedUser = JSON.parse(
        secureStorage.getItem("userData")
      );
    }

    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.scrollheader {
  @media only screen and (min-width: 991px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    padding: 0;
    max-width: 100% !important;
    background: $secondary;
    box-shadow: 0 1px 10px $secondary;
    transition: 0.3s all ease-in-out;
  }
}
.topme {
  background: $white;
  margin-left: -25px;
  margin-right: -25px;
}
.nep {
  a {
    font-family: $nepalifont !important;
    font-size: 18px !important;
    @media only screen and (max-width: 1200px) {
      font-size: 14px !important;
    }
    letter-spacing: 0 !important;
  }
}
section {
  .fa-navicon {
    color: $white;
    width: 100%;
    text-align: right;
    font-size: 25px;
    position: relative;
    right: -10px;
    @media only screen and (min-width: 991px) {
      display: none;
    }
  }
  .fa-close {
    color: $white;
    width: 100%;
    text-align: right;
    font-size: 25px;
    position: relative;
    right: -10px;
    @media only screen and (min-width: 991px) {
      display: none;
    }
  }
  .selectlang {
    height: 30px;
    width: 120px;
    display: flex;
    align-items: center;
    margin-right: 10px;
    color: $white;

    letter-spacing: 1.3px;

    justify-content: flex-start;
    &:hover {
      cursor: pointer;
    }
  }
  .changeLang {
    cursor: pointer;
    font-weight: 600;
    font-size: 14px !important;
  }
  .container {
    padding: 0;
  }
  background: linear-gradient(to top, #19731d, #52f75a);
  padding: 0 25px;
  .logo {
    background: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    // padding-top: 5px;
    padding-bottom: 10px;
    // margin-top: 10px;
    text-align: center;
    @media only screen and (max-width: 991px) {
      margin-top: 10px;
    }
    img {
      width: 200px;
      padding: 0 10px;
    }
  }
  .menu {
    &-primary {
      display: flex;
      list-style: none;
      justify-content: center;
      padding-left: 0;
      @media only screen and (max-width: 991px) {
        flex-flow: column;
        padding-left: 0;
        display: none;
      }
      & > li {
        position: relative;
        font-size: 16px;
        @media only screen and (max-width: 1200px) {
          font-size: 13px;
        }
        margin: 0 8px;
        & > a {
          display: block;
          margin-top: 5px;
          padding: 10px 10px;
          color: $white;
          text-decoration: none;
          font-family: $mon;
          letter-spacing: 1.3px;
          font-size: 16px;
          @media only screen and (max-width: 1200px) {
            font-size: 14px;
          }
          text-transform: capitalize;
          &:hover {
            background: linear-gradient(to top, $white, transparent 5%);
          }
          @media only screen and (max-width: 991px) {
            padding: 10px 5px;
          }
        }
        & > span {
          display: block;
          padding: 15px 20px;
          color: $white;
          font-family: $mon;
          letter-spacing: 1.3px;
          &:hover {
            background: linear-gradient(to top, $white, transparent 5%);
          }
        }
        &:hover {
          .menu-secondary {
            display: block;
          }
        }
      }
    }
    &-secondary {
      position: absolute;
      z-index: 999;
      display: flex;
      width: 200px !important;
      // margin-bottom: 14px;
      list-style: none;
      padding-left: 0;
      flex-flow: column;
      background: $primary;
      width: 100%;
      display: none;
      li {
        font-size: 16px;
        @media only screen and (max-width: 1200px) {
          font-size: 13px;
        }

        & > a {
          display: block;
          color: $white;
          padding: 15px 20px;
          font-family: $mon;
          letter-spacing: 1.3px;
          text-decoration: none;
          &:hover {
            background: linear-gradient(to top, $white, transparent 5%);
          }
        }
      }
    }
  }
  .flagimg {
    width: 16px;
    margin-right: 10px;
    height: 20px;
    object-fit: contain;
  }
  .langugaes {
    padding-left: 0;
    list-style: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 20px;
    flex-flow: row;
    top: 30px;
    z-index: 99;

    li {
      height: 30px;
      padding: 10px 15px;
      display: flex;
      align-items: center;
      color: $secondary;
      font-size: 14px;
      letter-spacing: 1.3px;
      justify-content: flex-start;
      &:hover {
        background: $secondary;
        color: $white;
      }
    }
    .activelang {
      background: $secondary;
      color: $white;
    }
  }
  .boxdiv {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @media only screen and (max-width: 991px) {
      justify-content: center;
    }
  }
  .btn-primary {
    padding: 10px 5px;
    background: $white;
    font-size: 12px;
    text-decoration: none;
    color: $text;
    .fa {
      margin-right: 5px;
      color: $text;
    }
  }
  .relbox {
    position: relative;
    @media only screen and (max-width: 991px) {
      left: 10px;
    }
  }
}
.profilebox {
  display: flex;
  list-style: none;
  padding-left: 0;
  align-items: center;
  text-transform: capitalize;
  li {
    margin-right: 10px;
    color: $secondary;
  }
}
.mainul {
  list-style: none;
  position: relative;
  padding-left: 0;
  font-size: 16px;
  @media only screen and (max-width: 1200px) {
    font-size: 14px;
  }
  .fa {
    margin-right: 10px;
  }
  & > li {
    &:nth-of-type(2) {
      width: 200px;
      background: $white;
      padding: 10px 15px;
      position: absolute;
      cursor: pointer;
      color: $secondary;
      top: 0;
      display: none;
      transition: 0.3s all ease-in-out;
    }
  }
  &:hover {
    & > li {
      &:nth-of-type(2) {
        display: block;
        transition: 0.3s all ease-in-out;
        padding: 0;
      }
    }
  }
}
.activemenu {
  display: flex !important;
}

.primary-me {
  color: $secondary;
  list-style: none;
  text-decoration: none;
  font-size: 14px;
  margin-right: 15px;
}

.menubox {
  list-style: none;
  a {
    text-decoration: none;
    color: $white;
    position: absolute;
    padding: 10px;
    width: 40px;
    height: 80px;
    text-align: center;
    top: 75px;
    right: 0;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: $mon;
  }
  @media only screen and (max-width: 991px) {
    display: none;
  }
}
.nep {
  .menunolink {
    font-family: $nepalifont !important;
    font-size: 18px;
    @media only screen and (max-width: 1200px) {
      font-size: 14px !important;
    }
  }
}
.menunolink {
  display: block;
  margin-top: 5px;
  padding: 10px 10px;
  color: $white;
  text-decoration: none;
  font-family: $mon;
  letter-spacing: 1.3px;
  font-size: 16px;
  @media only screen and (max-width: 1200px) {
    font-size: 14px;
  }
  text-transform: capitalize;
  position: relative;
  width: 100%;
  &:hover {
    cursor: pointer;
    ul {
      display: block;
    }
  }
  ul {
    position: absolute;
    list-style: none;
    display: none;
    padding-left: 0;
    width: 200px;
    top: 100%;
    z-index: 999;
    li {
      a {
        padding: 5px 10px;
        display: block;
        width: 100%;
        background: $secondary;
        color: $white;
        text-decoration: none;
        &:hover {
          background: linear-gradient(to top, $white, $secondary 5%);
        }
      }
    }
  }
}
.fa-angle-down {
  margin-left: 5px;
}
.emailbox {
  list-style: none;
  padding-left: 0;
  margin-right: 15px;
  @media only screen and (max-width: 991px) {
    display: none;
  }
  a {
    color: $secondary;
    font-family: $mon;
    font-size: 14px;
    border: 1px solid $secondary;
    list-style: none;
    text-decoration: none;
    padding: 5px 20px;
    text-transform: uppercase;
    &:hover {
      background: $secondary;
      color: $white;
    }
  }
}
.nep {
  .emailbox {
    list-style: none;
    padding-left: 0;
    margin-right: 15px;
    @media only screen and (max-width: 991px) {
      display: none;
    }
    a {
      color: $secondary;
      font-family: $nepalifont;
      font-size: 14px;
      border: 1px solid $secondary;
      list-style: none;
      text-decoration: none;
      padding: 5px 20px;
      text-transform: uppercase;

      &:hover {
        background: $secondary;
        color: $white;
      }
    }
  }
}
.btn-primary-fix {
  position: fixed;
  padding: 5px 20px;
  right: 50px;
  bottom: 50px;
  display: block;
  padding: 8px 20px;
  border-radius: 5px;
  text-decoration: none;
  margin-left: 10px;
  background: $secondary;
  color: $white;
  z-index: 999;
  .v-icon {
    color: $white;
  }
}
</style>
