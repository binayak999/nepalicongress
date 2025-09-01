<template>
  <section>
    <v-container>
      <v-row v-if="logged">
        <v-col md="12">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="publicforum"
          >
            <v-row>
              <v-col md="12">
                <h2>{{ title }}</h2>
                <h5>Please login to add</h5>
              </v-col>
              <v-col>
                <v-selection
                  class="selectdate"
                  v-model="title"
                  placeholder="Select Form"
                  :options="selectionTitles"
                  :filterable="true"
                  :input="setTitle(title)"
                ></v-selection>
              </v-col>
            </v-row>
            <v-row
              v-if="
                title ==
                  'वार्डबाट क्षेत्रीय प्रतिनिधि निर्वाचनसंग सम्बन्धित अनुसुची' ||
                  title ==
                    'वार्ड कार्यसमितीमा सदस्य निर्वाचनसंग सम्बन्धित अनुसुची' ||
                  title ==
                    'पालिका कार्यसमितीमा सदस्य निर्वाचनसंग सम्बन्धित अनुसुची' ||
                  title ==
                    'प्रदेश सभा क्षेत्र कार्यसमिती सदस्य निर्वाचनसंग सम्बन्धित अनुसुची' ||
                  title ==
                    'प्रदेश महाधिवेशन प्रतिनिधि निर्वाचनसंग सम्बन्धित अनुसुची' ||
                  title ==
                    'प्रतिनिधि सभा क्षेत्र कार्यसमिती सदस्य निर्वाचनसंग सम्बन्धित अनुसुची' ||
                  title ==
                    'केन्द्रिय महाधिवेशन प्रतिनिधि निर्वाचनसंग सम्बन्धित अनुसुची'
              "
            >
              <v-col md="2">
                <label for>प्रदेश</label>
                <v-selection
                  class="selectdate"
                  v-model="province"
                  placeholder="Province"
                  :options="allProvices"
                  label="name"
                  :filterable="true"
                  :value="selectProvince(province)"
                ></v-selection>
              </v-col>
              <v-col md="2">
                <label for>जिल्ला</label>
                <v-selection
                  class="selectdate"
                  v-model="district"
                  placeholder="जिल्ला"
                  :options="allDistrict"
                  label="name"
                  :filterable="true"
                  :value="selectDistrict(district)"
                ></v-selection>
              </v-col>
            </v-row>

            <v-row>
              <v-col md="3">
                <label for>PDF</label>
                <v-file-input
                  label="Attachment"
                  :chips="true"
                  :show-size="true"
                  outlined
                  :rules="fileFule"
                  v-model="file"
                  accept="application/pdf"
                  prepend-icon="mdi-file"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-btn
                class="btn-primary"
                @click="createGeneral"
                v-if="!loading && file != undefined"
                >Save</v-btn
              >
              <v-btn class="btn-primary" @click="fetchGen" v-if="!loading"
                >Check</v-btn
              >
              <v-btn class="btn-primary" v-if="loading">
                <v-progress-circular indeterminate></v-progress-circular>
              </v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12">
          <table border="">
            <thead>
              <tr>
                <th>Province</th>
                <th>District</th>
                <th>Municipality</th>
                <th>Ward</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in allGenerationConvention" :key="index">
                <td>{{ data.province }}</td>
                <td>{{ data.district }}</td>
                <td>{{ data.municipality }}</td>

                <td><a :href="data.file" target="_blank">PDF</a></td>
              </tr>
            </tbody>
          </table>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { secureStorage } from "../../../main";
export default {
  name: "AddFormInfo",
  data: () => ({
    province: "",
    district: "",
    municipality: "",
        houseofrepresentative: "",
    regions: "",
    ward: undefined,
    file: undefined,
    fileFule: [(v) => !!v || "File is required"],
    valid: true,

    pradeshassemblyconstituency: "",
    loading: false,
    logged: false,
    title: "निर्देशिका",
    selectionTitles: [
      "निर्देशिका",
      "वार्डबाट क्षेत्रीय प्रतिनिधि निर्वाचनसंग सम्बन्धित अनुसुची",
      "वार्ड कार्यसमितीमा सदस्य निर्वाचनसंग सम्बन्धित अनुसुची",
      "पालिका कार्यसमितीमा सदस्य निर्वाचनसंग सम्बन्धित अनुसुची",
      "प्रदेश सभा क्षेत्र कार्यसमिती सदस्य निर्वाचनसंग सम्बन्धित अनुसुची",
      "प्रदेश महाधिवेशन प्रतिनिधि निर्वाचनसंग सम्बन्धित अनुसुची",
      "प्रतिनिधि सभा क्षेत्र कार्यसमिती सदस्य निर्वाचनसंग सम्बन्धित अनुसुची",
      "केन्द्रिय महाधिवेशन प्रतिनिधि निर्वाचनसंग सम्बन्धित अनुसुची",
    ],
  }),
  methods: {
    ...mapActions([
      "fetchProvinceDistrictProvince",
      "fetchProvinceDistrictSelectProvice",
      "createGeneralConvention",
      "fetchGeneralConvention",
    ]),
    setTitle(data) {
      this.title = data;
    },
    selectProvince(data) {
      if (data.province != undefined) {
        this.fetchProvinceDistrictSelectProvice(data.province);
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
    async createGeneral() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let data = {};
        data.title = this.title;
        if (data.province != "") {
          data.province = this.province.province;
        }
        if (data.district != "") {
          data.district = this.district.name;
        }
        if (data.municipality != "") {
          data.municipality = this.municipality.name;
        }
        if (data.ward != "") {
          data.ward = this.ward;
        }

        data.file = this.file;

        await this.createGeneralConvention(data);
        this.loading = false;
      }
    },
    async fetchGen() {
      let data = {};
      data.title = this.title;
      data.province = this.province.province;
      data.district = this.district.name;
      data.municipality = this.municipality.name;
      data.ward = this.ward;

      await this.fetchGeneralConvention(data);
    },
  },
  computed: {
    ...mapGetters(["allDistrict", "allProvices", "allGenerationConvention"]),
  },
  created() {
    this.fetchProvinceDistrictProvince();
    if (secureStorage.getItem("userData") == undefined) {
      this.$router.push("/login");
    } else {
      this.logged = JSON.parse(secureStorage.getItem("userData")).user;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.btn-primary {
  background: $secondary !important;
  color: $white;
  margin-right: 10px;
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
</style>

<!-- <v-col md="2" v-if="district != ''">
                <label for>प्रतिनिधिसभा नि.क्षे.नं.</label>
                <v-selection
                  class="selectdate"
                  v-model="houseofrepresentative"
                  placeholder="प्रतिनिधिसभा नि.क्षे.नं."
                  :options="representatives"
                  label="code"
                  :filterable="true"
                  :value="regionFunc(houseofrepresentative)"
                ></v-selection>
              </v-col>
              <v-col md="2" v-if="houseofrepresentative != ''">
                <label for>प्रदेश सभा क्षेत्र</label>

                <v-selection
                  class="selectdate"
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
                  class="selectdate"
                  v-model="municipality"
                  placeholder="न.पा./गा.पा."
                  :options="municipalities"
                  label="name"
                  :filterable="true"
                  :value="wardFunc(municipality)"
                ></v-selection>
              </v-col> -->
<!-- <v-col md="2" v-if="municipality != ''">
                <label for>वडा नं.</label>
                <v-selection
                  class="selectdate"
                  v-model="ward"
                  placeholder="वडा नं."
                  :options="wards"
                  :filterable="true"
                ></v-selection>
              </v-col> -->
