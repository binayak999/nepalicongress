<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col>
          <v-selection
            class="selectdate"
            v-model="paymentStatus"
            placeholder="Payment Status"
            :options="[
              {
                value: undefined,
                label: 'All',
              },
              {
                value: true,
                label: 'Paid',
              },
              {
                value: false,
                label: 'Not Paid',
              },
            ]"
            :filterable="true"
            :value="filter"
          ></v-selection>
        </v-col>
        <v-col>
          <v-selection
            class="selectdate"
            v-model="approve"
            placeholder="Approval Status"
            :options="[
              {
                value: undefined,
                label: 'All',
              },
              {
                value: true,
                label: 'Approved',
              },
              {
                value: false,
                label: 'Not Approved',
              },
            ]"
            :filterable="true"
            :value="filter"
          ></v-selection>
        </v-col>
        <v-col md="3">
          <v-text-field
            outlined
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            @keyup="filter"
          ></v-text-field>
        </v-col>
        <v-col md="2">
          <v-btn class="primary" @click="filter" :loading="loading" large
            >Filter</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <ul class="pagination" v-if="!loading">
      <li
        v-if="
          allOnlineMembers.pagination.previous &&
          allOnlineMembers.pagination.previous != 0
        "
      >
        <v-btn
          @click="prevAct(allOnlineMembers.pagination.previous)"
          small
          color="green"
          >Previous</v-btn
        >
      </li>
      <li>Total : {{ allOnlineMembers.pagination.total }}</li>
      <li
        v-if="
          allOnlineMembers.pagination.next &&
          allOnlineMembers.pagination.next != 0
        "
      >
        <v-btn
          @click="nextAct(allOnlineMembers.pagination.next)"
          small
          color="green"
          >Next</v-btn
        >
      </li>
    </ul>
    <v-simple-table>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Online Members Code</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Created At</th>
          <th>Payment Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="!loading">
        <tr v-for="(data, index) in allOnlineMembers.results" :key="index">
          <td>
            {{ (currentPage - 1) * 20 + index + 1 }}
          </td>
          <td>{{ data.workingformnumber }}</td>
          <td>{{ data.firstName }}</td>
          <td v-if="data.middleName != 'undefined'">{{ data.middleName }}</td>
          <td v-if="data.middleName == 'undefined'">-</td>
          <td>{{ data.lastName }}</td>

          <td>
            {{ changeDate(data.createdAt) }} {{ changeTime(data.createdAt) }}
          </td>
          <td v-if="data.paymentStatus">Paid</td>
          <td v-if="!data.paymentStatus">
            Not Paid
            <v-btn
              x-small
              class="ml-3"
              @click="getPaymentStatus(data._id)"
              v-if="data._id != selectedMember || !sendingloading"
            >
              Send SMS
            </v-btn>
            <v-progress-circular
              indeterminate
              size="20"
              width="2"
              v-if="data._id == selectedMember && sendingloading"
            ></v-progress-circular>
          </td>
          <td>
            <v-icon
              @click="openOnlineMember(data._id)"
              v-if="data._id != selectedMember || !loadingMember"
              >mdi-eye</v-icon
            >
            <v-progress-circular
              indeterminate
              size="20"
              width="2"
              v-if="data._id == selectedMember && loadingMember"
            ></v-progress-circular>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <div></div>
    <div v-if="loading" class="loadingBox">
      <v-progress-circular indeterminate color="green"></v-progress-circular>
    </div>
    <ul class="pagination" v-if="!loading">
      <li
        v-if="
          allOnlineMembers.pagination.previous &&
          allOnlineMembers.pagination.previous != 0
        "
      >
        <v-btn
          @click="prevAct(allOnlineMembers.pagination.previous)"
          small
          color="green"
          >Previous</v-btn
        >
      </li>
      <li>Total : {{ allOnlineMembers.pagination.total }}</li>
      <li
        v-if="
          allOnlineMembers.pagination.next &&
          allOnlineMembers.pagination.next != 0
        "
      >
        <v-btn
          @click="nextAct(allOnlineMembers.pagination.next)"
          small
          color="green"
          >Next</v-btn
        >
      </li>
    </ul>
    <div v-if="allOnlineMember && visibleMember" class="listBox">
      <ul class="listBoxUL">
        <header>
          <v-icon @click="closeOnlineMember"> mdi-close </v-icon>
        </header>
        <li>
          <div>First Name:</div>
          <div>
            {{ allOnlineMember.firstName }}
          </div>
        </li>
        <li>
          <div>Middle Name:</div>
          <div>
            {{ allOnlineMember.middleName }}
          </div>
        </li>
        <li>
          <div>Last Name:</div>
          <div>
            {{ allOnlineMember.lastName }}
          </div>
        </li>
        <li>
          <div>Email:</div>
          <div>
            {{ allOnlineMember.email }}
          </div>
        </li>
        <li>
          <div>Phone:</div>
          <div>
            {{ allOnlineMember.phone }}
          </div>
        </li>
        <li>
          <div>Member Number:</div>
          <div>
            {{ allOnlineMember.workingformnumber }}
          </div>
        </li>
        <li>
          <div>Address:</div>
          <div>
            {{ allOnlineMember.address }}
          </div>
        </li>
        <li>
          <div>DOB:</div>
          <div>
            {{ allOnlineMember.dob }}
          </div>
        </li>
        <li>
          <div>National ID:</div>
          <div>
            {{ allOnlineMember.nationalId }}
          </div>
        </li>
        <li>
          <div>Blood Group:</div>
          <div>
            {{ allOnlineMember.bloodgroup }}
          </div>
        </li>
        <li>
          <div>Caste Type:</div>
          <div>
            {{ allOnlineMember.casteType }}
          </div>
        </li>
        <li>
          <div>Language:</div>
          <div>
            {{ allOnlineMember.language }}
          </div>
        </li>
        <li>
          <div>Occupation:</div>
          <div>
            {{ allOnlineMember.occupation }}
          </div>
        </li>
        <li>
          <div>Province:</div>
          <div>
            {{ allOnlineMember.province }}
          </div>
        </li>
        <li>
          <div>District:</div>
          <div>
            {{ allOnlineMember.district }}
          </div>
        </li>
        <li>
          <div>House Of Representative:</div>
          <div>
            {{ allOnlineMember.houseOfRepresentative }}
          </div>
        </li>
        <li>
          <div>Province Assembly:</div>
          <div>
            {{ allOnlineMember.provinceAssembly }}
          </div>
        </li>
        <li>
          <div>municipality:</div>
          <div>
            {{ allOnlineMember.municipality }}
          </div>
        </li>
        <li>
          <div>Ward:</div>
          <div>
            {{ allOnlineMember.ward }}
          </div>
        </li>
        <li>
          <div>Passport Size Photo:</div>
          <div>
            <img :src="allOnlineMember.ppimage" alt="" width="100" />
          </div>
        </li>
        <li>
          <div>Citizenship Front Sidee:</div>
          <div>
            <img :src="allOnlineMember.ctfimage" alt="" width="300" />
          </div>
        </li>
        <li>
          <div>Citizenship Back Side:</div>
          <div>
            <img :src="allOnlineMember.ctbimage" alt="" width="300" />
          </div>
        </li>
        <li>
          <div v-if="allOnlineMember.approve" class="approveStatus">
            Approved
            <v-icon color="white" class="ml-2">
              mdi-check-circle-outline
            </v-icon>
          </div>
          <div v-if="allOnlineMember.approve">
            <!-- Approved
            <v-icon color="white" class="ml-2">
              mdi-check-circle-outline
            </v-icon> -->
            <v-btn
              class="approveStatus"
              @click="approveMember(allOnlineMember._id)"
              :loading="loadingApproval"
              >Resend Card</v-btn
            >
          </div>
          <v-btn
            v-if="
              !allOnlineMember.approve && allOnlineMember.citizenshipno != ''
            "
            @click="approveMember(allOnlineMember._id)"
            :loading="loadingApproval"
            class="primary"
            >Approve</v-btn
          >
        </li>

        <v-form class="mt-10">
          <div class="d-flex align-center mb-2 formInput">
            <div class="mr-2 labelForm">First Name:</div>
            <v-text-field
              v-model="allOnlineMember.firstName"
              outlined
              dense
            ></v-text-field>
          </div>
          <div class="d-flex align-center mb-2 formInput">
            <div class="mr-2 labelForm">Middle Name:</div>
            <v-text-field
              v-model="allOnlineMember.middleName"
              outlined
              dense
            ></v-text-field>
          </div>
          <div class="d-flex align-center mb-2 formInput">
            <div class="mr-2 labelForm">Last Name:</div>
            <v-text-field
              v-model="allOnlineMember.lastName"
              outlined
              dense
            ></v-text-field>
          </div>
          <div class="d-flex align-center mb-2 formInput">
            <div class="mr-2 labelForm">Citizenship No:</div>
            <v-text-field
              v-model="allOnlineMember.citizenshipno"
              outlined
              dense
            ></v-text-field>
          </div>
          <div class="d-flex align-center mb-2 formInput">
            <div class="mr-2 labelForm">National Id:</div>
            <v-text-field
              v-model="allOnlineMember.nationalId"
              outlined
              dense
            ></v-text-field>
          </div>
          <div
            class="d-flex align-center mb-2 formInput"
            v-if="!allOnlineMember.dob || allOnlineMember.dob == ''"
          >
            <div class="mr-2 labelForm">DOB:</div>

            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="computedDateFormattedMomentjs"
                  clearable
                  :label="'जन्म मिति'"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  @click:clear="allOnlineMember.dob = null"
                  outlined
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="allOnlineMember.dob"
                @change="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </div>
          <div class="mt-2">
            <v-file-input
              label="पासपोर्ट आकारको तस्बिर"
              :chips="true"
              :show-size="true"
              outlined
              v-model="passportphoto"
              accept="image/*"
            ></v-file-input>
          </div>
          <div md="4" cols="12">
            <v-file-input
              label="नागरिकता अगाडि पृष्ठ"
              :chips="true"
              :show-size="true"
              outlined
              v-model="nationalIdFront"
              accept="image/*"
            ></v-file-input>
          </div>
          <div md="4" cols="12">
            <v-file-input
              label="नागरिकता पछाडि पृष्ठ"
              :chips="true"
              :show-size="true"
              outlined
              v-model="nationalIdBack"
              accept="image/*"
            ></v-file-input>
          </div>
          <v-btn
            @click="updateMember()"
            :loading="loadingUpdate"
            class="primary"
            >Update</v-btn
          >
        </v-form>
      </ul>
    </div>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import NepaliDate from "nepali-date-converter";
