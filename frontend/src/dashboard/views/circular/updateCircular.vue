<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container fluid class="kriyasil" v-if="
      logged.user.role == 'admin' ||
      logged.user.role == 'activecontrol' ||
      logged.user.role == 'subdomain'
    ">
      <v-row>
        <v-col cols="12" class="formbox">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col md="12">
                <label for>राहदानी आकार फोटो</label>
                <div v-if="
                  singleCircularAll.images != undefined &&
                  singleCircularAll.images.length != 0
                ">
                  <img :src="baseUrl + singleCircularAll.images[0].fileUrl" alt class="passportimage" />
                </div>
                <div class="imageupload">
                  <picture-input ref="pictureInput" @change="onChange" width="200" height="200" margin="0"
                    accept="image/jpeg, image/png" size="10" buttonClass="btn" :customStrings="{
                      upload: '<h1>Bummer!</h1>',
                      drag: 'छवि अपलोड गर्नका लागि तान्नुहोस्',
                    }"></picture-input>
                </div>
              </v-col>

              <v-col md="4" v-if="singleCircularAll.memberType == 'Old'">
                <label for>पुरानो क्रियाशील नं.</label>
                <v-text-field v-model="workingformnumberold" :rules="[workingformnumberRules.required]"
                  @blur="changeToEnglish" required outlined></v-text-field>
              </v-col>
              <v-col md="4" v-if="singleCircularAll.memberType != 'Old'">
                <label for>क्रियाशील फारम नं.</label>
                <v-text-field v-model="formNumber" :rules="[workingformnumberRules.required]" required
                  outlined></v-text-field>
              </v-col>
              <v-col md="4" v-if="singleCircularAll.memberType != 'Old'">
                <label for>क्रियाशील नं.</label>
                <v-text-field v-model="workingformnumber" :rules="[workingformnumberRules.required]" required readonly
                  outlined></v-text-field>
              </v-col>
              <v-col md="4">
                <label for>सदस्यको नाम .</label>
                <v-text-field v-model="membername" :rules="[workingformnumberRules.required]" required outlined
                  class="specific" :label="changeToNepali(membername)"></v-text-field>
              </v-col>
              <v-col md="4">
                <label for>वावु / आमाको नाम .</label>
                <v-text-field v-model="fathermothername" :rules="[workingformnumberRules.required]" required outlined
                  class="specific" :label="changeToNepali(fathermothername)"></v-text-field>
              </v-col>
              <v-col md="4">
                <label for>पति / पत्निको नाम</label>
                <v-text-field v-model="husbandwifename" :rules="[workingformnumberRules.required]" required outlined
                  class="specific" :label="changeToNepali(husbandwifename)"></v-text-field>
              </v-col>
              <v-col md="4">
                <label for>उमेर</label>
                <v-text-field v-model="age" :rules="[workingformnumberRules.required]" required outlined></v-text-field>
              </v-col>
              <v-col md="4">
                <label for>पेशा</label>
                <v-text-field v-model="profession" :rules="[workingformnumberRules.required]" required outlined
                  class="specific" :label="changeToNepali(profession)"></v-text-field>
              </v-col>
              <v-col md="4">
                <label for>लिङ्ग</label>
                <v-selection v-model="gender" placeholder="लिङ्ग" :options="genders"></v-selection>
              </v-col>
              <v-col md="4">
                <label for>प्रदेश</label>
                <v-text-field v-model="region" :rules="[workingformnumberRules.required]" required
                  outlined></v-text-field>
              </v-col>
              <v-col md="4">
                <label for>जिल्ला</label>
                <v-text-field readonly v-model="district" :rules="[workingformnumberRules.required]" required
                  outlined></v-text-field>
              </v-col>
              <v-col md="4">
                <label for>प्रतिनिधिसभा नि.क्षे.नं.</label>
                <v-text-field v-model="houseofrepresentative" :rules="[workingformnumberRules.required]" required
                  outlined></v-text-field>
              </v-col>
              <v-col md="4">
                <label for>प्रदेश सभा नि.क्षे.नं.</label>
                <v-text-field v-model="pradeshassemblyconstituency" :rules="[workingformnumberRules.required]" required
                  outlined></v-text-field>
              </v-col>
              <v-col md="4">
                <label for>न.पा./गा.पा.को नाम</label>
                <v-selection v-model="municipality" placeholder="न.पा./गा.पा." :options="municipalities"
                  :filterable="true"></v-selection>
              </v-col>
              <v-col md="4">
                <label for>वडा नं.</label>
                <v-text-field v-model="wardno" :rules="[workingformnumberRules.required]" required
                  outlined></v-text-field>
              </v-col>
              <v-col md="4">
                <label for>समावेशी समूह</label>
                <v-selection v-model="inclusivegroup" placeholder="समावेशी समूह"
                  :options="inclusivegroups"></v-selection>
              </v-col>
              <v-col md="4">
                <label for>साविक प्रतिनिधि सभा क्षे.नं.</label>
                <v-text-field v-model="froRconstituencyNo" :rules="[workingformnumberRules.required]" required
                  outlined></v-text-field>
              </v-col>
              <v-col md="4">
                <label for>साविक न.पा./गा.वि.स</label>
                <v-text-field v-model="savikmunicipality" :rules="[workingformnumberRules.required]" required outlined
                  class="specific" :label="changeToNepali(savikmunicipality)"></v-text-field>
              </v-col>
              <v-col md="4">
                <label for>साविक वडा नं.</label>
                <v-text-field v-model="savikwardno" :rules="[workingformnumberRules.required]" required
                  outlined></v-text-field>
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
                <v-text-field v-model="kaifiyat" outlined class="specific"
                  :label="changeToNepali(kaifiyat)"></v-text-field>
              </v-col>
            </v-row>

            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Update Active Member</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import PictureInput from "vue-picture-input";
