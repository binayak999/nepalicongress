<template>
  <section class="fixBox kriyasil">
    <div class="editBox">
      <img :src="require(`@/assets/images/logo.svg`)" alt width="150" />
      <header>
        <h1>सदस्यता फारम अपडेट गर्नुहोस्</h1>
        <i @click="closeBox" class="fa fa-close"></i>
      </header>
      <table class="table table-responsive formbox" border="1">
        <tbody>
          <tr v-if="data.images != undefined && data.images.length != 0">
            <th>फोटो</th>
            <td>
              <img
                :src="baseUrl + data.images[0].fileUrl"
                alt
                class="passportimage"
              />
            </td>
          </tr>
          <tr>
            <th>क्रियाशील नं.</th>
            <td>{{ data.workingformnumber }}</td>
          </tr>

          <tr>
            <th>सदस्यको नाम .</th>
            <td>{{ data.membername }}</td>
          </tr>
          <tr>
            <th>वावु / आमाको नाम</th>
            <td>
              <v-text-field
                class="specific mt-2"
                v-model="data.fathermothername"
                :label="changeToNepali(data.fathermothername)"
                required
                outlined
                @keydown="changeToNepali"
                :readonly="data.fathermothername.length > 0"
              ></v-text-field>
            </td>
          </tr>
          <tr>
            <th>पति / पत्निको नाम</th>
            <td>
              <v-text-field
                class="specific mt-2"
                v-model="data.husbandwifename"
                :label="changeToNepali(data.husbandwifename)"
                @keydown="changeToNepali"
                required
                outlined
                :readonly="data.husbandwifename.length > 0"
              ></v-text-field>
            </td>
          </tr>
          <tr>
            <th>जन्म मिति</th>
            <td>
              <v-text-field
                class="mt-2"
                v-model="data.age"
                placeholder="उमेर"
                outlined
                dense
                :readonly="data.age.length > 0"
              ></v-text-field>
            </td>
          </tr>
          <tr>
            <th>पेशा</th>
            <td>{{ data.profession }}</td>
          </tr>
          <tr>
            <th>लिङ्ग</th>
            <td>{{ data.gender }}</td>
          </tr>
          <tr>
            <th>प्रदेश</th>
            <td>{{ data.region }}</td>
          </tr>
          <tr>
            <th>जिल्ला</th>
            <td>{{ data.district }}</td>
          </tr>
          <tr>
            <th>प्रतिनिधिसभा नि.क्षे.नं.</th>
            <td>{{ data.houseofrepresentative }}</td>
          </tr>
          <tr>
            <th>प्रदेश सभा नि.क्षे.नं.</th>
            <td>{{ data.pradeshassemblyconstituency }}</td>
          </tr>
          <tr>
            <th>न.पा./गा.पा.को नाम</th>
            <td>{{ data.municipality }}</td>
          </tr>
          <tr>
            <th>समावेशी समूह</th>
            <td>{{ data.inclusivegroup }}</td>
          </tr>
          <tr>
            <th>वडा नं.</th>
            <td>{{ data.wardno }}</td>
          </tr>

          <tr>
            <th>मोवाइल नं.</th>
            <td>
              <v-text-field
                class="mt-2"
                v-model="data.phone"
                placeholder="मोवाइल नं."
                outlined
                dense
              ></v-text-field>
            </td>
          </tr>
          <tr>
            <th>इमेल</th>
            <td>
              <v-text-field
                class="mt-2"
                v-model="data.email"
                placeholder="इमेल"
                outlined
                dense
              ></v-text-field>
            </td>
          </tr>
          <tr>
            <th>राष्ट्रिय आइ डी न. </th>
            <td>
              <v-text-field
                class="mt-2"
                v-model="data.nationalId"
                placeholder="राष्ट्रिय आइ डी न."
                outlined
                dense
              ></v-text-field>
            </td>
          </tr>
          <tr>
            <th>नागरिकता न.  </th>
            <td>
              <v-text-field
                class="mt-2"
                v-model="data.citizenshipId"
                placeholder="नागरिकता न. "
                outlined
                dense
              ></v-text-field>
            </td>
          </tr>

          <tr>
            <th>टोल</th>
            <td>
              <v-text-field
                class="specific mt-2"
                v-model="data.tole"
                placeholder="टोल"
                :label="changeToNepali(data.tole || '')"
                @keydown="changeToNepali"
                required
                outlined
              ></v-text-field>
            </td>
          </tr>
          <tr>
            <th>बिज्ञता</th>
            <td>
              <v-select
                v-model="data.occupation"
                :items="occupations"
                class="mt-3"
                outlined
                dense
              ></v-select>
            </td>
          </tr>

          <tr>
            <th>फोटो (पासपोर्ट साइज)</th>
            <td>
              <img
                v-if="data.image != null"
                :src="data.image"
                alt=""
                width="100"
              />
              <v-file-input
                v-if="data.image == null"
                class="mt-2"
                v-model="image"
                placeholder="फोटो"
                outlined
                dense
              ></v-file-input>
            </td>
          </tr>

          <tr>
            <th>राष्ट्रिय आईडी फाइल / नागरिकता फाइल</th>
            <td>
              <img
                v-if="data.nationalFile != null"
                :src="data.nationalFile"
                alt=""
                width="100"
              />
              <v-file-input
                v-if="data.nationalFile == null"
                class="mt-2"
                v-model="nationalFile"
                placeholder="राष्ट्रिय आईडी फाइल  / नागरिकता फाइल"
                outlined
                dense
              ></v-file-input>
            </td>
          </tr>
        </tbody>
      </table>
      <v-btn
        class="mt-10 primary"
        :loading="loading"
        @click="updateCircularAction"
        >Renew</v-btn
      >
    </div>
  </section>
