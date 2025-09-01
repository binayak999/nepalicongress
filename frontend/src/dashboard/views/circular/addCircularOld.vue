<template>
  <div>
    <div v-if="loading" class="loadingBox">
      <v-progress-circular indeterminate color="#2B9130"></v-progress-circular>
    </div>
    <div v-if="!loading">
      <div v-if="allOptionAction">
        <section v-if="!loggedActiveStorage">
          <ActiveUserAuth />
        </section>
        <section v-if="loggedActiveStorage">
          <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
          <v-container class="kriyasil">
            <v-row>
              <v-btn class="btn" @click="logoutActive">Logout</v-btn>
            </v-row>
          </v-container>
          <div class="showkeyboard" v-if="showkeyboard" @click="openKeyboard">
            <img :src="require(`@/assets/images/keyboard.png`)" alt class="keyboardimage" />
          </div>
          <div class="stickkeyboard" title="किबोर्ड ढाँचा हेर्नुहोस्">
            <i class="fa fa-keyboard-o" @click="openKeyboard"></i>
          </div>
          <div id="translControl"></div>
          <iframe src="https://www.ashesh.com.np/preeti-unicode/linkapi.php?api=0821z0k473" frameborder="0"
            scrolling="no" marginwidth="0" marginheight="0"
            style="border: none; overflow: hidden; width: 100%; height: 400px" allowtransparency="true"></iframe>
          <br />
          <span style="color: gray; text-align: left">
            ©
            <a href="https://www.ashesh.com.np/preeti-unicode/" title="Preeti to Nepali Unicode" target="_top"
              style="text-decoration: none; color: gray">Preeti to Nepali Unicode</a>
          </span>
          <v-container class="kriyasil">
            <v-row>
              <v-col cols="12" class="formbox">
                <v-form ref="form" v-model="valid" lazy-validation v-if="
                  allsubdomainProfile.subdomains != undefined &&
                  (allsubdomainProfile.subdomains[0].category ==
                    'Nepali Congress District Working Committee' ||
                    allsubdomainProfile.subdomains[0].category ==
                    'Nepalese People\'s Co-ordination Committee')
                ">
                  <v-row>
                    <v-col md="12">
                      <label for>राहदानी आकार फोटो (अनिबार्य छैन)</label>
                      <div class="imageupload">
                        <picture-input ref="pictureInput" @change="onChange" width="200" height="200" margin="0"
                          accept="image/jpeg, image/png" size="10" buttonClass="btn" :customStrings="{
                            upload: '<h1>Bummer!</h1>',
                            drag: 'छवि अपलोड गर्नका लागि तान्नुहोस्',
                          }"></picture-input>
                      </div>
                    </v-col>
                    <v-col md="4">
                      <label for>कोड</label>
                      <v-text-field v-model="dateofkriyasil" :rules="[workingformnumberRules.required]" required
                        outlined readonly></v-text-field>
                    </v-col>

                    <v-col md="4">
                      <label for>पुरानो क्रियाशील सदस्यता नं.</label>
                      <v-text-field v-model="workingformnumberold" required outlined
                        @blur="changeToEnglish"></v-text-field>
                    </v-col>
                    <v-col md="4">
                      <label for>क्रियाशील नं.</label>
                      <v-text-field v-if="workingformnumber != undefined" v-model="workingformnumber"
                        :rules="[workingformnumberRules.required]" required outlined readonly></v-text-field>

                      <v-text-field v-if="workingformnumber == undefined" :rules="[workingformnumberRules.required]"
                        required outlined readonly></v-text-field>
                    </v-col>
                    <v-col md="4">
                      <label for>सदस्यको नाम .</label>
                      <v-text-field class="specific" v-model="membername" :rules="[workingformnumberRules.required]"
                        :label="changeToNepali(membername)" required outlined @keydown="changeToNepali"></v-text-field>
                    </v-col>
                    <v-col md="4">
                      <label for>वावु / आमाको नाम .</label>
                      <v-text-field class="specific" v-model="fathermothername"
                        :rules="[workingformnumberRules.required]" :label="changeToNepali(fathermothername)" required
                        outlined @keydown="changeToNepali"></v-text-field>
                    </v-col>
                    <v-col md="4">
                      <label for>पति / पत्निको नाम</label>
                      <v-text-field class="specific" v-model="husbandwifename" :label="changeToNepali(husbandwifename)"
                        required outlined @keydown="changeToNepali"></v-text-field>
                    </v-col>
                    <v-col md="4">
                      <label for>उमेर</label>
                      <v-text-field v-model="age" :rules="numberNecessary" required outlined></v-text-field>
                    </v-col>

                    <v-col md="4">
                      <label for>पेशा</label>
                      <v-text-field class="specific" v-model="profession" :rules="[workingformnumberRules.required]"
                        :label="changeToNepali(profession)" required outlined @keydown="changeToNepali"></v-text-field>
                    </v-col>
                    <v-col md="4">
                      <label for>लिङ्ग</label>
                      <v-selection v-model="gender" :options="genders"></v-selection>
                    </v-col>
                    <v-col md="4" v-if="
                      allsubdomainProfile.subdomains[0].category !=
                      'Nepalese People\'s Co-ordination Committee'
                    ">
                      <label for>प्रदेश</label>
                      <v-text-field v-if="
                        allsubdomainProfile.subdomains[0].category ==
                        'Nepali Congress District Working Committee'
                      " v-model="allsubdomainProfile.subdomains[0].province"
                        :rules="[workingformnumberRules.required]" required outlined readonly></v-text-field>
                      <v-selection v-if="
                        allsubdomainProfile.subdomains[0].category ==
                        'Nepalese People\'s Co-ordination Committee'
                      " v-model="province" placeholder="Province" :options="allProvinceonly" label="province"
                        :filterable="true" @input="selectProvinceNW(province)"></v-selection>
                    </v-col>

                    <v-col md="4" v-if="
                      allsubdomainProfile.subdomains[0].category !=
                      'Nepalese People\'s Co-ordination Committee'
                    ">
                      <label for>जिल्ला</label>

                      <v-text-field v-if="
                        allsubdomainProfile.subdomains[0].parentSubdomain !=
                        undefined &&
                        allsubdomainProfile.subdomains[0].parentSubdomain &&
                        allsubdomainProfile.subdomains[0].category ==
                        'Nepali Congress District Working Committee'
                      " readonly v-model="allsubdomainProfile.subdomains[0].city"
                        :rules="[workingformnumberRules.required]" required outlined></v-text-field>
                      <v-text-field v-if="
                        (allsubdomainProfile.subdomains[0].parentSubdomain ==
                          undefined ||
                          !allsubdomainProfile.subdomains[0]
                            .parentSubdomain) &&
                        allsubdomainProfile.subdomains[0].category ==
                        'Nepali Congress District Working Committee'
                      " readonly v-model="allsubdomainProfile.subdomains[0].nepname"
                        :rules="[workingformnumberRules.required]" required outlined></v-text-field>
                      <v-selection v-if="
                        allsubdomainProfile.subdomains[0].category !=
                        'Nepali Congress District Working Committee'
                      " v-model="district" placeholder="जिल्ला" :options="allDistrict" label="name"
                        :filterable="true" @input="selectDistrictNW(district)"></v-selection>
                    </v-col>
                    <v-col md="4" v-if="
                      allsubdomainProfile.subdomains[0].category !=
                      'Nepalese People\'s Co-ordination Committee'
                    ">
                      <label for>प्रतिनिधिसभा नि.क्षे.नं.</label>
                      <v-selection v-if="
                        allsubdomainProfile.subdomains[0].parentSubdomain ==
                        null
                      " v-model="houseofrepresentative" placeholder="प्रतिनिधिसभा नि.क्षे.नं."
                        :options="allRepresentative" label="code" :filterable="true"
                        :value="regionFunc(houseofrepresentative)"></v-selection>
                    </v-col>
                    <v-col md="4" v-if="
                      allsubdomainProfile.subdomains[0].category !=
                      'Nepalese People\'s Co-ordination Committee'
                    ">
                      <label for>प्रदेश सभा क्षेत्र</label>

                      <v-selection v-model="pradeshassemblyconstituency" placeholder="प्रदेश सभा क्षेत्र"
                        :options="regions" label="code" :filterable="true"
                        @input="municipalityFunc(pradeshassemblyconstituency)"></v-selection>
                    </v-col>
                    <v-col md="4" v-if="
                      allsubdomainProfile.subdomains[0].category !=
                      'Nepalese People\'s Co-ordination Committee'
                    ">
                      <label for>न.पा./गा.पा.</label>
                      <v-selection v-model="municipality" placeholder="न.पा./गा.पा." :options="municipalities"
                        label="name" :filterable="true" @input="wardFunc(municipality)"></v-selection>
                    </v-col>

                    <v-col md="4" v-if="
                      allsubdomainProfile.subdomains[0].category !=
                      'Nepalese People\'s Co-ordination Committee'
                    ">
                      <label for>वडा नं.</label>
                      <v-selection v-model="wardno" placeholder="वडा नं." :options="wards" :filterable="true"
                        @input="getFormNumber()"></v-selection>
                    </v-col>
                    <v-col md="4">
                      <label for="">ठेगाना <span v-if="
                        allsubdomainProfile.subdomains[0].category !=
                        'Nepali Congress District Working Committee'
                      ">(बिदेशको)</span></label>
                      <v-text-field v-model="allsubdomainProfile.subdomains[0].nepname"
                        :rules="[workingformnumberRules.required]" required outlined readonly></v-text-field>
                    </v-col>
                    <v-col md="4" v-if="
                      allsubdomainProfile.subdomains[0].category !=
                      'Nepali Congress District Working Committee'
                    ">
                      <label for="">पूरा ठेगाना</label>
                      <v-text-field v-model="fullAddress" :rules="[workingformnumberRules.required]" required outlined
                        placeholder="सडक ठेगाना, शहर, राज्य, जिप" class="specific" :label="changeToNepali(fullAddress)"
                        @keydown="changeToNepali"></v-text-field>
                    </v-col>
                    <v-col md="4">
                      <label for>समावेशी समूह</label>
                      <v-selection v-model="inclusivegroup" placeholder="समावेशी समूह"
                        :options="inclusivegroups"></v-selection>
                    </v-col>
                    <v-col md="4">
                      <label for>साविक प्रतिनिधि सभा क्षे.नं.</label>
                      <v-text-field v-model="froRconstituencyNo" required outlined
                        :rules="numberNecessary"></v-text-field>
                    </v-col>
                    <v-col md="4">
                      <label for>साविक न.पा./गा.वि.स</label>
                      <v-text-field class="specific" v-model="savikmunicipality"
                        :rules="[workingformnumberRules.required]" :label="changeToNepali(savikmunicipality)" required
                        outlined @keydown="changeToNepali"></v-text-field>
                    </v-col>
                    <v-col md="4">
                      <label for>साविक वडा नं.</label>
                      <v-text-field v-model="savikwardno" required outlined :rules="numberNecessary"></v-text-field>
                    </v-col>
                    <v-col md="4">
                      <label for>मोवाइल नं.</label>
                      <v-text-field v-model="phone" required outlined maxlength="15"></v-text-field>
                    </v-col>
                    <v-col md="4">
                      <label for>इमेल</label>
                      <v-text-field v-model="email" required outlined></v-text-field>
                    </v-col>
                    <v-col md="4">
                      <label for>कैफियत</label>
                      <v-text-field class="specific" v-model="kaifiyat" :label="changeToNepali(kaifiyat)" required
                        outlined @keydown="changeToNepali"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Add Active Member</v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </section>
      </div>
      <div v-if="!allOptionAction">
        <h1 class="paddingbox">
          नेपाली कांग्रेस, केन्द्रीय कृयासिल छानबिन समितीको निर्णय अनुसार,
          नेपाली कांग्रेसको कृयासिल सस्दयताको प्रस्तावित नामावली Entry हर्ने र
          सच्चाउने कार्य पुर्ण रुपमा बन्द गरिएको छ। सार्वजनिक गरिएको
          जिल्ला/क्षेत्रको कृयासिल सदस्यताको प्रस्तावित नामावली नेपाली
          कांग्रेसको website को Home page को "कृयासिल सदस्यता" मेनुमा गई हेर्न
          सक्नु हुनेछ । जय नेपाल।
          <br />
          <small> जय नेपाल।</small>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import PictureInput from "vue-picture-input";