import { mapActions, mapGetters } from "vuex";
import { fileUrl } from "./../../../main";
import preeti from "preeti";
import { nepaliToEnglishNumber } from "nepali-number";
export default {
  name: "UpdateCircular",
  components: { TitleBreadCrumb, PictureInput },
  data() {
    return {
      oldImage: [],
      removedImage: [],
      baseUrl: fileUrl,
      valid: true,
      title: "Update Active Member",
      language: false,
      imgrules: [files => !files || !files.some(file => file.size > 2097152) || "Avatar size should be less than 2 MB!"],

      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Update Active Member",
        },
      ],
      workingformnumberRules: {
        required: (value) => !!value || "यो फारम क्षेत्र आवश्यक छ",
      },
      workingformnumber: "",
      membername: "",
      fathermothername: "",
      husbandwifename: "",
      age: "",
      profession: "",
      gender: "",
      region: "",
      district: "",
      houseofrepresentative: "",
      pradeshassemblyconstituency: "",
      municipality: "",
      wardno: "",
      inclusivegroup: "",
      froRconstituencyNo: "",
      savikmunicipality: "",
      savikwardno: "",
      phone: "",
      email: "",
      kaifiyat: "",
      imageUrl: "",
      workingformnumberOld: "",
      oldimages: [],
      formNumber: "",
      memberType: "",
      dateofkriyasil: "",
      maindistrict: "",
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
      province: ["1", "2", "3", "4", "5", "6", "7"],
      phoneNumberRules: [
        (v) => !!v || "फोन नम्बर आवश्यक छ",
        (v) => !isNaN(v) || "कृपया नम्बर प्रविष्ट गर्नुहोस्",
      ],
      emailRules: [
        (v) => !!v || "इ-मेल आवश्यक छ",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      address: "",
      nepaladdress: "",
      citizenshipno: "",
      municipalities: [],
      workingformnumberold: "",
    };
  },
  methods: {
    ...mapActions([
      "fetchProvinceDistrict",
      "singleCircular",
      "fetchSubdomainProfile",
    ]),
    changeToNepali(e) {
      return preeti(e, "en");
    },
    onChange(image) {
      if (image) {
        this.imageUrl = image;
        if (this.singleCircularAll.images.length != 0) {
          this.removedImage.push(this.singleCircularAll.images[0]);
        }
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
    changeToEnglish(e) {
      // nepalify.format(e.target.value);
      e.target.value = nepaliToEnglishNumber(e.target.value);
    },
    validate() {
      if (this.$refs.form.validate()) {
        if (this.allsubdomainProfile.subdomains.length > 0) {
          if (
            this.allsubdomainProfile.subdomains[0].category ==
            "Nepali Congress District Working Committee"
          ) {
            let addCircular = {
              id: this.singleCircularAll._id,
              formNumber: this.formNumber,
              workingformnumber: this.workingformnumber,
              workingformnumberold:
                this.workingformnumberold != ""
                  ? nepaliToEnglishNumber(this.workingformnumberold)
                  : "N/A",
              membername: this.changeToNepali(this.membername),
              fathermothername: this.changeToNepali(this.fathermothername),
              husbandwifename: this.changeToNepali(this.husbandwifename),
              age: this.age,
              profession: this.changeToNepali(this.profession),
              gender: this.gender,
              region: this.region,
              district: this.district,
              houseofrepresentative: this.houseofrepresentative,
              pradeshassemblyconstituency: this.pradeshassemblyconstituency,
              municipality: this.municipality,
              wardno: this.wardno,
              inclusivegroup: this.inclusivegroup,
              froRconstituencyNo: this.froRconstituencyNo,
              savikmunicipality: this.changeToNepali(this.savikmunicipality),
              savikwardno: this.savikwardno,
              phone: this.phone,
              email: this.email,
              kaifiyat: this.changeToNepali(this.kaifiyat),
              imageUrl: this.$refs.pictureInput.file,
              userRole: this.logged.user.role,
              memberType: this.memberType,
              removedImage: this.removedImage,
              oldImage: this.oldImage,
              maindistrict: this.maindistrict,
            };
            this.$store.dispatch("updateCircularInside", addCircular);
          } else if (
            this.allsubdomainProfile.subdomains[0].category ==
            "Nepalese People's Co-ordination Committee"
          ) {
            if (this.$refs.form.validate()) {
              let addCircular = {
                id: this.singleCircularAll._id,
                workingformnumber: this.workingformnumber,
                membername: this.membername,
                fathermothername: this.fathermothername,
                age: this.age,
                profession: this.profession,
                gender: this.gender,
                address: this.allsubdomainProfile.subdomains[0].nepname,
                nepaladdress: this.nepaladdress,
                citizenshipno: this.citizenshipno,
                phone: this.phone,
                email: this.email,
                kaifiyat: this.kaifiyat,
                imageUrl: this.$refs.pictureInput.file,
                userRole: this.logged.user.role,
              };
              this.$store.dispatch("updateCircularInside", addCircular);
            }
          }
        } else {
          let addCircular = {
            id: this.singleCircularAll._id,
            formNumber: this.formNumber,
            workingformnumber: this.workingformnumber,
            workingformnumberold:
              this.workingformnumberold != ""
                ? nepaliToEnglishNumber(this.workingformnumberold)
                : "N/A",
            membername: this.changeToNepali(this.membername),
            fathermothername: this.changeToNepali(this.fathermothername),
            husbandwifename: this.changeToNepali(this.husbandwifename),
            age: this.age,
            profession: this.changeToNepali(this.profession),
            gender: this.gender,
            region: this.region,
            district: this.district,
            houseofrepresentative: this.houseofrepresentative,
            pradeshassemblyconstituency: this.pradeshassemblyconstituency,
            municipality: this.municipality,
            wardno: this.wardno,
            inclusivegroup: this.inclusivegroup,
            froRconstituencyNo: this.froRconstituencyNo,
            savikmunicipality: this.changeToNepali(this.savikmunicipality),
            savikwardno: this.savikwardno,
            phone: this.phone,
            email: this.email,
            kaifiyat: this.changeToNepali(this.kaifiyat),
            imageUrl: this.$refs.pictureInput.file,
            userRole: this.logged.user.role,
            memberType: this.memberType,
            removedImage: this.removedImage,
            oldImage: this.oldImage,
            maindistrict: this.maindistrict,
          };
          this.$store.dispatch("updateCircularByAdmin", addCircular);
        }
      }
    },
  },
  computed: {
    ...mapGetters([
      "logged",
      "allProvienceDistrict",
      "singleCircularAll",
      "allsubdomainProfile",
    ]),
  },
  async created() {
    if (
      this.logged.user.role != "admin" &&
      this.logged.user.role != "activecontrol" &&
      this.logged.user.role != "subdomain"
    ) {
      this.$router.go(-1);
    }

    await this.fetchProvinceDistrict();
    await this.fetchSubdomainProfile();
    await this.singleCircular(this.$route.params.id);
    // setTimeout(() => {
    this.workingformnumber = this.singleCircularAll.workingformnumber;
    this.membername = this.singleCircularAll.membername;
    this.fathermothername = this.singleCircularAll.fathermothername;
    this.husbandwifename = this.singleCircularAll.husbandwifename;
    this.age = this.singleCircularAll.age;
    this.profession = this.singleCircularAll.profession;
    this.gender = this.singleCircularAll.gender;
    this.region = this.singleCircularAll.region;
    this.houseofrepresentative = this.singleCircularAll.houseofrepresentative;
    this.pradeshassemblyconstituency = this.singleCircularAll.pradeshassemblyconstituency;
    this.municipality = this.singleCircularAll.municipality;
    this.wardno = this.singleCircularAll.wardno;
    this.inclusivegroup = this.singleCircularAll.inclusivegroup;
    this.froRconstituencyNo = this.singleCircularAll.froRconstituencyNo;
    this.savikmunicipality = this.singleCircularAll.savikmunicipality;
    this.savikwardno = this.singleCircularAll.savikwardno;
    this.phone = this.singleCircularAll.phone;
    this.email = this.singleCircularAll.email;
    this.kaifiyat = this.singleCircularAll.kaifiyat;
    this.oldImage = this.singleCircularAll.images;
    this.memberType = this.singleCircularAll.memberType;
    this.address = this.singleCircularAll.address;
    this.nepaladdress = this.singleCircularAll.nepaladdress;
    this.citizenshipno = this.singleCircularAll.citizenshipno;
    this.district = this.singleCircularAll.district;
    this.workingformnumberold = this.singleCircularAll.workingformnumberold;
    this.dateofkriyasil = this.singleCircularAll.dateofkriyasil;
    this.formNumber = this.singleCircularAll.formNumber;
    this.maindistrict = this.singleCircularAll.maindistrict;
    // }, 1500);
  },
};
</script>

<style lang="scss" scoped>
.passportimage {
  height: 200px;
  width: 200px;
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
</style>
