<template>
  <div>
    <div v-if="loading" class="loadingBox">
      <v-progress-circular
        indeterminate
        color="green"
        height="5"
        class="mb-4"
      ></v-progress-circular>
     
    </div>
    <div v-if="!loading">
      <section v-if="!loggedActiveStorage && logged.user.role == 'subdomain'">
        <ActiveUserAuth />
      </section>
      <section v-if="loggedActiveStorage || logged.user.role != 'subdomain'">
        <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
        <v-container fluid v-if="logged.user.role == 'subdomain'">
          <v-row>
            <v-btn class="btn" @click="logoutActive">Logout</v-btn>
          </v-row>
        </v-container>
        <template v-if="allCircular.length > 0"> </template>

        <section class="pdfbox" ref="doc" v-if="showSomeTime">
          <ul class="imageheader">
            <li>
              <img :src="require(`@/assets/images/flag.jpg`)" alt />
            </li>
            <li>
              <h1>नेपाली कांग्रेसको</h1>
              <h2>कृयासिल सदस्यताको नामावली</h2>
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
              <tr v-for="(body, index) in allCircular" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ body.workingformnumber }}</td>
                <td>{{ body.membername }}</td>
                <td>{{ body.fathermothername }}</td>
                <td>{{ body.husbandwifename }}</td>
                <td>{{ body.age }}</td>
                <td>{{ body.profession }}</td>
                <td>{{ body.gender }}</td>
                <td>{{ body.region }}</td>
                <td>{{ body.district }}</td>
                <td>{{ body.houseofrepresentative }}</td>
                <td>{{ body.pradeshassemblyconstituency }}</td>
                <td>{{ body.municipality }}</td>
                <td>{{ body.wardno }}</td>
                <td>{{ body.inclusivegroup }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <v-container v-if="!showSomeTime" fluid>
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
              <v-btn @click="getLimit" v-if="!allloadingActive">View</v-btn>
              <span v-if="allloadingActive">
                <img
                  :src="require(`@/assets/images/icons/la.svg`)"
                  alt
                  class="loading"
                  width="50px"
                />
              </span>
            </v-col>
            <v-col>
              <div class="totalbox">
                कुल नयाँ क्रियाशील सदस्यहरू
                <h2>{{ allActiveTotal }}</h2>
              </div>
            </v-col>
            <v-col md="4">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <TableCongress
          :list="allCircular && allCircular.posts"
          :headers="headers"
          :pagination="allCircular && allCircular.pagination"
          memberType="New"
        />

        <div class="popupbox" v-if="single != ''">
          <PopViewCircularSingle :single="single" @clickBox="closepopup" />
        </div>
        <template v-if="allCircular.length > 0 && hasChetra != 'Yes'">
          <center
            v-if="
              allCircular[allCircular.length - 1].subdomainStatus &&
              logged.user.role != 'admin'
            "
          >
            <h4>
              यहाँ ले entry गर्नु भएको क्रियासिल सदस्यको विवरण, नेपाली कांग्रेस
              केन्द्र लाई बुझाउन, यहाँ click गर्नुहोस।
            </h4>
            <h5>
              (केन्द्र लाई बुझाउनु भए पश्चात यहाँ ले edit वा delete केही गर्न
              मिल्दैन)
            </h5>
            <v-btn
              class="btn btn-primary"
              @click="finalSubmit"
              v-if="logged.user.role != 'admin'"
              >Final Submission</v-btn
            >
          </center>
        </template>

        <UpdateMemberShipFormVue
          v-if="popupupdate"
          :data="circulardata"
          @closePopup="closePopupUpdate"
        />
      </section>
    </div>
  </div>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import { fileUrl, secureStorage } from "./../../../main";
import html2pdf from "html2pdf.js";
import NepaliDate from "nepali-date-converter";
import { parseISO } from "date-fns";
import moment from "moment";
import PopViewCircularSingle from "../../components/circular/PopViewCircularSingle";
import TableCongress from "../../components/circular/TableCongress";
import Printd from "printd";
import ActiveUserAuth from "./activeUserAuth";
import UpdateMemberShipFormVue from "../../components/circular/UpdateMemberShipForm.vue";

export default {
  name: "Circular",
  components: {
    TitleBreadCrumb,
    ActiveUserAuth,
    UpdateMemberShipFormVue,
    PopViewCircularSingle,
    TableCongress,
  },
  data() {
    return {
      title: "New Active Member",
      baseUrl: fileUrl,
      showSomeTime: false,
      circulardata: undefined,
      headings: [
        "क्र.स.",
        "क्रियाशील नं.",
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
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Active Member",
        },
      ],
      json_data: [],
      search: "",
      dialog: false,
      headers: [
        { text: "क्र.स.", value: "__v", width: "2%" },
        {
          text: "क्रियाशील नं.",
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
        {
          text: "न.पा./गा.पा.",
          value: "municipality",
          sortable: false,
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
        {
          text: "मिति",
          align: "start",
          sortable: false,
          value: "createdAt",
          width: "10%",
        },
        {
          text: "प्रयोगकर्ता",
          align: "start",
          sortable: false,
          value: "userName",
          width: "10%",
        },
        { text: "Actions", value: "actions", sortable: false, width: "20%" },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        content: "",
      },
      page: 1,
      limit: 100,
      defaultItem: {
        name: "",
        content: "",
      },
      single: "",
      hasChetra: JSON.parse(secureStorage.getItem("userData")).user.hasChetra,
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
      `,
      limits: [
        10, 100, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
      ],
      loggedActiveStorage: undefined,
      exportPDF: "Export To PDF",
      popupupdate: false,
      loading: true,
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters([
      "allDashCategories",
      "allPage",
      "logged",
      "allCircular",
      "allloadingActive",
      "allActiveTotal",
      "loggedActive",
      "allOptionAction",
    ]),
  },
  methods: {
    selectCircular(data) {
      this.popupupdate = true;
      this.circulardata = data;
    },
    closePopupUpdate() {
      this.popupupdate = false;
    },
    deleteBtn(item) {
      if (confirm()) {
        this.$store.dispatch("deleteCirculars", item._id);
      } else {
        alert("Not Deleted");
      }
    },
    logoutActive() {
      secureStorage.removeItem("activeUserData");
      this.loggedActiveStorage = undefined;
    },
    getLimit() {
      this.fetchCircular(this.limit);
    },
    printa() {
      this.exportPDF = "Download Now";
      this.showSomeTime = true;
      this.d.print(this.$refs.doc, [this.cssText]);
      this.showSomeTime = false;
      this.exportPDF = "Export To PDF";
    },
    exportToPDF() {
      this.showSomeTime = true;
      html2pdf(this.$refs.document, {
        filename: "document.pdf",
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      });
      this.showSomeTime = false;
    },
    ...mapActions(["fetchPages", "fetchCircular"]),
    viewCircular(item) {
      this.single = item;
    },
    initialize() {
      this.desserts = this.allDashCategories.desserts;
    },
    editItem(item) {
      this.$router.push(`/dashboard/updateActiveMember/${item._id}`);
    },
    activeItem(item) {
      this.$router.push(`/dashboard/activeMember/${item._id}`);
    },
    deleteItem(item) {
      if (confirm("Are you sure ? You want to delete")) {
        this.$store.dispatch("deletePage", item._id);
        this.initialize();
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
      if (
        confirm(
          "Are you sure ? After submitting this final report you won't be able to update the data or delete it."
        )
      ) {
        this.$store.dispatch("submitActiveMember");
        location.reload();
      }
    },
    changeDate(datehere) {
      let np = new NepaliDate(parseISO(datehere));
      return np.format("ddd DD, MMMM YYYY", "np");
    },
    changeTime(datehere) {
      return moment(datehere).format("LTS");
    },
  },
  async created() {
    if (secureStorage.getItem("activeUserData")) {
      this.loggedActiveStorage = secureStorage.getItem("activeUserData");
    } else {
      this.loggedActiveStorage = undefined;
    }

    this.Printd = window.printd;
    this.d = new Printd();
    const { contentWindow } = this.d.getIFrame();

    contentWindow.addEventListener("beforeprint", () =>
      console.log("before print event!")
    );
    contentWindow.addEventListener("afterprint", () =>
      console.log("after print event!")
    );

    await this.fetchCircular({
      limit: this.limit,
      page: this.page,
      memberType: "New",
    });
    
    if (secureStorage.getItem("userData")) {
      this.$store.state.user.loggedUser = JSON.parse(
        secureStorage.getItem("userData")
      );
    }
    
    this.loading = false;
    
    // Process the data immediately instead of using setTimeout
    if (this.allCircular && this.allCircular.length) {
      this.allCircular.forEach((element) => {
        this.json_data.push({
          "क्रियाशील नं.": JSON.stringify(element.workingformnumber),
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

      this.limits.push(this.allActiveTotal);
    }
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
.btn-trash {
  padding: 10px;
  cursor: pointer;
}
.fa-print {
  padding: 10px;
  cursor: pointer;
}
.mdi {
  padding: 10px;
  top: 0 !important;
}
.btn {
  background: $secondary !important;
  color: $white !important;
  margin-left: 15px;
}
.totalbox {
  border: 1px solid gray;
  text-align: center;
}
center {
  h4 {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  h5 {
    margin-bottom: -5px;
  }
}
.singleCard {
  border: 1px solid;
  width: 80%;
  padding: 20px;
  margin: 0 5px;
  .imageheader {
    margin-bottom: 20px;
  }
  ul {
    display: flex;
    align-items: center;
    width: 100%;
    list-style: none;
    margin-left: 0;
    justify-content: space-between;
    li {
      &:first-of-type {
        img {
          width: 80px;
        }
      }
      &:last-of-type {
        img {
          object-fit: contain;
          width: 100px;
        }
      }
    }
  }
  h1 {
    text-align: center;
  }
  .flexfooter {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
}
.btn-add {
  margin: 20px;
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
  z-index: 9999;
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
.renewBtn {
  background: #ff0000;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 12px;
  text-decoration: none;
}
.loadingBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