import { mapActions, mapGetters } from "vuex";
import { nepaliToEnglishNumber } from "nepali-number";
import preeti from "preeti";
import ActiveUserAuth from "./activeUserAuth";
import { secureStorage } from "../../../main";

export default {
  name: "AddActiveMember",
  components: { TitleBreadCrumb, PictureInput, ActiveUserAuth },
  data() {
    return {
      loading: true,
      valid: true,
      title: "Renew Active Member",
      language: false,
      imgrules: [files => !files || !files.some(file => file.size > 2097152) || "Avatar size should be less than 2 MB!"],

      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "New Active Member",
        },
      ],
      workingformnumberRules: {
        required: (value) => !!value || "यो फारम क्षेत्र आवश्यक छ",
      },
      workingformnumber: "",
      workingformnumberold: "",
      membername: "",
      fathermothername: "",
      husbandwifename: "",
      dateofkriyasil: "13-14",
      age: "",
      activememberformnumber: "",
      profession: "",
      gender: "",
      region: "",
      district: "00",
      houseofrepresentative: "00",
      pradeshassemblyconstituency: "00",
      municipality: "00",
      wardno: "00",
      inclusivegroup: "",
      froRconstituencyNo: "",
      savikmunicipality: "",
      savikwardno: "",
      phone: "",
      email: "",
      kaifiyat: "",
      imageUrl: "",
      inclusivegroups: [
        "महिला",
        "आदिवासी जनजाति",
        "दलित",
        "मधेशी",
        "खस आर्य",
        "थारु",
        "मुस्लिम",
        "पिछडिएको क्षेत्र",
        "अपाङ्गता भएका",
        "अल्पसंख्यक",
      ],
      genders: ["महिला", "पुरुष", "अन्य"],
      province: "0",
      phoneNumberRules: [
        (v) => !!v || "फोन नम्बर आवश्यक छ",
        (v) => !isNaN(v) || "कृपया नम्बर प्रविष्ट गर्नुहोस्",
      ],
      numberNecessary: [(v) => !isNaN(v) || "कृपया नम्बर प्रविष्ट गर्नुहोस्"],
      emailRules: [
        (v) => !!v || "इ-मेल आवश्यक छ",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      showkeyboard: false,
      nepaladdress: "",
      citizenshipno: "",
      municipalities: [],
      regions: [],
      wards: [],
      muninumber: "",
      maindistrict: "",
      loggedActiveStorage: undefined,
      representatives: [],
      districtSel: 0,
      areacode: "",
      fullAddress: "",
    };
  },
  methods: {
    ...mapActions([
      "fetchProvinceDistrict",
      "fetchSubdomainProfile",
      "fetchProvinceDistrictProvince",
      "fetchProvinceDistrictData",
      "fetchProvinceDistrictSelect",
      "getMenuStatusActive",
    ]),
    logoutActive() {
      secureStorage.removeItem("activeUserData");
      this.loggedActiveStorage = undefined;
    },
    openKeyboard() {
      this.showkeyboard = !this.showkeyboard;
    },
    changeToNepali(e) {
      // nepalify.format(e.target.value);
      return preeti(e);
    },
    changeToEnglish(e) {
      // nepalify.format(e.target.value);
      e.target.value = nepaliToEnglishNumber(e.target.value);
    },
    onChange(image) {
      if (image) {
        console.log("Picture loaded.");
        this.imageUrl = image;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
    regionFunc(code) {
      if (code.code != undefined) {
        this.allRepresentative.forEach((ele) => {
          if (ele.code == code.code) {
            this.regions = ele.region;
          }
        });
      }
    },

    selectProvinceNW(data) {
      if (data.province != undefined) {
        this.province = data.province;
        this.$store.state.post.districts = data.district;
      }
    },
    selectDistrictNW(data) {
      if (data.name != undefined) {
        this.representatives = data.list.repno;

        this.districtSel = data;
        this.fetchProvinceDistrictData(data.name);
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

    getFormNumber() {
      if (
        this.allsubdomainProfile.subdomains[0].parentSubdomain == null &&
        this.allsubdomainProfile.subdomains[0].category ==
        "Nepali Congress District Working Committee"
      ) {
        this.workingformnumber =
          this.allsubdomainProfile.subdomains[0].province +
          this.allProvienceDistrict.code +
          (this.houseofrepresentative.code < 10
            ? "0" + this.houseofrepresentative.code
            : this.houseofrepresentative.code) +
          this.pradeshassemblyconstituency.code +
          this.muninumber +
          (this.wardno < 10 ? "0" + this.wardno : this.wardno);
      } else if (
        this.allsubdomainProfile.subdomains[0].category ==
        "Nepali Congress District Working Committee"
      ) {
        this.workingformnumber =
          this.allsubdomainProfile.subdomains[0].province +
          this.allProvienceDistrict.code +
          (this.houseofrepresentative < 10
            ? "0" + this.houseofrepresentative
            : this.houseofrepresentative) +
          this.pradeshassemblyconstituency.code +
          this.muninumber +
          (this.wardno < 10 ? "0" + this.wardno : this.wardno);
      } else {
        this.workingformnumber =
          this.areacode + "0" + "00" + "00" + "00" + "00";
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        if (
          this.allsubdomainProfile.subdomains[0].parentSubdomain == null &&
          this.allsubdomainProfile.subdomains[0].parentSubdomain
        ) {
          this.maindistrict = this.allsubdomainProfile.subdomains[0].address;
        } else {
          this.maindistrict = this.allsubdomainProfile.subdomains[0].name;
        }
        let addCircular = {
          formNumber: this.activememberformnumber,
          dateofkriyasil: this.dateofkriyasil,
          workingformnumber: this.workingformnumber,
          workingformnumberold:
            this.workingformnumberold != ""
              ? nepaliToEnglishNumber(this.workingformnumberold)
              : "N/A",
          membername: this.changeToNepali(this.membername),
          district: this.district,
          province: this.province,
          fathermothername: this.changeToNepali(this.fathermothername),
          husbandwifename:
            this.husbandwifename != ""
              ? this.changeToNepali(this.husbandwifename)
              : "N/A",
          age: this.age,
          profession: this.changeToNepali(this.profession),
          gender: this.gender,
          houseofrepresentative:
            this.allsubdomainProfile.subdomains[0].parentSubdomain == null
              ? this.houseofrepresentative.code != undefined
                ? this.houseofrepresentative.code.toString()
                : "00"
              : this.houseofrepresentative.toString(),
          pradeshassemblyconstituency:
            this.pradeshassemblyconstituency.name != undefined ? this.pradeshassemblyconstituency.code.toString() : "00",
          municipality: this.municipality.name != undefined ? this.municipality.name : "N/A",
          wardno: this.wardno.toString(),
          inclusivegroup: this.inclusivegroup != "" ? this.changeToNepali(this.inclusivegroup) : "N/A",
          froRconstituencyNo: this.froRconstituencyNo,
          savikmunicipality: this.changeToNepali(this.savikmunicipality),
          savikwardno: this.savikwardno,
          phone: this.phone,
          memberType: "Old",
          email: this.email,
          kaifiyat: this.changeToNepali(this.kaifiyat),
          imageUrl: this.$refs.pictureInput.file,
          userRole: this.logged.user.role,
          maindistrict: this.maindistrict,

        };

        if (this.fullAddress != "") {
          addCircular.fullAddress = this.fullAddress;
        }

        this.$store.dispatch("createCircular", addCircular);
      }
    },
  },
  computed: {
    ...mapGetters([
      "allProvienceDistrict",
      "allsubdomainProfile",
      "allRepresentative",
      "logged",
      "loggedActive",
      "allDistrict",
      "allProvinceonly",
      "allMenuStatusActive",
      "allOptionAction",
    ]),
  },
  async created() {
    if (secureStorage.getItem("activeUserData")) {
      this.loggedActiveStorage = secureStorage.getItem("activeUserData");
    } else {
      this.loggedActiveStorage = undefined;
    }
    await this.getMenuStatusActive();
    await this.fetchSubdomainProfile();
    await this.fetchProvinceDistrictSelect();
    if (
      this.allsubdomainProfile.subdomains[0].category ==
      "Nepali Congress District Working Committee"
    ) {
      await this.fetchProvinceDistrict();
    } else {
      await this.fetchProvinceDistrictProvince();
      this.areacode = "8" + this.allsubdomainProfile.subdomains[0].province;
      this.workingformnumber = this.areacode + "0" + "00" + "00" + "00" + "00";
    }

    if (
      this.allsubdomainProfile.subdomains[0].parentSubdomain != null &&
      this.allsubdomainProfile.subdomains[0].parentSubdomain
    ) {
      this.houseofrepresentative =
        this.allsubdomainProfile.subdomains[0].district;
      this.regionFuncChe(this.allsubdomainProfile.subdomains[0].district);
    }
    this.loading = false;
    //  this.$router.push("/dashboard/activeMembersubdomain")
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.btn {
  background: $secondary !important;
  color: $white;
  margin-left: 15px;
}

label {
  margin-bottom: 5px;
  display: block;
}

.imageupload {
  // background:#e2e1e1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.picture-input {
  margin: 0 !important;
  width: 200px !important;
}

.showkeyboard {
  position: fixed;
  z-index: 999999;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);

  img {
    width: 60%;
  }
}

.relbox {
  position: relative;

  .fa-keyboard-o {
    position: absolute;
    right: 20px;
    top: 50%;
    cursor: pointer;
  }
}

.stickkeyboard {
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 999999;
  background: $secondary;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 25px;
  color: $white;
  cursor: pointer;
}

.paddingbox {
  padding: 30px;
  box-sizing: border-box;
}

.loadingBox {
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
