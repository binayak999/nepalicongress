<template>
  <section>
    <!-- <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" /> -->

    <v-container>
      <!-- {{allSubmittedSubdomain.results}} -->
      <v-row>
        <v-col md="2" cols="12">
          <h5>Please Choose to view active member list</h5>
          <label for>प्रदेश</label>
          <div class="displayBox">
            <span class="txtbox">
              {{ labelProvince }}
            </span>
            <v-selection
              v-model="prosele"
              placeholder="Province"
              :options="groupofProvinces"
              label="label"
              :filterable="true"
              @input="selectedPro(prosele)"
            ></v-selection>
          </div>

          <ul class="listofsubdomain">
            <li
              v-for="(data, index) in allSubmittedSubdomain.results"
              :key="index"
              @click="setSubdomain(data.userHandle)"
            >
              <span
                v-if="prosele == data.province"
                :class="{ active: selectedSubdomain == data.userHandle }"
                >{{ data.nepname }}</span
              >
            </li>
          </ul>
        </v-col>
        <v-col md="10" cols="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col md="3" class="d-none" cols="12">
                <label for>प्रदेश</label>
                <v-selection
                  v-model="province"
                  placeholder="Province"
                  :options="allProvices"
                  label="province"
                  :filterable="true"
                  :value="selectProvince(province)"
                ></v-selection>
              </v-col>
              <v-col md="3" v-if="district != ''" cols="12">
                <label for>जिल्ला</label>
                <div class="boxdiv">
                  {{ district }}
                </div>
                <!-- <v-selection
                  v-model="district"
                  placeholder="जिल्ला"
                  :options="allDistrict"
                  label="name"
                  :filterable="true"
                  :value="selectDistrict(district)"
                ></v-selection> -->
              </v-col>
              <v-col
                md="3"
                cols="12"
                v-if="
                  district != '' && typeof houseofrepresentative == 'string'
                "
              >
                <label for>प्रतिनिधिसभा नि.क्षे.नं.</label>
                <div class="boxdiv">
                  {{ houseofrepresentative }}
                </div>
              </v-col>
              <v-col
                md="3"
                v-if="
                  district != '' && typeof houseofrepresentative == 'object'
                "
              >
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

              <v-col md="3" v-if="houseofrepresentative != undefined" cols="12">
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
              <v-col md="3" v-if="pradeshassemblyconstituency != ''" cols="12">
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
              <v-col md="3" v-if="municipality != ''" cols="12">
                <label for>वडा नं.</label>
                <v-selection
                  v-model="wardno"
                  placeholder="वडा नं."
                  :options="wards"
                  :filterable="true"
                ></v-selection>
              </v-col>
              <!-- <v-col md="4" v-if="district != ''">
                <label for>लिङ्ग</label>
                <v-selection v-model="gender" :options="genders"></v-selection>
              </v-col>
              <v-col md="4" v-if="district != ''">
                <label for>समावेशी समूह</label>
                <v-selection
                  v-model="inclusivegroup"
                  placeholder="समावेशी समूह"
                  :options="inclusivegroups"
                ></v-selection>
              </v-col>
