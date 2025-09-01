<template>
  <section>
    <v-container>
      <v-row class="loginbox">
        <v-col cols="12" md="9">
          <div class="authbox">
            <h2>
              {{
                selectedLanguage.title == "English"
                  ? "Nepalese People's Co-ordination Committee Membership"
                  : "नेपाली जनसम्पर्क समिति समन्वय विभाग सदस्यता"
              }}
            </h2>

            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="publicforum"
              v-if="!oldAccount"
            >
              <v-row>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="fullName"
                    :rules="nameRules"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Enter your full name'
                        : 'आफ्नो पूरा नाम प्रविष्ट गर्नुहोस्।'
                    "
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Full Name'
                        : 'पुरा नाम'
                    "
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="phone"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Enter your mobile number'
                        : 'आफ्नो मोबाइल नम्बर प्रविष्ट गर्नुहोस्।'
                    "
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Mobile Number'
                        : 'मोवाइल नं. '
                    "
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="email"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Enter your email'
                        : 'आफ्नो इमेल प्रविष्ट गर्नुहोस्।'
                    "
                    :label="
                      selectedLanguage.title == 'English' ? 'Email' : 'इमेल'
                    "
                    required
                    :rules="emailRules"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col md="4" cols="12">
                  <v-selection
                    class="selectCountry"
                    v-model="country"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Select Country'
                        : 'देश छान्नुहोस्'
                    "
                    :options="countries"
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Select Country'
                        : 'देश छान्नुहोस्'
                    "
                    :filterable="true"
                    :value="bloodgroup"
                  ></v-selection>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="fullAddressInCurrentCountry"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Enter your address in your country'
                        : 'हालको देशमा तपाईंको ठेगाना प्रविष्ट गर्नुहोस्।'
                    "
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Full Address in Current Country'
                        : 'हालको देशमा पूर्ण ठेगाना'
                    "
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="state"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Enter your state in your country'
                        : 'आफ्नो देशको राज्य प्रविष्ट गर्नुहोस्'
                    "
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'State (Current Country)'
                        : 'हालको देशको राज्य'
                    "
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="city"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Enter your city in your country'
                        : 'आफ्नो देशको शहर प्रविष्ट गर्नुहोस्'
                    "
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'City (Current Country)'
                        : 'हालको देशको शहर'
                    "
                    required
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col md="4" cols="12">
                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    max-width="290"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="computedDateFormattedMomentjs"
                        clearable
                        :label="
                          selectedLanguage.title == 'English'
                            ? 'Date of Birth'
                            : 'जन्म मिति'
                        "
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        @click:clear="dob = null"
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dob"
                      @change="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col md="4" cols="12">
                  <v-selection
                    class="selectGender"
                    v-model="gender"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Select Gender'
                        : 'लिङ्ग छान्नुहोस्'
                    "
                    :label="
                      selectedLanguage.title == 'English' ? 'Gender' : 'लिङ्ग'
                    "
                    :options="genderOptions"
                    :filterable="true"
                  ></v-selection>
                </v-col>

                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="occupation"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Enter your occupation'
                        : 'आफ्नो पेशा प्रविष्ट गर्नुहोस्'
                    "
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Occupation'
                        : 'पेशा'
                    "
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="fullAddressInNepal"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Enter your address in Nepal'
                        : 'नेपालमा आफ्नो ठेगाना प्रविष्ट गर्नुहोस्।'
                    "
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Full Address in Nepal'
                        : 'नेपालमा पूर्ण ठेगाना'
                    "
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <v-selection
                    v-model="province"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Province'
                        : 'प्रदेश'
                    "
                    :options="groupofProvinces"
                    label="label"
                    :filterable="true"
                    @input="selectProvince(province)"
                  ></v-selection>
                </v-col>
                <v-col md="4" cols="'12'">
                  <v-checkbox
                    v-model="nrn"
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'NRN'
                        : 'गैर आवासीय नेपाली'
                    "
                  ></v-checkbox>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="citizenshipno"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Enter your citizenship no.'
                        : 'आफ्नो नागरिकता नम्बर प्रविष्ट गर्नुहोस्।'
                    "
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Citizenship No.'
                        : 'नागरिकता न'
                    "
                    required
                    outlined
                    :rules="citizenshipNoRule"
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="citizenshipIssueDistrict"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Enter your citizenship issued district'
                        : 'तपाईंको नागरिकता जारी गरिएको जिल्ला प्रविष्ट गर्नुहोस्'
                    "
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Citizenship Issue District (Country for NRN  )'
                        : 'नागरिकता जारी जिल्ला '
                    "
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="fullNameOfFather"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Enter full name of father'
                        : 'बुबाको पूरा नाम प्रविष्ट गर्नुहोस्'
                    "
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Full Name of Father'
                        : 'बुबाको पूरा नाम'
                    "
                    required
                    outlined
                    :rules="citizenshipNoRule"
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="jssMember"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Enter full name'
                        : 'पूरा नाम प्रविष्ट गर्नुहोस्।'
                    "
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Name of Known Member of JSS'
                        : 'JSS को सदस्यको नाम'
                    "
                    required
                    outlined
                    :rules="citizenshipNoRule"
                  ></v-text-field>
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="contribution"
                    :placeholder="
                      selectedLanguage.title == 'English'
                        ? 'Enter your contribution'
                        : 'आफ्नो योगदान प्रविष्ट गर्नुहोस्'
                    "
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Contribution in Party in Year'
                        : 'पार्टी मा योगदान'
                    "
                    required
                    outlined
                    :rules="citizenshipNoRule"
                  ></v-text-field>
                </v-col>
              </v-row>
              -->
              <v-row>
                <v-col md="4" cols="12">
                  <v-file-input
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Upload Photo'
                        : 'फोटो अपलोड गर्नुहोस्'
                    "
                    :chips="true"
                    :show-size="true"
                    outlined
                    v-model="photo"
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    :rules="ppRule"
                    required
                  ></v-file-input>
                </v-col>
                <v-col md="4" cols="12">
                  <v-file-input
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Upload Citizenship Certificate'
                        : 'नागरिकता प्रमाणपत्र अपलोड गर्नुहोस्'
                    "
                    :chips="true"
                    :show-size="true"
                    outlined
                    v-model="citizenshipCertificate"
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    required
                    :rules="nFRule"
                  ></v-file-input>
                </v-col>
                <v-col md="4" cols="12">
                  <v-file-input
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Upload Additional Attachments'
                        : 'थप संलग्नक अपलोड गर्नुहोस्'
                    "
                    :chips="true"
                    :show-size="true"
                    outlined
                    v-model="additionalAttachments"
                    accept="image/*"
                    required
                    :rules="nBRule"
                    prepend-icon="mdi-camera"
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-alert :text="rulesValue" type="error" v-if="rulesValue">{{
                rulesValue
              }}</v-alert>

              <footer>
                <v-col md="12">
                  <v-checkbox
                    v-model="agree"
                    label="म पूर्ण निष्ठा र इमान्दारीसाथ राष्ट्रियता, लोकतन्त्र र समाजवादको आदर्श, सिद्धान्त एवं उद्देश्यमा आस्था राख्दै पार्टीको विधान र अनुशासन पालना गर्न प्रतिवद्धता साथ शुल्क रु. २० (बीस) बुझाई नेपाली कांग्रेसको सदस्यता प्राप्ति/नवीकरणका लागि आवेदन गर्दछु ।"
                  ></v-checkbox>
                </v-col>
                <v-col md="4" cols="12">
                  <v-btn
                    :disabled="!agree"
                    color="primary"
                    @click="validateform"
                    :loading="loading"
                    >Apply</v-btn
                  >
                </v-col>
              </footer>
            </v-form>
            <div class="publicforum ml-10" style="margin-bottom: -30px">
              <v-checkbox
                v-model="oldAccount"
                :label="
                  selectedLanguage.title == 'English'
                    ? 'The account has already been created, but the payment is either incomplete or there is a problem with the payment.'
                    : 'खाता पहिले नै सिर्जना गरिएको छ, तर भुक्तानी या त अपूर्ण छ वा भुक्तानीमा समस्या छ।'
                "
              ></v-checkbox>
            </div>

            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="publicforum"
              v-if="oldAccount"
            >
              <v-row>
                <v-col md="6">
                  <v-text-field
                    v-model="phone"
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Mobile No.'
                        : 'मोवाइल नं. '
                    "
                    required
                    :rules="phoneNumberRules"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="6">
                  <v-text-field
                    v-model="citizenshipno"
                    :label="
                      selectedLanguage.title == 'English'
                        ? 'Citizenship No.'
                        : 'नागरिकता न'
                    "
                    required
                    outlined
                    :rules="citizenshipNoRule"
                  ></v-text-field>
                </v-col>
                <v-col md="12">
                  <v-btn color="primary" @click="validatePaymentform"
                    >Submit</v-btn
                  >
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
import { mapActions, mapGetters } from "vuex";
import { secureStorage } from "../../../main";
import moment from "moment";
import { format, parseISO } from "date-fns";
import preeti from "preeti";
export default {
  name: "OnlineMember",

  data() {
    return {
      valid: true,
      title: "Online Member",
      show1: false,
      show2: false,
      phone: undefined,
      occupation: undefined,
      country: undefined,
      citizenshipno: undefined,
      date: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
      menu1: false,
      nameRules: [(v) => !!v || "Name is required"],
      first_nameRule: [(v) => !!v || "Firstname is required"],
      last_nameRule: [(v) => !!v || "Lastname is required"],
      bloodGroupRule: [(v) => !!v || "Bloodgroup is required"],
      casteRule: [(v) => !!v || "Caste is required"],
      languageRule: [(v) => !!v || "Language is required"],
      occupationRule: [(v) => !!v || "Occupation is required"],
      countryRule: [(v) => !!v || "Country is required"],
      ppRule: [(v) => !!v || "Photo is required"],
      nFRule: [(v) => !!v || "National ID Front is required"],
      nBRule: [(v) => !!v || "National ID Back is required"],
      citizenshipNoRule: [(v) => !!v || "Citizenship No. is required"],
      agree: false,
      phoneNumberRules: [
        (v) => !!v || "Phone Number is required",
        (v) => (v && v.length <= 10) || "Phone number should be 10 digit",
        (v) => (v && v.length >= 10) || "Phone number should be 10 digit",
        (v) => !isNaN(v) || "Please enter number",
      ],
      nationalIdNumberRules: [
        (v) => (v && v.length <= 10) || "NationalID number should be 10 digit",
        (v) => (v && v.length >= 10) || "NationalID number should be 10 digit",
        (v) => !isNaN(v) || "Please enter number",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],

      affiliatedId: "Sister Organization",

      connectedTo: undefined,
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
      occupationsenglish: [
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
        "Social Work",
        "Freelancer",
        "Others",
      ],
      occupationsnepali: [
        "कृषि र कृषि व्यवसाय",
        "पशुपालन",
        "माछा पक्षी र वन्यजन्तु व्यवसाय",
        "हस्तशिल्प र गृह उद्योग",
        "वस्त्र र कपडा उत्पादन",
        "निर्माण र बनिज्ञान विकास",
        "शिक्षा र शिक्षण",
        "स्वास्थ्य र चिकित्सा सेवा",
        "इन्जिनियरिङ र तान्त्रिक सेवा",
        "जानकारी प्रबिधि र कम्प्युटर विज्ञान",
        "आतिथ्य र पर्यटन",
        "यातायात र लगानी",
        "व्यापार र उद्यम",
        "सरकारी र सार्वजनिक सेवा",
        "बैंकिङ र वित्त",
        "मार्केटिङ र सेल्स",
        "मिडिया र संचार",
        "कला र संस्कृति",
        "खेलकुद र मनोरञ्जन",
        "विज्ञान र अनुसन्धान",
        "सामाजिक कार्य",
        "फ्रिलान्सर",
        "अन्य",
      ],

      fullName: undefined,
      province: "",
      district: "",
      state: "",
      city: "",
      gender: undefined,
      fullAddressInNepal: undefined,
      nrn: undefined,
      fullAddressInCurrentCountry: undefined,
      citizenshipIssueDistrict: undefined,
      fullNameOfFather: undefined,
      jssMember: undefined,
      contribution: undefined,
      photo: undefined,
      citizenshipCertificate: undefined,
      additionalAttachments: undefined,
      loading: false,
      rulesValue: undefined,
      dob: undefined,

      workingformnumber: undefined,
      oldAccount: false,
      paidAccount: false,
    };
  },

  computed: {
    ...mapGetters([
      "logged",
      "selectedLanguage",
      "subdomainAll",
      "allDistrict",
      "allProvices",
      "selectedLanguage",
    ]),
    computedDateFormattedMomentjs() {
      return this.dob ? moment(this.dob).format("DD/MM/YYYY") : "";
    },
    computedDateFormattedDatefns() {
      return this.dob ? format(parseISO(this.dob), "DD/MM/YYYY") : "";
    },
  },
  async created() {
    var date = new Date();
    date.setDate(date.getDate());
    date.setFullYear(date.getFullYear() - 16);
    this.max = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} `;
    this.datestart = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} `;
    this.max.toString();
    this.datestart.toString();

    if (secureStorage.getItem("userData")) {
      this.$store.state.user.loggedUser = JSON.parse(
        secureStorage.getItem("userData")
      );
      this.e1 = 2;
    }
    this.subdomainFrontend();
    await this.fetchProvinceDistrictProvince();

    for await (let ele of this.allProvices) {
      if (ele.province == "1") {
        ele.label = "कोशी";
        this.groupofProvinces.push(ele);
      }
      if (ele.province == "2") {
        ele.label = "मधेश";
        this.groupofProvinces.push(ele);
      }
      if (ele.province == "3") {
        ele.label = "बागमती";
        this.groupofProvinces.push(ele);
      }
      if (ele.province == "4") {
        ele.label = "गण्डकी";
        this.groupofProvinces.push(ele);
      }
      if (ele.province == "5") {
        ele.label = "लुम्बिनी";
        this.groupofProvinces.push(ele);
      }
      if (ele.province == "6") {
        ele.label = "कर्णाली";
        this.groupofProvinces.push(ele);
      }
      if (ele.province == "7") {
        ele.label = "सुदूरपश्चिम";
        this.groupofProvinces.push(ele);
      }
    }
    await this.subdomainFrontend();
  },
  methods: {
    ...mapActions([
      "subdomainFrontend",
      "fetchProvinceDistrictProvince",
      "postOnlineMember",
      "rePayOnlineMember",
    ]),
    changeToNepali(e) {
      // nepalify.format(e.target.value);
      return preeti(e);
    },
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
            this.getFormNumber();
          }
        });
      }
    },
    getFormNumber() {
      this.workingformnumber =
        this.province.province.toString() +
        this.houseofrepresentative.code.toString() +
        (this.houseofrepresentative.code < 10
          ? "0" + this.houseofrepresentative.code
          : this.houseofrepresentative.code) +
        this.pradeshassemblyconstituency.code +
        this.municipality.code +
        (this.ward < 10 ? "0" + this.ward : this.ward);
    },
    async validateform() {
      if (this.$refs.form.validate()) {
        let formData = new FormData();
        formData.append("fullName", this.fullName);
        this.email && formData.append("email", this.email);
        formData.append("phone", this.phone);
        formData.append("country", this.country);
        formData.append(
          "fullAddressInCurrentCountry",
          this.fullAddressInCurrentCountry
        );
        formData.append("state", this.state);
        formData.append("city", this.city);

        formData.append("address", this.address);

        formData.append("occupation", this.occupation);

        formData.append("dob", this.dob);
        formData.append("gender", this.gender);
        formData.append("occupation", this.occupation);
        formData.append("fullAddressInNepal", this.fullAddressInNepal);
        formData.append("nrn", this.nrn);
        formData.append("citizenshipno", this.citizenshipno);
        formData.append(
          "citizenshipIssueDistrict",
          this.citizenshipIssueDistrict
        );
        formData.append("fullNameOfFather", this.fullNameOfFather);
        formData.append("jssMember", this.jssMember);
        formData.append("contribution", this.contribution);
        formData.append("workingformnumber", this.workingformnumber);
        formData.append("tole", this.changeToNepali(this.tole));
        if (this.connectedTo != undefined) {
          formData.append("connectedTo", this.connectedTo);
        }
        if (this.province.province == undefined) {
          this.rulesValue = "कृपया प्रदेश चयन गर्नुहोस्";
          return;
        }
        if (this.district.name == undefined) {
          this.rulesValue = "कृपया जिल्ला चयन गर्नुहोस्";
          return;
        }
        if (this.houseofrepresentative.code == undefined) {
          this.rulesValue = "कृपया प्रतिनिधिसभा नि.क्षे.नं. चयन गर्नुहोस्";
          return;
        }
        if (this.pradeshassemblyconstituency.code == undefined) {
          this.rulesValue = "कृपया प्रदेश सभा क्षेत्र चयन गर्नुहोस्";
          return;
        }
        if (this.municipality.name == undefined) {
          this.rulesValue = "कृपया न.पा./गा.पा. चयन गर्नुहोस्";
          return;
        }
        if (this.ward == undefined) {
          this.rulesValue = "कृपया वडा नं. चयन गर्नुहोस्";
          return;
        }
        if (this.occupation == undefined) {
          this.rulesValue = "कृपया पेशा चयन गर्नुहोस्";
          return;
        }
        if (this.language == undefined) {
          this.rulesValue = "कृपया भाषा चयन गर्नुहोस्";
          return;
        }
        if (this.bloodgroup == undefined) {
          this.rulesValue = "कृपया रक्तसमूह चयन गर्नुहोस्";
          return;
        }
        if (
          this.province.province == undefined ||
          this.district.name == undefined ||
          this.houseofrepresentative.code == undefined ||
          this.pradeshassemblyconstituency.code == undefined ||
          this.municipality.name == undefined ||
          this.ward == undefined ||
          this.occupation == undefined ||
          this.language == undefined ||
          this.bloodgroup == undefined
        ) {
          this.loading = false;
          return;
        }
        formData.append("province", this.province.province);

        formData.append("photo", this.photo);
        formData.append("citizenCertificate", this.citizenshipCertificate);
        formData.append("additionalAttachments", this.additionalAttachments);
        this.loading = true;
        await this.postOnlineMember(formData);
        this.loading = false;
      }
    },
    async validatePaymentform() {
      if (this.$refs.form.validate()) {
        let formData = new FormData();
        formData.append("phone", this.phone);
        formData.append("citizenshipno", this.citizenshipno);
        this.loading = true;
        await this.rePayOnlineMember(formData);
        this.loading = false;
      }
    },
    setUserRegister() {
      secureStorage.setItem("registerAsMember", "registerMember");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.authbox {
  border: 1px solid $midwhite;
  background: white;
  box-shadow: 0px 1px 20px #00000040;
  @media screen and (min-width: 991px) {
    padding: 50px 0;
  }
}
.selectbox {
  margin: 10px 0;
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

  @media screen and (min-width: 991px) {
    padding: 50px 0 100px;
  }
  h2 {
    text-align: center;
    padding: 20px 0;
  }
}
.v-stepper__header {
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid $midwhite;
  padding: 0 100px 90px;
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
  // text-decoration: underline;
  font-size: 28px;
  margin-bottom: 20px;
}
.theme--light.v-stepper {
  background: $midwhite;
}
.v-form {
  font-size: 14px;
  letter-spacing: 1.2px;
  @media screen and (min-width: 991px) {
    margin-top: 20px;
    padding: 0 30px;
  }
  button {
    margin-bottom: 20px;
  }
  a {
    color: $dark;
    font-weight: 600;
  }
}
.regbox {
  background: $secondary;
  display: inline-block;
  text-align: center;
  padding: 20px;
  text-transform: uppercase;
  text-decoration: none;
  color: $white !important;
  font-size: 16px;
}
</style>
