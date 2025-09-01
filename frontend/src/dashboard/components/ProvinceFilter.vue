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
            ></v-selection>
          </v-col>
        </div>

        <div class="grid-item">
          <v-col>
            <label for>जिल्ला</label>
            <v-selection
              v-model="district"
              placeholder="जिल्ला"
              :options="districts"
              label="name"
              :filterable="true"
              @input="() => selectDistrict(district)"
            ></v-selection>
          </v-col>
        </div>

        <div class="grid-item" v-if="district != ''">
          <v-col>
            <label for>प्रतिनिधिसभा नि.क्षे.नं.</label>
            <v-selection
              v-model="houseofrepresentative"
              placeholder="प्रतिनिधिसभा नि.क्षे.नं."
              :options="houseofrepresentatives"
              label="code"
              :filterable="true"
              @input="() => selectRegion(houseofrepresentative)"
            ></v-selection>
          </v-col>
        </div>
        <div class="grid-item" v-if="houseofrepresentative != '' && !districtNagapalika">
          <v-col>
            <label for>प्रदेश सभा क्षेत्र</label>
            <v-selection
              v-model="pradeshassemblyconstituency"
              placeholder="प्रदेश सभा क्षेत्र"
              :options="pradeshassemblyconstituencies"
              label="code"
              :filterable="true"
              @input="() => selectMunicipality(pradeshassemblyconstituency)"
            ></v-selection>
          </v-col>
        </div>
        <div class="grid-item" v-if="pradeshassemblyconstituency != '' || (houseofrepresentative != '' && districtNagapalika)">
          <v-col>
            <label for>न.पा./गा.पा.</label>
            <v-selection
              v-model="municipality"
              placeholder="न.पा./गा.पा."
              :options="municipalities"
              label="name"
              :filterable="true"
              @input="() => selectWard(municipality)"
            ></v-selection>
          </v-col>
        </div>
        <div class="grid-item" v-if="municipality != '' && !districtNagapalika">
          <v-col>
            <label for>वडा नं.</label>
            <v-selection
              v-model="wardno"
              placeholder="वडा नं."
              :options="wards"
              :filterable="true"
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

export default {
  name: "ProvinceFilter",
  props: ["districtNagapalika"],
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
    };
  },
  methods: {
    ...mapActions(["fetchProvinceDistrictProvince"]),
    filterAction() {
      console.log("Filter Action");
    },
    selectDistrict(data) {
      this.houseofrepresentatives = data.list.repno;
      console.log(
        data.list.repno
          .map((rep) => rep.region)
          .flat()
          .map((region) => region.napa)
          .flat()
      );

      this.finalSubmit();
      if (this.districtNagapalika) {
        this.municipalities = [
          ...new Set(
            data.list.repno
              .flatMap((rep) => rep.region)
              .flatMap((region) => region.napa)
              .map((napa) => napa.name)
          ),
        ];
      }
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
      if (!this.districtNagapalika) {
        const filteredRegions = this.pradeshassemblyconstituencies.filter(
          (ele) => ele.code === code.code
        );
        if (filteredRegions.length > 0) {
          this.municipalities = filteredRegions[0].napa;
          this.finalSubmit();
        }
      }
    },
    selectWard(name) {
      if (!this.districtNagapalika) {
        const filteredMunicipalities = this.municipalities.filter(
          (ele) => ele.name.trim() === name.name.trim()
        );
        if (filteredMunicipalities.length > 0) {
          this.wards = filteredMunicipalities[0].ward;
          this.municipality = filteredMunicipalities[0].name;
          this.finalSubmit();
        }
      }
    },
    finalSubmit() {
      this.$emit("sendGeoData", {
        province: this.province.province,
        district: this.district.name,
        houseofrepresentative: this.houseofrepresentative.code,
        pradeshassemblyconstituency: this.pradeshassemblyconstituency.code,
        municipality: this.municipality,
        ward: this.wardno,
      });
    },
  },
  computed: {
    ...mapGetters(["allProvices"]),
  },
  async created() {
    await this.fetchProvinceDistrictProvince();
  },
};
</script>

<style lang="scss" scoped>
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