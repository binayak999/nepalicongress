<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <ProvinceFilterWithTole @sendGeoData="getGeoData" />
    <table border="" class="table">
      <thead>
        <tr>
          <th>S/N</th>
          <th>Date</th>
          <th>Time</th>
          <th>Attendie</th>
          <th>Present</th>
          <th>Absent</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 10" :key="i">
          <td>{{ i }}</td>
          <td>{{ changeDate("2024-09-09T09:22:46.225Z") }}</td>
          <td>{{ changeTime("2024-09-09T09:22:46.225Z") }}</td>
          <td>Binayak Dhakal</td>
          <td>
            <v-checkbox></v-checkbox>
          </td>
          <td>
            <v-checkbox></v-checkbox>
          </td>
        </tr>
      </tbody>
    </table>
    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="text-box">
        <label for="">बैठकको कार्यसूची</label>
        <v-textarea outlined rows="3" v-model="agendaNepali"></v-textarea>
      </div>
      <div class="text-box">
        <label for="">टिप्पणी</label>
        <v-textarea outlined rows="3" v-model="remarkNepali"></v-textarea>
      </div>
      <div class="text-box">
        <label for="">बैठक मिनेट</label>
        <v-file-input
          label="बैठक मिनेट"
          outlined
          accept="application/pdf"
          prepend-icon="mdi-file"
        ></v-file-input>
      </div>
      <div style="margin: 0 10px">
        <v-btn color="primary">Save</v-btn>
      </div>
    </v-form>
  </section>
</template>

<script>
import ProvinceFilterWithTole from "@/dashboard/components/ProvinceFilterWithTole.vue";
import TitleBreadCrumb from "@/dashboard/components/common/TitleBreadCrumb";
import moment from "moment";
import NepaliDate from "nepali-date-converter";
import { parseISO } from "date-fns";
import preeti from "preeti";
export default {
  name: "Meeting",
  components: {
    ProvinceFilterWithTole,
    TitleBreadCrumb,
  },
  data() {
    return {
      province: "",
      district: "",
      houseofrepresentative: "",
      pradeshassemblyconstituency: "",
      municipality: "",
      ward: "",
      tole: "",
      title: "Meeting",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Meeting",
        },
      ],
      todayDate: new Date(),
      agenda: "",
      remark: "",
      minut: undefined,
      valid: true,
    };
  },
  methods: {
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
    changeTime(datehere) {
      return moment(datehere).format("LTS");
    },
    changeToNepali(e) {
      return preeti(e);
    },
  },
  computed: {
    agendaNepali: {
      get() {
        return this.changeToNepali(this.agenda);
      },
      set(value) {
        this.agenda = value;
      },
    },
    remarkNepali: {
      get() {
        return this.changeToNepali(this.remark);
      },
      set(value) {
        this.remark = value;
      },
    },
  },
  created() {},
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