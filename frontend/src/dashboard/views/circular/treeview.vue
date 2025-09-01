<template>
  <div>
    <section v-if="false">
      <ActiveUserAuth />
    </section>
    <section class="backimage">
      <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
      <ul class="listbtn">
        <li :class="{ active: $route.name == 'Treeview' }">
          {{ $route.name }}
        </li>
        <li>
          <router-link to="/dashboard/treeviewall"
            >All {{ $route.name }}</router-link
          >
        </li>
        <li>
          <router-link to="/dashboard/treeviewallward"
            >All Ward {{ $route.name }}</router-link
          >
        </li>
      </ul>
      <template v-if="acitvememer == 'all'">
        <v-row class="nopadding topbox">
          <v-col md="12">
            <ul v-if="allprovincecount.allmember" class="listcount">
              <li
                v-for="(data, index) in allprovincecount.allmember"
                :key="index"
                :class="{ activecolor: active1 == data.title }"
              >
                <h3 @click="districtFunc(data.title)">
                  Province : <span v-if="data.title == 0">8</span
                  ><span v-if="data.title != 0">{{ data.title }}</span>
                </h3>
                <h1>{{ data.count }}</h1>
              </li>
            </ul>
          </v-col>
        </v-row>
        <v-row class="nopadding" v-if="alldistrictcount.allmember">
          <v-col md="12">
            <div class="districtbackground">
              <h4>Districts</h4>
              <ul class="listcountRow">
                <li
                  v-for="(data, index) in alldistrictcount.allmember"
                  :key="index"
                  :class="{ activecolor: active2 == data.title }"
                >
                  <h3 @click="houseofrepresentativeFunc(data.title)">
                    {{ data.title }}
                  </h3>
                  <h1>{{ data.count }}</h1>
                </li>
              </ul>
            </div>
          </v-col>
          <v-col
            md="12"
            class="nopadding"
            v-if="allhouseofrepresentativecount.allmember"
          >
            <div class="houseofrepresentativebg">
              <h4>House of Representative</h4>
              <ul class="listcountRow">
                <li
                  v-for="(data,
                  index) in allhouseofrepresentativecount.allmember"
                  :key="index"
                  :class="{ activecolor: active3 == data.title }"
                >
                  <h3 @click="municipalityFunc(data.title)">
                    {{ data.title }}
                  </h3>
                  <h1>{{ data.count }}</h1>
                </li>
              </ul>
            </div>
          </v-col>

          <v-col md="12" class="nopadding" v-if="allmuncipalitycount.allmember">
            <div class="municipalitybg">
              <h4>Municipality</h4>
              <ul class="listcountRow">
                <li
                  v-for="(data, index) in allmuncipalitycount.allmember"
                  :key="index"
                  :class="{ activecolor: active4 == data.title }"
                >
                  <h3 @click="wardFunc(data.title)">{{ data.title }}</h3>
                  <h1>{{ data.count }}</h1>
                </li>
              </ul>
            </div>
          </v-col>
          <v-col md="12" class="nopadding" v-if="allwardcount.allmember">
            <div class="wardbg">
              <h4>Ward</h4>
              <ul class="listcountRow">
                <li
                  v-for="(data, index) in allwardcount.allmember"
                  :key="index"
                  :class="{ activecolor: active5 == data.title }"
                >
                  <h3 @click="lastFunc(data.title)">{{ data.title }}</h3>
                  <h1>{{ data.count }}</h1>
                </li>
              </ul>
            </div>
          </v-col>
        </v-row>
      </template>

      <div class="backgroundfix" v-if="allLoadingActive"></div>
      <div class="posfix" v-if="allLoadingActive">
        <img
          :src="require(`@/assets/images/icons/la.svg`)"
          alt
          class="loading"
          width="50px"
        />
      </div>
      <div class="popbox" v-if="popbox" ref="doc">
        <header>
          <ul>
            <li class="no-print">
              <v-btn class="btn btn-default no-print" @click="printa"
                >Download</v-btn
              >
            </li>
            <li class="no-print">
              <v-icon @click="closePopBox">mdi-close</v-icon>
            </li>
          </ul>
        </header>
        <div
          class="bodysection"
          ref="reportContent"
          v-if="allReportsTree.total != undefined"
        >
          <div class="logoBox">
            <img
              :src="require(`@/assets/images/logo.svg`)"
              alt
              class="imagelogo"
            />
          </div>

          <h3>Detail Report of Province {{ titleReport }}</h3>

          <v-row>
            <v-col md="6">
              <ChartAndTable
                :datachart="allReportsTree.total"
                :totalDAll="totalMember"
                title="New And Renew Member"
                :status="true"
              />
            </v-col>
            <v-col md="6">
              <ChartAndTable
                :datachart="allReportsTree.totalGender"
                :totalDAll="totalGender"
                title="Gender Count"
                :status="true"
              />
            </v-col>
            <v-col md="6">
              <ChartAndTable
                :datachart="allReportsTree.allInclusive"
                :totalDAll="totalInclusive"
                title="Inclusive Group Count"
                :status="true"
              />
            </v-col>
            <v-col md="6">
              <ChartAndTable
                :datachart="allReportsTree.totalAge"
                :totalDAll="totalAge"
                title="Age Count"
                :status="true"
              />
            </v-col>
            <v-col md="6">
              <ChartAndTable
                :datachart="allReportsTree.totalProfession"
                :totalDAll="totalProfession"
                title="Profession Count"
                :status="true"
              />
            </v-col>
            <v-col md="6">
              <ChartAndTable
                :datachart="allReportsTree.topTwentyAge"
                :totalDAll="totalAge"
                title="Top 5 Age"
                :status="true"
              />
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="floatbutton" v-if="province != '' && !popbox">
        <span v-if="!reportLoading"
          ><v-progress-circular indeterminate></v-progress-circular
        ></span>
        <span v-if="reportLoading" @click="openPop">View Report</span>
      </div>
    </section>
  </div>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapActions, mapGetters } from "vuex";
