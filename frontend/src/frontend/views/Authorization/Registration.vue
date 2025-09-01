<template>
  <section>
    <TitleBreadCrumb
      :breadcrumbs="breadcrumbs"
      :language="selectedLanguage.title"
    />
    <v-container>
      <v-row>
        <v-col
          md="12"
          v-if="
            $route.params.slug != undefined &&
              $route.params.slug == 'activemember'
          "
        >
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
        <v-col
          md="12"
          v-if="
            $route.params.slug != undefined &&
              $route.params.slug == 'socialmedia'
          "
        >
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
      <v-row class="loginbox registerbox">
        <v-col md="9" cols="12">
          <div class="authbox">
            <h2>
              <ul class="tablist">
                <li class="active">
                  <router-link
                    to="/login"
                    v-if="$route.params.slug == undefined"
                    >Login</router-link
                  ><router-link
                    to="/login/activemember"
                    v-if="$route.params.slug != undefined"
                    >Login</router-link
                  >
                </li>
                <li >
                  <router-link
                    to="/register"
                    v-if="$route.params.slug == undefined"
                    >Register</router-link
                  >
                  <router-link
                    to="/register/activemember"
                    v-if="$route.params.slug != undefined"
                    >Register</router-link
                  >
                </li>
              </ul>
            </h2>

            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="publicforum"
            >
              <v-row>
                <v-col md="4" cols="12">
                  <label>First Name</label>
                  <v-text-field
                    v-model="first_name"
                    :rules="first_nameRule"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <label>Last Name</label>
                  <v-text-field
                    v-model="last_name"
                    :rules="last_nameRule"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <label>Email</label>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    required
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col md="4" cols="12">
                  <label>Phone Number</label>
                  <v-text-field
                    v-model="phone"
                    :rules="phoneNumberRules"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="3" cols="12">
                  <label>Birth Year</label>
                  <v-selection
                    v-model="year"
                    :options="years"
                    class="selectdate"
                       @input="selectday"
                  ></v-selection>
                </v-col>
                <v-col md="2" cols="12">
                  <label>Birth Month</label>
                  <v-selection
                    v-model="month"
                    :options="months"
                    class="selectdate"
                       @input="selectday"
                  ></v-selection>
                </v-col>
                <v-col md="3" cols="12">
                  <label>Birth Day</label>
                  <v-selection
                    v-model="day"
                    :options="days"
                    class="selectdate"
                    @input="selectday"
                  ></v-selection>
                </v-col>
                <v-col md="4" cols="12">
                  <label>Gender</label>
                  <v-select
                    v-model="gender"
                    :items="items"
                    :rules="[(v) => !!v || 'Item is required']"
                    required
                    outlined
                  ></v-select>
                </v-col>
                <v-col md="4" cols="12">
                  <label>Password</label>
                  <v-text-field
                    v-model="password"
                    :rules="[rules.required, rules.min]"
                    required
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    hint="At least 8 characters"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <label>Confirm Password</label>
                  <v-text-field
                    v-model="confirmPassword"
                    :rules="[rules.required, rules.min, rules.check]"
                    required
                    outlined
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    hint="At least 8 characters"
                    @click:append="show2 = !show2"
                  ></v-text-field>
                </v-col>

                <v-col md="4" cols="12" v-if="oldmember == 'Yes'">
                  <label>Member Id</label>
                  <v-text-field
                    v-model="memberId"
                    :rules="emptyRule"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12" v-if="oldmember == 'Yes'">
                  <label>Member Post</label>
                  <v-select
                    v-model="memberPost"
                    :items="memberPosts"
                    :rules="[(v) => !!v || 'Item is required']"
                    required
                    outlined
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col md="4">
                  <label for>प्रदेश</label>

                  <v-selection
                    class="selectdate"
                    v-model="province"
                    placeholder="Province"
                    :options="allProvices"
                    label="province"
                    :filterable="true"
                    :value="selectProvince(province)"
                  ></v-selection>
                </v-col>
                <v-col md="4">
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
                <v-col md="4" v-if="district != ''">
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
                <v-col md="4" v-if="houseofrepresentative != ''">
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
                <v-col md="4" v-if="pradeshassemblyconstituency != ''">
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
                <v-col md="4" v-if="municipality != ''">
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
              <footer class="text-center">
                <v-btn color="primary custbtn" @click="nextForm()"
                  >Register</v-btn
                >
              </footer>
            </v-form>

            <v-col md="12" class="alertsform" v-if="alertstatus">
              <v-alert :type="actions">{{ alertmessage }}</v-alert>
            </v-col>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Registration",

  components: {
    TitleBreadCrumb,
  },

  data() {
    return {
      region: "",
      wardno: "",
      houseofrepresentative: "",
      pradeshassemblyconstituency: "",
      oldmember: "No",
      valid: true,
      years: [],
      months: [],
      days: [],
      year: new Date().getFullYear()-16,
      month: 1,
      day: 1,
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
      e1: 1,
      show1: false,
      show2: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        check: (v) => v == this.password || "Password should match",
      },
      datestart: new Date().toISOString().slice(0, 10),
      startedDate: "",
      memberbox: ["Yes", "No"],
      first_name: "",
      last_name: "",
      memberPost: "Member",
      memberPosts: [
        "Invitee Member",
        "Secretary",
        "Chief Secretary",
        "Joint Secretary",
        "Senior Technical Officer",
        "Member",
        "Treasurer",
        "Joint General Secretary",
        "Vice-President",
        "Leader",
        "President",
      ],
      memberId: "",
      gender: "Male",
      nameRules: [(v) => !!v || "Name is required"],
      first_nameRule: [(v) => !!v || "Firstname is required"],
      last_nameRule: [(v) => !!v || "Lastname is required"],
      passwordRules: [
        (v) => !!v || "Password is required",
        this.password == this.confirmPassword || "Password should be match",
      ],
      phoneNumberRules: [
        (v) => !!v || "Phone Number is required",
        (v) => v.length <= 10 || "Phone number should be 10 digit",
        (v) => v.length >= 10 || "Phone number should be 10 digit",
        (v) => !isNaN(v) || "Please enter number",
      ],
      wardRule: [
        (v) => !!v || "Phone Number is required",
        (v) => !isNaN(v) || "Please enter number",
      ],
      dobRules: [(v) => !!v || "DOB is required"],
      genderRules: [(v) => !!v || "Gender is required"],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      select: null,
      items: ["Male", "Female", "Other"],
      checkbox: false,
      password: "",
      confirmPassword: "",
      phone: "",
      max: "2007-2-7",
      emptyRule: [(v) => !!v || "Field is required"],
      municipality: "",
      district: "",
      ward: "",
      city: "",
      province: "",
      nearestlandmark: "",
      address: "",
      alertstatus: false,
      actions: "success",
      alertmessage: "Thank you for the message, We will reply you back soon !",
    };
  },
  created() {
    var date = new Date();
    // var current = new Date();
    date.setDate(date.getDate());
    date.setFullYear(date.getFullYear() - 16);
    this.max = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} `;
    this.datestart = `${date.getFullYear()}-${
      date.getMonth() == 0 ? 1 : date.getMonth()
    }-${date.getDate()} `;
    this.max.toString();
    this.datestart.toString();

    for (let i = 0; i < 150; i++) {
      this.years.push(this.year - i);
    }
    for (let i = 0; i < 12; i++) {
      this.months.push(this.month + i);
    }
    for (let i = 0; i <= 31; i++) {
      this.days.push(this.day + i);
    }

    this.fetchProvinceDistrictProvince();
  },
  methods: {
    ...mapActions([
      "fetchProvinceDistrictProvince",
    ]),
    selectProvince(data) {
      if (data.province != undefined) {
        this.$store.dispatch(
          "fetchProvinceDistrictSelectProvice",
          data.province
        );
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
    selectday() {
      this.dob = new Date(this.year, this.month, this.day);
    },
    nextForm() {
      this.selectday();
      if (this.dob != undefined && this.ward != undefined) {
        let userdata = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          phone: this.phone,
          password: this.password,
          dob: this.dob,
          about: this.about,
          gender: this.gender,
          municipality: this.municipality.name,
          district: this.district.name,
          ward: this.ward,
          city: this.pradeshassemblyconstituency.code + "",
          province: this.province.province + "",
          address: this.houseofrepresentative.code + "",
          nearestlandmark:"Not Added"
        };
        this.$store.dispatch("createUser", userdata);
      }else{
        this.errorMethod();
      }

      // console.log(userdata)

      

      // }
    },
    errorMethod() {
      this.alertstatus = true;
      (this.actions = "error"),
        (this.alertmessage = "Please fill enter the form!");
      setTimeout(() => {
        this.alertstatus = false;
      }, 3000);
    },
    successmethond() {
      this.alertstatus = true;
      (this.actions = "success"),
        (this.alertmessage =
          "Thank you for the message, We will reply you back soon !");
      setTimeout(() => {
        this.alertstatus = false;
      }, 3000);
    },
  },
  computed: {
    ...mapGetters(["selectedLanguage", "allDistrict", "allProvices"]),
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
  }
  .active {
    a {
      background: $white;
      color: $secondary;
    }
  }
}

.authbox {
  border: 1px solid $midwhite;
  background: $ligtgrey;
  box-shadow: 0px 1px 20px #c4c4c4;
}

.theme--light.v-stepper {
  background: white !important;
}

.about {
  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    object-position: top;
  }
}
.contentbox {
  font-family: $mon;
  h3 {
    margin-bottom: 15px;
    letter-spacing: 1.3px;
  }
  p {
    font-size: 13px;
    letter-spacing: 1.3px;
    line-height: 25px;
    margin-bottom: 20px;
  }
}

.loginbox {
  justify-content: center;
  padding: 50px 0 50px;
  h2 {
    text-align: center;
    font-size: 16px;
    background: $secondary;
    color: $midlightgray;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    text-decoration: none;
  }
}
.v-stepper__header {
  border-bottom: 1px solid $midwhite;
  padding: 20px 150px 0;
  box-shadow: none;
  @media only screen and (max-width: 991px) {
    padding: 0 20px;
  }
}

.custbtn {
  padding: 25px 40px !important;
  font-size: 16px;
  &:hover {
    background: $secondary;
  }
}
.theme--light.v-stepper {
  box-shadow: none;
}
footer {
  margin-top: 20px;
  display: flex;
  flex-flow: column;
  width: 100%;
  button {
    width: 120px;
    border-radius: 0;
  }
}
.v-application .primary {
  background: $secondary !important;
}
h2 {
  text-transform: uppercase;
  color: $primary;
  letter-spacing: 1.5px;
  text-decoration: underline;
  font-size: 28px;
}
.theme--light.v-stepper {
  background: $midwhite;
}
.v-form {
  margin-top: 20px;
  // padding: 0 30px;
  font-size: 14px;
  @media only screen and (max-width: 991px) {
    padding: 0;
  }
  letter-spacing: 1.2px;
  button {
    margin-bottom: 20px;
  }
  a {
    color: $dark;
    font-weight: 600;
  }
}
.successmessage {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  height: 150px;
  a {
    background: $secondary;
    display: inline-block;
    padding: 10px 50px;
    color: $white;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1.3px;
    font-size: 14px;
    font-weight: 300;
  }
}
.registerbox {
  .authbox {
    background: $white;
  }
  .publicforum {
    padding: 0 20px;
  }
}
</style>
