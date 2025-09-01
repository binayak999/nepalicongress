<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row class="d-inline-flex justify-end">
        <download-csv :data="json_data" name="filename.csv" v-if="false">
          <v-btn class="btn btn-default" @click="downloadAct"
            >Download CSV</v-btn
          >
        </download-csv>
        <v-btn
          class="btn btn-default"
          v-if="
            layout == 'table' &&
            (logged == 'admin' || logged == 'activecontrol')
          "
          @click="printa"
          >{{ exportPDF }}</v-btn
        >
        <v-btn
          class="btn btn-default"
          v-if="
            layout == 'chart' &&
            (logged == 'admin' || logged == 'activecontrol')
          "
          @click="exportToPDF"
          >{{ exportPDF }}</v-btn
        >
        <v-checkbox v-model="isSign" label="Need Signature ?"> </v-checkbox>
      </v-row>
      
    </v-container>
    <div class="pillmain" v-if="showcolortable">
      <div class="pillbox">
        <table border="1" class="table table-responsive pdfbox">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Subdomain</th>
              <th>Total Count</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(colordata, index) in allColorData.results"
              :key="index"
              :class="{ redbox: colordata.totalActiveMember == 0 }"
              class="greenbox"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ colordata.name }}</td>
              <td>{{ colordata.totalActiveMember }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="insidepadding" v-if="viewSubdomain">
      <div class="pillmain">
        <div class="pillbox">
          <ul class="distbtn">
            <li @click="showAllDataSubdomainCount" class="loaddata">
              <label for>प्रदेश</label>
              <v-selection
                v-model="province"
                placeholder="Province"
                :options="allProvices"
                label="province"
                :filterable="true"
                :value="selectProvinceInTotal(province)"
              ></v-selection>
              <v-btn @click="loaddata" class="btn btn-default">Load</v-btn>
            </li>
          </ul>
          <ul class="distbtn">
            <li
              @click="showAllDataSubdomainCount"
              v-bind:class="{ activebtn: allsubdomain }"
            >
              All
            </li>
            <li
              @click="showAllDataSubdomainCount"
              v-bind:class="{ activebtn: !allsubdomain }"
            >
              District Only
            </li>
          </ul>
          <div v-if="loadingspecificall">
            <table
              class="table table-responsive pdfbox"
              border="1"
              v-if="!showSomeTime"
              ref="doc1"
            >
              <thead>
                <tr>
                  <th v-for="(heading, index) in headersreport" :key="index">
                    {{ heading.text }}
                  </th>
                </tr>
              </thead>
              <tbody v-if="allsubdomain">
                <tr v-for="(body, index) in this.allReport.posts" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ body.place }}</td>
                  <td>{{ body.count }}</td>
                </tr>
              </tbody>
              <tbody v-if="!allsubdomain">
                <tr
                  v-for="(body, index) in this.allReport.district"
                  :key="index"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ body.place }}</td>
                  <td>{{ body.count }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pillmain centerload" v-if="!loadingspecificall">
            <img
              :src="require(`@/assets/images/icons/la.svg`)"
              alt
              class="loading"
              width="50px"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="insidepadding">
      <v-row>
      
        <v-col md="12">View entered data upto Serial No.</v-col>
        <v-col md="2">
          <v-selection
            v-model="limit"
            placeholder="Limit"
            :options="limits"
            label="code"
          ></v-selection>
        </v-col>
        <v-col md="2">
          <span v-if="allloadingActive">
            <img
              :src="require(`@/assets/images/icons/la.svg`)"
              alt
              class="loading"
              width="50px"
            />
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="4">
          <v-selection
            v-model="subdomainCategory"
            placeholder="Select Subdomain Category"
            :options="['जिल्ला कार्यसमितिहरु', 'नेपाली जनसम्पर्क समितिहरु']"
            :filterable="true"
          ></v-selection>
        </v-col>
      </v-row>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        v-if="subdomainCategory == 'नेपाली जनसम्पर्क समितिहरु'"
      >
        <v-row>
          <v-col md="4">
            <v-selection
              v-model="district"
              placeholder="Select Country"
              :options="counties"
              :filterable="true"
            ></v-selection>
          </v-col>
          <v-col md="4">
            <v-btn @click="filterActive">Filter</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        v-if="subdomainCategory == 'जिल्ला कार्यसमितिहरु'"
      >
        <v-row>
          <v-col md="2">
            <label for>प्रदेश</label>

            <v-selection
              v-model="province"
              placeholder="Province"
              :options="allProvices"
              label="province"
              :filterable="true"
              @input="selectProvince(province)"
            ></v-selection>
          </v-col>
          <v-col md="2">
            <label for>जिल्ला</label>
            <v-selection
              v-model="district"
              placeholder="जिल्ला"
              :options="allDistrict"
              label="name"
              :filterable="true"
              :value="selectDistrict(district)"
            ></v-selection>
          </v-col>
          <v-col md="2" v-if="district != ''">
            <label for>प्रतिनिधिसभा नि.क्षे.नं.</label>
            <v-selection
              v-model="houseofrepresentative"
              placeholder="प्रतिनिधिसभा नि.क्षे.नं."
              :options="representatives"
              label="code"
              :filterable="true"
              :value="regionFunc(houseofrepresentative)"
            ></v-selection>
          </v-col>
          <v-col md="2" v-if="houseofrepresentative != ''">
            <label for>प्रदेश सभा क्षेत्र</label>

            <v-selection
              v-model="pradeshassemblyconstituency"
              placeholder="प्रदेश सभा क्षेत्र"
              :options="regions"
              label="code"
              :filterable="true"
              :value="municipalityFunc(pradeshassemblyconstituency)"
            ></v-selection>
          </v-col>
          <v-col md="2" v-if="pradeshassemblyconstituency != ''">
            <label for>न.पा./गा.पा.</label>
            <v-selection
              v-model="municipality"
              placeholder="न.पा./गा.पा."
              :options="municipalities"
              label="name"
              :filterable="true"
              :value="wardFunc(municipality)"
            ></v-selection>
          </v-col>
          <v-col md="2" v-if="municipality != ''">
            <label for>वडा नं.</label>
            <v-selection
              v-model="wardno"
              placeholder="वडा नं."
              :options="wards"
              :filterable="true"
            ></v-selection>
          </v-col>
          <v-col md="2" v-if="district != ''">
            <label for>लिङ्ग</label>
            <v-selection v-model="gender" :options="genders"></v-selection>
          </v-col>
          <v-col md="2" v-if="district != ''">
            <label for>समावेशी समूह</label>
            <v-selection
              v-model="inclusivegroup"
              placeholder="समावेशी समूह"
              :options="inclusivegroups"
            ></v-selection>
          </v-col>

          <v-col md="2" v-if="district != ''">
            <label for>Member Type</label>
            <v-selection
              v-model="memberType"
              placeholder="Member Type"
              :options="groupofs"
            ></v-selection>
          </v-col>
          <v-col cols="12" class="btn-filter">
            <v-btn @click="filterActive">Filter</v-btn>
          </v-col>
        </v-row>
      </v-form>

      <ul
        class="switchLayout mr-btm"
        v-if="allFilterData.pagination != undefined"
      >
        <li @click="prevPage" v-if="allFilterData.pagination.previous">
          Previous
          <span> {{ allFilterData.pagination.previous + 1 }}</span>
        </li>
        <li>
          {{ (allFilterData.pagination.total / limit).toFixed(0) }}
          <strong>pages</strong> - {{ allFilterData.pagination.total }}
          <strong>Data</strong>
        </li>
        <li @click="nextPage" v-if="allFilterData.pagination.next">
          Next <span> {{ allFilterData.pagination.next }}</span>
        </li>
      </ul>
      <div v-if="loading" class="mr-btm">
        <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
        <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
        <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
      </div>

      <template v-if="allFilterData.posts != undefined && !loading">
        <div v-if="layout == 'table'">
          <div class="pdfbox">
            <ul class="imageheader top">
              <li class="no-header">
                <img :src="require(`@/assets/images/flag.jpg`)" alt />
              </li>
              <li>
                <h1 class="no-header">नेपाली कांग्रेसको</h1>
                <h2 class="no-header">क्रियाशिल सदस्यताको विवरण</h2>
                <v-row>
                  <div class="centertext">
                    <span v-if="memberType != 'Old'">नयाँ </span>
                    <span v-if="memberType != 'New'">नवीकरण </span>
                  </div>
                </v-row>
                <ul class="fromdata">
                  <li v-if="district.name != undefined">
                    <strong>प्रदेश</strong>
                    : <span>{{ selectP[0].label }} </span>
                  </li>
                  <li v-if="district.name != undefined" class="no-print">
                    <strong>प्रकार</strong>
                    : <span v-if="memberType != 'Old'">नयाँ </span>
                    <span v-if="memberType != 'New'">नवीकरण </span>
                  </li>
                  <li v-if="district.name != undefined">
                    <strong>जिल्ला</strong>
                    : {{ district.name }}
                  </li>
                  <li v-if="houseofrepresentative.code != undefined">
                    <strong>प्रतिनिधिसभा नि.क्षे.नं.</strong>
                    : {{ houseofrepresentative.code }}
                  </li>
                  <li v-if="pradeshassemblyconstituency.code != undefined">
                    <strong>प्रदेश सभा क्षेत्र</strong>
                    :{{ pradeshassemblyconstituency.code }}
                  </li>
                  <li v-if="municipality.name != undefined">
                    <strong>न.पा./गा.पा.</strong>
                    : {{ municipality.name }}
                  </li>
                  <li v-if="wardno != undefined">
                    <strong>वडा नं.</strong>
                    : {{ wardno }}
                  </li>
                  <li v-if="inclusivegroup != undefined">
                    <strong>समावेशी समूह</strong>
                    : {{ inclusivegroup }}
                  </li>
                  <li v-if="gender != undefined">
                    <strong>लिङ्ग</strong>
                    : {{ gender }}
                  </li>
                </ul>
              </li>
              <li class="no-header">
                <img :src="require(`@/assets/images/tree.png`)" alt />
              </li>
            </ul>
          </div>

          <section class="pdfbox" ref="doc">
            <div
              class="relBoxCard"
              v-for="(body, index) in allFilterData.posts"
              :key="index"
            >
              <img :src="require(`@/assets/images/cardfinal.jpeg`)" alt />
              <div class="absBox memberQRAbs">
                <span v-html="body.qr"></span>
              </div>
              <div class="absBox workingformnumberAbs">
                <span>{{ body.workingformnumber }}</span>
              </div>
              <div class="absBox memberNameAbs">
                <span>{{ body.membername }}</span>
              </div>
              <div class="absBox memberAgeAbs">
                <!-- <span>{{ getNepaliDate(body.age) }}</span> -->
              </div>
              <div class="absBox mobileNumber">
                <!-- <span>{{ body.phone }}</span> -->
              </div>
              <div class="absBox memberNationalIdAbs">
                <!-- <span>National</span> -->
              </div>

              <div class="absBox memberWardAbs">
                <span>{{ body.wardno }}</span>
              </div>
              <div class="absBox memberMuniAbs">
                <span>{{ body.municipality }}</span>
              </div>
              <div class="absBox memberPradeshAbs">
                <span>{{ body.pradeshassemblyconstituency }}</span>
              </div>
              <div class="absBox memberHouseAbs">
                <span>{{ body.houseofrepresentative }}</span>
              </div>
              <div class="absBox memberDistrictAbs">
                <span>{{ body.district.split("-")[0] }}</span>
              </div>
              <div class="absBox memberRegionAbs">
                <span>{{ changeProvince(body.region) }}</span>
              </div>

              <div class="absBox sign1">
                <img :src="allFilterData.signatures.signature1" alt />
              </div>
              <div class="absBox sign2">
                <img :src="allFilterData.signatures.signature2" alt />
              </div>
              <div class="absBox sign3">
                <img :src="allFilterData.signatures.signature3" alt />
              </div>
            </div>
          </section>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import html2pdf from "html2pdf.js";
import Printd from "printd";
import { secureStorage } from "../../../main";
import NepaliDate from "nepali-date-converter";
// import { parseISO } from "date-fns";

export default {
  name: "CircularSubdomainCard",
  components: {
    TitleBreadCrumb,
    // VueHtml2pdf
  },
  data: () => ({
    municipality: "",
    viewSubdomain: false,
    showCount: "Show",
    wardno: undefined,
    regions: [],
    wards: [],
    layout: "table",
    municipalities: [],
    provicedata: [],
    title: "Active Member Card",

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
    proviceslist: [
      {
        name: "1",
        label: "1",
      },
      {
        name: "2",
        label: "2",
      },
      {
        name: "3",
        label: "बागमति",
      },
      {
        name: "4",
        label: "गण्डकी",
      },
      {
        name: "5",
        label: "लुम्बिनी",
      },
      {
        name: "6",
        label: "कर्णाली",
      },
      {
        name: "7",
        label: "सुदुरपश्चिम",
      },
    ],
    counties: [
      "अष्ट्रेलिया",
      " बहराइन",
      "बेल्जियम ",
      "क्यानडा",
      "चीन",
      "साइप्रस",
      "डेनमार्क",
      "फिनल्याण्ड",
      "फ्रान्स",
      "जर्मनी",
      " हङकङ",
      "भारत",
      "आयरल्यान्ड",
      "इजरायल",
      "इटाली",
      "जापान",
      "कुवेत",
      "लक्जमबर्ग",
      " मकाउ",
      "मलेशिया",
      "नेदरल्याण्ड्स",
      "न्यूजिल्याण्ड",
      "नर्वे",
      "ओमान",
      "पोल्याण्ड",
      "पोर्चुगल",
      "कतार",
      "दक्षिण कोरिया",
      "स्पेन",
      "साउदी अरेबिया",
      "स्वीडेन",
      "स्वीट्जरल्याण्ड",
      "युएई",
      "बेलायत",
      "अमेरिका",
      "माल्टा",
    ],
    logged: undefined,
    groupof: "",
    groupofs: ["New", "Old"],
    loading: false,
    subdomainCategory: undefined,
    headings: [
      {
        name: "क्र.स.",
        printStatus: true,
      },
      {
        name: "क्रियाशील नं.",
        printStatus: true,
      },
      {
        name: "सदस्यको नाम .",
        printStatus: true,
      },
      {
        name: "वावु / आमाको नाम",
        printStatus: true,
      },
      {
        name: "पति / पत्निको नाम",
        printStatus: true,
      },
      {
        name: "लिङ्ग",
        printStatus: true,
      },
      {
        name: "उमेर",
        printStatus: true,
      },
      {
        name: "समावेशी समूह",
        printStatus: true,
      },
      {
        name: "पेशा",
        printStatus: false,
      },
      {
        name: "कैफियत",
        printStatus: true,
      },
      {
        name: "कार्यहरू",
        printStatus: false,
      },
    ],
    genders: ["महिला", "पुरुष", "अन्य"],
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Active Member Subdomain Report",
      },
    ],
    showcolortable: false,
    allsubdomain: true,
    district: "",
    province: 1,
    search: "",
    dialog: false,
    provinceno: 1,
    valid: false,
    deleteSelection: [],

    headersreport: [
      { text: "S.N.", value: "sn" },
      {
        text: "Subdomain",
        align: "start",
        sortable: false,
        value: "place",
      },
      {
        text: "Total Count",
        align: "start",
        sortable: false,
        value: "count",
      },
    ],
    headers: [
      { text: "S.N.", value: "__v" },
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },

      {
        text: "Member Counts",
        align: "start",
        sortable: false,
        value: "circular.length",
      },
    ],

    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      content: "",
    },
    defaultItem: {
      name: "",
      content: "",
    },
    json_data: [],
    age: "",
    profession: "",
    gender: undefined,
    region: "",

    houseofrepresentative: "",
    pradeshassemblyconstituency: "",

    inclusivegroup: undefined,
    memberType: undefined,
    limits: [10, 20, 25, 30, 40, 100, 500, 1500, 10000],
    showSomeTime: false,
    limit: 30,
    skip: 1,
    exportPDF: "Export To PDF",
    chartOptions: {},
    chartData: {},
    chartOptionsD: {},
    chartDataD: {},
    chartOptionsA: {},
    chartDataA: {},
    provincenum: 1,
    selectP: "1",
    isSign: true,
    cssText: `
    
    img{
      width:400px;
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
.relBoxCard{
    display: inline-block;
  position: relative;
  width: 400px;
 
}
.relBoxCard{
   img{
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
.workingformnumberAbs{
  top: 206px;
  left: 88px;
  font-size: 10px;
}
.memberQRAbs{
  top: 385px;
  left: 240px;
}

.absBox{
   font-weight: 600;
  color:#006837;
  position: absolute;
}
.memberNameAbs {
  font-size: 12px;
  top: 232px;
  left: 88px;
}
.memberAgeAbs {
  font-size: 12px;
  top: 260px;
  left: 120px;
}
.mobileNumber {
  font-size: 12px;
  top: 295px;
  left: 90px;
}
.memberNationalIdAbs {
  font-size: 12px;
  top: 323px;
  left: 120px;
}
.memberAddressAbs {
  font-size: 12px;
  top: 343px;
  left: 120px;
}
.memberWardAbs {
  font-size: 12px;
  top: 352px;
 left: 210px;
}

.memberMuniAbs {
  font-size: 12px;
  top: 378px;
  left: 100px;
}
.memberPradeshAbs {
  font-size: 12px;
  top: 408px;
  left: 160px;
}
.memberHouseAbs {
  font-size: 12px;
  top: 438px;
left: 160px;
}
.memberDistrictAbs {
  font-size: 12px;
  top: 465px;
  left:130px;
}
.memberRegionAbs {
  font-size: 12px;
  top: 495px;
  left:100px;
}
.sign1 {
  bottom: 38px;
  left: 30px;
  font-size: 8px;
  width: 80px;
}
.sign2 {
  bottom: 38px;
  left: 150px;
  font-size: 8px;
  width: 80px;
}
.sign3 {
  bottom: 38px;
  left: 250px;
  font-size: 8px;
  width: 80px;
}
.sign1 img,.sign2 img,.sign3 img{
  width:120px;
  height:65px;
    object-fit: contain;
    object-position: start;

}
    `,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters([
      "allDashCategories",
      "subdomainSpeicfic",
      "allloadingSubdomain",
      "allProvienceDistrict",
      "allProvices",
      "allRepresentative",
      "allFilterData",
      "allReport",
      "allloadingActive",
      "allChartData",
      "loadingReportAll",
      "allDistrict",
      "loadingspecificall",
      "allColorData",
    ]),
  },

  methods: {
    ...mapActions([
      "getColorData",
      "fetchSubDomain",
      "fetchSubDomainSpecific",
      "fetchProvinceDistrict",
      "fetchProvinceDistrictProvince",
      "getReports",
      "getReportsProvince",
      "fetchChartData",
      "deleteMultipleCirculars",
      "postDateofIssue",
    ]),
    getNepaliDate(data) {
      this.$moment.locale("ne");

      // Create a moment object for the current date
      var currentDate = this.$moment();

      // Subtract the age in years to get the birthdate
      var birthdate = currentDate.subtract(data, "years").toDate();

      // Create a NepaliDate object
      let np = new NepaliDate(birthdate);

      // Return the formatted Nepali date
      return np.format("DD/MM/YYYY", "np");
    },
    changeDate() {},
    changeProvince(data) {
      if (data == "1") {
        return (data = "कोशी");
      }
      if (data == "2") {
        return (data = "मधेश");
      }
      if (data == "3") {
        return (data = "बागमती");
      }
      if (data == "4") {
        return (data = "गण्डकी");
      }
      if (data == "5") {
        return (data = "लुम्बिनी");
      }
      if (data == "6") {
        return (data = "कर्णाली");
      }
      if (data == "7") {
        return (data = "सुदूरपश्चिम");
      }
    },
    downloadAct() {
      let filterData = {};

      if (this.province != undefined) {
        filterData.province = this.province.province;
      }
      if (this.district.name != undefined) {
        filterData.district = this.district.name;
      } else {
        filterData.district = this.district;
      }
      if (this.memberType != undefined) {
        filterData.memberType = this.memberType;
      }
      if (this.houseofrepresentative.code != undefined) {
        filterData.houseofrepresentative =
          this.houseofrepresentative.code.toString();
      }
      if (this.pradeshassemblyconstituency.code != undefined) {
        filterData.pradeshassemblyconstituency =
          this.pradeshassemblyconstituency.code.toString();
      }
      if (this.municipality.name != undefined) {
        filterData.municipality = this.municipality.name;
      }
      if (this.wardno != undefined) {
        filterData.wardno = this.wardno;
      }
      if (this.inclusivegroup != undefined) {
        filterData.district = this.district.name;
      }
      if (this.gender != undefined) {
        filterData.gender = this.gender;
      }
      if (this.limit != undefined) {
        filterData.limit = this.limit;
      }

      filterData.skip = this.skip;
      this.postDateofIssue(filterData);
    },

    unSelectDelete() {
      this.deleteSelection = [];
    },
    showAllDataSubdomainCount() {
      this.allsubdomain = !this.allsubdomain;
    },
    showSubdomainReport() {
      this.viewSubdomain = !this.viewSubdomain;
      if (!this.viewSubdomain) {
        this.showCount = "Show";
      } else {
        this.showCount = "Hide";
      }
    },
    printa() {
      this.exportPDF = "Download Now";
      this.showSomeTime = true;
      this.d.print(this.$refs.doc, [this.cssText]);
      setTimeout(() => {
        this.showSomeTime = false;
      }, 3000);
    },
    async deleteMultiple() {
      if (confirm("के तपाई यस बारे निश्चित हुनुहुन्छ?")) {
        await this.$store.dispatch("deleteMultipleCirculars", {
          activememeberid: this.deleteSelection,
        });
        alert("Deleted Successfully");
        await this.filterActive();
      } else {
        alert("Not Deleted");
      }
    },
    printb() {
      this.d.print(this.$refs.doc1, [this.cssText]);
      setTimeout(() => {
        this.showCount = "Show";
        this.viewSubdomain = false;
      }, 2000);
    },
    showColorTable() {
      this.showcolortable = !this.showcolortable;
    },
    exportToPDF() {
      html2pdf(this.$refs.document, {
        filename: "report.pdf",
        margin: 0.1,
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      });
    },
    initialize() {
      this.desserts = this.allDashCategories.desserts;
    },
    editItem(item) {
      this.$router.push(`/dashboard/updateActiveMember/${item._id}`);
    },
    async deleteItem(item) {
      if (confirm("के तपाई यस बारे निश्चित हुनुहुन्छ?")) {
        await this.$store.dispatch("deleteCirculars", item._id);
        alert("Deleted Successfully");
        await this.filterActive();
      } else {
        alert("Not Deleted");
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    selectProvinceInTotal(data) {
      if (data.province != undefined) {
        this.provincenum = data.province;
      }
    },
    loaddata() {
      this.$store.dispatch("getReportsProvince", this.provincenum);
    },
    selectProvince(data) {
      if (data.province != undefined) {
        this.$store.dispatch(
          "fetchProvinceDistrictSelectProvice",
          data.province
        );
        this.selectProvinceData(data.province);
      }
    },
    selectProvinceData(data) {
      this.selectP = this.proviceslist.filter((ele) => {
        return ele.name == data;
      });
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
          }
        });
      }
    },
    async filterActive() {
      let filterData = {};

      if (this.province != undefined) {
        filterData.province = this.province.province;
      }
      if (this.district.name != undefined) {
        filterData.district = this.district.name;
      } else {
        filterData.district = this.district;
      }
      if (this.memberType != undefined) {
        filterData.memberType = this.memberType;
      }
      if (this.houseofrepresentative.code != undefined) {
        filterData.houseofrepresentative =
          this.houseofrepresentative.code.toString();
      }
      if (this.pradeshassemblyconstituency.code != undefined) {
        filterData.pradeshassemblyconstituency =
          this.pradeshassemblyconstituency.code.toString();
      }
      if (this.municipality.name != undefined) {
        filterData.municipality = this.municipality.name;
      }
      if (this.wardno != undefined) {
        filterData.wardno = this.wardno;
      }
      if (this.inclusivegroup != undefined) {
        filterData.district = this.district.name;
      }
      if (this.gender != undefined) {
        filterData.gender = this.gender;
      }
      if (this.limit != undefined) {
        filterData.limit = this.limit;
      }

      filterData.skip = this.skip;

      this.loading = true;
      await this.$store.dispatch("filterDataCard", filterData);

      this.deleteSelection = [];
      this.loading = false;
    },

    async nextPage() {
      this.skip = this.allFilterData.pagination.next;
      await this.filterActive();
    },
    async prevPage() {
      this.skip = this.allFilterData.pagination.previous;
      await this.filterActive();
    },
  },
  created() {
    this.logged = JSON.parse(secureStorage.getItem("userData")).user.role;
    this.Printd = window.printd;
    this.d = new Printd();
    this.initialize();
    this.fetchSubDomainSpecific();
    this.fetchProvinceDistrictProvince();
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.tablechart {
  align-items: flex-start;
  justify-content: flex-start;
}
.align-center {
  justify-content: center;
}
.switchLayout {
  display: flex;
  list-style: none;
  text-transform: capitalize;
  padding-left: 0;
  li {
    padding: 10px 15px;
    font-size: 14px;
    background: $midwhite;
    color: $dark;
    cursor: pointer;
  }
  .active {
    background: $secondary;
    color: $white;
  }
}
.report-header {
  display: none;
}
.span .pillmain {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  .pillbox {
    padding: 15px;
    width: 100%;
    border: 1px solid #dedede;
    ul {
      list-style: none;
      display: flex;
      align-items: center;
      flex-flow: column;
      justify-content: center;
      padding-left: 0;
      li {
        &:first-of-type {
          font-size: 25px;
          font-weight: 500;
        }
        &:nth-of-type(2) {
          color: $secondary;
        }
      }
    }
  }
}

.fromdata {
  display: flex;
  list-style: none;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
  li {
    margin: 5px 15px;
  }
}
.btn-default {
  color: $dark !important;
  margin: 0 !important;
}
.insidepadding {
  padding: 0 20px;
}
.v-sheet {
  display: none;
}
.passportimage {
  width: 100px;
  height: 100px;
}
.v-sheet {
  display: none;
}
.imagePost {
  width: 150px;
}

.btn {
  &_primary {
    background: $btncolor;
  }
  &_secondary {
    background: $secondary;
  }

  padding: 8px 20px;
  color: $white;
  font-size: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: inline-block;
  &:focus {
    outline: none;
  }
}
.flextd {
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 16px !important;
  line-height: 40px !important;
  font-weight: 500;
}
.popupbox {
  // width:80%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    header {
      display: flex;
      justify-content: center;
      position: fixed;
      right: 18%;
      top: 12%;
      background: white;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      align-items: center;
      .fa {
        padding: 20px;
        cursor: pointer;
        font-size: 20px;
      }
    }
    padding: 40px;
    width: 60%;
    max-height: 70vh;
    background: $white;
    overflow-y: scroll;
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
        padding: 0 10px;
      }
    }
  }
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
    padding: 0 10px;
  }
}
.centertext {
  display: flex;
  justify-content: center;
  width: 100%;
}
.pdfbox {
  // position: fixed;
  left: 100px;
  right: 100px;
  background: white;
  z-index: 9999;
  padding: 30px 0;

  table {
    width: 100%;
    border-collapse: collapse;

    th {
      font-size: 14px;
      text-align: left;
      // padding: 10px;
    }
    td {
      font-size: 14px;
      // padding: 10px;
    }
  }
  .imageheader {
    background: white;
    list-style: none;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;
    img {
      height: 90px;
    }
    h1 {
      font-size: 30px;
      text-align: center;
    }
    h2 {
      font-size: 20px;
      text-align: center;
    }
    &.bottom {
      display: none;
    }
  }
}
.btn {
  background: $secondary !important;
  color: $white !important;
  margin-left: 15px;
}
.btn-filter {
  margin-bottom: 20px;
  .v-btn {
    margin-right: 15px;
  }
}
.distbtn {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 14px !important;
  flex-flow: row !important;
  margin-bottom: 20px;
  li {
    padding: 5px 10px;
    cursor: pointer;
    &:first-of-type {
      font-size: 14px !important;
    }
  }
  color: $dark !important;
  .activebtn {
    background: $secondary;
    color: $white !important;
  }
}
.loaddata {
  width: 300px;
  display: flex;
  align-items: center;
  label {
    margin-right: 10px;
  }
}
.centerload {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100px;
  }
}
.greenbox {
  background: #2c9131;
  color: #fff;
}
.redbox {
  background: red;
}
.actionbtn {
  .fa {
    display: inline-block;
    padding: 0 10px;
  }
}
.btnatc {
  .v-btn {
    float: right;
    background: red !important;
    color: white;
  }
}
.btnatc1 {
  .v-btn {
    float: right;
    background: rgb(85, 58, 58) !important;
    color: white;
  }
}
.mr-btm {
  margin-bottom: 20px;
  margin-top: 20px;
  li {
    margin-right: 10px;
  }
}
.relBoxCard {
  display: inline-block;
  position: relative;
  height: 400px;
  width: 300px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
.absBox {
  position: absolute;
  font-weight: 600;
  color: #006837;
}
.workingformnumberAbs {
  top: 129px;
  left: 55px;
  font-size: 8px;
}
.memberNameAbs {
  font-size: 8px;
  top: 150px;
  left: 60px;
}
.memberAgeAbs {
  font-size: 8px;
  top: 172px;
  left: 85px;
}
.mobileNumber {
  font-size: 8px;
  top: 195px;
  left: 65px;
}
.memberNationalIdAbs {
  font-size: 8px;
  top: 218px;
  left: 95px;
}
.memberAddressAbs {
  font-size: 8px;
  top: 263px;
  left: 70px;
}
.memberWardAbs {
  font-size: 8px;
  top: 240px;
  left: 156px;
}

.memberMuniAbs {
  font-size: 8px;
  top: 262px;
  left: 70px;
}
.memberPradeshAbs {
  font-size: 8px;
  top: 284px;
  left: 110px;
}
.memberHouseAbs {
  font-size: 8px;
  top: 304px;
  left: 119px;
}
.memberDistrictAbs {
  font-size: 8px;
  top: 325px;
  left: 75px;
}
.memberRegionAbs {
  font-size: 8px;
  top: 348px;
  left: 70px;
}
.memberQRAbs {
  top: 267px;
  left: 182px;
}
.sign1 {
  height: 45px;
  bottom: 6px;
  left: 40px;
  font-size: 8px;
  width: 80px;
  img {
    object-fit: contain;
    object-position: start;
  }
}
.sign2 {
  bottom: 6px;
  left: 120px;
  font-size: 8px;
  width: 80px;
  img {
    object-fit: contain;
    object-position: start;
  }
}

.sign3 {
  position: absolute;
  bottom: 6px;
  left: 200px;
  font-size: 8px;
  width: 80px;
  img {
    object-fit: contain;
    object-position: start;
  }
}
</style>
