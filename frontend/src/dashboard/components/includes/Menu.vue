<template>
  <section class="menuleft">
    <ul class="menu">
      <li
        v-for="(menu, index) in role === 'onlinemember'
          ? allOnlineMemberMenu
          : role === 'activecontrol'
          ? allMenuSpecificUserMenu
          : role === 'admin'
          ? allAdminMenu
          : category == 'Nepali Congress District Working Committee' ||
            category == 'Nepalese People\'s Co-ordination Committee'
          ? !hasparent
            ? hasChetra != 'Yes'
              ? allMenuSpecific
              : allMenuDistrict
            : allMenuSpecificChetra
          : role != 'activeviewer'
          ? allMenu
          : allMenuActiveMenu"
        :key="index"
        @click="
          role !== 'onlinemember'
            ? role !== 'activecontrol'
              ? role === 'admin'
                ? openmenuAdmin(index)
                : category == 'Nepali Congress District Working Committee' ||
                  category == 'Nepalese People\'s Co-ordination Committee'
                ? !hasparent
                  ? hasChetra != 'Yes'
                    ? openmenusepcific(index)
                    : openmenuDistrict(index)
                  : openmenusepcificChetra(index)
                : role != 'activeviewer'
                ? openmenu(index)
                : openmenuActive(index)
              : openmenuspecificUser(index)
            : openmenuOnlineMember(index)
        "
      >
        <div
          v-if="menu.path == undefined"
          class="hasdrop"
          v-bind:class="{ menuActive: menu.open }"
        >
          {{ menu.title }}
          <i class="fa fa-angle-right" v-if="!menu.open"></i>
          <i class="fa fa-angle-down" v-if="menu.open"></i>
        </div>
        <div v-if="menu.path != undefined">
          <router-link :to="menu.path" v-bind:class="{ menuActive: menu.open }">
            {{ menu.title }}
          </router-link>
        </div>

        <ul v-if="menu.open">
          <li
            v-for="(submenu, index) in menu.submenu"
            :key="index"
            @click="setSubActiveMenu(submenu.title)"
          >
            <router-link
              v-bind:class="{
                submenuActive: submenu.title == singleActiveMenu,
              }"
              :to="submenu.path"
              >{{ submenu.title }}</router-link
            >
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { secureStorage } from "../../../main";
export default {
  name: "Menu",
  computed: mapGetters([
    "allMenu",
    "allAdminMenu",
    "allMenuSpecific",
    "allMenuSpecificChetra",
    "allMenuDistrict",
    "allMenuActiveMenu",
    "allMenuSpecificUserMenu",
    "singleActiveMenu",
    "allOnlineMemberMenu",
  ]),
  methods: {
    openmenu(e) {
      this.allMenu[e].active = true;
      this.allMenu[e].open = true;
      for (let i = 0; i <= this.allMenu.length; i++) {
        if (i != e) {
          if (this.allMenu[i]) {
            this.allMenu[i].open = false;
          }
          this.allMenu[e].active = false;
        }
      }
    },
    openmenusepcific(e) {
      this.allMenuSpecific[e].active = true;
      this.allMenuSpecific[e].open = true;
      for (let i = 0; i <= this.allMenuSpecific.length; i++) {
        if (i != e) {
          if (this.allMenuSpecific[i]) {
            this.allMenuSpecific[i].open = false;
          }
          this.allMenuSpecific[e].active = false;
        }
      }
    },
    openmenusepcificChetra(e) {
      this.allMenuSpecificChetra[e].active = true;
      this.allMenuSpecificChetra[e].open = true;
      for (let i = 0; i <= this.allMenuSpecificChetra.length; i++) {
        if (i != e) {
          if (this.allMenuSpecificChetra[i]) {
            this.allMenuSpecificChetra[i].open = false;
          }
          this.allMenuSpecificChetra[e].active = false;
        }
      }
    },
    openmenuspecificUser(e) {
      this.allMenuSpecificUserMenu[e].active = true;
      this.allMenuSpecificUserMenu[e].open = true;
      for (let i = 0; i <= this.allMenuSpecificUserMenu.length; i++) {
        if (i != e) {
          if (this.allMenuSpecificUserMenu[i]) {
            this.allMenuSpecificUserMenu[i].open = false;
          }
          this.allMenuSpecificUserMenu[e].active = false;
        }
      }
    },
    openmenuDistrict(e) {
      this.allMenuDistrict[e].active = true;
      this.allMenuDistrict[e].open = true;
      for (let i = 0; i <= this.allMenuDistrict.length; i++) {
        if (i != e) {
          if (this.allMenuDistrict[i]) {
            this.allMenuDistrict[i].open = false;
          }
          this.allMenuDistrict[e].active = false;
        }
      }
    },
    openmenuAdmin(e) {
      this.allAdminMenu[e].active = true;
      this.allAdminMenu[e].open = true;
      for (let i = 0; i <= this.allAdminMenu.length; i++) {
        if (i != e) {
          if (this.allAdminMenu[i]) {
            this.allAdminMenu[i].open = false;
          }
          this.allAdminMenu[e].active = false;
        }
      }
    },
    openmenuActive(e) {
      this.allMenuActiveMenu[e].active = true;
      this.allMenuActiveMenu[e].open = true;
      for (let i = 0; i <= this.allMenuActiveMenu.length; i++) {
        if (i != e) {
          if (this.allMenuActiveMenu[i]) {
            this.allMenuActiveMenu[i].open = false;
          }
          this.allMenuActiveMenu[e].active = false;
        }
      }
    },
    openmenuOnlineMember(e) {
      this.allOnlineMember[e].active = true;
      this.allOnlineMember[e].open = true;
      for (let i = 0; i <= this.allOnlineMember.length; i++) {
        if (i != e) {
          if (this.allOnlineMember[i]) {
            this.allOnlineMember[i].open = false;
          }
          this.allOnlineMember[e].active = false;
        }
      }
    },
    setSubActiveMenu(menu) {
      this.$store.dispatch("activeMenu", menu);
    },
  },
  data() {
    return {
      routecustom: "a",
      role: JSON.parse(secureStorage.getItem("userData")).user.role,
      userHandle: JSON.parse(secureStorage.getItem("userData")).user.userHandle,
      category: JSON.parse(secureStorage.getItem("userData")).user.category,
      hasparent: JSON.parse(secureStorage.getItem("userData")).user.hasparent,
      hasChetra: JSON.parse(secureStorage.getItem("userData")).user.hasChetra,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

section {
  background: rgba(255, 255, 255, 0.4);
  overflow-y: scroll;
  // padding: 15px;
  min-height: 85vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  &::-webkit-scrollbar {
    display: none;
  }
  .menu {
    list-style: none;
    padding-left: 0;
    @include commontext;
    font-size: 12px;
    text-transform: capitalize;
    font-weight: 400;

    & > li {
      .hasdrop {
        padding: 10px 15px;
        background: #fff;
        width: 100%;
        cursor: pointer;
        border: 1px solid #f1f1f1;
        display: flex;
        justify-content: space-between;
      }
      div {
        width: 100%;
      }

      a {
        color: $text;
        text-decoration: none;
        display: block;
        padding: 10px 15px;
        background: $white;
        width: 100%;
        border: 1px solid #f1f1f1;
        background: #f8f6f6;
      }
      ul {
        list-style: none;
        padding-left: 0;
        a {
          color: $text;
          text-decoration: none;
          display: block;
          padding: 10px 5px 10px 25px;
          background: $white;
          width: 100%;
          border: 1px solid #f1f1f1;
          background: #f8f6f6;
        }
      }
    }
  }
}
.menuActive {
  background: $secondary !important;
  color: $white !important;
  border-color: $secondary !important;
}
.submenuActive {
  background: #fff !important;
  // color: $white !important;
  // border-color: $secondarylight !important;
  color: $secondary !important;
  font-weight: 600;
}
</style>
