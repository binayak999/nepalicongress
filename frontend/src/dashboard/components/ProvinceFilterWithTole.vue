<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation class="kriyasil">
      <div class="grid-container">
        <div class="grid-item">
          <v-col>
            <label for>प्रदेश</label>
            <v-selection
              v-model="province"
              placeholder="प्रदेश"
              :options="allProvices"
              label="name"
              :filterable="true"
              @input="() => selectProvince(province)"
              :disabled="disabled || meeting"
            ></v-selection>
          </v-col>
        </div>

        <div
          class="grid-item"
          v-if="
            committeeType == undefined ||
            (committeeType != undefined &&
              (committeeType == 'जिल्ला' ||
                committeeType == 'प्रतिनिधि सभा क्षेत्र' ||
                committeeType == 'प्रदेश सभा क्षेत्र' ||
                committeeType == 'पालिका' ||
                committeeType == 'वार्ड' ||
                committeeType == 'टोल'))
          "
        >
          <v-col>
            <label for>जिल्ला</label>
            <v-selection
              v-model="district"
              placeholder="जिल्ला"
              :options="districts"
              label="name"
              :filterable="true"
              @input="() => selectDistrict(district)"
              :disabled="disabled || meeting"
            ></v-selection>
          </v-col>
        </div>

        <div
          class="grid-item"
          v-if="
            district != '' &&
            (committeeType == undefined ||
              (committeeType != undefined &&
                (committeeType == 'प्रतिनिधि सभा क्षेत्र' ||
                  committeeType == 'प्रदेश सभा क्षेत्र' ||
                  committeeType == 'पालिका' ||
                  committeeType == 'वार्ड' ||
                  committeeType == 'टोल')))
          "
        >
          <v-col>
            <label for>प्रतिनिधिसभा नि.क्षे.नं.</label>
            <v-selection
              v-model="houseofrepresentative"
              placeholder="प्रतिनिधिसभा नि.क्षे.नं."
              :options="houseofrepresentatives"
              label="code"
              :filterable="true"
              @input="() => selectRegion(houseofrepresentative)"
              :disabled="disabled || meeting"
            ></v-selection>
          </v-col>
        </div>
        <div
          class="grid-item"
          v-if="
            houseofrepresentative != '' &&
            (committeeType == undefined ||
              (committeeType != undefined &&
                (committeeType == 'प्रदेश सभा क्षेत्र' ||
                  committeeType == 'पालिका' ||
                  committeeType == 'वार्ड' ||
                  committeeType == 'टोल')))
          "
        >
          <v-col>
            <label for>प्रदेश सभा क्षेत्र</label>
            <v-selection
              v-model="pradeshassemblyconstituency"
              placeholder="प्रदेश सभा क्षेत्र"
              :options="pradeshassemblyconstituencies"
              label="code"
              :filterable="true"
              @input="() => selectMunicipality(pradeshassemblyconstituency)"
              :disabled="disabled || meeting"
            ></v-selection>
          </v-col>
        </div>
        <div
          class="grid-item"
          v-if="
            pradeshassemblyconstituency != '' &&
            (committeeType == undefined ||
              (committeeType != undefined &&
                (committeeType == 'पालिका' ||
                  committeeType == 'वार्ड' ||
                  committeeType == 'टोल')))
          "
        >
          <v-col>
            <label for>न.पा./गा.पा.</label>
            <v-selection
              v-model="municipality"
              placeholder="न.पा./गा.पा."
              :options="municipalities"
              label="name"
              :filterable="true"
              @input="() => selectWard(municipality)"
              :disabled="disabled || meeting"
            ></v-selection>
          </v-col>
        </div>
        <div
          class="grid-item"
          v-if="
            municipality != '' &&
            (committeeType == undefined ||
              (committeeType != undefined &&
                (committeeType == 'वार्ड' || committeeType == 'टोल')))
          "
        >
          <v-col>
            <label for>वडा नं.</label>
            <v-selection
              v-model="wardno"
              placeholder="वडा नं."
              :options="wards"
              :filterable="true"
              @input="() => finalSubmit()"
              :disabled="disabled || meeting"
            ></v-selection>
          </v-col>
        </div>
        <div
          class="grid-item"
          v-if="
            wardno != '' &&
            !selectTole &&
            (committeeType == undefined ||
              (committeeType != undefined && committeeType == 'टोल'))
          "
        >
          <v-col>
            <label for>टोल</label>
            <v-text-field
              v-model="tole"
              :label="changeToNepali(tole)"
              outlined
              class="specific"
              @keydown="
                () => {
                  finalSubmit();
                }
              "
              :disabled="meeting"
            ></v-text-field>
          </v-col>
        </div>
        <div
          class="grid-item"
          v-if="
            wardno != '' &&
            selectTole &&
            (committeeType == undefined ||
              (committeeType != undefined && committeeType == 'टोल'))
          "
        >
          <v-col>
            <label for>टोल</label>
            <v-selection
              v-model="tole"
              placeholder="टोल"
              :options="toles"
              :filterable="true"
              :disabled="disabled"
              @input="() => finalSubmit()"
            ></v-selection>
          </v-col>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex/dist/vuex.common.js";
