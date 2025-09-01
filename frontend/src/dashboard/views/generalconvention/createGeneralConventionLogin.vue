<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row v-if="logged.user.role == 'admin'">
        <v-col cols="10" class="formbox px-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row v-if="this.$route.params.id == undefined">
              <v-col md="2">
                <label for="">User Of</label>
                <v-selection
                  class="selectdate"
                  v-model="userFor"
                  placeholder="User Of"
                  :options="userFors"
                  :filterable="true"
                  autocomplete="false"
                  :input="selectUserFor(userFor)"
                ></v-selection>
              </v-col>
              <v-col md="2">
                <label for>प्रदेश</label>
                <v-selection
                  class="selectdate"
                  v-model="province"
                  placeholder="Province"
                  :options="allProvices"
                  label="name"
                  :filterable="true"
                  autocomplete="false"
                  :value="selectProvince(province)"
                ></v-selection>
              </v-col>
              <v-col md="2">
                <label for>जिल्ला</label>
                <v-selection
                  class="selectdate"
                  v-model="district"
                  placeholder="जिल्ला"
                  :options="allDistrict"
                  label="name"
                  :filterable="true"
                  :value="selectDistrict(district)"
                ></v-selection>
              </v-col>
              <v-col md="2" v-if="district != ''">
                <label for>प्रतिनिधिसभा नि.क्षे.नं.</label>
                <v-selection
                  class="selectdate"
                  v-model="houseofrepresentative"
                  placeholder="प्रतिनिधिसभा नि.क्षे.नं."
                  :options="representatives"
                  label="code"
                  :filterable="true"
                  :value="regionFunc(houseofrepresentative)"
                ></v-selection>
              </v-col>
              <v-col md="2" v-if="houseofrepresentative != ''">
                <label for>प्रदेश सभा क्षेत्र</label>

                <v-selection
                  class="selectdate"
                  v-model="pradeshassemblyconstituency"
                  placeholder="प्रदेश सभा क्षेत्र"
                  :options="regions"
                  label="code"
                  :filterable="true"
                  :value="municipalityFunc(pradeshassemblyconstituency)"
                ></v-selection>
              </v-col>
              <v-col md="2" v-if="pradeshassemblyconstituency != ''">
                <label for>न.पा./गा.पा.</label>
                <v-selection
                  class="selectdate"
                  v-model="municipality"
                  placeholder="न.पा./गा.पा."
                  :options="municipalities"
                  label="name"
                  :filterable="true"
                  :value="wardFunc(municipality)"
                ></v-selection>
              </v-col>
              <v-col md="2" v-if="municipality != ''">
                <label for>वडा नं.</label>
                <v-selection
                  class="selectdate"
                  v-model="ward"
                  placeholder="वडा नं."
                  :options="wards"
                  :filterable="true"
                ></v-selection>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6">
                <v-text-field
                  v-model="name"
                  :rules="[nameValue.required]"
                  label="Full Name"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col md="6">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="phone"
                  maxlength="10"
                  :rules="phoneNumberRules"
                  label="Phone"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col md="6">
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
              <v-col md="6">
                <div class="Status">
                  <label for>Status</label>
                  <v-selection
                    class="selectdate"
                    v-model="status"
                    placeholder="Status"
                    :options="statuss"
               

                  ></v-selection>
                </div>
              </v-col>
            </v-row>

            <v-btn
              v-if="$route.params.id == undefined && !loading"
              :disabled="!valid"
              color="success"
              class="mr-4 ml-3"
              @click="validate"
              >Add</v-btn
            >
            <v-btn class="mr-4 ml-3" color="success" v-if="loading">
              <v-progress-circular indeterminate></v-progress-circular>
            </v-btn>
            <v-btn
              v-if="$route.params.id != undefined"
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
              >Update User</v-btn
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
  name: "CreateActiveLogin",
  components: { TitleBreadCrumb },

  data() {
    return {
      loading: false,
      name: "",
      password: "",
      province: "",
      district: "",
      userFor: "Election Officer",
      userFors: ["Election Officer", "Kendra", "Pradesh"],
      ward: undefined,
      municipality: "",
      houseofrepresentative: "",
      pradeshassemblyconstituency: "",
      regions: "",
      municipalities: "",
      valid: true,
      title: "Add General Convention User",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add General Convention User",
        },
      ],
      id: undefined,
      subDomain: "",
      email: "",
      phone: "",
      userHandle: "",
      statuss: [true, false],
      status: true,
      nameValue: {
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
    ...mapActions([
      "fetchProvinceDistrictProvince",
      "fetchProvinceDistrictSelectProvice",
      "createGeneralConvention",
      "fetchGeneralConvention",
      "createGeneralConventionUser",
      "singleGeneralUser",
    ]),
    async validate() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let auth = {
          name: this.name,
          password: this.password,
          phone: this.phone,
          email: this.email,
        };
        if (this.province != "") {
          auth.province = this.province.province;
        }
        if (this.district != "") {
          auth.district = this.district.name;
        }
        if (this.houseofrepresentative != "") {
          auth.houseofrepresentative = this.houseofrepresentative;
        }
        if (this.pradeshassemblyconstituency != "") {
          auth.pradeshassemblyconstituency = this.pradeshassemblyconstituency;
        }
        if (this.id != undefined) {
          auth._id = this.id;
        }
        if (this.status != undefined) {
          auth.status = this.status;
        }
        auth.userFor = this.userFor;
        await this.createGeneralConventionUser(auth);
        this.loading = false;
      }
    },
    selectUserFor(data) {
      this.userFor = data;
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
    selectProvince(data) {
      if (data.province != undefined) {
        this.fetchProvinceDistrictSelectProvice(data.province);
      }
    },
    selectDistrict(data) {
      if (data.name != undefined) {
        this.representatives = data.list.repno;
      }
    },
    regionFunc(code) {
      if (code.code != undefined) {
        this.representatives.forEach((ele) => {
          if (ele.code == code.code) {
            this.regions = ele.region;
          }
        });
      }
    },
    municipalityFunc(code) {
      if (code.code != undefined) {
        this.regions.forEach((ele) => {
          if (ele.code == code.code) {
            this.municipalities = ele.napa;
          }
        });
      }
    },
    wardFunc(name) {
      if (name.name != undefined) {
        this.municipalities.forEach((ele) => {
          if (ele.name.trim() == name.name.trim()) {
            this.wards = ele.ward;
            this.muninumber = ele.code;
          }
        });
      }
    },
  },
  computed: {
    ...mapGetters([
      "subdomainSpeicfic",
      "logged",
      "singleUserActive",
      "allDistrict",
      "allProvices",
      "allgeneralConventionUser",
    ]),
  },
  async created() {
    await this.fetchProvinceDistrictProvince();

    await this.singleGeneralUser(this.$route.params.id);
    this.name = this.allgeneralConventionUser.name;
    this.email = this.allgeneralConventionUser.email;
    this.phone = this.allgeneralConventionUser.phone;
    this.status = this.allgeneralConventionUser.status;
    this.id = this.allgeneralConventionUser._id;
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
