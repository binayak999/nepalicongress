<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container fluid>
      <v-row class="loginbox">
        <v-col md="11" cols="12" class="authbox">
          <h2>Online Membership</h2>
          <div>
            <v-form ref="formotp" v-model="validTop" lazy-validation>
              <v-row>
                <v-col md="4" cols="12">
                  <v-file-input
                    label="Images"
                    :chips="true"
                    :show-size="true"
                    outlined
                    v-model="images"
                    accept="['image/*']"
                    prepend-icon="mdi-camera"
                  ></v-file-input>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="firstName"
                    :rules="[nameRules.required]"
                    label="First Name"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="lastName"
                    :rules="[nameRules.required]"
                    label="Last Name"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="email"
                    :rules="[nameRules.required]"
                    label="Email"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="phone"
                    :rules="[nameRules.required]"
                    label="Phone"
                    required
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col md="4" cols="12">
                  <v-select
                    v-model="bloodgroup"
                    :items="bloodgroups"
                    label="Select Blood Group"
                    required
                    outlined
                  ></v-select>
                </v-col>
                <v-col md="4" cols="12">
                  <v-select
                    v-model="casteType"
                    :items="casteTypes"
                    label="Select Caste Type"
                    required
                    outlined
                  ></v-select>
                </v-col>
                <v-col md="4" cols="12">
                  <v-select
                    v-model="religion"
                    :items="religions"
                    label="Select Religion"
                    required
                    outlined
                  ></v-select>
                </v-col>
                <v-col md="4" cols="12">
                  <v-select
                    v-model="language"
                    :items="languages"
                    label="Select Language"
                    required
                    outlined
                  ></v-select>
                </v-col>
                <v-col md="4" cols="12">
                  <v-select
                    v-model="occupation"
                    :items="occupations"
                    label="Occupation"
                    required
                    outlined
                  ></v-select>
                </v-col>
                <v-col md="4" cols="12">
                  <v-select
                    v-model="country"
                    :items="countries"
                    label="Select Country"
                    required
                    outlined
                  ></v-select>
                </v-col>

                <v-col md="12" cols="12">
                  <footer>
                    <v-btn color="primary" class="primaryBox" @click="e1 = 2"
                      >Create</v-btn
                    >
                  </footer>
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
import TitleBreadCrumb from "../components/common/TitleBreadCrumb";
export default {
  name: "OnlineMembership",
  components: {
    TitleBreadCrumb,
  },
  data() {
    return {
      valid: true,
      validTop: true,
      title: "Public Forum",
      images: null,
      bloddgroup: undefined,
      casteType: undefined,
      religion: undefined,
      language: undefined,
      occupation: undefined,
      country: undefined,
      municipality: "",
      district: "",
      ward: "",
      city: "",
      province: "",
      nearestlandmark: "",
      address: "",
      bloodgroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O"],
      casteTypes: [
        "Brahmin",
        "Chhetri",
        "Newar",
        "Gurung",
        "Magar",
        "Tamang",
        'Dalit (formerly known as "untouchables")',
        "Thakuri",
        "Rai",
        "Limbu",
        "Sherpa",
        "Sunuwar",
        "Jirel",
        "Yadav",
        "Tharu",
        "Bahun",
        "Kami",
        "Sarki",
        "Damai",
        "Darai",
      ],
      religions: [
        "Hinduism",
        "Buddhism",
        "Islam",
        "Christianity",
        "Sikhism",
        "Jainism",
        "Tao",
        "Shinto",
        "Confucianism",
        "Judism",
      ],
      languages: [
        "Nepali",
        "Maithili",
        "Bhojpuri",
        "Tamang",
        "Newari",
        "Magar",
        "Awadhi",
        "Gurung",
        "Tharu",
        "Limbu",
        "Rai",
        "Sherpa",
        "Bajjika",
        "Doteli",
        "Urdu",
      ],
      occupations: [
        "Agriculture and farming",
        "Livestock rearing and animal husbandry",
        "Fishing and forestry",
        "Handicrafts and cottage industries",
        "Textile and clothing manufacturing",
        "Construction and infrastructure development",
        "Education and teaching",
        "Health and medical services",
        "Engineering and technical services",
        "Information technology and computer science",
        "Hospitality and tourism",
        "Transportation and logistics",
        "Business and entrepreneurship",
        "Government and public service",
        "Banking and finance",
        "Marketing and sales",
        "Media and communication",
        "Arts and culture",
        "Sports and recreation",
        "Science and research",
      ],
      countries: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua & Deps",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Central African Rep",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Congo {Democratic Rep}",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "East Timor",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland {Republic}",
        "Israel",
        "Italy",
        "Ivory Coast",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea North",
        "Korea South",
        "Kosovo",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar {Burma}",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russian Federation",
        "Rwanda",
        "St Kitts & Nevis",
        "St Lucia",
        "Saint Vincent & the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome & Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Togo",
        "Tonga",
        "Trinidad & Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ],
      firstName: "",
      lastName: "",
      nameRules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  created() {
    this.$store.state.post.loading = true;
    setTimeout(() => {
      this.$store.state.post.loading = false;
    }, 1500);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.loginbox {
  justify-content: center;
  padding: 50px 0 20px;
  h2 {
    text-align: center;
    padding: 20px 0;
  }
}
.authbox {
  border: 1px solid $midwhite;
  padding: 50px 20px;
  background: $midwhite;
  @media only screen and (max-width: 991px) {
    padding: 20px;
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
  font-size: 28px;
  margin-bottom: 20px;
}
.primary {
  background: $secondary !important;
  padding: 15px 30px !important;
  border-radius: 0;
  box-shadow: none;
  margin-top: 10px !important;
  letter-spacing: 2px !important;
  font-weight: 400;
}
</style>