-->
              <v-col md="3" v-if="district != ''" cols="12">
                <label for>Member Type</label>
                <v-selection
                  v-model="memberType"
                  placeholder="Member Type"
                  :options="groupofs"
                  label="label"
                ></v-selection>
              </v-col>
              <v-col
                cols="12"
                class="btn-filter"
                v-if="wardno != undefined && !allloadingActive"
              >
                <v-btn @click="filterActiveMember">Filter</v-btn>
              </v-col>
              <v-col
                cols="12"
                class="btn-filter"
                v-if="wardno != undefined && allloadingActive"
              >
                <img
                  :src="require(`@/assets/images/icons/la.svg`)"
                  alt
                  class="loading"
                  width="50px"
                />
              </v-col>
            </v-row>
          </v-form>

          <template v-if="allFilterDataUser.length > 0">
            <div v-if="layout == 'table'">
              <section class="pdfbox" ref="doc">
                <ul class="imageheader">
                  <li>
                    <img :src="require(`@/assets/images/flag.jpg`)" alt />
                  </li>
                  <li>
                    <h3 class="text-center">
                      नेपाली कांग्रेस केन्द्रिय निर्वाचन समिती द्वारा प्रकाशित
                    </h3>
                    <h1>नेपाली कांग्रेस</h1>
                    <h2>कृयासिल सदस्यताको नामावली</h2>

                    <ul class="fromdata">
                      <li v-if="district != undefined">
                        <strong>प्रकार</strong>
                        : <span v-if="memberType.value != 'Old'">नयाँ </span>
                        <span v-if="memberType.value != 'New'">नवीकरण </span>
                      </li>
                      <li v-if="district.name != undefined || district != ''">
                        <strong>जिल्ला</strong>
                        :
                        {{
                          district.name != undefined ? district.name : district
                        }}
                      </li>
                      <li
                        v-if="
                          houseofrepresentative.code != undefined ||
                          houseofrepresentative != ''
                        "
                      >
                        <strong>प्रतिनिधिसभा नि.क्षे.नं.</strong>
                        :
                        {{
                          houseofrepresentative.code != undefined
                            ? houseofrepresentative.code
                            : houseofrepresentative
                        }}
                      </li>
                      <li v-if="pradeshassemblyconstituency.code != undefined">
                        <strong>प्रदेश सभा क्षेत्र</strong>
                        : {{ pradeshassemblyconstituency.code }}
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
                  <li>
                    <img :src="require(`@/assets/images/tree.png`)" alt />
                  </li>
                </ul>
                <table class="table table-responsive" border="1">
                  <thead>
                    <tr>
                      <th v-for="(heading, index) in headings" :key="index">
                        {{ heading }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(body, index) in allFilterDataUser" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ body.membername }}</td>
                      <td>{{ body.gender }}</td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
// import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import html2pdf from "html2pdf.js";
import Printd from "printd";
// import { secureStorage } from "../../main";
export default {
  name: "ActiveMembers",
  components: {
    // TitleBreadCrumb,
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
    title: "Active Member Subdomain Report",
    selectedSubdomain: "",
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

    prosele: 1,
    logged: undefined,
    groupof: "",
    groupofs: [
      { label: "New", value: "New" },
      { label: "Renew", value: "Old" },
    ],
    labelProvince: "कोशी",
    groupofProvinces: [],
    headings: ["क्र.स.", "सदस्यको नाम .", "लिङ्ग"],
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

    houseofrepresentative: undefined,
    pradeshassemblyconstituency: "",

    inclusivegroup: undefined,
    memberType: undefined,
    limits: [10, 100, 500],
    showSomeTime: false,
    limit: 100,
    exportPDF: "Export To PDF",
    chartOptions: {},
    chartData: {},
    chartOptionsD: {},
    chartDataD: {},
    chartOptionsA: {},
    chartDataA: {},
    provincenum: 1,
    filt: {},
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
      "allFilterDataUser",
      "allReport",
      "allloadingActive",
      "allChartData",
      "loadingReportAll",
      "allDistrict",
      "loadingspecificall",
      "allColorData",
      "allSubmittedSubdomain",
      "getSubdomainIdentifier",
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
      "fetchProvinceDistrictSelect",
      "subdomainSubmitted",
      "fetchSubdomainId",
      "fetchProvinceDistrictSelectProvice",
      "filterDataUser",
    ]),
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
      let route = `/dashboard/editsubdomain/${item._id}`;
      this.$router.push(route).catch((error) => console.log(error));
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
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
    selectedPro(data) {
      this.prosele = data.province;
      this.labelProvince = data.label;
    },
    selectProvince(data) {
      if (data.province != undefined) {
        this.fetchProvinceDistrictSelectProvice(data.province);
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
          }
        });
      }
    },

    async setSubdomain(data) {
      this.district = "";
      this.municipality = "";
      this.wardno = undefined;
      this.houseofrepresentative = undefined;
      this.selectedSubdomain = data;
      await this.fetchSubdomainId(data);
      if (this.getSubdomainIdentifier.parentSubdomain != null) {
        this.province = this.getSubdomainIdentifier.province;
        await this.fetchProvinceDistrictSelectProvice(
          this.getSubdomainIdentifier.province
        );
        let name = this.allDistrict.filter((ele) => {
          return ele.name == this.getSubdomainIdentifier.city;
        });
        this.selectDistrict(name[0]);
        this.district = this.getSubdomainIdentifier.city;
        let resp = this.representatives.filter((ele) => {
          return ele.code == this.getSubdomainIdentifier.district;
        });
        this.regionFunc(resp[0]);
        this.houseofrepresentative = this.getSubdomainIdentifier.district;
      } else {
        this.houseofrepresentative = {};
        this.province = this.getSubdomainIdentifier.province;
        await this.fetchProvinceDistrictSelectProvice(
          this.getSubdomainIdentifier.province
        );
        let name = this.allDistrict.filter((ele) => {
          return ele.name == this.getSubdomainIdentifier.nepname;
        });
        this.selectDistrict(name[0]);
        this.district = this.getSubdomainIdentifier.nepname;
      }
    },
    filterActiveMember() {
      if (this.district != undefined) {
        this.filt.district = this.district;
      }
      if (this.houseofrepresentative != undefined) {
        this.filt.houseofrepresentative =
          this.houseofrepresentative.code != undefined
            ? this.houseofrepresentative.code.toString()
            : "";
      }
      if (this.pradeshassemblyconstituency.code != undefined) {
        this.filt.pradeshassemblyconstituency =
          this.pradeshassemblyconstituency.code != undefined
            ? this.pradeshassemblyconstituency.code.toString()
            : "";
      }
      if (this.municipality.name != undefined) {
        this.filt.municipality = this.municipality.name;
      }
      if (this.wardno != undefined) {
        this.filt.wardno = this.wardno;
      }
      if (this.inclusivegroup != undefined) {
        this.filt.inclusivegroup = this.inclusivegroup;
      }
      if (this.gender != undefined) {
        this.filt.gender = this.gender;
      }
      if (this.memberType != undefined) {
        this.filt.memberType = this.memberType.value;
      }

      // console.log(this.filt)
      // this.$store.dispatch("filterDataUser", this.filt);
      this.filterDataUser(this.filt);
    },

    switchLayout(e) {
      this.layout = e;
    },
  },
  async created() {
    // if (secureStorage.getItem("userData") == undefined) {
    //   this.$router.push("/login/activemember");
    // } else {
    //   this.logged = JSON.parse(secureStorage.getItem("userData")).user;
    // }
    this.Printd = window.printd;
    this.d = new Printd();
    this.initialize();
    await this.fetchSubDomainSpecific();
    await this.fetchProvinceDistrictProvince();
    await this.fetchProvinceDistrictSelect();
    await this.subdomainSubmitted();
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
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
h5 {
  margin-bottom: 10px;
  border: 1px solid red;
}
.listofsubdomain {
  display: flex;
  list-style: none;
  padding-left: 0;
  li {
    width: 100%;
    span {
      width: 100%;
      display: block;
      padding: 10px 15px;
      text-align: left;
      border: 1px solid #efefef;
    }
  }
  flex-wrap: wrap;
  text-transform: capitalize;
  font-size: 14px;
}
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
.active {
  background: $secondary;
  color: $white;
}
.pillmain {
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
        padding: 10px;
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
    padding: 10px;
  }
}
.pdfbox {
  // position: fixed;
  left: 100px;
  right: 100px;
  background: white;
  z-index: 9999;
  // padding: 30px;

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
  .imageheader {
    background: white;
    list-style: none;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;
    position: relative;
    @media only screen and (max-width: 991px) {
      padding: 0;
      margin-bottom: 20px;
    }
    img {
      height: 90px;
      @media only screen and (max-width: 991px) {
        // display: none;
        position: absolute;
        width: 40px;
        object-fit: contain;
        top: -20px;
      }
    }
    li {
      &:first-of-type {
        img {
          left: 0;
        }
      }
      &:last-of-type {
        img {
          right: 0;
        }
      }
    }
    h1 {
      font-size: 30px;
      text-align: center;
    }
    h2 {
      font-size: 20px;
      text-align: center;
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
.boxdiv {
  border: 1px solid #c2c2c2;
  min-height: 50px;
  padding: 15px;
}
.displayBox {
  position: relative;
  .txtbox {
    position: absolute;
    top: 1px;
    background: #fff;
    width: 100px;
    height: 53px;
    left: 10px;
    display: block;
    z-index: 999;
    display: flex;
    align-items: center;
    padding-left: 5px;
  }
}
</style>
