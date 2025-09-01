<template>
  <div>
    <section v-if="false">
      <ActiveUserAuth />
    </section>
    <section>
      <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />

      <template>
        <v-btn class="btn btn-default" @click="printa">Export to PDF</v-btn>
      </template>
      <div class="boxdiv" ref="doc">
        <div class="singleCard">
          <ul class="imageheader">
            <li>
              <img :src="require(`@/assets/images/flag.jpg`)" alt />
            </li>
            <li>
              <h1>नेपाली कांग्रेसको</h1>
              <h1>क्रियाशील सदस्यता</h1>
              <h1>प्रमाण पत्र</h1>
            </li>
            <li>
              <img
                v-if="allSingleActiveMember.images && allSingleActiveMember.images.length <= 0"
                :src="require(`@/assets/images/tree.png`)"
                alt
              />
              <img
                v-if=" allSingleActiveMember.images && allSingleActiveMember.images.length > 0"
                ref="document"
                :src="baseUrl + allSingleActiveMember.images[0].fileUrl"
                alt
                width="50"
              />
            </li>
          </ul>
          <div>
            <p>
              क्रियाशील सदस्यता न.:
              <strong>{{ allSingleActiveMember.workingformnumber }}</strong>
            </p>
          </div>
          <div>
            <p>
              नाम :
              <strong>{{ allSingleActiveMember.membername }}</strong>
              वावु/पति/पत्नीको नाम :
              <strong
                >{{ allSingleActiveMember.fathermothername }} ,
                {{ allSingleActiveMember.husbandwifename }}</strong
              >
              उमेर : <strong>{{ allSingleActiveMember.age }}</strong> मतदाता
              क्र.स. ........ नेपाली नागरिकता नं. .............. ठेगाना :
              ................................... टोल,
              <strong>{{ allSingleActiveMember.wardno }}</strong> नं.
              गाउँ/नगरपालिका वडा,
              <strong>{{ allSingleActiveMember.municipality }}</strong>
              गाउँ/नगरपालिका,
              <strong>{{
                allSingleActiveMember.pradeshassemblyconstituency
              }}</strong>
              नं प्रदेश सभा क्षेत्र,
              <strong>{{ allSingleActiveMember.froRconstituencyNo }}</strong>
              नं. प्रतिनिधि सभा क्षेत्र,
              <strong>{{ allSingleActiveMember.froRconstituencyNo }}</strong>
              जिल्ला,
              <strong>{{ allSingleActiveMember.district }}</strong> प्रदेश
              <strong>{{ allSingleActiveMember.region }}</strong>
            </p>
          </div>
          <div>क्रियाशील सदस्यता प्रदान गर्ने,</div>
          <div class="flexfooter">
            <div>
              <p>सभापति</p>
              <p>जिल्ला कार्यसमिति</p>
            </div>
            <div>
              <p>सभापति</p>
              <p>प्रदेश कार्यसमिति</p>
            </div>
            <div>
              <p>सभापति</p>
              <p>केन्द्रीय कार्यसमिति</p>
            </div>
          </div>
          <div v-html="qrcode"></div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import { fileUrl } from "./../../../main";
import html2pdf from "html2pdf.js";
// import Downloadabletable from "../../components/DownloadableTable";
import Printd from "printd";
import ActiveUserAuth from "./activeUserAuth";
export default {
  name: "Circular",

  components: {
    TitleBreadCrumb,
    ActiveUserAuth,
    // Downloadabletable
  },
  data: () => ({
    title: "Active Member",
    baseUrl: fileUrl,
    showSomeTime: false,
    headings: [
      "क्रियाशील फारम नं.",
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
      "समावेशी समूह",
      "वडा नं.",
      "साविक प्रतिनिधि सभा क्षे.नं.",
    ],
    cssText: `
      .singleCard {
	 width: 95%;
	 height: 500px;
	 border: 1px solid;
	 padding: 20px;
	 margin: 20px auto;
}
 .singleCard .imageheader {
	 margin-bottom: 20px;
}
 .singleCard p {
	 line-height: 20px;
}
 .singleCard ul li {
  	 line-height: 20px;
 }
 .singleCard ul {
	 display: flex;
	 align-items: center;
	 width: 100%;
	 list-style: none;
	 margin-left: 0;
	 justify-content: space-between;
}
 .singleCard ul li img {
     width: 80px;
}
 .singleCard ul li:last-of-type img {
     width: 80px;
     margin-right:50px;
}
 .singleCard h1 {
	 text-align: center;
}
 .singleCard .flexfooter {
	 margin-top: 20px;
	 display: flex;
	 justify-content: space-between;
}
    `,
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
    qrcode: undefined,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters([
      "allDashCategories",
      "allSingleActiveMember",
      "allCircularQr",
    ]),
  },

  methods: {
    printa() {
      this.d.print(this.$refs.doc, [this.cssText]);
    },
    exportToPDF() {
      this.showSomeTime = true;
      setTimeout(() => {
        html2pdf(this.$refs.document, {
          filename: "activeMemberCard.pdf",

          jsPDF: { unit: "in", format: "A5", orientation: "landscape" },
        });
      }, 100);
      setTimeout(() => {
        this.showSomeTime = false;
      }, 3000);
    },
    ...mapActions(["fetchSingleActiveMember", "getQrCode"]),

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
    async qrCodeGene() {
      await this.getQrCode();
      this.qrcode = this.allCircularQr;
    },
  },
  created() {
    this.fetchSingleActiveMember(this.$route.params.id);
    console.log("when component is mounted!");

    this.Printd = window.printd;

    this.d = new Printd();

    const { contentWindow } = this.d.getIFrame();

    contentWindow.addEventListener("beforeprint", () =>
      console.log("before print event!")
    );
    contentWindow.addEventListener("afterprint", () =>
      console.log("after print event!")
    );
    this.qrCodeGene();
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
.printing {
  font-family: sans-serif;
  max-width: 600px;
  border: solid 1px #ccc;
  text-align: center;
  padding: 1em;
  margin: 2em auto;
}

button {
  background-color: #f0f0f0;
  border: solid 1px #bbb;
  padding: 10px;
  font-size: 15px;
  border-radius: 5px;
}

pre {
  color: #c7254e;
}

.singleCard {
  width: 100%;
  height: 500px;
  border: 1px solid;
  padding: 20px;
  margin: 20px auto;
  .imageheader {
    margin-bottom: 20px;
  }
  p {
    line-height: 30px;
  }
  ul {
    display: flex;
    align-items: center;
    width: 100%;
    list-style: none;
    margin-left: 0;
    justify-content: space-between;
    li {
      img {
        width: 80px;
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
</style>
