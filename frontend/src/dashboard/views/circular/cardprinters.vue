<template>
  <div>
    <section>
      <v-container fluid style="padding: 15px 100px">
        <v-row>
          <v-btn class="btn btn-default" @click="printa">{{ exportPDF }}</v-btn>
        </v-row>
      </v-container>
      <v-container fluid style="padding: 15px 100px">
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
            <v-btn
              @click="filterActive"
              style="
                background: green;
                color: #fff;
                min-height: 50px;
                width: 200px;
              "
              >View</v-btn
            >
          </v-col>
          <v-col md="4">
            <div class="totalbox">
              कुल क्रियाशील सदस्यहरू
              <h2>{{ allActiveMemberTotal }}</h2>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid style="padding: 15px 100px" v-if="cardDefault">
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
                  <v-btn
                    @click="filterActive"
                    :loading="filterLoading"
                    style="
                      background: green;
                      color: #fff;
                      min-height: 50px;
                      width: 200px;
                    "
                    >Filter</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
      <section style="text-align: center; padding: 20em 0" v-if="filterLoading">
        <v-progress-circular indeterminate color="green"></v-progress-circular>
      </section>
      <section class="pdfbox" ref="doc" v-if="!filterLoading">
        <div
          class="relBoxCard"
          v-for="(body, index) in allFilterData.posts"
          :key="index"
        >
          <img
            :src="require(`@/assets/images/cardfinal.jpeg`)"
            alt
            v-if="cardDefault"
          />
          <img
            :src="require(`@/assets/images/cardbideshNew.jpg`)"
            alt
            v-if="!cardDefault"
          />
          <div class="absBox memberQRAbs" v-if="cardDefault">
            <img :src="body.qr" alt="" />
          </div>
          <div class="absBox workingformnumberAbs">
            <span>{{ body.workingformnumber }}</span>
          </div>
          <div class="absBox memberNameAbs">
            <span>{{ body.membername }}</span>
          </div>
          <div class="absBox memberAgeAbs">
            <span></span>
          </div>
          <div class="absBox memberNationalIdAbs">
            <span></span>
          </div>
          <div class="absBox memberAddressAbs">
            <span>{{ body.fullAddress }}</span>
          </div>
          <div class="absBox memberWardAbs" v-if="cardDefault">
            <span>{{ body.wardno }}</span>
          </div>
          <div class="absBox memberMuniAbs" v-if="cardDefault">
            <span>{{ body.municipality }}</span>
          </div>
          <div class="absBox memberPradeshAbs" v-if="cardDefault">
            <span>{{ body.pradeshassemblyconstituency }}</span>
          </div>
          <div class="absBox memberHouseAbs" v-if="cardDefault">
            <span>{{ body.houseofrepresentative }}</span>
          </div>
          <div class="absBox memberDistrictAbs" v-if="cardDefault">
            <span>{{ body.district.split("-")[0] }}</span>
          </div>
          <div class="absBox memberRegionAbs" v-if="cardDefault">
            <span>{{ changeProvince(body.region) }}</span>
          </div>

          <div class="absBox sign1" v-if="cardDefault">
            <img :src="allFilterData.signatures.signature1" alt />
          </div>
          <div class="absBox sign2" v-if="cardDefault">
            <img :src="allFilterData.signatures.signature2" alt />
          </div>
          <div class="absBox sign3" v-if="cardDefault">
            <img :src="allFilterData.signatures.signature3" alt />
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
// import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import { fileUrl, secureStorage } from "./../../../main";
import Printd from "printd";

