<template>
  <div>
    <section v-if="false">
      <ActiveUserAuth />
    </section>
    <section>
      <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />

      <v-row>
        <v-col md="12">
          <ul v-if="allprovincecount.results" class="listcount">
            <li
              v-for="(data, index) in allprovincecount.results"
              :key="index"
              @click="districtFunc(data.title)"
            >
              <h3>Province : {{ data.title }}</h3>
              <h1>{{ data.count }}</h1>
            </li>
          </ul>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="2">
          <ul v-if="alldistrictcount.results" class="listcountRow">
            <li
              v-for="(data, index) in alldistrictcount.results"
              :key="index"
              @click="houseofrepresentativeFunc(data.title)"
            >
              <h3>{{ data.title }}</h3>
              <h1>{{ data.count }}</h1>
            </li>
          </ul>
        </v-col>
        <v-col md="2">
          <ul v-if="allhouseofrepresentativecount.results" class="listcountRow">
            <li
              v-for="(data, index) in allhouseofrepresentativecount.results"
              :key="index"
              @click="municipalityFunc(data.title)"
            >
              <h3>House of representative : {{ data.title }}</h3>
              <h1>{{ data.count }}</h1>
            </li>
          </ul>
        </v-col>

        <v-col md="2">
          <ul v-if="allmuncipalitycount.results" class="listcountRow">
            <li
              v-for="(data, index) in allmuncipalitycount.results"
              :key="index"
              @click="wardFunc(data.title)"
            >
              <h3>{{ data.title }}</h3>
              <h1>{{ data.count }}</h1>
            </li>
          </ul>
        </v-col>
        <v-col md="2">
          <ul v-if="allwardcount.results" class="listcountRow">
            <li v-for="(data, index) in allwardcount.results" :key="index">
              <h3>Ward : {{ data.title }}</h3>
              <h1>{{ data.count }}</h1>
            </li>
          </ul>
        </v-col>
      </v-row>
      <div class="backgroundfix" v-if="allLoadingActive">
              
          </div>
      <div class="posfix" v-if="allLoadingActive">
          
        <img
          :src="require(`@/assets/images/icons/la.svg`)"
          alt
          class="loading"
          width="50px"
        />
      </div>
    </section>
  </div>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Treeview",

  components: {
    TitleBreadCrumb,
  },
  data: () => ({
    title: "Tree View",

    showSomeTime: false,

    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Tree View",
      },
    ],
    district: "",
    houseofrepresentative: "",
    json_data: [],
  }),

  computed: {
    ...mapGetters([
      "allprovincecount",
      "alldistrictcount",
      "allhouseofrepresentativecount",
      "allmuncipalitycount",
      "allwardcount",
      "allLoadingActive",
    ]),
  },

  methods: {
    ...mapActions([
      "getprovincecount",
      "getdistrictcount",
      "gethouseofrepresentativecount",
      "getmunicipality",
      "getWard",
    ]),
    districtFunc(data) {
      this.getdistrictcount({ region: data });
    },
    houseofrepresentativeFunc(data) {
      this.district = data;
      this.gethouseofrepresentativecount({ maindistrict: data });
    },
    municipalityFunc(data) {
      this.houseofrepresentative = data;
      this.getmunicipality({
        maindistrict: this.district,
        houseofrepresentative: data,
      });
    },
    wardFunc(data) {
      this.getWard({
        municipality: data,
        maindistrict: this.district,
        houseofrepresentative: this.houseofrepresentative,
      });
    },
  },
  created() {
    this.getprovincecount();
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
.backgroundfix{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.3);
}
.posfix {
  background: white;
  position: fixed;
  height: 60px;
  width: 60px;
  box-shadow: 0 3px 5px rgb(0 0 0 / 20%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
}
.listcount {
  display: flex;
  position: relative;
  list-style: none;
  li {
    padding-left: 0;
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    width: 14.27%;
    text-align: center;
    margin-right: 10px;
    h3 {
      margin-top: 10px;
    }
  }
  margin-left: 0;
}
.listcountRow {
  position: relative;
  display: flex;
  list-style: none;
  flex-flow: column;
  //   left: 0;
  //   top: 100%;
  width: 100%;
  //   width: 15.5%;
  margin-top: 10px;
  li {
    //   width: 250px;
    margin-bottom: 10px;
    padding-left: 0;
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
    padding: 10px 40px;
    text-align: center;
    margin-right: 10px;
    h3 {
      margin-top: 10px;
    }
  }
  margin-left: 0;
}
h1 {
  font-size: 30px;
}
li{
    cursor: pointer;
}
</style>