import { format, parseISO } from "date-fns";
import moment from "moment";
export default {
  name: "OnlineMembers",
  components: {
    TitleBreadCrumb,
  },
  data: () => ({
    menu1: false,
    title: "Members",
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Members",
      },
    ],
    passportphoto: undefined,
    nationalIdFront: undefined,
    nationalIdBack: undefined,
    search: "",
    dialog: false,
    selectedMember: undefined,
    loadingApproval: false,
    loadingMember: false,
    headers: [
      { text: "S.N.", value: "__v" },
      { text: "First Name", value: "firstName" },
      { text: "Middle Name", value: "middleName" },
      { text: "Last Name", value: "lastName" },
      { text: "Email", value: "email" },
      { text: "Payment Status", value: "paymentStatus" },
      { text: "Address", value: "address" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      content: "",
    },
    defaultItem: {
      name: "",
      content: "",
    },
    loading: true,
    visibleMember: false,
    loadingUpdate: false,
    paymentStatus: undefined,
    approve: undefined,
    filterLoading: false,
    sendingloading: false,
  }),

  computed: {
    currentPage() {
      if (this.allOnlineMembers.pagination.next) {
        return this.allOnlineMembers.pagination.next - 1;
      }

      if (this.allOnlineMembers.pagination.previous) {
        return this.allOnlineMembers.pagination.previous + 1;
      }
      return 1;
    },

    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["allOnlineMembers", "allOnlineMember"]),
    computedDateFormattedMomentjs() {
      return this.allOnlineMember.dob
        ? moment(this.allOnlineMember.dob).format("DD/MM/YYYY")
        : "";
    },
    computedDateFormattedDatefns() {
      return this.allOnlineMember.dob
        ? format(parseISO(this.allOnlineMember.dob), "DD/MM/YYYY")
        : "";
    },
  },

  methods: {
    ...mapActions([
      "postOnlineMembers",
      "getOnlineMember",
      "approveOnlineMember",
      "postOnlineMember",
      "postSmsOnlineMemberUserSMS",
    ]),
    async approveMember(id) {
      this.loadingApproval = true;
      await this.approveOnlineMember(id);
      this.loadingApproval = false;
    },
    async updateMember() {
      this.loadingUpdate = true;
      let formdata = new FormData();
      if (this.passportphoto) {
        formdata.append("passportphoto", this.passportphoto);
      }
      if (this.nationalIdFront) {
        formdata.append("nationalIdFront", this.nationalIdFront);
      }
      if (this.nationalIdBack) {
        formdata.append("nationalIdBack", this.nationalIdBack);
      }
      formdata.append("firstName", this.allOnlineMember.firstName);
      formdata.append("_id", this.allOnlineMember._id);
      formdata.append("middleName", this.allOnlineMember.middleName);
      formdata.append("lastName", this.allOnlineMember.lastName);
      formdata.append("citizenshipno", this.allOnlineMember.citizenshipno);
      formdata.append("dob", this.allOnlineMember.dob);
      formdata.append("nationalId", this.allOnlineMember.nationalId);
      await this.postOnlineMember(formdata);
      this.loadingUpdate = false;
    },
    async nextAct(data) {
      this.loading = true;
      await this.postOnlineMembers({
        page: data,
        limit: 20,
        search: this.search,
        paymentStatus: this.paymentStatus
          ? this.paymentStatus.value
          : undefined,
        approve: this.approve ? this.approve.value : undefined,
      });
      this.loading = false;
    },
    async prevAct(data) {
      this.loading = true;
      await this.postOnlineMembers({
        page: data,
        limit: 20,
        search: this.search,
        paymentStatus: this.paymentStatus
          ? this.paymentStatus.value
          : undefined,
        approve: this.approve ? this.approve.value : undefined,
      });
      this.loading = false;
    },
    changeDate(datehere) {
      let np = new NepaliDate(parseISO(datehere));
      return np.format("ddd DD, MMMM YYYY", "np");
    },
    changeTime(datehere) {
      return moment(datehere).format("LTS");
    },
    async openOnlineMember(id) {
      this.loadingMember = true;
      this.selectedMember = id;
      await this.getOnlineMember(id);
      this.visibleMember = true;
      this.loadingMember = false;
      this.selectedMember = undefined;
    },
    closeOnlineMember() {
      this.visibleMember = false;
    },
    changeProvince(data) {
      if (data == "1") {
        return "कोशी";
      }
      if (data == "2") {
        return "मधेश";
      }
      if (data == "3") {
        return "बागमती";
      }
      if (data == "4") {
        return "गण्डकी";
      }
      if (data == "5") {
        return "लुम्बिनी";
      }
      if (data == "6") {
        return "कर्णाली";
      }
      if (data == "7") {
        return "सुदूरपश्चिम";
      }
    },
    async getPaymentStatus(id) {
      this.sendingloading = true;
      this.selectedMember = id;
      await this.postSmsOnlineMemberUserSMS(id);
      this.sendingloading = false;
    },
    async filter() {
      this.loading = true;
      await this.postOnlineMembers({
        page: 1,
        limit: 20,
        search: this.search,
        paymentStatus: this.paymentStatus
          ? this.paymentStatus.value
          : undefined,
        approve: this.approve ? this.approve.value : undefined,
      });
      this.loading = false;
    },
  },
  async created() {
    await this.postOnlineMembers({
      page: 1,
      limit: 20,
      search: this.search,
      paymentStatus: this.paymentStatus ? this.paymentStatus.value : undefined,
      approve: this.approve ? this.approve.value : undefined,
    });
    this.loading = false;
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
.v-sheet {
  display: none;
}
.boxdiv {
  background: $secondary;
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
button.boxdiv {
  background: $primary;
}
.loadingBox {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pagination {
  display: flex;
  list-style: none;
  padding-left: 0;
  align-items: center;
  justify-content: flex-end;
  li {
    margin-right: 10px;
    .v-btn {
      color: #fff;
    }
  }
}
.listBox {
  list-style: none;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  header {
    width: 100%;
    text-align: right;
  }
  .listBoxUL {
    background: #fff;
    width: 40vw;
    height: 90vh;
    overflow: scroll;
    padding: 30px;
  }
  li {
    display: flex;
    div {
      &:first-of-type {
        font-weight: bold;
        text-transform: capitalize;
      }
      width: 200px;
      padding: 10px;
      &:first-child {
        width: 150px;
      }
    }
  }
}
.approveStatus {
  background: green;
  color: #fff;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 30px;
}
.formInput {
  width: 500px;
  .labelForm {
    width: 100px;
  }
}
</style>
