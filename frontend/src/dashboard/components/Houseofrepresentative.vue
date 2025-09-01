<template>
  <section>
    <h4>{{ payload.maindistrict }} / {{ payload.houseofrepresentative }}</h4>
    <div v-if="!loading">
      <div class="bodysection" v-if="reports != undefined">
        <v-row>
          <v-col md="6">
            <ChartAndTable
              v-if="reports.totalGender != undefined"
              :datachart="reports.total"
              :totalDAll="totalMember"
              title="New And Renew Member"
              :status="true"
            />
          </v-col>
          <v-col md="6" v-if="reports.totalGender != undefined">
            <ChartAndTable
              :datachart="reports.totalGender"
              :totalDAll="totalGender"
              title="Gender Count"
              :status="true"
            />
          </v-col>
          <v-col md="6" v-if="reports.allInclusive != undefined">
            <ChartAndTable
              :datachart="reports.allInclusive"
              :totalDAll="totalInclusive"
              title="Inclusive Group Count"
              :status="true"
            />
          </v-col>
          <v-col md="6" v-if="reports.totalAge != undefined">
            <ChartAndTable
              :datachart="reports.totalAge"
              :totalDAll="totalAge"
              title="Age Count"
              :status="true"
            />
          </v-col>

          <v-col md="6" v-if="reports.topTwentyAge != undefined">
            <ChartAndTable
              :datachart="reports.topTwentyAge"
              :totalDAll="totalAge"
              title="Top 5 Age"
              :status="true"
            />
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-if="loading">loading...</div>
    <div
      v-for="(data, index) in pradeshabha.allmember"
      :key="index"
    >

      <PradeshSabha
        :payload="{
          province: payload.province,
          maindistrict: payload.maindistrict,
          houseofrepresentative: payload.houseofrepresentative,
          pradeshassemblyconstituency: data.title,
        }"
        :filterprovince="filterprovince"
      />
    </div>
  </section>
</template>

<script>
import axios from "axios";
import ChartAndTable from "../views/circular/chartAndTable.vue";
import { baseUrl, secureStorage } from "../../main";
import { mapActions, mapGetters } from "vuex";
import PradeshSabha from "./PradeshSabha.vue";
export default {
  name: "District",
  data: () => ({
    loading: true,
    totalMember: 0,
    totalGender: 0,
    totalInclusive: 0,
    totalAge: 0,
    totalProfession: 0,
    reports: undefined,
    pradeshabha:[]
  }),
  components: {
    ChartAndTable,
    PradeshSabha,
  },
  props: ["payload", "filterprovince"],
  methods: {
    ...mapActions(["getpradeshassemblyconstituencycount"]),
    totalCount(data) {
      this.totalMember = 0;
      this.totalGender = 0;
      this.totalInclusive = 0;
      this.totalAge = 0;
      this.totalProfession = 0;

      data.total.forEach((ele) => {
        this.totalMember += ele.count;
      });

      data.allInclusive.forEach((ele) => {
        this.totalInclusive += ele.count;
      });

      data.totalAge.forEach((ele) => {
        this.totalAge += ele.count;
      });

      data.totalGender.forEach((ele) => {
        this.totalGender += ele.count;
      });
      data.totalProfession.forEach((ele) => {
        this.totalProfession += ele.count;
      });
    },
    async reportGeneration(data) {
      try {
        const response = await axios.post(
          `${baseUrl}circular/reportGenerationTree`,
          data,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(secureStorage.getItem("userData")).token
              }`,
            },
          }
        );

        this.reports = response.data;
        this.totalCount(this.reports);
      } catch (error) {
        console.log(error.response);
      }
    },
  },
  computed: {
    ...mapGetters(["allProvinceonly", "allpradeshassemblyconstituencycount"]),
  },
  async created() {
    await this.reportGeneration({
      province: this.payload.province,
      maindistrict: this.payload.maindistrict,
      houseofrepresentative: this.payload.houseofrepresentative,
    });

    this.loading = false;
    let response = await axios.post(
      `${baseUrl}circular/pradeshassemblyconstituencyanalysis`,
      {
        maindistrict: this.payload.maindistrict,
        houseofrepresentative: this.payload.houseofrepresentative,
      },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureStorage.getItem("userData")).token
          }`,
        },
      }
    );
    this.pradeshabha = response.data;
  },
};
</script>

<style lang="scss" scoped>
</style>