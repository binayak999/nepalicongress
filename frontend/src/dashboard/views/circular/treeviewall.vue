<template>
  <div>
    <section v-if="false">
      <ActiveUserAuth />
    </section>
    <section class="backimage">
      <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
      <ul class="listbtn">
        <li>
          <router-link to="/dashboard/treeview">Tree View</router-link>
        </li>
        <li class="active">Tree View All</li>
        <li>
          <router-link to="/dashboard/treeviewallward"
            >Tree View All Ward</router-link
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
                  Province : <span v-if="data.title == 0">8</span><span v-if="data.title != 0">{{ data.title }}</span>
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
                  v-for="(
                    data, index
                  ) in allhouseofrepresentativecount.allmember"
                  :key="index"
                  :class="{ activecolor: active3 == data.title }"
                >
                  <h3 @click="pradeshAssemblyConstitutionFunc(data.title)">
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
            v-if="allpradeshassemblyconstituencycount.allmember"
          >
            <div class="houseofrepresentativebg">
              <h4>Pradhesh Assembly Consitituency</h4>
              <ul class="listcountRow">
                <li
                  v-for="(
                    data, index
                  ) in allpradeshassemblyconstituencycount.allmember"
                  :key="index"
                  :class="{ activecolor: active6 == data.title }"
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
            <li>
              <h3>Detail Report of Province {{ titleReport }}</h3>
            </li>
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
        <div class="bodysection" v-if="allReportsTree.total != undefined">
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
                :datachart="allReportsTree.topTwentyAge"
                :totalDAll="totalAge"
                title="Top 5 Age"
                :status="true"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              md="12"
              class="px-0"
              v-for="(data, index) in alldistrictcount.allmember"
              :key="index + 'd'"
            >
              <District
                :payload="{ province: province, maindistrict: data.title }"
                :filterprovince="filterprovince"
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
import ChartAndTable from "./chartAndTable";
import District from "../../components/District.vue";

