<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col md="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col md="3">
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
              <v-col md="3">
                <label for>जिल्ला</label>
                <v-selection
                  v-model="district"
                  placeholder="जिल्ला"
                  :options="allDistrict"
                  label="name"
                  :filterable="true"
                  @input="selectDistrict(district)"
                ></v-selection>
              </v-col>
              <v-col md="3" v-if="district != ''">
                <label for>प्रतिनिधिसभा नि.क्षे.नं.</label>
                <v-selection
                  v-model="houseofrepresentative"
                  placeholder="प्रतिनिधिसभा नि.क्षे.नं."
                  :options="representatives"
                  label="code"
                  :filterable="true"
                  @input="regionFunc(houseofrepresentative)"
                ></v-selection>
              </v-col>
              <v-col md="3" v-if="district != ''">
                <label for>Member Type</label>
                <v-selection
                  v-model="memberType"
                  placeholder="Member Type"
                  :options="groupofs"
                  @input="changesActiveStatus"
                ></v-selection>
              </v-col>
              <v-col
                cols="12"
                class="btn-filter"
                v-if="!allLoadingActive && memberType != ''"
              >
                <v-btn @click="enableStatus" v-if="allActiveDataStatus.visible"
                  >Show On Public</v-btn
                >
                <v-btn @click="disableStatus" v-if="!allActiveDataStatus.visible"
                  >Hide On Public</v-btn
                >
             
                <v-btn @click="enableStatusEdit" v-if="allActiveDataStatus.edslt"
                  >Make Edit Enable</v-btn
                >
                <v-btn @click="disableStatusEdit" v-if="!allActiveDataStatus.edslt"
                  >Make Edit Disable</v-btn
                >
              </v-col>
              <v-col
                cols="12"
                class="btn-filter"
                v-if="allLoadingActive && memberType != ''"
              >
                Processing....
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col md="12">
          <v-data-table
            :headers="headers"
            :items="allactiveStatusAll"
            sort-by="sn"
            class="elevation-1"
            :search="search"
            single-line
          >
          
        <template v-slot:[`item.status`]="{ item }">
          <div v-if="item.status">Visible</div>
          <div v-if="!item.status">Invisible</div>
        </template>
        <template v-slot:[`item.editstatus`]="{ item }">
          <div v-if="item.editstatus">Enabled</div>
          <div v-if="!item.editstatus">Disabled</div>
        </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import { secureStorage } from "../../../main";
export default {
  name: "ActiveDataStatus",
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
    title: "Active Member Status",
    logged: undefined,
    memberType: "",
    groupofs: ["New", "Old"],
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Active Member Status",
      },
    ],
    allsubdomain: true,
    district: "",
    province: 1,
    search: "",
    dialog: false,
    provinceno: 1,
    valid: false,

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
    headers: [
      {
        text: "District",
        value: "district",
        sortable: false,
        width: "10%",
      },
      {
        text: "House Of Representative",
        value: "houseofrepresentative",
        sortable: false,
        width: "10%",
      },
      {
        text: "Member Type",
        value: "memberType",
        sortable: false,
        width: "10%",
      },
      {
        text: "Status",
        value: "status",
        sortable: false,
        width: "10%",
      },
      {
        text: "Enable Edit",
        value: "editstatus",
        sortable: false,
        width: "10%",
      },
      {
        text: "User Handle",
        value: "userHandle",
        sortable: false,
        width: "10%",
      },
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters([
      "allProvienceDistrict",
      "allProvices",
      "allDistrict",
      "allLoadingActive",
      "allActiveDataStatus",
      "allactiveStatusAll",
    ]),
  },

  methods: {
    ...mapActions([
      "fetchProvinceDistrict",
      "fetchProvinceDistrictProvince",
      "getReportsProvince",
      "getActiveDataStatus",
      "getVisibleFunc",
      "getActiveDataStatusAll",
    ]),

    editItem(item) {
      let route = `/dashboard/editsubdomain/${item._id}`;
      this.$router.push(route).catch((error) => console.log(error));
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    selectProvinceInTotal(data) {
      if (data.province != undefined) {
        this.provincenum = data.province;
      }
    },

    selectProvince(data) {
      if (data.province != undefined) {
        this.$store.dispatch(
          "fetchProvinceDistrictSelectProvice",
          data.province
        );
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
    changesActiveStatus() {
      this.getActiveDataStatus({
        district: this.district.name,
        houseofrepresentative: this.houseofrepresentative.code,
        memberType: this.memberType,
      });
    },
    switchLayout(e) {
      this.layout = e;
    },
    enableStatus() {
      this.getVisibleFunc({
        district: this.district.name,
        houseofrepresentative: this.houseofrepresentative.code,
        memberType: this.memberType,
        status: true,
      });
    },
    disableStatus() {
      this.getVisibleFunc({
        district: this.district.name,
        houseofrepresentative: this.houseofrepresentative.code,
        memberType: this.memberType,
        status: false,
      });
    },
    enableStatusEdit() {
      this.getVisibleFunc({
        district: this.district.name,
        houseofrepresentative: this.houseofrepresentative.code,
        memberType: this.memberType,
        editstatus: true,
      });
    },
    disableStatusEdit() {
      this.getVisibleFunc({
        district: this.district.name,
        houseofrepresentative: this.houseofrepresentative.code,
        memberType: this.memberType,
        editstatus: false,
      });
    },
  },
  created() {
    this.logged = JSON.parse(secureStorage.getItem("userData")).user.role;
    this.fetchProvinceDistrictProvince();
    this.getActiveDataStatusAll();
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
.greenbox {
  background: #2c9131;
  color: #fff;
}
.redbox {
  background: red;
}
</style>
