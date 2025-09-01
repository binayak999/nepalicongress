<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row v-if="false">
        <Customlogin />
      </v-row>
      <v-row v-if="true">
        <v-col md="12" class="pl-5 text-right" v-if="false">
          <CustomButton @clickAction="logout" text="Logout" />
        </v-col>
        <v-col md="12">
          <div>
            <v-progress-circular indeterminate color="primary" v-if="false">
              <span class="sr-only">Loading...</span>
            </v-progress-circular>
          </div>
          <v-row>
            <v-col md="6">
              <label>{{ committeeMemberType }} कार्यसमिती</label>
              <v-selection
                class="selectdate"
                v-model="committeeMemberType"
                placeholder="Select Form"
                :options="selectionTitles"
                label="Select Form"
                :filterable="true"
              
              ></v-selection>
              <!-- :disabled="loggedData == undefined" -->
            </v-col>
            <v-col md="6">
              <label>बैठक मिति</label>
              <v-text-field
                type="date"
                v-model="createdAt"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <ProvinceFilterWithTole
            @sendGeoData="getGeoData"
            :committeeType="committeeMemberType"
            :selectTole="true"
            :disabled="false"
            :loadSelect="loggedData"
            :meeting="true && disabled"
          />
          <v-col md="12">
            <CustomButton
              @clickAction="filterCommitteeMember"
              text="Filter"
              :loading="false"
            />
          </v-col>
          <v-form ref="form" :valid="valid">
            <table border="" class="table" v-if="!loading">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Attendie</th>
                  <th>Present</th>
                  <th>Absent</th>
                </tr>
              </thead>
              <tbody>
      
                <tr v-for="(data, index) in members" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td><strong>{{ data.name }}</strong> ({{ data.post }})</td>
                  <td>
                    <v-checkbox
                      v-model="data.present"
                      v-if="!data.absent"
                    ></v-checkbox>
                  </td>
                  <td>
                    <v-checkbox
                      v-model="data.absent"
                      v-if="!data.present"
                    ></v-checkbox>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-form>
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
                v-model="minut"
              ></v-file-input>
            </div>
            <div style="margin: 0 10px">
              <v-btn color="primary">Save</v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import ProvinceFilterWithTole from "@/dashboard/components/ProvinceFilterWithTole.vue";
import TitleBreadCrumb from "@/dashboard/components/common/TitleBreadCrumb";
import moment from "moment";
import NepaliDate from "nepali-date-converter";
import { parseISO } from "date-fns";
import preeti from "preeti";
import Customlogin from "../../components/customlogin/customlogin.vue";
import { secureStorage } from "../../../main";
import CustomButton from "../../components/CustomButton.vue";
import { mapActions, mapGetters } from "vuex/dist/vuex.common.js";
export default {
  name: "Meeting",
  components: {
    TitleBreadCrumb,
    Customlogin,
    CustomButton,
    ProvinceFilterWithTole,
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
      logged: false,
      loading: true,
      committeeMemberType: "",
      members: [],
      selectionTitles: [
        "टोल",
        "वार्ड",
        "पालिका",
        "प्रदेश सभा क्षेत्र",
        "प्रतिनिधि सभा क्षेत्र",
        "जिल्ला",
      ],
      disabled: false,
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
    changeTime(datehere) {
      return moment(datehere).format("LTS");
    },
    changeToNepali(e) {
      return preeti(e);
    },
    async filterCommitteeMember() {
      let data = {
        province: this.province && this.province + "",
      };
      if (
        (this.district != "" && this.committeeMemberType == "जिल्ला") ||
        this.committeeMemberType == "प्रतिनिधि सभा क्षेत्र" ||
        this.committeeMemberType == "प्रदेश सभा क्षेत्र" ||
        this.committeeMemberType == "पालिका" ||
        this.committeeMemberType == "वार्ड" ||
        this.committeeMemberType == "टोल"
      )
        data.district = this.district;
      if (
        (this.houseofrepresentative != "" &&
          this.committeeMemberType == "प्रतिनिधि सभा क्षेत्र") ||
        this.committeeMemberType == "प्रदेश सभा क्षेत्र" ||
        this.committeeMemberType == "पालिका" ||
        this.committeeMemberType == "वार्ड" ||
        this.committeeMemberType == "टोल"
      )
        data.houseofrepresentative =
          this.houseofrepresentative && this.houseofrepresentative + "";
      if (
        (this.pradeshassemblyconstituency != "" &&
          this.committeeMemberType == "प्रदेश सभा क्षेत्र") ||
        this.committeeMemberType == "पालिका" ||
        this.committeeMemberType == "वार्ड" ||
        this.committeeMemberType == "टोल"
      )
        data.pradeshassemblyconstituency =
          this.pradeshassemblyconstituency &&
          this.pradeshassemblyconstituency + "";
      if (
        (this.municipality != "" && this.committeeMemberType == "पालिका") ||
        this.committeeMemberType == "वार्ड" ||
        this.committeeMemberType == "टोल"
      )
        data.municipality = this.municipality;
      if (
        (this.ward != "" && this.committeeMemberType == "वार्ड") ||
        this.committeeMemberType == "टोल"
      )
        data.ward = this.ward && this.ward + "";
      if (this.tole != "" && this.committeeMemberType == "टोल")
        data.tole = this.tole;
      if (this.committeeMemberType != "") data.title = this.committeeMemberType;
      this.loading = true;
      await this.fetchGeneralConventionCommitteeMember(data);
      this.members = this.allGeneralConvenstionCommitteeMember.map((ele) => {
        return {
          ...ele,
          present: false,
          absent: false,
        };
      });
      this.loading = false;
    },
    logout() {
      secureStorage.removeItem("committeeMember");
      this.logged = false;
      let info = {
        icon: "success",
        status: true,
        title: `Logout Successfully`,
        message: "From Committee Member Entry",
      };
      this.$store.dispatch("alertNow", info);
    },
  },
  computed: {
    ...mapGetters(["allGeneralConvenstionCommitteeMember"]),
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
  async created() {
    // if (secureStorage.getItem("committeeMember") != undefined) {
    //   this.logged = true;
    //   this.loggedData = JSON.parse(
    //     secureStorage.getItem("committeeMember")
    //   ).user;
    //   this.committeeMemberType = this.loggedData.committeeMemberType;
    //   if (this.committeeMemberType == "टोल") {
    //     this.selectionTitles = ["वार्ड", "टोल"];
    //     this.disabled = true;
    //   }
    //   this.province = this.loggedData.province;
    //   this.district = this.loggedData.district;
    //   if (this.loggedData.houseofrepresentative != undefined) {
    //     this.houseofrepresentative = this.loggedData.houseofrepresentative;
    //   }
    //   if (this.loggedData.pradeshassemblyconstituency != undefined) {
    //     this.pradeshassemblyconstituency =
    //       this.loggedData.pradeshassemblyconstituency;
    //   }
    //   if (this.loggedData.municipality != undefined) {
    //     this.municipality = this.loggedData.municipality;
    //   }
    //   if (this.loggedData.ward != undefined) {
    //     this.ward = this.loggedData.ward;
    //   }

    //   await this.filterCommitteeMember();
    // } else {
    //   this.logged = false;
    // }
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