import Printd from "printd";
export default {
  name: "TreeviewAll",

  components: {
    TitleBreadCrumb,
    ChartAndTable,
    District,
  
  },
  data: () => ({
    title: "Tree View",
    active1: false,
    active2: false,
    active3: false,
    active4: false,
    active5: false,
    active6: false,
    popbox: false,
    titleReport: "",
    province: "",
    filterprovince: "",
    showSomeTime: false,
    acitvememer: "all",
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
    pradeshassemblyconstituency: "",
    municipality: "",
    houseofrepresentative: "",
    json_data: [],
    totalMember: 0,
    totalGender: 0,
    totalInclusive: 0,
    totalAge: 0,
    totalProfession: 0,
    reportLoading: false,
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
  }),

  computed: {
    ...mapGetters([
      "allprovincecount",
      "alldistrictcount",
      "allhouseofrepresentativecount",
      "allpradeshassemblyconstituencycount",
      "allmuncipalitycount",
      "allwardcount",
      "allLoadingActive",
      "allReportsTree",
      "allProvinceonly",
    ]),
  },

  methods: {
    ...mapActions([
      "getprovincecount",
      "getdistrictcount",
      "gethouseofrepresentativecount",
      "getpradeshassemblyconstituencycount",
      "getmunicipality",
      "getWard",
      "reportGeneration",
      "fetchProvinceDistrictSelect",
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
      this.filterprovince = this.allProvinceonly.filter((ele) => {
        return ele.province == this.province;
      });
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
    async pradeshAssemblyConstitutionFunc(data) {
      this.titleReport = this.province + " > " + this.district + " > " + data;
      this.reportLoading = false;
      this.pradeshAssemblyLoading = false;
      this.popbox = false;
      this.houseofrepresentative = data;
      this.getpradeshassemblyconstituencycount({
        maindistrict: this.district,
        houseofrepresentative: data,
      });
      this.active3 = data;
      await this.reportGeneration({
        province: this.province,
        houseofrepresentative: data,
        maindistrict: this.district,
      });
      this.totalCount(this.allReportsTree);
      this.pradeshAssemblyLoading = true;
      this.reportLoading = true;
    },
    async municipalityFunc(data) {
      this.reportLoading = false;
      this.titleReport =
        this.province +
        " > " +
        this.district +
        " > " +
        this.houseofrepresentative +
        " > " +
        data;
      this.popbox = false;
      this.pradeshassemblyconstituency = data;
      this.getmunicipality({
        maindistrict: this.district,
        pradeshassemblyconstituency: data,
        houseofrepresentative: this.houseofrepresentative,
      });

      this.active6 = data;

      await this.reportGeneration({
        province: this.province,
        maindistrict: this.district,
        pradeshassemblyconstituency: data,
        houseofrepresentative: this.houseofrepresentative,
      });
      this.totalCount(this.allReportsTree);
      this.reportLoading = true;
    },
    async wardFunc(data) {
      this.titleReport =
        this.province +
        " > " +
        this.district +
        " > " +
        this.houseofrepresentative +
        " > " +
        this.pradeshassemblyconstituency +
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
    printa() {
      // this.exportPDF = "Download Now";
      this.showSomeTime = true;
      this.d.print(this.$refs.doc, [this.cssText]);
      setTimeout(() => {
        this.showSomeTime = false;
      }, 3000);
    },
    async lastFunc(data) {
      this.titleReport =
        this.province +
        " > " +
        this.district +
        " > " +
        this.houseofrepresentative +
        " > " +
        this.pradeshassemblyconstituency +
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
    this.fetchProvinceDistrictSelect();
    this.Printd = window.printd;
    this.d = new Printd();
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";

.listbtn {
  margin-left: 5px;
  margin-top: 10px;
  list-style: none;
  display: flex;
  li {
    padding: 10px 20px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    margin-right: 10px;
    background: $white;
  }
}
.maintitle {
  margin-left: 25px;
}
.backgroundfix {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
}
.nopadding {
  .col-md-12 {
    padding: 0 15px;
  }
}
.topbox {
  margin-top: 30px;
}

.posfix {
  background: white;
  position: fixed;
  height: 60px;
  width: 60px;
  box-shadow: 0 3px 5px rgb(0 0 0 / 20%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
}
.listcount {
  display: flex;
  position: relative;
  list-style: none;
  li {
    padding-left: 0;
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    width: 14.27%;
    text-align: center;
    margin-right: 10px;
    h3 {
      margin-top: 10px;
    }
  }
  margin-left: 0;
}
.listcountRow {
  position: relative;
  display: flex;
  list-style: none;
  flex-flow: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  //   left: 0;
  //   top: 100%;
  width: 100%;
  //   width: 15.5%;
  margin-top: 10px;
  li {
    //   width: 250px;
    margin-bottom: 10px;
    padding-left: 0;
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
    padding: 10px 0;
    text-align: center;
    margin-right: 10px;
    h3 {
      margin-top: 10px;
      padding: 0 40px;
    }
    h1 {
      border-top: 1px solid $white;
    }
  }
  margin-left: 0;
}
h1 {
  font-size: 30px;
}
li {
  cursor: pointer;
}
.activecolor {
  background: $secondary;
  color: $white;
  position: relative;
}
.districtbackground {
  margin: 0 25px;
  padding: 20px 0;
  h4 {
    text-align: center;
    font-size: 20px;
  }
  .listcountRow {
    h3 {
      font-size: 16px;
    }
    h1 {
      font-size: 25px;
    }
    li {
      margin-bottom: 20px;
    }
  }
}
.houseofrepresentativebg {
  margin: 0 25px;
  padding: 20px 0;
  .listcountRow {
    h3 {
      font-size: 16px;
    }
    h1 {
      font-size: 25px;
    }
  }
  h4 {
    text-align: center;
    font-size: 20px;
  }
}
.municipalitybg {
  margin: 0 25px;
  padding: 20px 0;
  h4 {
    text-align: center;
    font-size: 20px;
  }
  .listcountRow {
    li {
      h3 {
        font-size: 16px;
      }
      h1 {
        font-size: 25px;
      }
    }
  }
}

.wardbg {
  margin: 0 25px;
  padding: 20px 0;
  h4 {
    text-align: center;
    font-size: 20px;
  }
}
.active {
  background: $secondary !important;
  color: $white;
}

.popbox {
  position: fixed;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  top: 10px;
  left: 10px;
  bottom: 10px;
  right: 0;
  background: #fff;
  padding: 30px;
  header {
    ul {
      display: flex;
      list-style: none;
      justify-content: space-between;
    }
  }
  .bodysection {
    padding: 30px;
  }
}
.report-container {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
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
</style>
