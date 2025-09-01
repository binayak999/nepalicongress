<template>
  <div class="pdfbox">
    <section>
      <div class="relBoxCard" ref="screen">
        <img :src="require(`@/assets/images/oncard.png`)" alt />
        <div class="absBox memberQRAbs">
          <span v-html="allOnlineMember.qr"></span>
        </div>
        <div class="absBox workingformnumberAbs">
          <span>{{ allOnlineMember.workingformnumber }}</span>
        </div>
        <div class="absBox ppImageAbs">
          <img :src="allOnlineMember.ppimage" alt="" />
        </div>
        <div class="absBox memberNameAbs">
          <span>{{ allOnlineMember.firstName }} </span>
          <span v-if="allOnlineMember.middleName != 'undefined'"
            >{{ allOnlineMember.middleName }}
          </span>
          <span>{{ allOnlineMember.lastName }} </span>
        </div>
        <div class="absBox memberAgeAbs">
          <span v-if="allOnlineMember.dob">{{
            allOnlineMember.dob.slice(0, 10)
          }}</span>
        </div>
        <div class="absBox memberBloodGroup">
          <span>{{ allOnlineMember.bloodgroup }}</span>
        </div>
        <div class="absBox memberPhone">
          <span>{{ allOnlineMember.phone }}</span>
        </div>
        <div class="absBox memberCitizenship">
          <span>{{ allOnlineMember.citizenshipno }}</span>
        </div>
        <div class="absBox memberAddressAbs">
          <span>{{ allOnlineMember.tole }}</span>
        </div>
        <div class="absBox memberWardAbs">
          <span>{{ allOnlineMember.ward }}</span>
        </div>
        <div class="absBox memberMuniAbs">
          <span>{{ allOnlineMember.municipality }}</span>
        </div>
        <div class="absBox memberPradeshAbs">
          <span>{{ allOnlineMember.provinceAssembly }}</span>
        </div>
        <div class="absBox memberHouseAbs">
          <span>{{ allOnlineMember.houseOfRepresentative }}</span>
        </div>
        <div class="absBox memberDistrictAbs">
          <span>{{ allOnlineMember.district }}</span>
        </div>
        <div class="absBox memberRegionAbs">
          <span>{{ changeProvince(allOnlineMember.province) }}</span>
        </div>

        <div class="absBox sign1">
          <img
            src="http://api.nepalicongress.org/medias/signature/ncsignature167272848249-1686764116096.png"
            alt
          />
        </div>
      </div>
      <div class="fixtoast" v-if="downloadLoading">Please wait</div>
    </section>
    <v-btn @click="screenShot" class="primary mt-3 mb-5">Download</v-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NepaliDate from "nepali-date-converter";
import { parseISO } from "date-fns";
import html2canvas from "html2canvas";
export default {
  name: "OnlinememberCard",
  data() {
    return {
      downloadLoading: false,
    };
  },
  methods: {
    ...mapActions(["getOnlineMemberUser"]),
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
    changeDate(datehere) {
      let np = new NepaliDate(parseISO(datehere));
      return np.format("DD-MM-YYYY", "np");
    },
    screenShot() {
      this.downloadLoading = true;
      window.scrollTo(0, 0);
      this.showdownloadbtn = false;
      setTimeout(() => {
        html2canvas(this.$refs.screen, {
          allowTaint: true,
          useCORS: true,
          logging: false,
          scale: 5,
        }).then((canvas) => {
          if (navigator.msSaveBlob) {
            // IE10+
            let blob = canvas.msToBlob();
            return navigator.msSaveBlob(blob, name);
          } else {
            let imageurl = canvas.toDataURL("image/png");
            //You need to choose the naming rules yourself

            let imagename =
              "OnlineMemberShip" + this.allOnlineMember.workingformnumber;
            this.fileDownload(imageurl, imagename);
          }
        });
      }, 1000);
      // this.showdownloadbtn = true;
    },
    fileDownload(downloadUrl, downloadName) {
      let aLink = document.createElement("a");

      aLink.style.display = "none";

      aLink.href = downloadUrl;
      aLink.download = `${downloadName}.png`;
      // Trigger click-then remove
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
      this.showdownloadbtn = true;
      this.downloadLoading = false;
    },
  },

  computed: {
    ...mapGetters(["allOnlineMember"]),
  },
  async created() {
    await this.getOnlineMemberUser(this.$route.params.id);
    this.screenShot();
  },
};
</script>

<style lang="scss" scoped>
.relBoxCard {
  display: inline-block;
  position: relative;
  //   height: 400px;
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
  top: 151px;
  left: 80px;
  font-size: 8px;
}
.memberNameAbs {
  font-size: 8px;
  top: 195px;
  left: 66px;
}
.memberAgeAbs {
  font-size: 8px;
  top: 213px;
  left: 87px;
}
.memberPhone {
  font-size: 8px;
  top: 230px;
  left: 78px;
}
.memberBloodGroup {
  font-size: 8px;
  top: 248px;
  left: 80px;
}
.memberCitizenship {
  font-size: 8px;
  top: 265px;
  left: 95px;
}
.memberAddressAbs {
  font-size: 8px;
  top: 289px;
  left: 114px;
}
.memberWardAbs {
  font-size: 8px;
  top: 289px;
  left: 235px;
}

.memberMuniAbs {
  font-size: 8px;
  top: 310px;
  left: 138px;
}
.memberPradeshAbs {
  font-size: 8px;
  top: 332px;
  left: 125px;
}
.memberHouseAbs {
  font-size: 8px;
  top: 332px;
  left: 234px;
}
.memberDistrictAbs {
  font-size: 8px;
  top: 352px;
  left: 80px;
}
.memberRegionAbs {
  font-size: 8px;
  top: 352px;
  left: 215px;
}
.memberQRAbs {
  top: 162px;
  left: 42px;
}
.sign1 {
  height: 45px;
  bottom: 48px;
  left: 116px;
  font-size: 8px;
  width: 80px;
  img {
    object-fit: contain;
    object-position: start;
  }
}

.ppImageAbs {
  top: 148px;
  right: 41px;
  font-size: 8px;
  background: #52bf6e;
  img {
    object-fit: contain;
    width: 92px;
    height: 103px;
  }
}

.fixtoast {
  position: fixed;
  background: red;
  z-index: 999999999;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 20px;
  background: black;
  color: white;
  bottom: 50px;
}
.pdfbox {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  flex-direction: column;
}
</style>