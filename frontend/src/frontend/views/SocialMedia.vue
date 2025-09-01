<template>
  <section>
    <TitleBreadCrumb
      :breadcrumbs="breadcrumbs"
      :language="selectedLanguage.title"
    />
    <v-container>
      <v-row>
        <v-col md="12" v-if="logged == undefined">
          <h3 class="text-center headertitle">
            नेपाली कांग्रेसका जिल्ला,क्षेत्र,गाउँ/नगर, वार्ड का समितीहरु साथै
            भातृ तथा शुभेच्छुक संस्थाहरुका विभिन्न तहहरुबाट र जनसम्पर्क
            समितिहरुको नाममा ज जस्ले facebook, Twitter वा Instagram चलाइरहनु
            भएको छ, उक्त page वा account को Admin वा Editor हरुले नेपाली
            कांग्रेस केन्द्र लाई जानकारी दिनु हुन अनुरोध छ। जानकारी दिने form
            भर्नको लागि पहिले Register गर्नु होला।
          </h3>
          <!-- <h3 class="text-center">
            Register गरि सक्नु भएको छ भने, register गर्दा बनाउनु भएको password र
            आफ्नो मोबाइल न प्रयोग गरि Login गर्नु होला।
          </h3> -->
        </v-col>
      </v-row>
      <v-row class="loginbox registerbox" v-if="logged != undefined">
        <v-col md="7" cols="12">
          <div class="authbox">
            <h2>
              <ul class="tablist">
                <li>
                  Social Media Information
                </li>
              </ul>
            </h2>

            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="publicforum"
            >
              <v-row v-for="(element, index) in socialMedia" :key="index">
                <v-col md="6" cols="12" class="d-none">
                  <label>Social Media Name</label>
                  <v-text-field
                    v-model="element.type"
                    required
                    outlined
                    placeholder="Facebook"
                    readonly
             
                  ></v-text-field>
                </v-col>
                <v-col md="12" cols="12">
                  <label>{{ element.type }} Link</label>
                  <v-text-field
                    v-model="element.link"
                    required
                    outlined
                    :placeholder="
                      `https://${element.type.toLowerCase()}.com/nepalicongress`
                    "
                :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col md="12" cols="12">
                  <label>Social Media Used From Location</label>
                  <v-text-field
                    v-model="location"
                    required
                    outlined
                    :rules="[rules.required]"
      
                  ></v-text-field>
                </v-col>
              </v-row>

              <footer class="text-center">
                <v-btn color="primary custbtn" @click="submitSocialData()"
                  >Submit</v-btn
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
import TitleBreadCrumb from "../components/common/TitleBreadCrumb";
import { mapActions, mapGetters } from "vuex";
import { secureStorage } from "../../main";
export default {
  name: "SocialMedia",

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
      year: 2021,
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
      nameRules: [(v) => !!v || "Field is required"],
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
      location: "",
      socialMedia: [
        { type: "Facebook", link: "" },
        { type: "Twitter", link: "" },
        { type: "Instagram", link: "" },
      ],
    };
  },
  created() {
    if (secureStorage.getItem("userData") == undefined) {
      this.$router.push("/login/socialmedia");
    } else {
      this.logged = JSON.parse(secureStorage.getItem("userData")).user;
    }
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
    for (let i = 0; i <= 12; i++) {
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
      "fetchProvinceDistrictProvince",
      "createSocialProfile",
    ]),

    submitSocialData() {
      if (this.$refs.form.validate()) {
        // let data = {
        //   socialmedia: this.socialMedia,
        //   location: this.location,
        // };
        // this.createSocialProfile(data);
      }
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
    ...mapGetters(["selectedLanguage", "allDistrict", "allProvices", "logged"]),
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
    padding: 20px 0;
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
