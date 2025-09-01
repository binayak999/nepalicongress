<template>
  <section>
    <v-container>
      <v-row>
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
                <!-- <div class="displayBox">
                  <span class="txtbox">
                    {{ labelProvince }}
                  </span>
                </div> -->
                <v-selection
                  class="selectdate"
                  v-model="province"
                  placeholder="Province"
                  :options="groupofProvinces"
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
              <v-btn class="btn-primary ml-3" @click="fetchGen" v-if="!loading"
                >Check</v-btn
              >
              <v-btn class="btn-primary ml-3" v-if="loading">
                <v-progress-circular indeterminate></v-progress-circular>
              </v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>

      <v-row v-if="title != 'निर्देशिका' && allGenerationConvention.length > 0">
        <v-col md="12">
          <table border="" class="mx-3">
            <thead>
              <tr>
                <th>Province</th>
                <th>District</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in allGenerationConvention" :key="index">
                <td>{{ data.province != "undefined" ? data.province : "" }}</td>
                <td>{{ data.district != "undefined" ? data.district : "" }}</td>

                <td><a :href="data.file" target="_blank" class="btn-primary ">PDF Download</a></td>
              </tr>
            </tbody>
          </table>
        </v-col>
      </v-row>

      <v-row
        v-if="title === 'निर्देशिका' && allGenerationConvention.length > 0"
      >
        <v-col md="12" class="mx-3">
          <iframe
            :src="allGenerationConvention[0].file"
            frameborder="0"
          ></iframe>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import { secureStorage } from "../../../main";
export default {
  name: "DisplayForm",
  data: () => ({
    province: "",
    district: "",
    municipality: "",
    ward: undefined,
    file: undefined,
    fileFule: [(v) => !!v || "File is required"],
    valid: true,
    houseofrepresentative: "",
    regions: "",
    pradeshassemblyconstituency: "",
    loading: false,
    logged: false,
    title: "निर्देशिका",
    labelProvince: "1",
    prosele: "1",
    groupofProvinces: [],
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
    selectedPro(data) {
      this.prosele = data.province;
      this.labelProvince = data.label;
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
      this.loading = true;
      let data = {};
      data.title = this.title;
      data.province = this.province.province;
      data.district = this.district.name;
      data.municipality = this.municipality.name;
      data.ward = this.ward;

      await this.fetchGeneralConvention(data);
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters(["allDistrict", "allProvices", "allGenerationConvention"]),
  },
  async created() {
    await this.fetchProvinceDistrictProvince();
    for await (let ele of this.allProvices) {
      if (ele.province == "1" || ele.province == "2") {
        ele.label = ele.province;
        this.groupofProvinces.push(ele);
      }
      if (ele.province == "3") {
        ele.label = "Bagmati";
        this.groupofProvinces.push(ele);
      }
      if (ele.province == "4") {
        ele.label = "Gandaki";
        this.groupofProvinces.push(ele);
      }
      if (ele.province == "5") {
        ele.label = "Lumbini";
        this.groupofProvinces.push(ele);
      }
      if (ele.province == "6") {
        ele.label = "Karnali";
        this.groupofProvinces.push(ele);
      }
      if (ele.province == "7") {
        ele.label = "Sudurpachim";
        this.groupofProvinces.push(ele);
      }
    }
    // if (secureStorage.getItem("userData") == undefined) {
    //   this.$router.push("/login");
    // } else {
    //   this.logged = JSON.parse(secureStorage.getItem("userData")).user;
    // }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.btn-primary {
  background: $secondary !important;
  color: $white;
  margin-right: 10px;
  display: block;
  padding: 5px 20px;
  width: 150px;
  text-align: center;
  border-radius: 10px;
  text-decoration: none;
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
iframe {
  width: 100%;
  height: 800px;
}
.displayBox {
  position: relative;
  .txtbox {
    position: absolute;
    top: 1px;
    background: #fff;
    width: 100px;
    height: 53px;
    left: 10px;
    display: block;
    z-index: 999;
    display: flex;
    align-items: center;
    padding-left: 5px;
  }
}
</style>
