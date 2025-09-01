<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />


    <div class="insidepadding">
      <div>
        <ul class="phonedatanumber">
          <li>
            <h3>Total Phone Number Data</h3>
            <h1>{{ allTotalAcitvePhone.totalWithPhone }}</h1>
          </li>
          <li>
            <h3>Total Without Phone Number Data</h3>
            <h1>{{ allTotalAcitvePhone.totalWithoutPhone }}</h1>
          </li>
        </ul>
      </div>
      <ul class="tableselect">
        <li :class="{ active: phonedata }" @click="changeTable">
          Total Data With Phone Number
        </li>
        <li :class="{ active: !phonedata }" @click="changeTable">
          Total Data Without Phone Number
        </li>
      </ul>
      <div>
        <section class="pdfbox" v-if="phonedata">
          <ul class="pagination">
            <li @click="prev">Prev</li>
            <li>
              {{ skip }} /
              {{ (allTotalAcitvePhone.totalWithPhone / limit).toFixed(0) }}
            </li>
            <li
              @click="
                next((allTotalAcitvePhone.totalWithPhone / limit).toFixed(0))
              "
            >
              Next
            </li>
          </ul>
   <div v-if="!loadingReportAll">
            Loading...
        </div>
          <table border="1" class="table table-responsive" v-if="loadingReportAll">
            <thead>
              <tr>
                <th>क्र.स.</th>
                <th>फोन</th>
                <th>सदस्यको नं.</th>
                <th>सदस्यको नाम</th>
                <th>वावु / आमाको नाम</th>
                <th>पति / पत्निको नाम</th>
                <th>लिङ्ग</th>
                <th>उमेर</th>
                <th>समावेशी समूह</th>
                <th>पेशा</th>
                <th>प्रतिनिधिसभा नि.क्षे.नं.</th>
                <th>प्रदेश सभा क्षेत्र</th>
                <th>न.पा./गा.पा.</th>
                <th>वडा नं.</th>
                <th>कैफियत</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(body, index) in allactiveMemberPhone.resultwithphone"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ body.phone }}</td>
                <td>{{ body.workingformnumber }}</td>
                <td>{{ body.membername }}</td>
                <td>{{ body.fathermothername }}</td>
                <td>{{ body.husbandwifename }}</td>
                <td>{{ body.gender }}</td>
                <td>{{ body.age }}</td>
                <td>{{ body.inclusivegroup }}</td>
                <td>{{ body.profession }}</td>
                <td>{{ body.houseofrepresentative }}</td>
                <td>{{ body.pradeshassemblyconstituency }}</td>
                <td>{{ body.municipality }}</td>
                <td>{{ body.wardno }}</td>
                <td>{{ body.kaifiyat }}</td>
              </tr>
            </tbody>
          </table>
          <ul class="pagination">
            <li @click="prev">Prev</li>
            <li>
              {{ skip }} /
              {{ (allTotalAcitvePhone.totalWithPhone / limit).toFixed(0) }}
            </li>
            <li
              @click="
                next((allTotalAcitvePhone.totalWithPhone / limit).toFixed(0))
              "
            >
              Next
            </li>
          </ul>
        </section>
        <section class="pdfbox" v-if="!phonedata">
          <ul class="pagination">
            <li @click="prev">Prev</li>
            <li>
              {{ skip }} /
              {{ (allTotalAcitvePhone.totalWithoutPhone / limit).toFixed(0) }}
            </li>
            <li
              @click="
                next((allTotalAcitvePhone.totalWithoutPhone / limit).toFixed(0))
              "
            >
              Next
            </li>
          </ul>
        <div v-if="!loadingReportAll">
            Loading...
        </div>
          <table border="1" class="table table-responsive" v-if="loadingReportAll">
            <thead>
              <tr>
                <th>क्र.स.</th>
 <th>सदस्यको नं.</th>
                <th>सदस्यको नाम .</th>
                <th>वावु / आमाको नाम</th>
                <th>पति / पत्निको नाम</th>
                <th>लिङ्ग</th>
                <th>उमेर</th>
                <th>समावेशी समूह</th>
                <th>पेशा</th>
                <th>प्रतिनिधिसभा नि.क्षे.नं.</th>
                <th>प्रदेश सभा क्षेत्र</th>
                <th>न.पा./गा.पा.</th>
                <th>वडा नं.</th>
                <th>कैफियत</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(body, index) in allactiveMemberPhone.resultwithoutphone"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ body.workingformnumber }}</td>
                <td>{{ body.membername }}</td>
                <td>{{ body.fathermothername }}</td>
                <td>{{ body.husbandwifename }}</td>
                <td>{{ body.gender }}</td>
                <td>{{ body.age }}</td>
                <td>{{ body.inclusivegroup }}</td>
                <td>{{ body.profession }}</td>
                <td>{{ body.houseofrepresentative }}</td>
                <td>{{ body.pradeshassemblyconstituency }}</td>
                <td>{{ body.municipality }}</td>
                <td>{{ body.wardno }}</td>
                <td>{{ body.kaifiyat }}</td>
              </tr>
            </tbody>
          </table>
          <ul class="pagination">
            <li @click="prev">Prev</li>
            <li>
              {{ skip }} /
              {{ (allTotalAcitvePhone.totalWithoutPhone / limit).toFixed(0) }}
            </li>
            <li
              @click="
                next((allTotalAcitvePhone.totalWithoutPhone / limit).toFixed(0))
              "
            >
              Next
            </li>
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import html2pdf from "html2pdf.js";
import Printd from "printd";
import { secureStorage } from "../../../main";
export default {
  name: "ActivePhoneNumbertReport",
  components: {
    TitleBreadCrumb,
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
    title: "ACTIVE MEMBER PHONE NUMBER REPORT",
    phonedata: true,

    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Active Member Phone Number Report",
      },
    ],
    allsubdomain: true,
    district: "",
    province: 1,
    search: "",
    dialog: false,
    provinceno: 1,
    valid: false,
    skip: 1,
    limit: 100,

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

    exportPDF: "Export To PDF",

    cssText: `
    .pdfbox {
	 left: 100px;
	 right: 100px;
	 background: white;
	 z-index: 9999;
	 padding: 30px;
}
 .pdfbox table {
	 width: 100%;
	 border-collapse: collapse;
}
 .pdfbox table th {
	 font-size: 14px;
	 text-align: left;
	 padding: 10px;
}
 .pdfbox table td {
	 font-size: 14px;
	 padding: 10px;
}
 .pdfbox .imageheader {
	 background: white;
	 list-style: none;
	 padding-left: 0;
	 display: flex;
	 justify-content: space-between;
	 padding: 10px 30px;
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
 
    `,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters([
      "allDashCategories",
      "allactiveMemberPhone",
      "allTotalAcitvePhone",
      "allloadingActive",
      "loadingReportAll",
      "allDistrict",
      "loadingspecificall",
    ]),
  },

  methods: {
    ...mapActions(["getReportsPhone", "getReportsPhoneNumber"]),
    prev() {
      if (this.skip > 1) {
        this.skip -= 1;
        this.$store.dispatch("getReportsPhone", {
          skip: this.skip,
          limit: this.limit,
        });
      }
    },
    next(data) {
      if (this.skip < data) {
        this.skip += 1;
        this.$store.dispatch("getReportsPhone", {
          skip: this.skip,
          limit: this.limit,
        });
      }
    },
    changeTable() {
      this.phonedata = !this.phonedata;
      this.skip = 1;
       this.$store.dispatch("getReportsPhone", {
      skip: this.skip,
      limit: this.limit,
    });
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
  },
  created() {
    this.logged = JSON.parse(secureStorage.getItem("userData")).user.role;
    this.Printd = window.printd;
    this.d = new Printd();
    this.initialize();

    this.$store.dispatch("getReportsPhone", {
      skip: this.skip,
      limit: this.limit,
    });
    this.$store.dispatch("getReportsPhoneNumber");
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
  //   left: 100px;
  //   right: 100px;
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
.tableselect {
  display: flex;
  list-style: none;
  padding-left: 0;
  li {
    border: 1px solid #6d6b6b;
    padding: 10px 20px;
    margin-right: 10px;
    margin-top: 20px;
    cursor: pointer;
  }
  .active {
    background: #2c9131;
    color: #fff;
  }
}
.phonedatanumber {
  margin-top: 30px;
  list-style: none;
  display: flex;
  padding-left: 0;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    padding: 30px;
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    &:first-of-type {
      margin-right: 15px;
    }
    h1{
            font-size: 30px;
    }
  }
}
.pagination {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  list-style: none;
  margin: 20px 0;
  li {
    border: 1px solid #6e6c6c;
    cursor: pointer;
    padding: 5px 20px;
    &:hover {
      background: #2c9131;
      color: #fff;
    }
  }
}
</style>
