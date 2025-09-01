<template>
  <section>
    <TitleBreadCrumb
      :breadcrumbs="breadcrumbs"
      :language="selectedLanguage.title"
    />
    <v-container fluid>
      <v-row class="loginbox">
        <v-col md="5" class="authbox">
          <h2>Login To SubDomain</h2>
          <div>
            <v-form
              ref="formlogin"
              v-model="validTop"
              lazy-validation
              class="publicforum"
            >
              <v-row>
                <v-col md="12" cols="12">
                  <v-text-field
                    v-model="input"
                    :rules="[nameRules.required]"
                    label="Username"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="12" cols="12">
                  <v-text-field
                    v-model="password"
                    :rules="[nameRules.required]"
                    label="Password"
                    required
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                  ></v-text-field>
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
  name: "LoginSub",
  components: {
    TitleBreadCrumb,
  },
  data() {
    return {
      show1: false,
      valid: true,
      input: "",
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
    ...mapActions(["loginSubdomain"]),
    login() {
      if (this.$refs.formlogin.validate()) {
        let auth = {
          input: this.input,
          password: this.password,
        };
        this.$store.dispatch("loginSubdomain", auth);
      }
    },
  },
  created() {
    if (secureStorage.getItem("userData")) {
      this.$router.push("/").catch((err) => {
        console.error(err);
      });
    }
  },
  computed: {
    ...mapGetters(["selectedLanguage"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.loginbox {
  justify-content: center;
  padding: 50px 0 50px;
  // background: url('/img/bgpattern.jpg');

  h2 {
    text-align: center;
    padding: 20px 0;
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
  color: $primary;
  letter-spacing: 1.5px;
  font-size: 16px;
  margin-bottom: 20px;
}
.primary {
  background: $secondary !important;
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
    font-weight: 600;
  }
}
</style>
