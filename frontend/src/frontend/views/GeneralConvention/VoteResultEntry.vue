<template>
  <section>
    <v-container v-if="loadingMain">
      <v-row>
        <v-col>
          <center>
            <v-progress-circular indeterminate></v-progress-circular>
          </center>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="!loadingMain">
      <v-row v-if="logged">
        <v-col md="12">
          <v-row>
            <v-col cols="12">
              <h1>{{ title }} कार्यसमिती</h1>
            </v-col>
            <v-col>
              <v-selection
                class="selectdate"
                v-model="title"
                placeholder="Select Form"
                :options="selectionTitles"
                label="Select Form"
                :filterable="true"
                @input="setTitle(title)"
              ></v-selection>
            </v-col>
          </v-row>
          <v-row v-if="title != 'जिल्ला'">
            <v-col
              md="2"
              v-if="
                title == 'वार्ड' ||
                  title == 'प्रतिनिधि सभा क्षेत्र' ||
                  title == 'प्रदेश सभा क्षेत्र'
              "
            >
              <label for>प्रतिनिधिसभा नि.क्षे.नं.</label>
              <v-selection
                class="selectdate"
                v-model="houseofrepresentative"
                placeholder="प्रतिनिधिसभा नि.क्षे.नं."
                :options="representatives"
                label="code"
                :filterable="true"
                @input="regionFunc(houseofrepresentative)"
              ></v-selection>
            </v-col>
            <v-col
              md="2"
              v-if="title == 'वार्ड' || title == 'प्रदेश सभा क्षेत्र'"
            >
              <label for>प्रदेश सभा क्षेत्र</label>

              <v-selection
                class="selectdate"
                v-model="pradeshassemblyconstituency"
                placeholder="प्रदेश सभा क्षेत्र"
                :options="regions"
                label="code"
                :filterable="true"
                @input="municipalityFunc(pradeshassemblyconstituency)"
              ></v-selection>
            </v-col>
            <v-col
              md="2"
              v-if="
                (pradeshassemblyconstituency != '' && title == 'वार्ड') ||
                  title == 'पालिका'
              "
            >
              <label for>न.पा./गा.पा.</label>
              <v-selection
                class="selectdate"
                v-model="municipality"
                placeholder="न.पा./गा.पा."
                :options="municipalities"
                label="name"
                :filterable="true"
                @input="wardFunc(municipality)"
              ></v-selection>
            </v-col>
            <v-col md="2" v-if="municipality != '' && title == 'वार्ड'">
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
          <v-row v-if="allgeneralConventionVote.results != undefined">
            <v-col md="12">
              <hr />
            </v-col>

            <v-col
              class="col-md-2"
              v-if="
                allgeneralConventionVote.results.houseofrepresentative !=
                  null &&
                  allgeneralConventionVote.results.houseofrepresentative !=
                    undefined
              "
            >
              <h3>
                <label for>प्रतिनिधिसभा नि.क्षे.नं.</label>
              </h3>
              <h1>
                {{ allgeneralConventionVote.results.houseofrepresentative }}
              </h1>
            </v-col>
            <v-col
              class="col-md-1"
              v-if="
                allgeneralConventionVote.results.pradeshassemblyconstituency !=
                  null &&
                  allgeneralConventionVote.results
                    .pradeshassemblyconstituency != undefined
              "
            >
              <h3>
                <label for>प्रदेश सभा क्षेत्र</label>
              </h3>
              <h1>
                {{
                  allgeneralConventionVote.results.pradeshassemblyconstituency
                }}
              </h1>
            </v-col>
            <v-col
              class="col-md-2"
              v-if="
                allgeneralConventionVote.results.municipality != null &&
                  allgeneralConventionVote.results.municipality != undefined
              "
            >
              <h3>
                <label for>न.पा./गा.पा.</label>
              </h3>
              <h1>
                {{ allgeneralConventionVote.results.municipality }}
              </h1>
            </v-col>
            <v-col
              class="col-md-1"
              v-if="
                allgeneralConventionVote.results.ward != null &&
                  allgeneralConventionVote.results.ward != undefined
              "
            >
              <h3>
                <label for>वडा नं.</label>
              </h3>
              <h1>
                {{ allgeneralConventionVote.results.ward }}
              </h1>
            </v-col>
            <v-col md="12">
              <hr />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" v-if="$route.params.id == undefined">
              <div class="row titleAction">
                <h2 for>पद: {{ post }}</h2>
                <v-btn @click="addMoreUser(0)">
                  Add More
                </v-btn>
              </div>
            </v-col>
            <v-row class="width100">
              <v-col md="2">
                <v-selection
                  v-if="title != 'वार्ड' && title != 'प्रतिनिधि सभा क्षेत्र'"
                  class="selectdate"
                  v-model="post"
                  placeholder="पद"
                  :options="designationsAll"
                  label="पद"
                  :filterable="true"
                  @input="postFilter(post)"
                ></v-selection>

                <v-selection
                  v-if="title == 'वार्ड'"
                  class="selectdate"
                  v-model="post"
                  placeholder="पद"
                  :options="designationW"
                  label="पद"
                  :filterable="true"
                  @input="postFilter(post)"
                ></v-selection>

                <v-selection
                  v-if="title == 'प्रतिनिधि सभा क्षेत्र'"
                  class="selectdate"
                  v-model="post"
                  placeholder="पद"
                  :options="designationWardsH"
                  label="पद"
                  :filterable="true"
                  @input="postFilter(post)"
                ></v-selection>
              </v-col>
            </v-row>

            <div class="width100">
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="kriyasil"
              >
                <v-row
                  class="width100"
                  v-for="(ele, index1) in voteForm"
                  :key="index1 + 'v'"
                >
                  <v-col md="2">
                    <label for>नाम</label>
                    <v-text-field
                      v-model="ele.name"
                      :label="changeToNepali(ele.name)"
                      required
                      outlined
                      :rules="[nameRules.required]"
                      class="specific"
                      @keydown="changeToNepali"
                    ></v-text-field>
                  </v-col>
                  <v-col md="2">
                    <label for>फोन</label>
                    <v-text-field
                      v-model="ele.phone"
                      :rules="phoneNumberRules"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col md="2">
                    <label for>चुनावी प्रकृया</label>
                    <v-select
                      class="selectdate"
                      outlined
                      v-model="ele.electoral_process"
                      placeholder="निर्वाचन पद्धति"
                      :items="electoral_processes"
                      :rules="[nameRules.required]"
                    >
                    </v-select>
                  </v-col>
                  <v-col md="2" v-if="ele.electoral_process == 'चुनाब'">
                    <label for>मत गणना</label>
                    <v-text-field
                      v-model="ele.voteCount"
                      :rules="numberRule"
                      required
                      number
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col md="2">
                    <label for>निर्वाचन पद्धति</label>
                    <v-select
                      class="selectdate"
                      outlined
                      v-model="ele.electoral_system"
                      placeholder="निर्वाचन पद्धति"
                      :items="userTypes"
                      :rules="[nameRules.required]"
                    >
                    </v-select>
                  </v-col>

                  <v-col md="2">
                    <label for>समावेशी समूह</label>
                    <v-select
                      class="selectdate"
                      outlined
                      v-model="ele.inclusivegroup"
                      placeholder="Cluster"
                      :items="inclusivegroups"
                      :rules="[nameRules.required]"
                    >
                    </v-select>
                  </v-col>
                  <v-col md="2">
                    <label for>लिङ्ग</label>
                    <v-select
                      class="selectdate"
                      outlined
                      v-model="ele.gender"
                      placeholder="Gender"
                      :items="genders"
                      :rules="[nameRules.required]"
                      @change="setTitle(title)"
                    >
                    </v-select>
                  </v-col>
                  <v-col md="2">
                    <label for>कैफियत</label>
                    <v-text-field
                      v-model="ele.remark"
                      :label="changeToNepali(ele.remark)"
                      required
                      outlined
                      class="specific"
                      @keydown="changeToNepali"
                    ></v-text-field>
                  </v-col>

                  <v-col md="1" class="disFlex">
                    <v-btn
                      class="btn-primary danger"
                      v-if="index1 != 0"
                      @click="removeUser(index1)"
                    >
                      Remove
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn
                      class="btn-primary"
                      @click="createGeneral"
                      v-if="!loading && $route.params.id == undefined"
                      >Save</v-btn
                    >
                    <v-btn
                      class="btn-primary"
                      @click="createGeneral"
                      v-if="!loading && $route.params.id != undefined"
                      >Update</v-btn
                    >

                    <v-btn class="btn-primary" v-if="loading">
                      <v-progress-circular indeterminate></v-progress-circular>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { secureStorage } from "../../../main";
