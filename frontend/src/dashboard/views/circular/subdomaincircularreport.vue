<template>
  <div>
    <section v-if="!loggedActiveStorage">
      <ActiveUserAuth />
    </section>
    <section v-if="loggedActiveStorage">
      <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
      <v-container fluid>
        <v-row>
          <v-btn class="btn" @click="logoutActive">Logout</v-btn>
        </v-row>
      </v-container>

      <v-container fluid v-if="memberType == 'Old' || memberType == 'New'">
        <v-row>
          <!-- <download-csv :data="json_data" name="filename.csv">
            <v-btn class="btn btn-default">Download CSV</v-btn>
          </download-csv> -->
          <v-btn class="btn btn-default" @click="printa">{{ exportPDF }}</v-btn>
        </v-row>
      </v-container>
      <v-container fluid>
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
            <v-btn @click="filterActive" v-if="!allloadingActive">View</v-btn>
            <span v-if="allloadingActive">
              <img
                :src="require(`@/assets/images/icons/la.svg`)"
                alt
                class="loading"
                width="50px"
              />
            </span>
          </v-col>
          <v-col md="4">
            <div class="totalbox">
              कुल क्रियाशील सदस्यहरू
              <h2>{{ allActiveMemberTotal }}</h2>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid>
        <v-row>
          <v-col md="12">
            <v-form ref="form" lazy-validation>
              <v-row>
                <v-col
                  md="2"
                  v-if="
                    allsubdomainProfile.subdomains != undefined &&
                      allsubdomainProfile.subdomains[0].district.length > 1
                  "
                >
                  <label for>प्रतिनिधिसभा नि.क्षे.नं.</label>
                  <v-selection
                    v-model="houseofrepresentative"
                    placeholder="प्रतिनिधिसभा नि.क्षे.नं."
                    :options="allRepresentative"
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
                <v-col md="2">
                  <label for>लिङ्ग</label>
                  <v-selection
                    v-model="gender"
                    :options="genders"
                  ></v-selection>
                </v-col>
                <v-col md="2">
                  <label for>समावेशी समूह</label>
                  <v-selection
                    v-model="inclusivegroup"
                    placeholder="समावेशी समूह"
                    :options="inclusivegroups"
                  ></v-selection>
                </v-col>

                <v-col md="2">
                  <label for>Member Type</label>
                  <v-selection
                    v-model="memberType"
                    placeholder="Member Type"
                    :options="groupofs"
                  ></v-selection>
                </v-col>
                <v-col cols="12">
                  <v-btn @click="filterActive">Filter</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
      <section class="pdfbox" ref="doc" v-if="showSomeTime">
        <ul class="imageheader">
          <li>
            <img :src="require(`@/assets/images/flag.jpg`)" alt />
          </li>
          <li>
            <h1>नेपाली कांग्रेसको</h1>
            <h2>कृयासिल सदस्यताको नामावली</h2>
            <ul class="fromdata">
              <li>
                <strong>प्रकार</strong>
                : <span v-if="memberType != 'Old'">नयाँ </span>
                <span v-if="memberType != 'New'">नविकारण </span>
              </li>
              <li v-if="logged.user.nepname != undefined">
                <strong>जिल्ला</strong>
                : {{ logged.user.nepname }}
              </li>

              <li
                v-if="
                  allsubdomainProfile.subdomains[0].district != undefined &&
                    houseofrepresentative != ''
                "
              >
                <strong>प्रतिनिधिसभा नि.क्षे.नं.</strong>
                : {{ houseofrepresentative.code }}
              </li>

              <li v-if="pradeshassemblyconstituency.code != undefined">
                <strong>प्रदेश सभा क्षेत्र</strong>
                : {{ pradeshassemblyconstituency.code }}
              </li>
              <li v-if="municipality.name != undefined">
                <strong>न.पा./गा.पा.</strong>
                : {{ municipality.name }}
              </li>
              <li v-if="wardno != null">
                <strong>वडा नं.</strong>
                : {{ wardno }}
              </li>
              <li v-if="inclusivegroup != null">
                <strong>समावेशी समूह</strong>
                : {{ inclusivegroup }}
              </li>
              <li v-if="gender != null">
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
              <th>क्र.स.</th>
              <th v-if="memberType == 'Old'">पुरानो क्रियाशील नं.</th>
              <th v-if="memberType == 'New'">फारम नं.</th>
              <th>पुरा नाम थर</th>
              <th>वावु / आमाको नाम</th>
              <th>पति / पत्निको नाम</th>
              <th>लिङ्ग</th>
              <th>उमेर</th>
              <th>समावेशी समूह</th>
              <th>पेशा</th>
              <th>कैफियत</th>
              <th v-if="houseofrepresentative == ''">
                प्रतिनिधिसभा नि.क्षे.नं.
              </th>
              <th v-if="pradeshassemblyconstituency == ''">
                प्रदेश सभा नि.क्षे.नं.
              </th>
              <th v-if="municipality == ''">न.पा./गा.पा.को नाम</th>
              <th v-if="wardno == null">वडा नं.</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(body, index) in allFilterData.posts" :key="index">
              <!-- <td
                v-if="
                  !allFilterData.posts[allFilterData.posts.length - 1].subdomainStatus ||
                    logged.user.role == 'admin'
                "
              >
                {{ body.workingformnumber }}
              </td> -->
              <td>{{ index + 1 }}</td>
              <td v-if="memberType == 'Old'">
                {{ body.workingformnumberold }}
              </td>
              <td v-if="memberType == 'New'">
                {{ body.formNumber }}
              </td>
              <td>{{ body.membername }}</td>
              <td>{{ body.fathermothername }}</td>
              <td>{{ body.husbandwifename }}</td>
              <td>{{ body.gender }}</td>
              <td>{{ body.age }}</td>
              <td>{{ body.inclusivegroup }}</td>
              <td>{{ body.profession }}</td>
              <td>{{ body.kaifiyat }}</td>
              <td v-if="houseofrepresentative == ''">
                {{ body.houseofrepresentative }}
              </td>
              <td v-if="pradeshassemblyconstituency == ''">
                {{ body.pradeshassemblyconstituency }}
              </td>
              <td v-if="municipality == ''">{{ body.municipality }}</td>
              <td v-if="wardno == null">{{ body.wardno }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <v-data-table
        v-if="!showSomeTime"
        :headers="headers"
        :items="allFilterData.posts"
        sort-by="sn"
        class="elevation-1"
        single-line
        hide-details
      >
        <template v-slot:[`item.actions`]="{ item }">
          <div
            class="actionbtn"
            v-if="userFrom == item.userHandle && allOptionAction.optionAction"
          >
            <!--&& item.subdomainStatus-->
            <i class="fa fa-pencil" @click="editItem(item)"></i>

            <i
              class="fa fa-trash btn-trash"
              v-if="userFrom == item.userHandle"
              @click="deleteItem(item)"
            ></i>
          </div>
        </template>
      </v-data-table>
    </section>
  </div>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import { fileUrl, secureStorage } from "./../../../main";
import Printd from "printd";
import ActiveUserAuth from "./activeUserAuth";

export default {
  name: "ActiveMemberReport",
  components: {
    TitleBreadCrumb,
    ActiveUserAuth,
  },
  data: () => ({
    title: "Active Member Report",
    baseUrl: fileUrl,
    limit: 100,
    userFrom: JSON.parse(secureStorage.getItem("activeUserData")).user
      .subDomain,
    limits: [
      10,
      100,
      500,
      1000,
      2000,
      3000,
      4000,
      5000,
      6000,
      7000,
      8000,
      9000,
      10000,
    ],
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Active Member Report",
      },
    ],
    json_data: [],
    search: "",
    dialog: false,
    headers: [
      { text: "क्र.स", value: "__v", width: "2%" },
      {
        text: "क्रियाशील फारम नं.",
        value: "workingformnumber",
        sortable: false,
        width: "10%",
      },
      {
        text: "सदस्यको नाम .",
        value: "membername",
        sortable: false,
        width: "10%",
      },
      { text: "मोवाइल नं.", value: "phone", sortable: false, width: "10%" },
      { text: "इमेल", value: "email", sortable: false, width: "10%" },
      {
        text: "उमेर",
        align: "start",
        sortable: false,
        value: "age",
        width: "10%",
      },

      {
        text: "लिङ्ग",
        align: "start",
        sortable: false,
        value: "gender",
        width: "10%",
      },

      {
        text: "सबडोमेन",
        align: "start",
        sortable: false,
        value: "userHandle",
        width: "10%",
      },
      { text: "Actions", value: "actions", sortable: false, width: "10%" },
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
    single: "",
    district: "",
    showSomeTime: false,
    headings: [
      "क्र.स.",
      "पुरानो क्रियाशील  नं.",
      "पुरा नाम थर",
      "वावु / आमाको नाम",
      "पति / पत्निको नाम",
      "लिङ्ग",
      "उमेर",
      "समावेशी समूह",
      "पेशा",
      "कैफियत",
    ],
    headingbase: [
      "क्र.स.",
      "पुरा नाम थर",
      "वावु / आमाको नाम",
      "पति / पत्निको नाम",
      "लिङ्ग",
      "उमेर",
      "समावेशी समूह",
      "पेशा",
      "कैफियत",
    ],
    headingsnew: [
      "क्र.स.",
      "फारम नं.",
      "पुरा नाम थर",
      "वावु / आमाको नाम",
      "पति / पत्निको नाम",
      "लिङ्ग",
      "उमेर",
      "समावेशी समूह",
      "पेशा",
      "कैफियत",
    ],
    headingsnotitle: [
      "सदस्यको नाम .",
      "वावु / आमाको नाम",
      "पति / पत्निको नाम",
      "उमेर",
      "पेशा",
      "लिङ्ग",
      "प्रदेश",
      "जिल्ला",
      "प्रतिनिधिसभा नि.क्षे.नं.",
      "प्रदेश सभा नि.क्षे.नं.",
      "न.पा./गा.पा.को नाम",
      "वडा नं.",
      "समावेशी समूह",
    ],
    cssText: `
    .pdfbox {

	 background: white;
	 z-index: 9999;

}
 .pdfbox table {
	 width: 100%;
	 border-collapse: collapse;
}
 .pdfbox table th {
	 font-size: 11px;
	 text-align: left;
	 padding: 3px;
}
 .pdfbox table td {
	 font-size: 11px;
	 padding: 3px;
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
    gender: undefined,
    region: "",
    regions: [],
    municipalities: [],
    municipality: "",
    wards: [],
    wardno: undefined,
    groupof: undefined,
    groupofs: ["New", "Old"],
    houseofrepresentative: "",
    pradeshassemblyconstituency: "",
    genders: ["महिला", "पुरुष", "अन्य"],
    ftl: {},
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
    inclusivegroup: undefined,
    memberType: undefined,
    loggedActiveStorage: undefined,
    exportPDF: "Export To PDF",
    // logged: undefined,
    username: null,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters([
      "allDashCategories",
      "allPage",
      "logged",
      "allactivememberOldNew",
      "allActiveMemberTotal",
      "allRepresentative",
      "allFilterData",
      "allActiveMember",
      "allloadingActive",
      "allsubdomainProfile",
      "allOptionAction",
    ]),
  },

  methods: {
    fillData() {
      this.datacollection = {
        labels: [0, this.getRandomInt()],
        datasets: [
          {
            label: "New Active Member",
            backgroundColor: "rgba(80,171,241,0.5)",
            data: [0, this.getRandomInt()],
          },
          {
            label: "Renew Active Member",
            backgroundColor: "rgba(218,31,39,0.5)",
            data: [0, this.getRandomInt()],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (30 - 5 + 1)) + 5;
    },
    logoutActive() {
      secureStorage.removeItem("activeUserData");
      this.loggedActiveStorage = undefined;
    },
    getLimit() {
      this.fetchCircularAll(this.limit);
    },
    printa() {
      this.exportPDF = "Download Now";
      this.showSomeTime = true;
      this.d.print(this.$refs.doc, [this.cssText]);
      setTimeout(() => {
        this.showSomeTime = false;
      }, 3000);
    },
    ...mapActions([
      "fetchPages",
      "fetchCircularAll",
      "fetchProvinceDistrict",
      "fetchSubDomainSpecific",
      "fetchSubdomainProfile",
      "deleteCirculars",
    ]),
    viewCircular(item) {
      this.single = item;
    },
    initialize() {
      this.desserts = this.allDashCategories.desserts;
    },
    editItem(item) {
      this.$router.push(`/dashboard/updateActiveMember/${item._id}`);
    },
    async deleteItem(item) {
      if (confirm("के तपाई यस बारे निश्चित हुनुहुन्छ?")) {
        await this.deleteCirculars(item._id);
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
    closepopup() {
      this.single = "";
    },
    finalSubmit() {
      location.reload();
      this.$store.dispatch("submitActiveMember");
    },
    selectDistrict(data) {
      if (data.name != undefined) {
        this.$store.dispatch("fetchProvinceDistrictSelect", data.name);
      }
    },
    regionFunc(code) {
      if (
        this.allsubdomainProfile.subdomains != undefined &&
        this.allsubdomainProfile.subdomains[0].district.length > 1
      ) {
        if (code.code != undefined) {
          this.allRepresentative.forEach((ele) => {
            if (ele.code == code.code) {
              this.regions = ele.region;
            }
          });
        }
      } else {
        this.allRepresentative.forEach((ele) => {
          if (ele.code == this.allsubdomainProfile.subdomains[0].district) {
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
    filterActive() {
      let filterData = {};
      if (this.logged.user.nepname != undefined) {
        filterData.district = this.logged.user.nepname;
      }
      if (this.allsubdomainProfile.subdomains[0].district.length <= 1) {
        filterData.houseofrepresentative = this.allsubdomainProfile.subdomains[0].district;
      } else {
        if (this.houseofrepresentative != undefined) {
          filterData.houseofrepresentative = this.houseofrepresentative.code;
        }
      }

      if (this.pradeshassemblyconstituency.code != undefined) {
        filterData.pradeshassemblyconstituency = this.pradeshassemblyconstituency.code.toString();
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
      if (this.memberType != undefined) {
        filterData.memberType = this.memberType;
      }
      if (this.limit != undefined) {
        filterData.limit = this.limit;
      }
      this.$store.dispatch("filterData", filterData);
    },

    reset() {
      this.district = this.logged.user.nepname;
      this.inclusivegroup = "";
      this.wardno = "";
      this.gender = "";
      this.houseofrepresentative = "";
      this.pradeshassemblyconstituency = "";
      this.municipality = "";
      let filterData = {
        district: this.logged.user.nepname,
        houseofrepresentative: undefined,
        pradeshassemblyconstituency: undefined,
        municipality: undefined,
        wardno: undefined,
        inclusivegroup: undefined,
        memberType: undefined,
        limit: this.limit,
      };

      this.$store.dispatch("filterData", filterData);
    },
  },
  async created() {
    this.fetchProvinceDistrict();
    this.fetchSubdomainProfile();
    // this.logged = JSON.parse(secureStorage.getItem("userData"));
    if (secureStorage.getItem("activeUserData")) {
      this.loggedActiveStorage = secureStorage.getItem("activeUserData");
    } else {
      this.loggedActiveStorage = undefined;
    }

    this.Printd = window.printd;

    this.fetchProvinceDistrict(this.logged.user.nepname);
    this.d = new Printd();

    const { contentWindow } = this.d.getIFrame();

    contentWindow.addEventListener("beforeprint", () =>
      console.log("before print event!")
    );
    contentWindow.addEventListener("afterprint", () =>
      console.log("after print event!")
    );
    this.initialize();
    this.fetchPages();
    await this.fetchCircularAll(this.limit);
    if (secureStorage.getItem("userData")) {
      this.$store.state.user.loggedUser = JSON.parse(
        secureStorage.getItem("userData")
      );
    }

    setTimeout(() => {
      if (this.allsubdomainProfile.subdomains[0].district.length <= 1) {
        this.houseofrepresentative = this.allsubdomainProfile.subdomains[0].district;
        let filterData = {
          district: this.logged.user.nepname,
          houseofrepresentative: this.allsubdomainProfile.subdomains[0]
            .district,
          limit: 100,
        };
        this.$store.dispatch("filterData", filterData);
      } else {
        let filterData = {
          district: this.logged.user.nepname,
          limit: 100,
        };
        this.$store.dispatch("filterData", filterData);
      }

      this.username =
        JSON.parse(secureStorage.getItem("activeUserData")).user.first_name +
        JSON.parse(secureStorage.getItem("activeUserData")).user.last_name +
        JSON.parse(secureStorage.getItem("activeUserData")).user.phone;

      this.regionFunc(1);
      this.allactivememberOldNew.forEach((element) => {
        this.json_data.push({
          "क्रियाशील फारम नं.": JSON.stringify(element.workingformnumber),
          "सदस्यको नाम .": element.membername,
          "वावु / आमाको नाम .": element.fathermothername,
          "पति / पत्निको नाम": element.husbandwifename,
          उमेर: element.age,
          पेशा: element.profession,
          लिङ्ग: element.gender,
          प्रदेश: element.region,
          जिल्ला: element.district,
          "प्रतिनिधिसभा नि.क्षे.नं.": element.houseofrepresentative,
          "प्रदेश सभा क्षेत्र": element.pradeshassemblyconstituency,
          "न.पा./गा.पा.": element.municipality,
          "वडा नं.": element.wardno,
          "समावेशी समूह": element.inclusivegroup,
          "साविक प्रतिनिधि सभा क्षे.नं.": element.froRconstituencyNo,
          "साविक न.पा./गा.वि.स": element.savikmunicipality,
          "साविक वडा नं.": element.savikwardno,
          "मोवाइल नं.": element.phone,
          इमेल: element.email,
          कैफियत: element.kaifiyat,
        });
      });
    }, 2000);
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
.btn {
  background: $secondary !important;
  color: $white !important;
  margin-left: 15px;
}
.pdfbox {
  // position: fixed;
  left: 100px;
  right: 100px;
  background: white;
  z-index: 9999;
  padding: 30px;

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
  &-primary {
    margin-top: 30px;
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
.totalbox {
  border: 1px solid gray;
  text-align: center;
}
.actionbtn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  i {
    display: block;
    width: 40px;
    cursor: pointer;
  }
}
</style>