import Printd from "printd";
import ChartAndTable from "./chartAndTable";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  name: "Treeview",

  components: {
    TitleBreadCrumb,
    ChartAndTable,
  },
  data: () => ({
    title: "Tree View",
    active1: false,
    active2: false,
    active3: false,
    active4: false,
    active5: false,
    popbox: false,
    showSomeTime: false,
    acitvememer: "all",
    titleReport: "",
    province: "",
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Tree View",
      },
    ],
    district: "",
    municipality: "",
    houseofrepresentative: "",
    json_data: [],
    totalMember: 0,
    totalGender: 0,
    totalInclusive: 0,
    totalProfession: 0,
    cssText: `
    .no-print{
      display:none;
    }
  table{
    width:100%;
    border-collapse:collapse;
  }
  ul{
    list-style:none;
    padding:0;
    margin:0;
  }
    `,
    totalAge: 0,
    reportLoading: false,
  }),

  computed: {
    ...mapGetters([
      "allprovincecount",
      "alldistrictcount",
      "allhouseofrepresentativecount",
      "allmuncipalitycount",
      "allwardcount",
      "allLoadingActive",
      "allReportsTree",
    ]),
  },

  methods: {
    ...mapActions([
      "getprovincecount",
      "getdistrictcount",
      "gethouseofrepresentativecount",
      "getmunicipality",
      "getWard",
      "reportGeneration",
    ]),
    closePopBox() {
      this.popbox = false;
    },
    openPop() {
      this.popbox = true;
    },
    toggleButton(e) {
      this.acitvememer = e;
    },
    totalCount(data) {
      this.totalMember = 0;
      this.totalGender = 0;
      this.totalInclusive = 0;
      this.totalAge = 0;
      this.totalProfession = 0;

      data.total.forEach((ele) => {
        this.totalMember += ele.count;
      });

      data.allInclusive.forEach((ele) => {
        this.totalInclusive += ele.count;
      });

      data.totalAge.forEach((ele) => {
        this.totalAge += ele.count;
      });

      data.totalGender.forEach((ele) => {
        this.totalGender += ele.count;
      });
      data.totalProfession.forEach((ele) => {
        this.totalProfession += ele.count;
      });
    },
    async districtFunc(data) {
      this.titleReport = data;
      this.reportLoading = false;
      this.popbox = false;
      this.getdistrictcount({ region: data });
      this.active1 = data;
      this.province = data;
      await this.reportGeneration({ province: this.province });
      this.totalCount(this.allReportsTree);
      this.reportLoading = true;
    },
    async houseofrepresentativeFunc(data) {
      this.titleReport = this.province + " > " + data;
      this.reportLoading = false;
      this.popbox = false;
      this.district = data;
      this.gethouseofrepresentativecount({ maindistrict: data });
      this.active2 = data;
      await this.reportGeneration({
        province: this.province,
        maindistrict: this.district,
      });
      this.totalCount(this.allReportsTree);
      this.reportLoading = true;
    },
    async municipalityFunc(data) {
      this.titleReport = this.province + " > " + this.district + " > " + data;
      this.reportLoading = false;
      this.popbox = false;
      this.houseofrepresentative = data;
      this.getmunicipality({
        maindistrict: this.district,
        houseofrepresentative: data,
      });

      this.active3 = data;

      await this.reportGeneration({
        province: this.province,
        maindistrict: this.district,
        houseofrepresentative: data,
      });
      this.totalCount(this.allReportsTree);
      this.reportLoading = true;
    },
    async printa() {
      // Add a class to hide unnecessary elements
      const reportContent = this.$refs.reportContent;
      reportContent.classList.add('hide-buttons');

      // Configure html2canvas options for better performance
      const canvas = await html2canvas(reportContent, {
        scale: 1.5, // Reduced from 2 to 1.5 for better file size
        useCORS: true,
        logging: false,
        imageTimeout: 0,
        removeContainer: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.75); // Using JPEG with 0.75 quality for better compression
      
      // Initialize PDF with compression
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      // Calculate dimensions while maintaining aspect ratio
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      // Calculate centered position
      const x = (pdfWidth - imgWidth * ratio) / 2;
      const y = 0;

      // Add image with calculated dimensions
      pdf.addImage(
        imgData,
        'JPEG',
        x,
        y,
        imgWidth * ratio,
        imgHeight * ratio,
        undefined,
        'FAST'
      );

      // Save the optimized PDF
      pdf.save(`${this.titleReport || 'Report'}.pdf`);

      // Remove the class after rendering
      reportContent.classList.remove('hide-buttons');
    },
    async wardFunc(data) {
      this.titleReport =
        this.province +
        " > " +
        this.district +
        " > " +
        this.houseofrepresentative +
        " > " +
        data;
      this.reportLoading = false;
      this.municipality = data;
      this.getWard({
        municipality: data,
        maindistrict: this.district,
        houseofrepresentative: this.houseofrepresentative,
      });

      this.active4 = data;

      await this.reportGeneration({
        province: this.province,
        maindistrict: this.district,
        houseofrepresentative: this.houseofrepresentative,
        municipality: data,
      });
      this.totalCount(this.allReportsTree);
      this.reportLoading = true;
    },
    async lastFunc(data) {
      this.titleReport =
        this.province +
        " > " +
        this.district +
        " > " +
        this.houseofrepresentative +
        " > " +
        this.municipality +
        " > " +
        data;
      this.active5 = data;
      this.reportLoading = false;
      await this.reportGeneration({
        province: this.province,
        maindistrict: this.district,
        houseofrepresentative: this.houseofrepresentative,
        municipality: this.municipality,
        wardno: data,
      });

      this.totalCount(this.allReportsTree);
      this.reportLoading = true;
    },
  },
  created() {
    this.getprovincecount();
    this.Printd = window.printd;
    this.d = new Printd();
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";

.listbtn {
  margin-left: 10px;
  margin-top: 15px;
  display: flex;
  list-style: none;
  gap: 10px;

  li {
    padding: 12px 20px;
    background: $white;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      background: $secondary;
      color: $white;
      transform: translateY(-2px);
    }
  }
}

.backgroundfix {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.topbox {
  margin-top: 30px;
}

.posfix {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  height: 60px;
  width: 60px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 20;

  &:hover {
    transform: translateX(-50%) scale(1.1);
    transition: transform 0.3s ease;
  }
}
.listcount,
.listcountRow {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 15px;

  li {
    background: #ffffff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    position: relative; /* Needed for arrow positioning */
    transition: all 0.3s ease;

    h3 {
      font-size: 16px;
      color: #333333;
      margin-bottom: 10px;
    }

    h1 {
      font-size: 24px;
      color: $secondary;
      font-weight: bold;
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    }

    &.activecolor {
      background: $secondary;
      color: $white;

      h1,h3 {
        color: $white;
      }

      /* Arrow Indicator */
      &::before {
        content: '';
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid $secondary;
      }
    }
  }
}

.activecolor {
  background: $secondary;
  color: $white;

  h1 {
    color: $white;
  }
}

.districtbackground,
.houseofrepresentativebg,
.municipalitybg,
.wardbg {
  margin: 20px 25px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  h4 {
    text-align: center;
    font-size: 20px;
    color: $secondary;
    margin-bottom: 15px;
  }
}

.popbox {
  position: fixed;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  padding: 30px;
  z-index: 15;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    ul {
      display: flex;
      gap: 10px;

      li {
        list-style: none;

        .btn {
          background: $secondary;
          color: $white;
          padding: 10px 20px;
          border-radius: 5px;
          transition: all 0.3s ease;

          &:hover {
            background: darken($secondary, 10%);
          }
        }

        .mdi-close {
          font-size: 24px;
          cursor: pointer;

          &:hover {
            color: darken($secondary, 20%);
          }
        }
      }
    }
  }

  .bodysection {
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

.report-container {
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;

  th,
  td {
    font-size: 14px;
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
}

.logoBox {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  .imagelogo {
    width: 150px;
  }
}
.btn{
  background: $secondary !important;
  color: $white !important;
  margin-left: 15px;
}
</style>
