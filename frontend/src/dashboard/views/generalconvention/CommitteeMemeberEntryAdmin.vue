<template>
  <section>
    <TitleBreadCrumb :title="titleMain" :breadcrumbs="breadcrumbs" />
    <v-form ref="form" v-model="valid" lazy-validation class="kriyasil">
      <v-container>
        <v-row>
          <v-col md="12">
            <div class="grid-container px-3">
              <div class="grid-item">
                <h1 class="text-left">{{ committeeMemberType }} कार्यसमिती</h1>
                <v-selection
                  class="selectdate"
                  v-model="committeeMemberType"
                  placeholder="कार्यसमिती"
                  :options="selectionTitles"
                  label="कार्यसमिती"
                  :filterable="true"
                  @input="() => setCommitteeMemberType(committeeMemberType)"
                ></v-selection>
              </div>
            </div>
          </v-col>
          <v-col md="12">
            <ProvinceFilter
              @sendGeoData="getGeoData"
              :committeeType="committeeMemberType"
            />
          </v-col>
          <v-col md="12">
            <div class="grid-container">
              <div class="grid-item">
                <v-col>
                  <label for>Fist Name</label>
                  <v-text-field
                    v-model="first_name"
                    required
                    outlined
                    :rules="[nameRules.required]"
                  ></v-text-field>
                </v-col>
              </div>
              <div class="grid-item">
                <v-col>
                  <label for>Last Name</label>
                  <v-text-field
                    v-model="last_name"
                    required
                    outlined
                    :rules="[nameRules.required]"
                  ></v-text-field>
                </v-col>
              </div>

              <div class="grid-item">
                <v-col>
                  <label for>Phone</label>
                  <v-text-field
                    v-model="phone"
                    :rules="phoneNumberRules"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </div>

              <div class="grid-item">
                <v-col>
                  <label for>Password</label>
                  <v-text-field
                    v-model="password"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </div>
            </div>
            <v-row>
              <v-col md="2">
                <!-- <v-btn @click="createGeneral" color="primary" dark :loading="loading">
                  Register
                </v-btn> -->
                <CustomButton
                  @clickAction="createGeneral"
                  text="Register"
                  :loading="loading"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </section>
</template>

<script>
import ProvinceFilter from "@/dashboard/components/ProvinceFilter";
import TitleBreadCrumb from "@/dashboard/components/common/TitleBreadCrumb";
import preeti from "preeti";
import { mapActions } from "vuex/dist/vuex.common.js";
import CustomButton from "../../components/CustomButton.vue";

export default {
  name: "CommitteeMemeberEntryAdmin",
  components: { ProvinceFilter, TitleBreadCrumb, CustomButton },
  data: () => {
    return {
      //page header
      titleMain: "Committee Member Entry",
      committeeMemberType: "",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Committee Member Entry",
        },
      ],
      //basic
      loading: false,
      selectionTitles: [
        "टोल",
        "वार्ड",
        "पालिका",
        "प्रदेश सभा क्षेत्र",
        "प्रतिनिधि सभा क्षेत्र",
        "जिल्ला",
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

      first_name: "",
      last_name: "",
      password: "",
      phone: "",
      gender: "",
      inclusivegroup: "",
      remark: "",
      tole: "",
    };
  },
  methods: {
    ...mapActions(["createActiveUser"]),
    getGeoData(response) {
      this.province = response.province;
      this.district = response.district;
      this.houseofrepresentative = response.houseofrepresentative;
      this.pradeshassemblyconstituency = response.pradeshassemblyconstituency;
      this.municipality = response.municipality;
      this.ward = response.ward;
      this.tole = response.tole;
      console.log(response);
    },
    changeToNepali(e) {
      return preeti(e);
    },
    async createGeneral() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let data = {
          first_name: this.first_name,
          last_name: this.last_name,
          phone: this.phone,
          password: this.password,
          province: this.province + "",
          district: this.district,
          accountType: "committeeMember",
          committeeMemberType: this.committeeMemberType,
        };
        if (this.houseofrepresentative != "")
          data.houseofrepresentative =
            this.houseofrepresentative && this.houseofrepresentative + "";
        if (this.pradeshassemblyconstituency != "")
          data.pradeshassemblyconstituency =
            this.pradeshassemblyconstituency &&
            this.pradeshassemblyconstituency + "";
        if (this.municipality != "") data.municipality = this.municipality;
        if (this.ward != "") data.ward = this.ward && this.ward + "";
        if(this.tole != "") data.tole = this.tole
        await this.createActiveUser(data);
        this.loading = false;
      }
    },
    setCommitteeMemberType(title) {
      this.committeeMemberType = title;
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