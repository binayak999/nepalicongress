<template>
  <section>
    <AlertNotification />
    <div class="loader" v-if="postingLoad">
      <!-- <img :src="require(`@/assets/images/icons/iconlogo.svg`)" alt  class="logo"/> -->
      <img
        :src="require(`@/assets/images/icons/loading.svg`)"
        alt
        class="loading"
      />
    </div>
    <div class="headerSection">
      <div class="section-left">
        <router-link to="/">
          <img
            :src="require(`@/assets/images/logo.svg`)"
            alt
            class="imagelogo"
          />
        </router-link>
      </div>
      <div class="section-right">
        <ul class="profile">
          <li>
            <div>
              <img
                src="https://icons-for-free.com/iconfiles/png/512/avatar+human+people+profile+user+icon-1320168139431219590.png"
                alt
              />
              <span>{{ logged.user.name }}</span>
              <span v-if="logged.user.role !== 'subdomain'"
                >{{ logged.user.first_name }} {{ logged.user.last_name }}</span
              >
              <i class="fa fa-chevron-down"></i>
            </div>

            <ul>
              <li @click="logoutButton">
                Logout <i class="fa fa-power-off"></i>
              </li>
              <li
                class="phonedata"
               
              >
              <!-- v-if="
                  this.$store.state.user.loggedUser.user.phone ==
                    '9860185447' ||
                  this.$store.state.user.loggedUser.user.phone == '9851076030'
                " -->
                <router-link to="/dashboard/phoneactivemember"
                  >Phone No. Report</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AlertNotification from "../../../frontend/components/common/AlertBox";
import { secureStorage } from "../../../main";
export default {
  name: "Header",
  components: { AlertNotification },
  computed: mapGetters(["logged", "postingLoad", "allOptionAction"]),
  methods: {
    ...mapActions(["getOptionActionFunc"]),
    logoutButton() {
      this.$store.dispatch("logoutUser");
    },
  },
  created() {
    if (secureStorage.getItem("userData")) {
      this.$store.state.user.loggedUser = JSON.parse(
        secureStorage.getItem("userData")
      );
    }
    this.getOptionActionFunc();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.container--fluid {
  padding: 0 50px 0 0;
}
.imagelogo {
  width: 100%;
  padding: 10px 20px;
  background: #efefef;
  height: 100%;
}

.profile {
  position: relative;
  text-transform: capitalize;
  color: #fff;
  width: 200px;
  margin: 0 20px 0 0;
  padding-left: 0;
  li {
    font-weight: 500;
    display: flex;
    align-items: center;
    letter-spacing: 1.3px;
    font-size: 15px;
    padding: 10px 0;
    img {
      width: 30px;
      margin-right: 10px;
    }
    .fa {
      margin-left: 8px;
    }
    &:hover {
      cursor: pointer;
      ul {
        display: block !important;
      }
    }
    ul {
      position: absolute;
      top: 43px;
      left: 0;
      display: none;
      margin: 0;
      padding: 0;
      background: #28862d;
      li {
        text-align: left;
        padding: 10px 20px;
        cursor: pointer;
        &:hover {
          background: #fff;
          color: #000;
          a {
            color: #000;
          }
        }
      }
    }
  }
  &:hover {
    .logout {
      display: block !important;
    }
  }
}

.header {
  &-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.logout {
  padding-left: 0;
  padding: 10px 20px;
  background: $secondary;
  top: -4px;
  left: 0;
  right: 0;
  text-align: center;
  .fa {
    margin-right: 10px;
  }
  position: absolute;
  display: none !important;
  cursor: pointer;
}
.phonedata {
  list-style: none;
  a {
    color: $white;
    text-decoration: none;
  }
}
.headerSection {
  display: flex;
  .section {
    &-left {
      width: 15%;
      @media screen and (max-width: 1024px) {
        width: 20%;
      }
    }
    &-right {
      width: 85%;
      background: $secondary;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      @media screen and (max-width: 1024px) {
        width: 80%;
      }
    }
  }
}
</style>
