<template>
  <section>
    <v-container>
      <v-row v-if="false">
        <Customlogin />
      </v-row>
      <v-row>
        <v-col md="12" class="pl-5 text-right" v-if="false">
          <CustomButton @clickAction="logout" text="Logout" />
        </v-col>
        <v-col md="12">
          <div v-if="logged != undefined">
            <v-row>
              <v-col cols="12">
                <h1>{{ committeeMemberType }} कार्यसमिती</h1>
              </v-col>
              <v-col>
                <v-selection
                  class="selectdate"
                  v-model="committeeMemberType"
                  placeholder="Select Form"
                  :options="selectionTitles"
                  label="Select Form"
                  :filterable="true"
                  :disabled="loggedData != undefined"
                ></v-selection>
              </v-col>
            </v-row>
            <ProvinceFilterWithTole
              @sendGeoData="getGeoData"
              :committeeType="committeeMemberType"
              :disabled="loggedData != undefined"
              :loadSelect="loggedData"
            />
          </div>

          <v-row>
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
                  <div class="width100">
                    <v-row>
                      <v-col md="12" v-if="$route.params.id == undefined">
                        <div class="row titleAction">
                          <h2 for>पद: {{ ele.name }}</h2>
                          <v-btn
                            v-if="ele.name == 'सदस्य'"
                            @click="addMoreUser(ele.name)"
                          >
                            Add More
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row v-for="(data, i) in ele.member" :key="i + 'member'">
                      <v-col md="2">
                        <label for>नाम</label>
                        <v-text-field
                          v-model="data.name"
                          :label="changeToNepali(data.name)"
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
                          v-model="data.phone"
                          required
                          outlined
                          :rules="phoneNumberRules"
                        ></v-text-field>
                      </v-col>

                      <v-col md="2">
                        <label for>समावेशी समूह</label>
                        <v-selection
                          class="selectdate"
                          v-model="data.inclusivegroup"
                          placeholder="Cluster"
                          :options="inclusivegroups"
                          label="पद"
                          :filterable="true"
                        ></v-selection>
                      </v-col>
                      <v-col md="2">
                        <label for>लिङ्ग</label>
                        <v-selection
                          class="selectdate"
                          v-model="data.gender"
                          placeholder="Gender"
                          :options="genders"
                          :filterable="true"
                        ></v-selection>
                      </v-col>
                      <v-col md="2">
                        <label for>कैफियत</label>
                        <v-text-field
                          v-model="data.remark"
                          :label="changeToNepali(data.remark)"
                          required
                          outlined
                          class="specific"
                          @keydown="changeToNepali"
                        ></v-text-field>
                      </v-col>

                      <v-col md="1" class="disFlex" v-if="ele.name == 'सदस्य'">
                        <v-btn
                          class="btn-primary danger"
                          v-if="i != 0"
                          @click="() => removeUser(i)"
                        >
                          Remove
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
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
import ProvinceFilterWithTole from "@/dashboard/components/ProvinceFilterWithTole";
import preeti from "preeti";
import Customlogin from "../../components/customlogin/customlogin.vue";
import CustomButton from "../../components/CustomButton.vue";
export default {
  name: "CommitteeMembersEntry",
  components: {
    ProvinceFilterWithTole,
    Customlogin,
    CustomButton,
  },
  data: () => ({
    province: "",
    district: "",
    houseofrepresentative: "",
    pradeshassemblyconstituency: "",
    municipality: "",
    ward: "",
    tole: "",
    valid: true,
    post: "सभापति",
    loading: false,
    loadingMain: true,
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
    selectedPost: [],
    designation: "",
    voteForm: [
      {
        name: "सभापति",
        member: [
          {
            name: "",
            phone: "",
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
            memberPost: "सभापति",
          },
        ],
      },
      {
        name: "उपसभापति",
        member: [
          {
            name: "",
            phone: "",
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
            memberPost: "उपसभापति",
          },
          {
            name: "",
            phone: "",
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
            memberPost: "उपसभापति",
          },
        ],
      },
      {
        name: "सचिव",
        member: [
          {
            name: "",
            phone: "",
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
            memberPost: "सचिव",
          },
          {
            name: "",
            phone: "",
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
            memberPost: "सचिव",
          },
        ],
      },
      {
        name: "सहसचिव",
        member: [
          {
            name: "",
            phone: "",
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
            memberPost: "सहसचिव",
          },
          {
            name: "",
            phone: "",
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
            memberPost: "सहसचिव",
          },
        ],
      },
      {
        name: "कोषाध्यक्ष",
        member: [
          {
            name: "",
            phone: "",
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
            memberPost: "कोषाध्यक्ष",
          },
        ],
      },

      {
        name: "सदस्य",
        member: [
          {
            name: "",
            phone: "",
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
            memberPost: "सदस्य",
          },
        ],
      },
    ],
    logged: false,
    title: "टोल",
    selectionTitles: [
      "टोल",
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
    loggedData: {},
  }),
  methods: {
    ...mapActions(["createGeneralConvention"]),

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
    addMoreUser(data) {
      if (data == "सदस्य") {
        this.voteForm[this.voteForm.length - 1].member.push({
          name: "",
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
          memberPost: "सदस्य",
        });
      }
    },
    removeUser(index) {
      this.voteForm.filter((ele) => {
        if (ele.name == "सदस्य") {
          ele.member.splice(index, 1);
        }
      });
    },

    logout() {
      secureStorage.removeItem("committeeMember");
      this.logged = false;
      let info = {
        icon: "success",
        status: true,
        title: `Logout Successfully`,
        message: "From Committee Member Entry",
      };
      this.$store.dispatch("alertNow", info);
    },

    getGeoData(response) {
      this.province = response.province;
      this.district = response.district;
      this.houseofrepresentative = response.houseofrepresentative;
      this.pradeshassemblyconstituency = response.pradeshassemblyconstituency;
      this.municipality = response.municipality;
      this.ward = response.ward;
      this.tole = response.tole;
    },
    async createGeneral() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.voteForm.forEach((ele) => {
          ele.member.forEach((data) => {
            data.name = this.changeToNepali(data.name);
            data.remark = this.changeToNepali(data.remark);
            data.province = this.province;
            data.district = this.district;
            data.houseofrepresentative = this.houseofrepresentative;
            data.pradeshassemblyconstituency = this.pradeshassemblyconstituency;
            data.municipality = this.municipality;
            data.ward = this.ward;
            data.tole = this.changeToNepali(this.tole);
          });
          ele.title = this.title;
          ele.post = this.post;
        });

        console.log(this.voteForm);
        // await this.createGeneralConventionVote(this.voteForm);
        this.loading = false;
        // this.voteForm = [];
      }
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
    if (secureStorage.getItem("committeeMember") != undefined) {
      this.logged = true;
      this.loggedData = JSON.parse(
        secureStorage.getItem("committeeMember")
      ).user;
      this.committeeMemberType = this.loggedData.committeeMemberType;
      this.province = this.loggedData.province;
      this.district = this.loggedData.district;
      if (this.loggedData.houseofrepresentative != undefined) {
        this.houseofrepresentative = this.loggedData.houseofrepresentative;
      }
      if (this.loggedData.pradeshassemblyconstituency != undefined) {
        this.pradeshassemblyconstituency =
          this.loggedData.pradeshassemblyconstituency;
      }
      if (this.loggedData.municipality != undefined) {
        this.municipality = this.loggedData.municipality;
      }
      if (this.loggedData.ward != undefined) {
        this.ward = this.loggedData.ward;
      }
      if (this.loggedData.tole != undefined) {
        this.tole = this.loggedData.tole;
      }
    } else {
      this.logged = false;
    }
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
  color: #000;
}
a.btn-primary {
  display: block;
  padding: 8px 20px;
  border-radius: 5px;
  text-decoration: none;
  margin-left: 20px;
}
</style>
