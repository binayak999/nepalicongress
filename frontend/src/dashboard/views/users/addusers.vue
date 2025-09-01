<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col cols="10" class="formbox">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col md="4">
                <label for v-if="hasparent">Select Parent Subdomain</label>
                <div class="selectbox">
                  <v-checkbox
                    v-model="hasparent"
                    :label="`छेत्र हो ?`"
                  ></v-checkbox>
                  <v-selection
                    v-if="hasparent"
                    v-model="parentSubdomain"
                    placeholder="Parent Selections"
                    :options="subdomainSpeicfic"
                    label="name"
                    :value="changedValue(parentSubdomain)"
                    :filterable="true"
                  ></v-selection>
                </div>
              </v-col>
              <v-col md="4">
                <label for v-if="hasparentLevel2"
                  >Select Parent Subdomain</label
                >
                <div class="selectbox">
                  <v-checkbox
                    v-model="hasparentLevel2"
                    :label="`प्रदेश सभा क्षेत्र हो ?`"
                  ></v-checkbox>
                  <v-selection
                    v-if="hasparentLevel2"
                    v-model="parentSubdomainChetra"
                    placeholder="Parent Selections"
                    :options="subdomainSpeicficChetra"
                    label="name"
                    :value="changedValue(parentSubdomain)"
                    :filterable="true"
                  ></v-selection>
                </div>
              </v-col>
              <v-col md="4">
                <label for v-if="hasparentLevel3"
                  >Select Parent Subdomain</label
                >
                <div class="selectbox">
                  <v-checkbox
                    v-model="hasparentLevel3"
                    :label="`न.पा./गा.पा. हो ?`"
                  ></v-checkbox>
                  <v-selection
                    v-if="hasparentLevel3"
                    v-model="parentSubdomain"
                    placeholder="Parent Selections"
                    :options="subdomainSpeicfic"
                    label="name"
                    :value="changedValue(parentSubdomain)"
                    :filterable="true"
                  ></v-selection>
                </div>
              </v-col>

              <v-col md="6">
                <label for>Select English Category Name</label>
                <ul class="filtercat">
                  <li
                    v-for="(cat, index) in categories"
                    :key="index"
                    v-bind:class="{ activeSelect: cat == selectedcat }"
                    @click="changeSelected(cat, index)"
                  >
                    {{ cat }}
                  </li>
                </ul>
              </v-col>
              <v-col md="6">
                <label for>Select Nepali Category Name</label>
                <ul class="filtercat">
                  <li
                    v-for="(cat, index) in categoryNepies"
                    :key="index"
                    v-bind:class="{ activeSelect: cat == selectedcatNep }"
                    @click="changeSelectedNep(cat, index)"
                  >
                    {{ cat }}
                  </li>
                </ul>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                md="6"
                v-if="
                  selectedcat ===
                    'Nepali Congress District Working Committee' ||
                  selectedcat ===
                    'Nepali Congress Province Assembly Parliamentary Party'
                "
              >
                <label for>Select Nepali Sub Category Name</label>
                <ul class="filtercat">
                  <li
                    v-for="(cat, index) in subcategories"
                    :key="index"
                    v-bind:class="{ activeSelect: cat == selectedsubcat }"
                    @click="changeSubSelected(cat, index)"
                  >
                    {{ cat }}
                  </li>
                </ul>
              </v-col>
              <v-col
                md="6"
                v-if="
                  selectedcatNep === 'नेपाली कांग्रेस जिल्ला कार्यसमिति' ||
                  selectedcatNep === 'नेपाली कांग्रेस प्रदेश सभा संसदीय दल'
                "
              >
                <label for>Select Nepali Sub Category Name</label>
                <ul class="filtercat">
                  <li
                    v-for="(cat, index) in subcategoryNepies"
                    :key="index"
                    v-bind:class="{ activeSelect: cat == selectedsubcatNep }"
                    @click="changeSubSelectedNep(cat, index)"
                  >
                    {{ cat }}
                  </li>
                </ul>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6">
                <v-text-field
                  v-model="name"
                  :rules="[nameRule.required]"
                  label="English Name"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="nepname"
                  :rules="[nameRule.required]"
                  label="Nepali Name"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="Email"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="phone"
                  :rules="phoneNumberRules"
                  label="Phone"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="userHandle"
                  :rules="[userHandleRule.required]"
                  label="Username"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="province"
                  :rules="[provinceRule.required]"
                  label="Province"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-if="!hasparent"
                  v-model="district"
                  :rules="[districtRule.required]"
                  label="District"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-if="hasparent"
                  v-model="district"
                  :rules="[districtRule.required]"
                  label="House of Representatives / प्रतिनिधि सभा क्षेत्र [eg. 1,2,3,4,5,6]"
                  required
                  outlined
                ></v-text-field>
              </v-col>

              <v-col md="6">
                <v-text-field
                  v-if="!hasparent"
                  v-model="municipality"
                  :rules="[municipalityRule.required]"
                  label="Municipality / Rular Municipality"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-if="hasparent"
                  v-model="municipality"
                  :rules="[municipalityRule.required]"
                  label="State Assembly Area / प्रदेश सभा क्षेत्र [eg. 1,2,3,4,5]"
                  required
                  outlined
                ></v-text-field>
              </v-col>

              <v-col md="6">
                <v-text-field
                  v-model="ward"
                  :rules="[wardRule.required, wardRule.num]"
                  label="Ward"
                  required
                  outlined
                ></v-text-field>
              </v-col>

              <v-col md="6">
                <v-text-field
                  v-model="city"
                  v-if="!hasparent"
                  :rules="[cityRule.required]"
                  label="City"
                  required
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="city"
                  v-if="hasparent"
                  :rules="[cityRule.required]"
                  label="Address in Nepali"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="address"
                  :rules="[addressRule.required]"
                  label="Address"
                  required
                  outlined
                ></v-text-field>
              </v-col>

              <v-col md="6">
                <v-file-input
                  label="Images"
                  :chips="true"
                  :show-size="true"
                  outlined
                  v-model="image"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="12">
                <v-text-field
                  v-model="facebookUrl"
                  label="Facebook Url"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-text-field
                  v-model="twitterUrl"
                  label="Twitter Url"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-text-field
                  v-model="instagramUrl"
                  label="Youtube Url"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-text-field
                  v-model="externalLink"
                  label="Website Url"
                  required
                  outlined
                  type="url"
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-selection
                  v-model="hasChetra"
                  placeholder="Has Chetra"
                  :options="hasChetras"
                  label="name"
                  :filterable="true"
                ></v-selection>
              </v-col>
            </v-row>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
              >Add SubDomain</v-btn
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
  name: "AddUser",
  components: { TitleBreadCrumb },

  data() {
    return {
      facebookUrl: "",
      twitterUrl: "",
      instagramUrl: "",
      valid: true,
      title: "Add Subdomain",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Subdomain",
        },
      ],
      hasparent: false,
      hasparentLevel2: false,
      hasparentLevel3: false,
      name: null,
      nepname: null,
      email: null,
      phone: 0,
      userHandle: null,
      ward: null,
      province: null,
      city: null,
      address: null,
      image: null,
      category: null,
      categoryNep: null,
      subcategory: null,
      subcategoryNep: null,
      parentSubdomain: null,
      parentSubdomainChetra: null,
      hasChetra: "No",
      isChetraParent: "No",
      nameRule: {
        required: (value) => !!value || "Required.",
      },
      categoryRule: {
        required: (value) => !!value || "Required.",
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
      municipalityRule: {
        required: (value) => !!value || "Required.",
      },
      districtRule: {
        required: (value) => !!value || "Required.",
      },
      wardRule: {
        required: (value) => !!value || "Required.",
        num: (v) => !isNaN(v) || "Please enter number",
      },
      provinceRule: {
        required: (value) => !!value || "Required.",
      },
      cityRule: {
        required: (value) => !!value || "Required.",
      },
      addressRule: {
        required: (value) => !!value || "Required.",
      },
      selectedcat: "Nepali Congress District Working Committee",
      selectedcatNep: "नेपाली कांग्रेस जिल्ला कार्यसमिति",
      selectedsubcat: "Province No. 1",
      selectedsubcatNep: "प्रदेश नं. १",
      municipality: "",
      externalLink: "",
      district: "",
      categories: [
        "Nepali Congress District Working Committee",
        "Nepalese People's Co-ordination Committee",
        "Sister Organization",
        "Well Wisher Organization",
        "Central Policy , Research and Training",
        "Central Election Committee",
        "Nepali Congress Federal Parliamentary Party",
        "Nepali Congress Province Assembly Parliamentary Party",
      ],
      categoryNepies: [
        "नेपाली कांग्रेस जिल्ला कार्यसमिति",
        "नेपाली जनसम्पर्क समिति",
        "भातृ संस्था",
        "शुभेच्छुक संस्था",
        "केन्द्रीय नीति, अनुसन्धान तथा प्रशिक्षण प्रतिष्ठान",
        "केन्द्रीय निर्वाचन समिति",
        "नेपाली कांग्रेस संघीय संसदीय दल",
        "नेपाली कांग्रेस प्रदेश सभा संसदीय दल",
      ],
      subcategories: [
        "Province No. 1",
        "Province No. 2",
        "Bagmati Pradesh",
        "Gandaki Pradesh",
        "Province No. 5",
        "Karnali Pradesh",
        "Sudurpashchim Pradesh",
      ],
      subcategoryNepies: [
        "प्रदेश नं. १",
        "प्रदेश नं. २",
        "बागमती प्रदेश",
        "गण्डकी प्रदेश",
        "प्रदेश नं. ५",
        "कर्णाली प्रदेश",
        "सुदूरपश्चिम प्रदेश",
      ],
    };
  },
  methods: {
    ...mapActions(["fetchSubDomainZilla", "fetchSubDomainChetra"]),
    validate() {
      if (this.$refs.form.validate()) {
        let auth = {
          name: this.name,
          nepname: this.nepname,
          email: this.email,
          phone: this.phone,
          userHandle: this.userHandle,
          municipality: this.municipality,
          district: this.district,
          ward: this.ward,
          province: this.province,
          city: this.city,
          address: this.address,
          image: this.image,
          category: this.selectedcat,
          categoryNep: this.selectedcatNep,
          subcategory: this.selectedsubcat,
          subcategoryNep: this.selectedsubcatNep,
          facebookUrl: this.facebookUrl,
          twitterUrl: this.twitterUrl,
          instagramUrl: this.instagramUrl,
          externalLink: this.externalLink,
          parentSubdomain: this.hasparent
            ? this.parentSubdomain.name
            : this.hasparentLevel2
            ? this.parentSubdomainChetra.name
            : "",
          hasChetra: this.hasChetra,
          isChetraParent: this.hasparentLevel2,
          isNagarPalika: this.hasparentLevel3,
        };

        this.$store.dispatch("createSubDomain", auth);
      }
    },
    languageswitch(lang) {
      if (lang === "eng") {
        this.language = true;
      } else {
        this.language = false;
      }
    },
    changeSelectedNep(item, i) {
      this.selectedcatNep = item;
      this.selectedsubcat = null;
      this.selectedsubcatNep = null;
      this.selectedcat = this.categories[i];
    },
    changeSelected(item, i) {
      this.selectedcat = item;
      this.selectedsubcat = null;
      this.selectedsubcatNep = null;
      this.selectedcatNep = this.categoryNepies[i];
    },
    changeSubSelectedNep(item, i) {
      this.selectedsubcatNep = item;
      this.selectedsubcat = this.subcategories[i];
    },
    changeSubSelected(item, i) {
      this.selectedsubcat = item;
      this.selectedsubcatNep = this.subcategoryNepies[i];
    },
    changedValue(value) {
      console.log(value);
      // if (value != null) {

      //   this.province = value.province;
      //   this.ward = value.ward;

      //   this.selectedsubcat = value.subcategory;
      //   this.selectedsubcatNep = value.subcategoryNep;
      //   this.city = value.nepname;
      //   this.address = value.name;
      // }
    },
  },
  computed: {
    ...mapGetters([
      "allDashCategories",
      "subdomainSpeicfic",
      "subdomainSpeicficChetra",
    ]),
  },
  async created() {
    await this.fetchSubDomainZilla();
    await this.fetchSubDomainChetra();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
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
    margin: 3px;
    cursor: pointer;
    border-radius: 20px;
  }
}
</style>