import preeti from "preeti";

export default {
  name: "ProvinceFilter",
  props: ["selectTole", "committeeType", "disabled", "loadSelect", "meeting"],
  data() {
    return {
      valid: true,
      province: "",
      district: "",
      houseofrepresentative: "",
      pradeshassemblyconstituency: "",
      municipality: "",
      wardno: "",
      districts: [],
      houseofrepresentatives: [],
      municipalities: [],
      pradeshassemblyconstituencies: [],
      wards: [],
      tole: "",
      toles: [],
    };
  },
  methods: {
    ...mapActions(["fetchProvinceDistrictProvince", "getToles"]),
    changeToNepali(e) {
      return preeti(e);
    },
    filterAction() {
      console.log("Filter Action");
    },
    selectDistrict(data) {
      this.houseofrepresentatives = data.list.repno;
      this.finalSubmit();
    },
    selectProvince(data) {
      this.districts = data.district;
      this.finalSubmit();
    },
    selectRegion(code) {
      const filteredHouse = this.houseofrepresentatives.filter(
        (ele) => ele.code === code.code
      );
      if (filteredHouse.length > 0) {
        this.pradeshassemblyconstituencies = filteredHouse[0].region;
        this.finalSubmit();
      }
    },
    selectMunicipality(code) {
      const filteredRegions = this.pradeshassemblyconstituencies.filter(
        (ele) => ele.code === code.code
      );
      if (filteredRegions.length > 0) {
        this.municipalities = filteredRegions[0].napa;
        this.finalSubmit();
      }
    },
    async selectWard(name) {
      const filteredMunicipalities = this.municipalities.filter(
        (ele) => ele.name.trim() === name.name.trim()
      );
      if (filteredMunicipalities.length > 0) {
        this.wards = filteredMunicipalities[0].ward;
        this.municipality = filteredMunicipalities[0].name;
        this.finalSubmit();
      }
      await this.getToles({
        province: this.province.province,
        district: this.district.name,
        houseofrepresentative: this.houseofrepresentative.code,
        pradeshassemblyconstituency: this.pradeshassemblyconstituency.code,
        municipality: this.municipality,
        ward: this.wardno,
      });
      this.toles = this.allToles;
    },
    finalSubmit() {
      let data = {};
      if (this.province != "") data.province = this.province.province;
      if (this.district != "") data.district = this.district.name;
      if (this.houseofrepresentative != "")
        data.houseofrepresentative = this.houseofrepresentative.code;
      if (this.pradeshassemblyconstituency != "")
        data.pradeshassemblyconstituency =
          this.pradeshassemblyconstituency.code;
      if (this.municipality != "") data.municipality = this.municipality;
      if (this.wardno != "") data.ward = this.wardno;
      if (this.tole != "") data.tole = this.changeToNepali(this.tole);
      this.$emit("sendGeoData", data);
    },
  },
  computed: {
    ...mapGetters(["allProvices", "allToles"]),
  },
  async created() {
    await this.fetchProvinceDistrictProvince();
    if (this.loadSelect) {
      if (this.loadSelect.province) {
        this.province = this.loadSelect.province;
      }
      if (this.loadSelect.district) {
        this.district = this.loadSelect.district;
      }
      if (this.loadSelect.houseofrepresentative) {
        this.houseofrepresentative = this.loadSelect.houseofrepresentative;
      }
      if (this.loadSelect.pradeshassemblyconstituency) {
        this.pradeshassemblyconstituency =
          this.loadSelect.pradeshassemblyconstituency;
      }
      if (this.loadSelect.municipality) {
        this.municipality = this.loadSelect.municipality;
      }
      if (this.loadSelect.ward) {
        this.wardno = this.loadSelect.ward;
      }
      this.toles = ["महालक्ष्मीस्थान", "नयाँ सडक"];
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.grid-container {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr); // Default to 3 columns
  justify-items: start; // Left-align the grid items
  align-items: baseline;

  .grid-item {
    text-align: center;
    font-size: 1.2rem;
    width: 100%;
  }

  col {
    padding: 5px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    text-align: left;
  }
}
</style>