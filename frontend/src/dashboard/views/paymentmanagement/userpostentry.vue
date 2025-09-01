<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-form ref="form" v-model="valid" lazy-validation class="kriyasil">
      <v-container>
        <v-row>
          <v-col md="12">
            <ProvinceFilter @sendGeoData="getGeoData" :districtNagapalika="true"/>
          </v-col>
          <v-col md="12">
            <div class="grid-container">
              <div class="grid-item">
                <v-col>
                  <label for>नाम</label>
                  <v-text-field
                    v-model="fullname"
                    :label="changeToNepali(fullname)"
                    required
                    outlined
                    :rules="[nameRules.required]"
                    class="specific"
                    @keydown="changeToNepali"
                  ></v-text-field>
                </v-col>
              </div>
              <div class="grid-item">
                <v-col>
                  <label for>सदस्य पद</label>
                  <v-text-field
                    v-model="userPost"
                    :label="changeToNepali(fullname)"
                    required
                    outlined
                    :rules="[nameRules.required]"
                    class="specific"
                    @keydown="changeToNepali"
                  ></v-text-field>
                </v-col>
              </div>

              <div class="grid-item">
                <v-col>
                  <label for>फोन</label>
                  <v-text-field
                    v-model="phone"
                    :rules="phoneNumberRules"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </div>

              
            </div>
            <v-row>
              <v-col md="2">
                <v-btn
                  @click="formSubmit"
                  color="primary"
                  dark
                  :loading="loading"
                >
                  Register
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </section>
</template>

<script>
import TitleBreadCrumb from "@/dashboard/components/common/TitleBreadCrumb";
import ProvinceFilter from "@/dashboard/components/ProvinceFilter";
import preeti from "preeti";
export default {
  name: "UserPostPayment",
  components: {
    TitleBreadCrumb,
    ProvinceFilter,
  },
  data: () => {
    return {
      title: "User Post Entry",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "User Post Entry",
        },
      ],
      inclusivegroups: [
        "आदिवासी जनजाति",
        "दलित",
        "मधेशी",
        "खस आर्य",
        "थारु",
        "मुस्लिम",
        "पिछडिएको क्षेत्र",
        "अपाङ्गता भएका",
        "अल्पसंख्यक",
      ],
      loading: false,
      genders: ["महिला", "पुरुष"],
      // geo data
      province: "",
      district: "",
      houseofrepresentative: "",
      pradeshassemblyconstituency: "",
      municipality: "",
      ward: "",

      //form
      valid: true,
      nameRules: {
        required: (value) => !!value || "Required.",
      },
      numberRules: [
        (v) => !!v || "Field is required",
        (v) => /^\d+$/.test(v) || "Please enter a valid number",
      ],
      phoneNumberRules: [
        (v) => !!v || "Phone Number is required",
        (v) => v.length <= 10 || "Phone number should be 10 digit",
        (v) => v.length >= 10 || "Phone number should be 10 digit",
        (v) => !isNaN(v) || "Please enter number",
        (v) =>
          v.match(
            /^\(?([9-9]{1})\)?[-. ]?([1-9]{1})[-. ]?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
          ) || "Please entery valid phone number",
      ],

      fullname: "",
      password: "",
      phone: "",
      gender: "",
      inclusivegroup: "",
      remark: "",
      userPost: "",
    };
  },
  methods: {
    changeToNepali(e) {
      return preeti(e);
    },
    getGeoData(response) {
      this.province = response.province;
      this.district = response.district;
      this.houseofrepresentative = response.houseofrepresentative;
      this.pradeshassemblyconstituency = response.pradeshassemblyconstituency;
      this.municipality = response.municipality;
      this.ward = response.ward;
    },
    formSubmit() {
      console.log("Form Submitted");
    },
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