<template>
  <section>
    <TitleBreadCrumb :title="titleMain" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col md="12">
          <v-col md="12">
            <label>{{ committeeMemberType }} कार्यसमिती</label>
            <v-selection
              class="selectdate"
              v-model="committeeMemberType"
              placeholder="Select Form"
              :options="selectionTitles"
              label="Select Form"
              :filterable="true"
            ></v-selection>
          </v-col>

          <ProvinceFilterWithTole
            @sendGeoData="getGeoData"
            :committeeType="committeeMemberType"
            :selectTole="true"
            :loadSelect="loggedData"
          />
          <v-col md="12">
            <CustomButton
              @clickAction="filterCommitteeMember"
              text="Filter"
              :loading="loading"
            />
          </v-col>

          <table border="" class="table" v-if="members.length > 0">
            <thead>
              <tr>
                <th>क्रम संख्या</th>
                <th>पद</th>
                <th>नाम</th>
                <th>फोन</th>
                <th>समावेशी समूह</th>
                <th>लिङ्ग</th>
                <th>सिर्जना मिति</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in members" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ data.post }}</td>
                <td>{{ data.name }}</td>
                <td>{{ data.phone }}</td>
                <td>{{ data.inclusivegroup }}</td>
                <td>{{ data.gender }}</td>
                <td>{{ changeDate(data.createdAt) }}</td>
              </tr>
            </tbody>
          </table>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import ProvinceFilterWithTole from "@/dashboard/components/ProvinceFilterWithTole.vue";
import TitleBreadCrumb from "@/dashboard/components/common/TitleBreadCrumb";
import NepaliDate from "nepali-date-converter";
import { parseISO } from "date-fns";
import { mapActions, mapGetters } from "vuex/dist/vuex.common.js";
import { secureStorage } from "../../../main";
import CustomButton from "../../components/CustomButton.vue";

export default {
  name: "Committee Member List",
  components: {
    ProvinceFilterWithTole,
    TitleBreadCrumb,
    CustomButton,
  },
  data() {
    return {
      loading: false,
      province: "",
      district: "",
      houseofrepresentative: "",
      pradeshassemblyconstituency: "",
      municipality: "",
      ward: "",
      tole: "",
      titleMain: "Committee Member List",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Committee Member List",
        },
      ],
      selectionTitles: [
        "टोल",
        "वार्ड",
        "पालिका",
        "प्रदेश सभा क्षेत्र",
        "प्रतिनिधि सभा क्षेत्र",
        "जिल्ला",
      ],
      members: [],
      logged: false,
      loggedData: {},
      committeeMemberType: "टोल",
    };
  },
  methods: {
    ...mapActions(["fetchGeneralConventionCommitteeMember"]),
    getGeoData(response) {
      this.province = response.province;
      this.district = response.district;
      this.houseofrepresentative = response.houseofrepresentative;
      this.pradeshassemblyconstituency = response.pradeshassemblyconstituency;
      this.municipality = response.municipality;
      this.ward = response.ward;
      this.tole = response.tole;
    },
    changeDate(datehere) {
      let np = new NepaliDate(parseISO(datehere));
      return np.format("ddd DD, MMMM YYYY", "np");
    },
    async filterCommitteeMember() {
      // Initialize data object with province
      const data = {
        title: this.committeeMemberType,
        province: this.province || ""
      };

      // Define hierarchy of administrative levels
      const hierarchyLevels = {
        "टोल": ["district", "houseofrepresentative", "pradeshassemblyconstituency", "municipality", "ward", "tole"],
        "वार्ड": ["district", "houseofrepresentative", "pradeshassemblyconstituency", "municipality", "ward"],
        "पालिका": ["district", "houseofrepresentative", "pradeshassemblyconstituency", "municipality"],
        "प्रदेश सभा क्षेत्र": ["district", "houseofrepresentative", "pradeshassemblyconstituency"],
        "प्रतिनिधि सभा क्षेत्र": ["district", "houseofrepresentative"],
        "जिल्ला": ["district"]
      };

      // Get required fields based on selected committee type
      const requiredFields = hierarchyLevels[this.committeeMemberType] || [];

      // Add fields to data object if they exist
      const fieldMappings = {
        district: this.district,
        houseofrepresentative: this.houseofrepresentative,
        pradeshassemblyconstituency: this.pradeshassemblyconstituency,
        municipality: this.municipality,
        ward: this.ward,
        tole: this.tole
      };

      requiredFields.forEach(field => {
        if (fieldMappings[field]) {
          data[field] = fieldMappings[field].toString();
        }
      });

      try {
        this.loading = true;
        await this.fetchGeneralConventionCommitteeMember(data);
        this.members = this.allGeneralConvenstionCommitteeMember;
      } catch (error) {
        console.error('Error fetching committee members:', error);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters(["allGeneralConvenstionCommitteeMember"]),
  },
  async created() {
    if (secureStorage.getItem("committeeMember") != undefined) {
      this.logged = true;
      this.loggedData = JSON.parse(
        secureStorage.getItem("committeeMember")
      ).user;
      this.committeeMemberType = this.loggedData.committeeMemberType;
      this.province = this.loggedData.province;
      this.district = this.loggedData.district;
      if (this.loggedData.houseofrepresentative != undefined) {
        this.houseofrepresentative = this.loggedData.houseofrepresentative;
      }
      if (this.loggedData.pradeshassemblyconstituency != undefined) {
        this.pradeshassemblyconstituency =
          this.loggedData.pradeshassemblyconstituency;
      }
      if (this.loggedData.municipality != undefined) {
        this.municipality = this.loggedData.municipality;
      }
      if (this.loggedData.ward != undefined) {
        this.ward = this.loggedData.ward;
      }
    } else {
      this.logged = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.table {
  width: 98%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #ddd;
  margin: 10px;
  th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  td {
    border: 1px solid #ddd;
    height: 10px;
    padding: 3px 10px;
    text-align: left;
  }
}
.text-box {
  margin: 10px;
  display: flex;
  flex-flow: column;
  gap: 10px;
  label {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>