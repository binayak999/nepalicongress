<template>
  <section>
    <TitleBreadCrumb :breadcrumbs="breadcrumbs" :language="selectedLanguage.title" />
    <v-container fluid>
      <v-row>
        <v-col md="12" v-if="
          $route.params.slug != undefined &&
          $route.params.slug == 'activemember'
        ">
          <h3 class="text-center headertitle">
            आफ्नो कृयासिल सदस्यताको विवरण हेर्नको लागि पहिले Register गर्नु
            होला।
          </h3>
          <h3 class="text-center">
            Register गरि सक्नु भएको छ भने, register गर्दा बनाउनु भएको password र
            आफ्नो मोबाइल न प्रयोग गरि Login गर्नु होला।
          </h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12" v-if="
          $route.params.slug != undefined &&
          $route.params.slug == 'socialmedia'
        ">
          <h3 class="text-center headertitle">
            नेपाली कांग्रेसका जिल्ला,क्षेत्र,गाउँ/नगर, वार्ड का समितीहरु साथै
            भातृ तथा शुभेच्छुक संस्थाहरुका विभिन्न तहहरुबाट र जनसम्पर्क
            समितिहरुको नाममा ज जस्ले facebook, Twitter वा Instagram चलाइरहनु
            भएको छ, उक्त page वा account को Admin वा Editor हरुले नेपाली
            कांग्रेस केन्द्र लाई जानकारी दिनु हुन अनुरोध छ। जानकारी दिने form
            भर्नको लागि पहिले Register गर्नु होला।
          </h3>
        </v-col>
      </v-row>
      <v-row class="loginbox">
        <v-col md="5" class="authbox">
          <h2>
            <ul class="tablist">
              <li>
                <router-link to="/login" v-if="$route.params.slug == undefined">Login</router-link>

                <router-link to="/login/activemember" v-if="$route.params.slug != undefined &&
                  $route.params.slug == 'activemember'">Login</router-link>
                <router-link to="/login/socialmedia" v-if="
                  $route.params.slug != undefined &&
                  $route.params.slug == 'socialmedia'
                ">Login</router-link>
              </li>
              <li class="active">
                <router-link to="/register" v-if="$route.params.slug == undefined">Register</router-link>
                <router-link to="/register/activemember" v-if="$route.params.slug != undefined &&
                  $route.params.slug == 'activemember'">Register</router-link>
                <router-link to="/register/socialmedia" v-if="
                  $route.params.slug != undefined &&
                  $route.params.slug == 'socialmedia'
                ">Register</router-link>
              </li>
              <li class="active">
                <router-link to="/loginSubdomain">Subdomain login</router-link>
              </li>
            </ul>
          </h2>

          <div>
            <v-form ref="formlogin" v-model="validTop" lazy-validation class="publicforum">
              <v-row>
                <v-col md="12" cols="12">
                  <v-text-field v-model="input" :rules="[nameRules.required]" label="Email Or Phone" required
                    outlined></v-text-field>
                </v-col>
                <v-col md="12" cols="12">
                  <v-text-field v-model="password" :rules="[nameRules.required]" label="Password" required outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"></v-text-field>
                </v-col>

                <v-col md="12" class="forgetpassword" cols="6">
                  <router-link to="/forgetverification">Forget Password ?</router-link>
                </v-col>
                <v-col md="12" class="text-center custbtn" cols="12">
                  <v-btn color="primary" @click="login">Login</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapActions, mapGetters } from "vuex";
import { secureStorage } from "../../../main";
export default {
  name: "Login",
  components: {
    TitleBreadCrumb,
  },
  data() {
    return {
      show1: false,
      valid: true,
      input: "",
      msgshow: secureStorage.getItem("activemembermsg") != undefined,
      password: "",
      nameRules: {
        required: (value) => !!value || "Required.",
      },
      validTop: true,

      title: "Login",
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
        {
          eng: {
            title: "Registration",
          },
          nep: {
            title: "पञ्जीकरण",
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    login() {
      if (this.$refs.formlogin.validate()) {
        let auth = {
          input: this.input,
          password: this.password,
        };
        this.$store.dispatch("loginUser", auth);
      }
    },
  },
  computed: {
    ...mapGetters(["selectedLanguage"]),
  },
  created() {
    if (secureStorage.getItem("userData")) {
      this.$router.push("/").catch((err) => {
        console.error(err);
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.tablist {
  display: flex;
  list-style: none;
  justify-content: space-evenly;
  padding-left: 0;

  li {
    width: 100%;

    a {
      display: block;
      padding: 10px 0;
      cursor: pointer;
      width: 100%;
      border: 1px solid $secondary;
      color: $white;
      list-style: none;
      text-decoration: none;
    }

    &:last-of-type {
      @media only screen and (max-width:991px) {
        display: none;
      }
    }
  }

  .active {
    a {
      background: $white;
      color: $secondary;
    }
  }
}

.loginbox {
  justify-content: center;
  padding: 50px 0 50px;
  // background: url('/img/bgpattern.jpg');

  h2 {
    text-align: center;
    padding: 20px 0;
    font-size: 16px;
  }
}

.forgetpassword {
  display: flex;
  justify-content: flex-end;

  a {
    font-size: 14px;
    text-align: right;
    color: $dark;
  }
}

.subdomainlogin {
  display: flex;
  justify-content: flex-start;

  a {
    font-size: 14px;
    text-align: right;
    color: $dark;
  }
}

.headertitle {
  margin-bottom: 10px;
}

.authbox {
  border: 1px solid $midwhite;
  background: white;
  padding: 0;
  box-shadow: 0px 1px 20px #c4c4c4;

  @media only screen and (max-width: 991px) {
    padding: 20px 20px;
  }

  h2 {
    background: $secondary;
    color: $midlightgray;
    background-position: center center;
    padding: 0;
  }

  .publicforum {
    padding: 20px 20px 40px;
  }

  footer {
    div {
      margin-top: 20px;
    }
  }
}

h2 {
  text-transform: uppercase;
  color: $dark;
  letter-spacing: 1.5px;
  font-size: 28px;

  margin-bottom: 20px;
}

.primary {
  background: $green !important;
  padding: 20px 40px !important;
  border-radius: 0;
  box-shadow: none;

  letter-spacing: 2px !important;
  font-weight: 400;
}

.custbtn .primary {
  padding: 25px 40px !important;
  font-size: 16px;

  &:hover {
    background: $secondary;
  }
}

.registerlink {
  font-size: 14px;
  margin-top: 30px;
  letter-spacing: 1px;

  a {
    color: $dark;
    font-weight: 500;
  }
}

.headertitle {
  @media only screen and (min-width: 991px) {
    padding: 0 100px;
  }
}
</style>