export default {
  name: "ActiveMemberReport",
  components: {
    // TitleBreadCrumb,
  },
  data: () => ({
    title: "Active Member Report",
    baseUrl: fileUrl,
    limit: 100,
    skip: 1,
    userFrom: JSON.parse(secureStorage.getItem("cardUserData")).user.subDomain,
    limits: [
      10, 100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
    ],
    cardDefault: true,
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
    img{
      width:172.913px;
      height: 266.457px;
      object-fit:cover;
    }
    .no-header{
        display:none;
    }
    .no-print{
      display:none;
    }
    .pdfbox {


	 z-index: 9999;
     display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  top: 210px;
  left: 56px;
  font-size: 13px;
}
.memberQRAbs{
  top: 415px;
  left: 260px;
}

.absBox{
   font-weight: 700;
  color:#2D9132;
  position: absolute;
  
}
.memberNameAbs {
  font-size: 13px;
  top: 236px;
  left: 88px;
}
.memberAgeAbs {
  font-size: 13px;
  top: 260px;
  left: 120px;
}
.mobileNumber {
  font-size: 13px;
  top: 295px;
  left: 90px;
}
.memberNationalIdAbs {
  font-size: 13px;
  top: 323px;
  left: 120px;
}
.memberAddressAbs {
  font-size: 13px;
  top: 343px;
  left: 120px;
}
.memberWardAbs {
  font-size: 13px;
  top: 356px;
 left: 210px;
}

.memberMuniAbs {
  font-size: 13px;
  top: 386px;
  left: 100px;
}
.memberPradeshAbs {
  font-size: 13px;
  top: 414px;
  left: 160px;
}
.memberHouseAbs {
  font-size: 13px;
  top: 446px;
left: 162px;
}
.memberDistrictAbs {
  font-size: 13px;
  top: 473px;
  left:130px;
}
.memberRegionAbs {
  font-size: 13px;
  top: 503px;
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
    cssTextBidesh: `
    img{
      width:172.913px;
      height: 266.457px;
      object-fit:cover;
    }
    .no-header{
        display:none;
    }
    .no-print{
      display:none;
    }
    .pdfbox {


	 z-index: 9999;
     display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  top: 208px;
  left: 56px;
  font-size: 18px;
}
.memberQRAbs{
  top: 415px;
  left: 260px;
}

.absBox{
   font-weight: 700;
  color:#2D9132;
  position: absolute;
  
}
.memberNameAbs {
  font-size: 14px;
  top: 246px;
  left: 88px;
}
.memberAgeAbs {
  font-size: 13px;
  top: 270px;
  left: 120px;
}
.mobileNumber {
  font-size: 13px;
  top: 305px;
  left: 90px;
}
.memberNationalIdAbs {
  font-size: 13px;
  top: 333px;
  left: 120px;
}
.memberAddressAbs {
  font-size: 14px;
  top: 272px;
  left: 140px;
}
.memberWardAbs {
  font-size: 13px;
  top: 366px;
 left: 215px;
}

.memberMuniAbs {
  font-size: 13px;
  top: 396px;
  left: 100px;
}
.memberPradeshAbs {
  font-size: 13px;
  top: 424px;
  left: 165px;
}
.memberHouseAbs {
  font-size: 13px;
  top: 456px;
left: 102px;
}
.memberDistrictAbs {
  font-size: 13px;
  top: 483px;
  left:80px;
}
.memberRegionAbs {
  font-size: 13px;
  top: 513px;
  left:50px;
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
    filterLoading: true,
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
      secureStorage.removeItem("cardUserData");
      this.loggedActiveStorage = undefined;
    },
    getLimit() {
      this.fetchCircularAllCard(this.limit);
    },
    printa() {
      this.exportPDF = "Download Now";
      this.showSomeTime = true;
      this.d.print(this.$refs.doc, [
        this.cardDefault ? this.cssText : this.cssTextBidesh,
      ]);
      setTimeout(() => {
        this.showSomeTime = false;
      }, 5000);
    },

    ...mapActions([
      "fetchPages",
      "fetchCircularAllCard",
      "fetchProvinceDistrictActive",
      "fetchSubDomainSpecific",
      "fetchSubdomainProfileCard",
      "deleteCirculars",
      "filterDataCardPrinter",

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
        this.filterLoading = true;
        await this.filterActive();
        this.filterLoading = false;
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
    async filterActive() {
      this.filterLoading = true;
      let filterData = {};
      if (this.logged.user.nepname != undefined) {
        filterData.district = this.logged.user.nepname;
      }
      filterData.province = this.allsubdomainProfile.subdomains[0].province;

      if (this.allsubdomainProfile.subdomains[0].district.length <= 1) {
        filterData.houseofrepresentative =
          this.allsubdomainProfile.subdomains[0].district;
      } else {
        if (this.houseofrepresentative != undefined) {
          filterData.houseofrepresentative = this.houseofrepresentative.code;
        }
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
      if (this.memberType != undefined) {
        filterData.memberType = this.memberType;
      }
      if (this.limit != undefined) {
        filterData.limit = this.limit;
      }
      filterData.skip = this.skip;
      await this.filterDataCardPrinter(filterData);
      this.filterLoading = false;
    },

    async reset() {
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
        skip: this.skip,
      };

      await this.filterDataCardPrinter(filterData);
    },
  },
  async created() {
    await this.fetchProvinceDistrictActive();
    await this.fetchSubdomainProfileCard();
    if (secureStorage.getItem("cardUserData")) {
      this.loggedActiveStorage = JSON.parse(
        secureStorage.getItem("cardUserData")
      );
    } else {
      this.loggedActiveStorage = undefined;
    }

    this.Printd = window.printd;

    await this.fetchProvinceDistrictActive(this.loggedActiveStorage.user.nepname);
    this.d = new Printd();

    const { contentWindow } = this.d.getIFrame();

    contentWindow.addEventListener("beforeprint", () =>
      console.log("before print event!")
    );
    contentWindow.addEventListener("afterprint", () =>
      console.log("after print event!")
    );
    // this.initialize();
    // this.fetchPages();
    await this.fetchCircularAllCard(1);
    if (secureStorage.getItem("cardUserData")) {
      this.$store.state.user.loggedUser = JSON.parse(
        secureStorage.getItem("cardUserData")
      );
    }

    if (
      this.allsubdomainProfile.subdomains[0].category ==
      "Nepalese People's Co-ordination Committee"
    ) {
      this.cardDefault = false;
    }
    if (this.allsubdomainProfile.subdomains[0].district.length <= 1) {
      this.houseofrepresentative =
        this.allsubdomainProfile.subdomains[0].district;
      let filterData = {
        district: this.logged.user.nepname,
        province: this.allsubdomainProfile.subdomains[0].province,
        limit: 100,
        skip: this.skip,
      };
      await this.filterDataCardPrinter(filterData);
    } else {
      let filterData = {
        district: this.logged.user.nepname,
        province: this.allsubdomainProfile.subdomains[0].province,
        limit: 100,
        skip: this.skip,
      };
      await this.filterDataCardPrinter(filterData);
    }

    this.username =
      JSON.parse(secureStorage.getItem("cardUserData")).user.first_name +
      JSON.parse(secureStorage.getItem("cardUserData")).user.last_name +
      JSON.parse(secureStorage.getItem("cardUserData")).user.phone;

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
    this.filterLoading = false;
  },
};
</script>
<style lang="scss">
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
  will-change: 1332px;
  min-height: 900px;
  left: 100px;
  right: 100px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
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
  width: 272.913px;
  height: 466.457px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
.absBox {
  position: absolute;
}
.workingformnumberAbs {
  top: 158px;
  left: 30px;
  font-size: 8px;
}
.memberNameAbs {
  font-size: 8px;
  top: 183px;
  left: 60px;
}
.memberAgeAbs {
  font-size: 8px;
  top: 205px;
  left: 85px;
}
.mobileNumber {
  font-size: 8px;
  top: 228px;
  left: 65px;
}
.memberNationalIdAbs {
  font-size: 8px;
  top: 251px;
  left: 95px;
}
.memberAddressAbs {
  font-size: 8px;
  top: 296px;
  left: 70px;
}
.memberWardAbs {
  font-size: 8px;
  top: 272px;
  left: 138px;
}

.memberMuniAbs {
  font-size: 8px;
  top: 293px;
  left: 64px;
}
.memberPradeshAbs {
  font-size: 8px;
  top: 317px;
  left: 110px;
}
.memberHouseAbs {
  font-size: 8px;
  top: 338px;
  left: 122px;
}
.memberDistrictAbs {
  font-size: 8px;
  top: 380px;
  left: 60px;
}
.memberRegionAbs {
  font-size: 8px;
  top: 358px;
  left: 70px;
}
.memberQRAbs {
  top: 270px;
  left: 182px;
}
.sign1 {
  height: 45px;
  bottom: 34px;
  left: 18px;
  font-size: 8px;
  width: 80px;
  img {
    object-fit: contain;
    object-position: start;
  }
}
.sign2 {
  bottom: 34px;
  left: 100px;
  font-size: 8px;
  width: 80px;
  img {
    object-fit: contain;
    object-position: start;
  }
}

.sign3 {
  position: absolute;
  bottom: 34px;
  left: 185px;
  font-size: 8px;
  width: 80px;
  img {
    object-fit: contain;
    object-position: start;
  }
}
</style>
