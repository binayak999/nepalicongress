<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col cols="10" class="formbox">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col md="12">
                <label for v-if="hasparent">Select Parent Subdomain</label>

                <div class="selectbox">
                  <v-checkbox v-model="hasparent" :label="`Is it Chetra ?`"></v-checkbox>

                  <v-selection
                    v-if="hasparent"
                    v-model="parentSubdomain"
                    placeholder="Parent Selections"
                    :options="subdomainSpeicfic"
                    label="name"
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
                  selectedcat === 'Nepali Congress District Working Committee' ||
                  selectedcat === 'Nepali Congress Province Assembly Parliamentary Party'
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
                  label="User Handle"
                  required
                  outlined
                  disabled
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
                  v-model="district"
                  :rules="[districtRule.required]"
                  label="District"
                  required
                  outlined
                  v-if="!hasparent"
                ></v-text-field>
                <v-text-field
                  v-model="district"
                  :rules="[districtRule.required]"
                  label="House of Representatives / प्रतिनिधि सभा क्षेत्र [eg. 1,2,3,4,5]"
                  required
                  outlined
                  v-if="hasparent"
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="municipality"
                  :rules="[municipalityRule.required]"
                  label="Municipality / Rular Municipality"
                  required
                  outlined
                  v-if="!hasparent"
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
                  v-if="!hasparent"
                  v-model="city"
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
                <v-col md="12" v-if="oldImage.length != 0">
                  <div class="flexboxfile">
                    <div v-for="(data, index) in oldImage" :key="index" class="filebox">
                      <div class="imageboxaction">
                        <div class="deletebutton">
                          <i class="fa fa-close" @click="removeImage(data.fileUrl)"></i>
                        </div>
                        <img :src="baseUrl + data.fileUrl" alt class="imageold" />
                      </div>
                    </div>
                  </div>
                </v-col>

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
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate"
              >Update SubDomain</v-btn
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
import { fileUrl } from "./../../../main";
export default {
  name: "EditUser",
  components: { TitleBreadCrumb },
  data() {
    return {
      facebookUrl:'',
      twitterUrl:'',
      instagramUrl:'',
      baseUrl: fileUrl,
      valid: true,
      title: "Edit Subdomain",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Edit Subdomain",
        },
      ],
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
      category: this.selectedcat,
      categoryNep: this.selectedcatNep,
      subcategory: this.selectedsubcat,
      subcategoryNep: this.selectedsubcatNep,
      selectedcat: "Nepali Congress District Working Committee",
      selectedcatNep: "नेपाली कांग्रेस जिल्ला कार्यसमिति",
      selectedsubcat: "Province No. 1",
      selectedsubcatNep: "प्रदेश नं. १",
      hasparent: false,
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
        // (v) => v.length <= 10 || "Phone number should be 10 digit",
        // (v) => v.length >= 10 || "Phone number should be 10 digit",
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
      hasChetra: "No",
      hasChetras: ["Yes", "No"],
      municipality: "",
      externalLink: "",
      district: "Bagmati",
      oldImage: [],
      removedImage: [],
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
      parentSubdomain: "",
    };
  },
  methods: {
    ...mapActions(["subdomainDashboardSingle", "fetchSubDomainZilla"]),
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
          removedImage: this.removedImage,
          oldImage: this.oldImage,
          category: this.selectedcat,
          categoryNep: this.selectedcatNep,
          subcategory: this.selectedsubcat,
          subcategoryNep: this.selectedsubcatNep,
          facebookUrl: this.facebookUrl,
          twitterUrl: this.twitterUrl,
          instagramUrl: this.instagramUrl,
          externalLink: this.externalLink,
          parentSubdomain: this.hasparent ? this.parentSubdomain:undefined,
          hasChetra: this.hasChetra,
        };
        this.$store.dispatch("updateSubdomain", auth);
      }
    },
    removeImage(data) {
      this.removedImage.push({ fileUrl: data });
      this.oldImage = this.oldImage.filter((ele) => {
        return ele.fileUrl !== data;
      });
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
  },
  computed: {
    ...mapGetters(["subdomainSingle", "subdomainSpeicfic"]),
  },
  async created() {
    await this.subdomainDashboardSingle(this.$route.params.name);
    await this.fetchSubDomainZilla();
 
      this.name = this.subdomainSingle.name;
      this.nepname = this.subdomainSingle.nepname;
      this.municipality = this.subdomainSingle.municipality;
      this.email = this.subdomainSingle.email;
      this.phone = this.subdomainSingle.phone;
      this.userHandle = this.subdomainSingle.userHandle;
      this.district = this.subdomainSingle.district;
      this.ward = this.subdomainSingle.ward;
      this.province = this.subdomainSingle.province;
      this.city = this.subdomainSingle.city;
      this.address = this.subdomainSingle.address;
      this.oldImage = this.subdomainSingle.image;
      this.selectedcat = this.subdomainSingle.category;
      this.selectedcatNep = this.subdomainSingle.categoryNep;
      this.selectedsubcat = this.subdomainSingle.subcategory;
      this.selectedsubcatNep = this.subdomainSingle.subcategoryNep;
      this.facebookUrl = this.subdomainSingle.facebookUrl
        ? this.subdomainSingle.facebookUrl
        : "";
      this.twitterUrl = this.subdomainSingle.twitterUrl
        ? this.subdomainSingle.twitterUrl
        : "";
      this.instagramUrl = this.subdomainSingle.instagramUrl
        ? this.subdomainSingle.instagramUrl
        : "";
      this.hasChetra = this.subdomainSingle.hasChetra
        ? this.subdomainSingle.hasChetra
        : "";
      this.externalLink = this.subdomainSingle.externalLink;
      this.parentSubdomain = this.subdomainSingle.parentSubdomain;
      if (this.parentSubdomain != undefined) {
        this.hasparent = true;
      }
 
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.formtitle {
  background: $ligtgray;
  color: $white;
  display: inline-block;
  padding: 5px 20px;
  font-size: 14px;
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
.flexboxfile {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  iframe {
    width: 100%;
    height: 300px;
    display: block;
  }
  .filebox {
    margin-bottom: 50px;
    width: 30%;
    img {
      height: 200px;
      object-fit: cover;
    }
  }
}
.btn-primary {
  background: $primary;
  font-size: 12px;
  color: $white;
  padding: 10px 15px;
  letter-spacing: 1.2px;
}
.imageold {
  width: 100%;
}
.imageboxaction {
  position: relative;
  width: 100%;
}
.deletebutton {
  position: absolute;
  top: -15px;
  right: -15px;
  background: $white;
  border: 1px solid $dark;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
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
