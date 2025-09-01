<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row v-if="logged.user.role == 'admin'">
        <v-col cols="10" class="formbox">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col md="6" v-if="$route.params.id == undefined">
                <v-text-field
                  v-model="first_name"
                  :rules="[first_nameValue.required]"
                  label="First Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="6" v-if="$route.params.id == undefined">
                <v-text-field
                  v-model="last_name"
                  :rules="[last_nameValue.required]"
                  label="Last Name"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col md="6" v-if="$route.params.id == undefined">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="6" v-if="$route.params.id == undefined">
                <v-text-field
                  v-model="phone"
                  maxlength="10"
                  :rules="phoneNumberRules"
                  label="Phone"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col md="6">
                <v-selection
                  v-model="subDomain"
                  placeholder="Subdomain"
                  :options="subdomainSpeicfic"
                  label="name"
                  :filterable="true"
                  :value="checkFunc(subDomain)"
                ></v-selection>
              </v-col>
              <v-col md="6" v-if="$route.params.id == undefined">
                <div class="passwordeye">
                  <v-text-field
                    v-model="password"
                    :rules="[passwordRule.required]"
                    label="Password"
                    outlined
                    :type="showpassword ? 'password' : 'text'"
                  ></v-text-field>
                  <div
                    class="fa fa-eye"
                    v-bind:class="{ 'fa-eye-slash': showpassword }"
                    @click="passwordShow"
                  ></div>
                </div>
              </v-col>
            </v-row>

            <v-btn
              v-if="$route.params.id == undefined"
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
              >Add Card Print Login User</v-btn
            >
            <v-btn
              v-if="$route.params.id != undefined"
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validateUpdate"
              >Update Address</v-btn
            >
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
export default {
  name: "CreatePrintLogin",
  components: { TitleBreadCrumb },

  data() {
    return {
      first_name: "",
      last_name: "",
      password: "",
      valid: true,
      title: "Add Card Print User Login",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Card Print User Login",
        },
      ],
      subDomain: "",
      email: "",
      phone: "",
      userHandle: "",
      first_nameValue: {
        required: (value) => !!value || "First Name is Required.",
      },
      subdomainRule: {
        required: (value) => !!value || "Subdomain is Required.",
      },
      usernameValue: {
        required: (value) => !!value || "First Name is Required.",
      },
      last_nameValue: {
        required: (value) => !!value || "Last Name is Required.",
      },

      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      phoneNumberRules: [
        (v) => !!v || "Phone Number is required",
        (v) => v.length <= 10 || "Phone number should be 10 digit",
        (v) => v.length >= 10 || "Phone number should be 10 digit",
        (v) => !isNaN(v) || "Please enter number",
      ],
      userHandleRule: {
        required: (value) => !!value || "Required.",
      },
      passwordRule: {
        required: (value) => !!value || "Required.",
      },
      showpassword: true,
    };
  },
  methods: {
    ...mapActions(["fetchSubDomainSpecificGroup", "getSingleActive","createActiveUser"]),
    async validate() {
      if (this.$refs.form.validate()) {
        let auth = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          phone: this.phone,
          subDomain: this.subDomain.userHandle,
          password: this.password,
          accountType:"printcard"
        };
        await this.createActiveUser(auth)
        this.$router.push("/dashboard/cardloginlist");
      }
    },
    validateUpdate() {
      if (this.$refs.form.validate()) {
        let auth = {
          id: this.$route.params.id,
          subDomain: this.subDomain.userHandle,
        };
        this.$store.dispatch("updateActiveUser", auth);
      }
    },
    passwordShow() {
      this.showpassword = !this.showpassword;
    },
    checkFunc(subdomain) {
      if (subdomain != "") {
        this.subdomain = subdomain.userHandle;
      }
    },
  },
  computed: {
    ...mapGetters(["subdomainSpeicfic", "logged", "singleUserActive"]),
  },
  async created() {
    await this.fetchSubDomainSpecificGroup();
    if (this.$route.params.id != undefined) {
      await this.getSingleActive(this.$route.params.id);
      this.subDomain = await this.singleUserActive.user.subDomain;
    }

    if (this.logged.user.role == "subdomain") {
      this.subDomain = { userHandle: this.logged.user.slug };
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.passwordeye {
  position: relative;
  .fa {
    position: absolute;
    top: 20px;
    right: 15px;
  }
}
.selectbox {
  padding: 0 10px;
}
.formtitle {
  background: $ligtgray;
  color: $white;
  display: inline-block;
  padding: 5px 20px;
  font-size: 14px;
}
label {
  margin-left: 10px;
}
.active {
  background: $primary;
}
.tabs {
  display: flex;
  list-style: none;
  padding-left: 0;
  li {
    margin-right: 5px;
    cursor: pointer;
  }
}
.formbox {
  padding: 20px 30px;
}
.container {
  max-width: 100%;
}
.activeSelect {
  background: $primary;
  color: $white;
  cursor: pointer;
}
.filtercat {
  display: flex;
  list-style: none;
  justify-content: flex-start;
  // margin-top: 25px;
  flex-wrap: wrap;
  padding-left: 0;
  li {
    padding: 5px 20px;
    border: 1px solid $secondary;
    margin: 10px;
    cursor: pointer;
    // border-radius: 10px;
  }
}
</style>
