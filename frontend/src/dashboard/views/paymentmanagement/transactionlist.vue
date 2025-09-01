<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <ProvinceFilter @sendGeoData="getGeoData" :districtNagapalika="true"/>
    <v-col md="12">
            <CustomButton
              @clickAction="filterCommitteeMember"
              text="Filter"
              :loading="loading"
            />
          </v-col>
    <table border="" class="table">
      <thead>
        <tr>
          <th>S/N</th>
          <th>Name</th>
          <th>Transaction Type</th>
          <th>Amount</th>
          <th>Payment Status</th>
          <th>Payment Via</th>
          <th>Date</th>
          <th>Send Remainder</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in transactionHistory" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ data.name }}</td>
          <td>{{ data.transactionType }}</td>
          <td>{{ data.amount }}</td>
          <td>{{ data.paymentStatus }}</td>
          <td>{{ data.paidVia }}</td>

          <td>
            {{ changeDate(data.date) }} {{ changeTime(data.date) }}
          </td>
          <td>
            <v-btn color="primary" small v-if="data.paymentStatus == 'Not Paid' && data.transactionType == 'Post Fee Payment'">Send</v-btn
            ><span v-if="data.paymentStatus == 'Paid' || data.transactionType != 'Post Fee Payment'">-</span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import ProvinceFilter from "@/dashboard/components/ProvinceFilter.vue";
import TitleBreadCrumb from "@/dashboard/components/common/TitleBreadCrumb";
import moment from "moment";
import NepaliDate from "nepali-date-converter";
import { parseISO } from "date-fns";
import CustomButton from "../../components/CustomButton.vue";
export default {
  name: "Transaction History",
  components: {
    ProvinceFilter,
    TitleBreadCrumb,
    CustomButton
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
      title: "Transaction History",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Transaction History",
        },
      ],
      todayDate: new Date(),
      valid: true,
      transactionHistory: [
        {
          name: "Binayak Dhakal",
          transactionType: "Post Fee Payment",
          amount: "Rs. 10,000",
          paymentStatus: "Paid",
          paidVia:"Khalti",
          date: "2024-09-09T09:22:46.225Z",
        }
      ],
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
    filterCommitteeMember() {
      this.$router.push({
        name: "TransactionHistory",
        params: {
          province: this.province,
          district: this.district,
          houseofrepresentative: this.houseofrepresentative,
          pradeshassemblyconstituency: this.pradeshassemblyconstituency,
          municipality: this.municipality,
          ward: this.ward,
          tole: this.tole,
        },
      });
    }
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
    font-size: 14px;
  }
  td {
    border: 1px solid #ddd;
    height: 10px;
    padding: 5px 10px;
    text-align: left;
    font-size: 14px;
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