import preeti from "preeti";
export default {
  name: "AddFormInfo",
  data: () => ({
    province: "",
    district: "",
    municipality: "",
    houseofrepresentative: "",
    representatives: [],
    municipalities: [],
    regions: [],
    ward: "",
    file: undefined,
    fileFule: [(v) => !!v || "File is required"],
    valid: true,
    post: "सभापति",
    loading: false,
    loadingMain: false,
    designationsAll: ["सभापति", "उपसभापति", "सचिव", "सहसचिव", "सदस्य"],
    designationW: [
      "सभापति",
      "उपसभापति",
      "सचिव",
      "सहसचिव",
      "सदस्य",
      "क्षेत्रीय प्रतिनिधि",
    ],
    designationWardsH: [
      "सभापति",
      "उपसभापति",
      "सचिव",
      "सहसचिव",
      "सदस्य",
      "प्रदेश महाधिबेसन प्रतिनिधि",
    ],
    electoral_processes: ["सर्वसम्मत", "चुनाब"],

    selectedPost: [],
    designation: "",
    voteForm: [
      {
        name: "",
        phone: "",
        voteCount: "",
        electoral_process: "सर्वसम्मत",
        electoral_system: "",
        gender: "",
        inclusivegroup: "",
        remark: "",
        title: "",
        houseofrepresentative: "",
        pradeshassemblyconstituency: "",
        ward: "",
        municipality: "",
        district: "",
        province: "",
      },
    ],

    pradeshassemblyconstituency: "",

    logged: false,
    title: "वार्ड",
    selectionTitles: [
      "वार्ड",
      "पालिका",
      "प्रदेश सभा क्षेत्र",
      "प्रतिनिधि सभा क्षेत्र",
      "जिल्ला",
    ],
    inclusivegroups: [
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
    inclusivegroup: "प्रत्यक्ष",
    userTypes: ["प्रत्यक्ष", "समाबेसी"],
    userType: "",
    genders: ["महिला", "पुरुष"],
    gender: "महिला",
    representativesUser: ["कार्यसमिती", "प्रतिनिधि"],
    nameRules: {
      required: (value) => !!value || "Required.",
    },
    numberRule: [
      (v) => !!v || "Vote Count is required",
      (v) => !isNaN(v) || "Please enter number",
    ],
    phoneNumberRules: [
      (v) => !!v || "Phone Number is required",
      (v) => v.length <= 10 || "Phone number should be 10 digit",
      (v) => v.length >= 10 || "Phone number should be 10 digit",
      (v) => !isNaN(v) || "Please enter number",
      (v) =>
        v.match(
          /^\(?([9-9]{1})\)?[-. ]?([1-9]{1})[-. ]?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        ) || "Please entery valid phone number",
    ],
  }),
  methods: {
    ...mapActions([
      "fetchProvinceDistrictProvince",
      "fetchProvinceDistrictMunicipality",
      "fetchProvinceDistrictSelectProvice",
      "createGeneralConvention",
      "createGeneralConventionVote",
      "fetchGeneralConvention",
      "getGeneralSingleConventionVote",
    ]),
    async setTitle(data) {
      this.title = data;
      if (data == "पालिका") {
        await this.fetchProvinceDistrictMunicipality();
        await this.fetchProvinceDistrictSelectProvice(this.logged.province);
      } else {
        await this.fetchProvinceDistrictProvince();
        await this.fetchProvinceDistrictSelectProvice(this.logged.province);
      }
      let filt = this.allDistrict.filter((ele) => {
        return ele.name == this.logged.district;
      });
      this.selectDistrict(filt[0]);
    },
    changeToNepali(e) {
      return preeti(e);
    },
    postFilter(data) {
      this.post = data;
      if (this.voteForm[0].name != "") {
        confirm("Please save before you switch");
      }
      this.voteForm = [
        {
          name: "",
          phone: "",
          voteCount: "",
          electoral_process: "सर्वसम्मत",
          electoral_system: "",
          gender: "",
          inclusivegroup: "",
          remark: "",
          title: "",
          houseofrepresentative: "",
          pradeshassemblyconstituency: "",
          ward: "",
          municipality: "",
          district: "",
          province: "",
        },
      ];
    },
    addMoreUser() {
      this.voteForm.push({
        name: "",
        phone: "",
        voteCount: "",
        electoral_system: "",
        gender: "",
        electoral_process: "सर्वसम्मत",
        inclusivegroup: "",
        remark: "",
        title: "",
        houseofrepresentative: "",
        pradeshassemblyconstituency: "",
        ward: "",
        municipality: "",
        district: "",
        province: "",
      });
    },
    removeUser(index) {
      if (confirm("Are you sure you want to remove this person")) {
        this.voteForm.splice(index, 1);
      }
    },
    selectProvince(data) {
      if (data.province != undefined) {
        this.fetchProvinceDistrictSelectProvice(data.province);
      }
    },
    selectDistrict(data) {
      if (this.title == "पालिका") {
        if (data.name != undefined) {
          this.municipalities = data.list.napa;
        }
      } else {
        if (data.name != undefined) {
          this.representatives = data.list.repno;
        }
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
    async createGeneral() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        this.voteForm.forEach((ele) => {
          ele.title = this.title;
          ele.post = this.post;
          ele.name = this.changeToNepali(ele.name);
          ele.remark = this.changeToNepali(ele.remark);
          if (this.province != "") {
            ele.province = this.province;
          }
          if (this.district != "") {
            ele.district = this.district;
          }

          if (this.houseofrepresentative != "") {
            ele.houseofrepresentative = this.houseofrepresentative.code;
          }
          if (this.pradeshassemblyconstituency != "") {
            ele.pradeshassemblyconstituency = this.pradeshassemblyconstituency.code;
          }

          if (this.municipality != "") {
            ele.municipality = this.municipality.name;
          }
          if (this.ward != "") {
            ele.ward = this.ward;
          }
        });

        // console.log(this.voteForm);
        await this.createGeneralConventionVote(this.voteForm);
        this.loading = false;
        this.voteForm = [];
      }
    },

    async fetchGen() {
      let data = {};
      data.title = this.title;
      data.province = this.province.province;
      data.district = this.district.name;
      data.municipality = this.municipality.name;
      data.ward = this.ward;

      await this.fetchGeneralConvention(data);
    },
    
  },
  computed: {
    ...mapGetters([
      "allDistrict",
      "allProvices",
      "allGenerationConvention",
      "allgeneralConventionVote",
    ]),
  },
  async created() {
    this.loadingMain = true;
    await this.fetchProvinceDistrictProvince();
    if (secureStorage.getItem("userData") == undefined) {
      this.$router.push("/login");
    } else {
      this.logged = JSON.parse(secureStorage.getItem("userData")).user;
      await this.fetchProvinceDistrictSelectProvice(this.logged.province);
      this.province = this.logged.province;
      this.district = this.logged.district;
      let filt = this.allDistrict.filter((ele) => {
        return ele.name == this.logged.district;
      });
      this.selectDistrict(filt[0]);
    }
    if (this.$route.params.id != undefined) {
      await this.getGeneralSingleConventionVote(this.$route.params.id);
      let formdata = this.allgeneralConventionVote.results;
      this.setTitle(formdata.title);
      if (this.voteForm.length > 0) {
        this.voteForm[0] = {
          name: formdata.name,
          phone: formdata.phone,
          voteCount: formdata.voteCount,
          electoral_process: formdata.electoralProcess,
          electoral_system: formdata.electoralSystem,
          gender: formdata.gender,
          inclusivegroup: formdata.inclusivegroup,
          remark: formdata.remark,
          title: formdata.title,
          houseofrepresentative: formdata.houseofrepresentative,
          pradeshassemblyconstituency: formdata.pradeshassemblyconstituency,
          ward: formdata.ward,
          municipality: formdata.municipality,
          district: formdata.district,
          province: formdata.province,
          _id: formdata._id,
        };
      }
      this.post = formdata.post;
      this.setTitle(formdata.title);
    }
    this.loadingMain = false;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.btn-primary {
  background: $secondary !important;
  color: $white;
  margin-right: 10px;
}
.danger {
  background: red !important;
}
.titleAction {
  justify-content: space-between;
}
.width100 {
  width: 100%;
}
.disFlex {
  display: flex;
  align-items: center;
}
table {
  width: 100%;
  border-collapse: collapse;

  th {
    font-size: 14px;
    text-align: left;
    padding: 10px;
  }
  td {
    font-size: 14px;
    padding: 10px;
  }
}
label {
  display: block;
  padding-bottom: 10px;
}
a.btn-primary {
  display: block;
  padding: 8px 20px;
  border-radius: 5px;
  text-decoration: none;
  margin-left: 20px;
}
</style>
