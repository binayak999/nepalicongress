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
              <v-select
                class="selectdate"
                outlined
                v-model="title"
                placeholder="Select Form"
                :items="selectionTitles"
                @change="setTitle(title)"
              >
              </v-select>
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
          <v-row class="width100">
            <v-col md="2">
              <v-select
                v-if="title != 'वार्ड' && title != 'प्रतिनिधि सभा क्षेत्र'"
                v-model="post"
                placeholder="पद"
                @change="postFilter(post)"
                :items="designationsAll"
                outlined
              >
              </v-select>
              <v-select
                v-if="title == 'वार्ड'"
                v-model="post"
                placeholder="पद"
                @input="postFilter(post)"
                :items="designationW"
                outlined
              >
              </v-select>
              <v-select
                v-if="title == 'प्रतिनिधि सभा क्षेत्र'"
                v-model="post"
                placeholder="पद"
                @change="postFilter(post)"
                :items="designationWardsH"
                outlined
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="printa">Print</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <v-btn class="btn-primary" @click="createGeneral" v-if="!loading"
                >Search</v-btn
              >

              <v-btn class="btn-primary" v-if="loading">
                <v-progress-circular indeterminate></v-progress-circular>
              </v-btn>
            </v-col>
            <v-row class="pdfbox" ref="doc">
              <v-col>
                <h4>
                  केन्द्रिय निर्वाचन समिति
                </h4>
              </v-col>
              <v-col md="12">
                <table
                  border=""
                  v-if="title == 'वार्ड' && allgeneralConventionVotes.results"
                >
                  <thead>
                    <tr>
                      <th>कार्यसमिती</th>
                      <th>पोस्ट</th>
                      <th>नाम</th>
                      <th class="dnone">फोन</th>
                      <th>प्रदेश</th>
                      <th>जिल्ला</th>
                      <th>प्रतिनिधि सभा</th>
                      <th>प्रदेश सभा</th>
                      <th>नगरपालिका</th>
                      <th>वडा</th>
                      <th>समावेशी समूह</th>
                      <th>लिङ्ग</th>
                      <th>भोट गणना</th>
                      <th>कैफियत</th>
                      <th class="dnone">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(data, index) in allgeneralConventionVotes.results"
                      :key="index"
                    >
                      <td>
                        {{ data.title }}
                      </td>
                      <td>
                        {{ data.post }}
                      </td>
                      <td>
                        {{ data.name }}
                      </td>
                      <td class="dnone">
                        {{ data.phone }}
                      </td>
                      <td>
                        {{ data.province }}
                      </td>
                      <td>
                        {{ data.district }}
                      </td>
                      <td>
                        {{ data.houseofrepresentative }}
                      </td>
                      <td>
                        {{ data.pradeshassemblyconstituency }}
                      </td>
                      <td>
                        {{ data.municipality }}
                      </td>
                      <td>
                        {{ data.ward }}
                      </td>
                      <td>
                        {{ data.inclusivegroup }}
                      </td>
                      <td>
                        {{ data.gender }}
                      </td>
                      <td>
                        {{ data.voteCount }}
                      </td>
                      <td>
                        {{ data.remark }}
                      </td>
                      <td>
                        <router-link :to="`/vote-result-entry/${data._id}`"
                          ><v-icon>mdi-pencil</v-icon>
                        </router-link>
                        <v-icon @click="deleteAction(data._id)">
                          mdi-delete
                        </v-icon>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  border=""
                  v-if="
                    title == 'प्रतिनिधि सभा क्षेत्र' &&
                      allgeneralConventionVotes.results
                  "
                >
                  <thead>
                    <tr>
                      <th>कार्यसमिती</th>
                      <th>पोस्ट</th>
                      <th>नाम</th>
                      <th class="dnone">फोन</th>
                      <th>प्रदेश</th>
                      <th>जिल्ला</th>
                      <th>प्रतिनिधि सभा</th>
                      <th>समावेशी समूह</th>
                      <th>लिङ्ग</th>
                      <th>भोट गणना</th>
                      <th>कैफियत</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(data, index) in allgeneralConventionVotes.results"
                      :key="index"
                    >
                      <td>
                        {{ data.title }}
                      </td>
                      <td>
                        {{ data.post }}
                      </td>
                      <td>
                        {{ data.name }}
                      </td>
                      <td class="dnone">
                        {{ data.phone }}
                      </td>
                      <td>
                        {{ data.province }}
                      </td>
                      <td>
                        {{ data.district }}
                      </td>
                      <td>
                        {{ data.houseofrepresentative }}
                      </td>

                      <td>
                        {{ data.inclusivegroup }}
                      </td>
                      <td>
                        {{ data.gender }}
                      </td>
                      <td>
                        {{ data.voteCount }}
                      </td>
                      <td>
                        {{ data.remark }}
                      </td>
                      <td>
                        <router-link :to="`/vote-result-entry/${data._id}`"
                          ><v-icon>mdi-pencil</v-icon>
                        </router-link>
                        <v-icon @click="deleteAction(data._id)">
                          mdi-delete
                        </v-icon>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  border=""
                  v-if="title == 'पालिका' && allgeneralConventionVotes.results"
                >
                  <thead>
                    <tr>
                      <th>कार्यसमिती</th>
                      <th>पोस्ट</th>
                      <th>नाम</th>
                      <th class="dnone">फोन</th>
                      <th>प्रदेश</th>
                      <th>जिल्ला</th>
                      <th>पालिका</th>
                      <th>समावेशी समूह</th>
                      <th>लिङ्ग</th>
                      <th>भोट गणना</th>
                      <th>कैफियत</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(data, index) in allgeneralConventionVotes.results"
                      :key="index"
                    >
                      <td>
                        {{ data.title }}
                      </td>
                      <td>
                        {{ data.post }}
                      </td>
                      <td>
                        {{ data.name }}
                      </td>
                      <td class="dnone">
                        {{ data.phone }}
                      </td>
                      <td>
                        {{ data.province }}
                      </td>
                      <td>
                        {{ data.district }}
                      </td>
                      <td>
                        {{ data.municipality }}
                      </td>

                      <td>
                        {{ data.inclusivegroup }}
                      </td>
                      <td>
                        {{ data.gender }}
                      </td>
                      <td>
                        {{ data.voteCount }}
                      </td>
                      <td>
                        {{ data.remark }}
                      </td>
                      <td>
                        <router-link :to="`/vote-result-entry/${data._id}`"
                          ><v-icon>mdi-pencil</v-icon>
                        </router-link>
                        <v-icon @click="deleteAction(data._id)">
                          mdi-delete
                        </v-icon>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table border="" v-if="title == 'प्रदेश सभा क्षेत्र'">
                  <thead>
                    <tr>
                      <th>कार्यसमिती</th>
                      <th>पोस्ट</th>
                      <th>नाम</th>
                      <th class="dnone">फोन</th>
                      <th>प्रदेश</th>
                      <th>जिल्ला</th>
                      <th>प्रदेश सभा</th>
                      <th>पालिका</th>
                      <th>समावेशी समूह</th>
                      <th>लिङ्ग</th>
                      <th>भोट गणना</th>
                      <th>कैफियत</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(data, index) in allgeneralConventionVotes.results"
                      :key="index"
                    >
                      <td>
                        {{ data.title }}
                      </td>
                      <td>
                        {{ data.post }}
                      </td>
                      <td>
                        {{ data.name }}
                      </td>
                      <td class="dnone">
                        {{ data.phone }}
                      </td>
                      <td>
                        {{ data.province }}
                      </td>
                      <td>
                        {{ data.district }}
                      </td>
                      <td>
                        {{ data.pradeshassemblyconstituency }}
                      </td>

                      <td>
                        {{ data.inclusivegroup }}
                      </td>
                      <td>
                        {{ data.gender }}
                      </td>
                      <td>
                        {{ data.voteCount }}
                      </td>
                      <td>
                        <router-link :to="`/vote-result-entry/${data._id}`"
                          ><v-icon>mdi-pencil</v-icon>
                        </router-link>
                        <v-icon @click="deleteAction(data._id)">
                          mdi-delete
                        </v-icon>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table border="" v-if="title == 'जिल्ला'">
                  <thead>
                    <tr>
                      <th>नाम</th>
                      <th class="dnone">फोन</th>
                      <th>कार्यसमिती</th>
                      <th>पोस्ट</th>
                      <th>प्रदेश</th>
                      <th>प्रदेश सभा</th>
                      <th>पालिका</th>
                      <th>समावेशी समूह</th>
                      <th>लिङ्ग</th>
                      <th>मत गणना</th>
                      <th>कैफियत</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(data, index) in allgeneralConventionVotes.results"
                      :key="index"
                    >
                      <td>
                        {{ data.name }}
                      </td>
                      <td class="dnone">
                        {{ data.phone }}
                      </td>
                      <td>
                        {{ data.title }}
                      </td>
                      <td>
                        {{ data.post }}
                      </td>
                      <td>
                        {{ data.province }}
                      </td>
                      <td>
                        {{ data.district }}
                      </td>
                      <td>
                        {{ data.pradeshassemblyconstituency }}
                      </td>

                      <td>
                        {{ data.inclusivegroup }}
                      </td>
                      <td>
                        {{ data.gender }}
                      </td>
                      <td>
                        {{ data.voteCount }}
                      </td>
                      <td>
                        {{ data.voteCount }}
                      </td>
                      <td>
                        <router-link :to="`/vote-result-entry/${data._id}`"
                          ><v-icon>mdi-pencil</v-icon>
                        </router-link>
                        <v-icon @click="deleteAction(data._id)">
                          mdi-delete
                        </v-icon>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </v-col>
            </v-row>
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
import Printd from "printd";
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

    selectedPost: [],
    designation: "",

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
    ],

    cssText: `
    thead { border: 1px solid black; padding: 10px; color: #000; }

tbody { border: 1px solid black; padding: 10px; color: #000; }
 .report-container {
    page-break-after: auto;
  }
  thead.report-header-top {

        border-color:#fff;

  }
  .trborder{
    border:1px solid #000;
  }
  tfoot.report-footer {

    border-color:#fff;

  }
  table{
    border:none!important;
  }
  tbody {

  }
  #spacer {
    margin-bottom: 150px;
  }
  #footer {
    border: none;
  }
    .widthSN{
      width:50px;
    }
    .width30{
      width:60px;
    }
    .widthName{
      width:100px;
    }
    .centertext{
  display: flex;
  justify-content: center;
  width: 100%;
  font-size:15px;
  font-weight:600;
  margin-top:-15px;
  margin-bottom:15px;
}
h4{
  text-align:center;
}
    .width20{
      width:10px;
    }
    img{
      width:120px;
      object-fit:contain;
    }
    .no-header{
        display:none;
    }
    .no-print{
      display:none;
    }
    .pdfbox {
	 left: 100px;
	 right: 100px;
	 background: white;
	 z-index: 9999;

}
 .pdfbox table {
	 width: 100%;
	 border-collapse: collapse;
}
.imgsig{
  margin-top:-20px;
}
.flexlist{
  display:flex;
  flex-flow:column;
  justify-content:center;
  align-items:center;
  font-size:9px;
  font-weight:600;
  list-style:none;
  margin:0;
  padding:0;
}
 .pdfbox table th {
	 font-size: 10px;
	 text-align: left;
  padding:3px 2px;
}
 .pdfbox table td {
	 font-size:10px;
  padding:2.5px 2px;
}
.signatureBox{
  display:flex;
  align-items:center;
  justify-content:center;
  flex-flow:column;
  margin:0;
  padding:0;
}
.signatureBox img{
  margin-bottom:-20px;
}
 .pdfbox .imageheader {
	 background: white;
	 list-style: none;
	 padding-left: 0;
	 display: flex;
	 justify-content: space-between;
	 padding: 10px 30px;
}

 .pdfbox .imageheader.top{
	 justify-content: center;
	 padding: 0;
   margin-top:130px;
}
 .pdfbox .imageheader img {
	 height: 90px;
}
 .pdfbox .imageheader h1 {
	 font-size: 30px;
	 text-align: center;
}
 .pdfbox .imageheader h2 {
	 font-size: 20px;
	 text-align: center;
}
.fromdata{
  list-style:none;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
}
 .fromdata li{
font-size:12px;
padding:0 5px;
}
 .dnone{
   display:none;
 }
    `,
  }),
  methods: {
    ...mapActions([
      "fetchProvinceDistrictProvince",
      "fetchProvinceDistrictMunicipality",
      "fetchProvinceDistrictSelectProvice",
      "createGeneralConvention",
      "createGeneralConventionVote",
      "fetchGeneralConvention",
      "generateVoteList",
      "deleteGeneralData"
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
    },
    printa() {
      this.d.print(this.$refs.doc, [this.cssText]);
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
    async deleteAction(id) {
      console.log(id)
      if (confirm("साच्चै हो ?")) {
        await this.deleteGeneralData(id);
        this.createGeneral();
      }
    },
    async createGeneral() {
      this.loading = true;

      let data = {};

      data.title = this.title;
      data.post = this.post;
      if (this.province != "") {
        data.province = this.province;
      }
      if (this.district != "") {
        data.district = this.district;
      }

      if (this.houseofrepresentative != "") {
        data.houseofrepresentative = this.houseofrepresentative.code;
      }
      if (this.pradeshassemblyconstituency != "") {
        data.pradeshassemblyconstituency = this.pradeshassemblyconstituency.code;
      }

      if (this.municipality != "") {
        data.municipality = this.municipality.name;
      }
      if (this.ward != "") {
        data.ward = this.ward;
      }
      await this.generateVoteList(data);
      this.loading = false;
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
      "allgeneralConventionVotes",
    ]),
  },
  async created() {
    this.loadingMain = true;
    this.Printd = window.printd;
    this.d = new Printd();
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
  margin-left: 10px;
}
.v-icon {
  margin: 10px 10px 0;
}
a {
  text-decoration: none;
  top: -5px;
  position: relative;
  display: inline-block;
}
</style>
