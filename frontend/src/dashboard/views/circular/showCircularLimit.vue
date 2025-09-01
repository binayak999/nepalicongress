<template>
  <section>
    <TitleBreadCrumb title="Limited Data" />
    <v-row>
      <v-col>
        <v-selection
          v-if="allmaindistrict.results != undefined"
          v-model="maindistrict"
          :options="allmaindistrict.results"
          @input="selectMain(maindistrict)"
        ></v-selection>
      </v-col>
      <v-col>
        Less Than
        <v-text-field v-model="limit" required outlined></v-text-field>
      </v-col>
      <v-col>
        Greater Than
        <v-text-field v-model="limitGreater" required outlined></v-text-field>
      </v-col>
      <v-col>
        <v-btn v-if="!loading" @click="getFilterData">Filter</v-btn>
        <v-progress-circular
          v-if="loading"
          :size="30"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-btn class="btn btn-default" @click="printa">{{ exportPDF }}</v-btn>
    <section ref="doc" class="pdfbox">
      <div v-if="limitGreater > 0">
   <span v-if="maindistrict != undefined">जिल्ला : {{maindistrict}} <br/></span>  
        ({{limitGreater}}) भन्दा बढि र ( {{limit}} )  भन्दा कमको संख्यामा रहेको कृयासिल सदस्य भएका वार्डहरुको विवरण
        
      </div>
      <div v-if="limitGreater == 0">
        <span v-if="maindistrict != undefined">जिल्ला : {{maindistrict}} <br/></span>  
        ({{limitGreater}}) भन्दा बढि र ( {{limit}} )  भन्दा कमको संख्यामा रहेको कृयासिल सदस्य भएका वार्डहरुको विवरण
      </div>
      <table class="table table-responsive" border="1">
        <thead>
          <tr>
            <th>S/N</th>
            <th v-if="maindistrict == undefined">District</th>
            <th>Municipality</th>
            <th>Ward</th>

            <th>Count</th>
          </tr>
        </thead>
        <tbody v-if="allfiltercount.results != undefined">
          <tr v-for="(data, index) in allfiltercount.results" :key="index">
            <td>{{ index + 1 }}</td>
            <td v-if="maindistrict == undefined">{{ data.wardno.maindistrict }}</td>
            <td>{{ data.wardno.muncipality }}</td>
            <td>{{ data.wardno.ward }}</td>

            <td>{{ data.count }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapActions, mapGetters } from "vuex";
import Printd from "printd";
export default {
  name: "LimitShowCircular",
  data: () => ({
    limit: 150,
    limitGreater: 0,
    maindistrict: undefined,
    loading: false,
    exportPDF: "Export",
    cssText: `
    .pdfbox {

	 background: white;
	 z-index: 9999;

}
 .pdfbox table {
	 width: 100%;
	 border-collapse: collapse;
}
 .pdfbox table th {
	 font-size: 11px;
	 text-align: left;
	 padding: 3px;
}
 .pdfbox table td {
	 font-size: 11px;
	 padding: 3px;
}
 .pdfbox .imageheader {
	 background: white;
	 list-style: none;
	 padding-left: 0;
	 display: flex;
	 justify-content: space-between;
	 padding: 10px 30px;
}
 .pdfbox .imageheader img {
	 height: 90px;
}
 .pdfbox .imageheader h1 {
	 font-size: 30px;
	 text-align: center;
}
 .pdfbox .imageheader h2 {
	 font-size: 20px;
	 text-align: center;
}
.fromdata{
  list-style:none;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
}
 .fromdata li{
font-size:12px;
padding:0 5px;
}
    `,
  }),
  components: {
    TitleBreadCrumb,
  },
  computed: {
    ...mapGetters(["allmaindistrict", "allfiltercount"]),
  },
  methods: {
    ...mapActions(["getMainDistrict", "getFilterCount"]),
    selectMain(code) {
      console.log(code);
      this.maindistrict = code;
    },
    async getFilterData() {
  
        this.loading = true;

        let data = {
          maindistrict: this.maindistrict,
          limit: this.limit,
          limitGreater: this.limitGreater,
        };
        await this.getFilterCount(data);
        this.loading = false;
      
    },
    printa() {
      this.exportPDF = "Download Now";
      this.showSomeTime = true;
      this.d.print(this.$refs.doc, [this.cssText]);
      setTimeout(() => {
        this.showSomeTime = false;
      }, 3000);
    },
  },
  async created() {
    await this.getMainDistrict();
    this.Printd = window.printd;
    this.d = new Printd();
  },
};
</script>

<style lang="scss">
table {
  width: 500px;
  border-collapse: collapse;
  margin: 0 50px;

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
