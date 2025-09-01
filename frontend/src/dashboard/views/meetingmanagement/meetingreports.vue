<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col md="12" class="pb-0">
          <v-row>
            <v-col md="7">
              <label>{{ committeeType }} कार्यसमिती</label>
              <v-selection
                class="selectdate"
                v-model="committeeType"
                placeholder="Select Form"
                :options="selectionTitles"
                label="Select Form"
                :filterable="true"
              ></v-selection>
            </v-col>
            <v-col md="5">
              <label>बैठक मिति</label>
              <v-text-field
                type="date"
                v-model="createdAt"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-col md="12" class="pt-0">
          <ProvinceFilterWithTole
            @sendGeoData="getGeoData"
            :selectTole="true"
            :committeeType="committeeType"
          />
          <table border="" class="table">
            <thead>
              <tr>
                <th>क्रम संख्या</th>
                <th>उपस्थित सदस्य संख्या</th>
                <th>अनुपस्थित सदस्य संख्या</th>
                <th>बैठकको कार्यसूची छ ?</th>
                <th>टिप्पणी छ ?</th>
                <th>बैठक मिनेट छ ?</th>
                <th>मिति</th>
                <th>कार्य</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 10" :key="i">
                <td>{{ i }}</td>
                <td>10</td>
                <td>3</td>
                <td>छ</td>
                <td>छ</td>
                <td>छ</td>
                <td>
                  {{ changeDate("2024-09-09T09:22:46.225Z") }}
                  {{ changeTime("2024-09-09T09:22:46.225Z") }}
                </td>
                <td>
                  <div class="action">
                    <i class="fa fa-eye" @click="show = true"></i>
                    <!-- <i class="fa fa-download"></i> -->
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </v-col>
      </v-row>
    </v-container>
    <CustomModal :show="show" @closeModal="closePopup">
      <div slot="title">
        <h1>बैठकको प्रतिवेदन</h1>
        <ul class="detailList">
          <li v-if="committeeType != ''">
            <strong>कार्यसमिती : </strong>{{ committeeType }}
          </li>
          <li v-if="province != ''">
            <strong>प्रदेश : </strong>{{ province }}
          </li>
          <li v-if="district != ''">
            <strong>जिल्ला : </strong>{{ district }}
          </li>
          <li v-if="houseofrepresentative != ''">
            <strong>प्रतिनिधिसभा नि.क्षे.नं. : </strong>
            {{ houseofrepresentative }}
          </li>
          <li v-if="pradeshassemblyconstituency != ''">
            <strong>प्रदेश सभा क्षेत्र : </strong>
            {{ pradeshassemblyconstituency }}
          </li>
          <li v-if="municipality != ''">
            <strong>न.पा./गा.पा. : </strong>{{ municipality }}
          </li>
          <li v-if="ward != ''"><strong>वार्ड : </strong>{{ ward }}</li>
          <li v-if="tole != ''"><strong>टोल : </strong>{{ tole }}</li>
          <li>
            <strong>मिति : </strong>{{ changeDate("2024-09-09T09:22:46.225Z") }}
          </li>
        </ul>
      </div>
      <div slot="body">
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
                <v-chip color="green" text-color="white" v-if="i % 2 == 0"
                  >Present</v-chip
                >
              </td>
              <td>
                <v-chip color="red" text-color="white" v-if="i % 3 == 0"
                  >Absent</v-chip
                >
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-box">
          <label for="">बैठकको कार्यसूची</label>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            pariatur amet iure, enim laboriosam laborum nemo ab velit!
            Repellendus voluptate veniam doloribus natus quam? Soluta vitae
            adipisci rerum provident mollitia?
          </p>
        </div>
        <div class="text-box">
          <label for="">टिप्पणी</label>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            pariatur amet iure, enim laboriosam laborum nemo ab velit!
            Repellendus voluptate veniam doloribus natus quam? Soluta vitae
            adipisci rerum provident mollitia?
          </p>
        </div>
        <div class="text-box">
          <label for="">बैठक मिनेट</label>
          <a
            href="https://retrocdn.net/images/e/e4/Pdf-sample.pdf"
            class="customButton"
            target="_blank"
            >View</a
          >
        </div>
      </div>
    </CustomModal>
  </section>
</template>

<script>
import ProvinceFilterWithTole from "@/dashboard/components/ProvinceFilterWithTole.vue";
import TitleBreadCrumb from "@/dashboard/components/common/TitleBreadCrumb";
import moment from "moment";
import NepaliDate from "nepali-date-converter";
import { parseISO } from "date-fns";
import preeti from "preeti";
import CustomModal from "@/dashboard/components/common/CustomModal.vue";
export default {
  name: "MeetingReports",
  components: {
    ProvinceFilterWithTole,
    TitleBreadCrumb,
    CustomModal,
  },
  data() {
    return {
      show: false,
      createdAt: "",
      province: "",
      district: "",
      houseofrepresentative: "",
      pradeshassemblyconstituency: "",
      municipality: "",
      ward: "",
      tole: "",
      committeeType: "",
      title: "Meeting Reports",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Meeting Reports",
        },
      ],
      todayDate: new Date(),
      agenda: "",
      remark: "",
      minut: undefined,
      valid: true,
      selectionTitles: [
        "टोल",
        "वार्ड",
        "पालिका",
        "प्रदेश सभा क्षेत्र",
        "प्रतिनिधि सभा क्षेत्र",
        "जिल्ला",
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
    changeToNepali(e) {
      return preeti(e);
    },
    closePopup() {
      this.show = false;
      console.log("close");
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
.action {
  display: flex;
  gap: 10px;
  i {
    cursor: pointer;
  }
}
.customButton {
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px 20px;
  width: 150px;
  text-align: center;
  text-decoration: none;
  &:hover {
    background-color: #45a049;
  }
}
.detailList {
  display: flex;
  gap: 10px;
}
</style>