</template>

<script>
import preeti from "preeti";
import { mapActions } from "vuex";
export default {
  name: "UpdateCicularForm",
  data: () => ({
    nationalId: undefined,
    loading: false,
    occupation: undefined,
    occupations: [
     "कृषि र कृषि व्यवसाय",
        "पशुपालन",
        "माछा पक्षी र वन्यजन्तु व्यवसाय",
        "हस्तशिल्प र गृह उद्योग",
        "वस्त्र र कपडा उत्पादन",
        "निर्माण र बनिज्ञान विकास",
        "शिक्षा र शिक्षण",
        "स्वास्थ्य र चिकित्सा सेवा",
        "इन्जिनियरिङ र तान्त्रिक सेवा",
        "जानकारी प्रबिधि र कम्प्युटर विज्ञान",
        "आतिथ्य र पर्यटन",
        "यातायात र लगानी",
        "व्यापार र उद्यम",
        "सरकारी र सार्वजनिक सेवा",
        "बैंकिङ र वित्त",
        "मार्केटिङ र सेल्स",
        "मिडिया र संचार",
        "कला र संस्कृति",
        "खेलकुद र मनोरञ्जन",
        "विज्ञान र अनुसन्धान",
        "सामाजिक कार्य",
        "फ्रिलान्सर",
        "अन्य",
    ],
    image: undefined,
    nationalFile: undefined,
  }),
  props: ["data"],
  methods: {
    ...mapActions(["updateCircular"]),
    closeBox() {
      this.$emit("closePopup");
    },
    changeToNepali(e) {
      return preeti(e);
    },
    async updateCircularAction() {
      let formData = new FormData();
      formData.append("_id", this.data._id);
      if (this.data.age != undefined) {
        formData.append("age", this.data.age);
      }
      if (this.data.fathermothername != undefined) {
        formData.append("fathermothername", this.data.fathermothername);
      }
      if (this.data.husbandwifename != undefined) {
        formData.append("husbandwifename", this.data.husbandwifename);
      }
      if (this.data.phone != undefined) {
        formData.append("phone", this.data.phone);
      }
      if (this.data.email != undefined) {
        formData.append("email", this.data.email);
      }
      if (this.data.nationalId != undefined) {
        formData.append("nationalId", this.data.nationalId);
      }
      if (this.nationalFile != undefined) {
        formData.append("nationalFile", this.nationalFile);
      }
      if (this.image != undefined) {
        formData.append("image", this.image);
      }
      if (this.data.tole != undefined) {
        formData.append("tole", this.data.tole);
      }
      if (this.data.occupation != undefined) {
        formData.append("occupation", this.data.occupation);
      }
      if (this.data.citizenshipId != undefined) {
        formData.append("citizenshipId", this.data.citizenshipId);
      }
      this.loading = true;
      await this.updateCircular(formData);
      this.loading = false;
      this.closeBox();
    },
  },
};
</script>

<style lang="scss" scoped>
.fixBox {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100vh;
  background: #fff;
  // display: flex;
  justify-content: center;
  overflow-y: scroll;
  z-index: 999;
}
header {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}
.editBox {
  width: 800px;
  padding: 30px 0;
  margin: 0 auto;
  .fa {
    cursor: pointer;
  }
}
table {
  width: 100%;
  border-collapse: collapse;
  td {
    height: 40px;
    text-align: left;
    padding: 5px 20px;
  }
}
</style>