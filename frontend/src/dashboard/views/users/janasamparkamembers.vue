<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row>
        <!-- <v-col>
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
        </v-col> -->
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
          allJanasamparkaMembers.pagination.previous &&
          allJanasamparkaMembers.pagination.previous != 0
        "
      >
        <v-btn
          @click="prevAct(allJanasamparkaMembers.pagination.previous)"
          small
          color="green"
          >Previous</v-btn
        >
      </li>
      <li>Total : {{ allJanasamparkaMembers.pagination.total }}</li>
      <li
        v-if="
          allJanasamparkaMembers.pagination.next &&
          allJanasamparkaMembers.pagination.next != 0
        "
      >
        <v-btn
          @click="nextAct(allJanasamparkaMembers.pagination.next)"
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
          <th>Full Name</th>
          <th>Email</th>
          <th>Contact Number</th>
          <th>Country</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody v-if="!loading">
        <tr
          v-for="(data, index) in allJanasamparkaMembers.results"
          :key="index"
        >
          <td>
            {{ (currentPage - 1) * 20 + index + 1 }}
          </td>

          <td>{{ data.membername }}</td>
          <td>{{ data.email }}</td>
          <td>{{ data.phone }}</td>
          <td>{{ data.country }}</td>
          <td>
            {{ changeDate(data.createdAt) }} {{ changeTime(data.createdAt) }}
          </td>

          <td>
            <v-icon
              @click="openOnlineMember(data)"
              v-if="data != selectedMember || !loadingMember"
              >mdi-eye</v-icon
            >
            <v-progress-circular
              indeterminate
              size="20"
              width="2"
              v-if="data == selectedMember && loadingMember"
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
          allJanasamparkaMembers.pagination.previous &&
          allJanasamparkaMembers.pagination.previous != 0
        "
      >
        <v-btn
          @click="prevAct(allJanasamparkaMembers.pagination.previous)"
          small
          color="green"
          >Previous</v-btn
        >
      </li>
      <li>Total : {{ allJanasamparkaMembers.pagination.total }}</li>
      <li
        v-if="
          allJanasamparkaMembers.pagination.next &&
          allJanasamparkaMembers.pagination.next != 0
        "
      >
        <v-btn
          @click="nextAct(allJanasamparkaMembers.pagination.next)"
          small
          color="green"
          >Next</v-btn
        >
      </li>
    </ul>
    <div v-if="selectedMember && visibleMember" class="listBox">
      <ul class="listBoxUL">
        <header>
          <v-icon @click="closeOnlineMember"> mdi-close </v-icon>
        </header>

        <li>
          <div>Full Name:</div>
          <div>
            {{ selectedMember.membername }}
          </div>
        </li>
        <li>
          <div>Email:</div>
          <div>
            {{ selectedMember.email }}
          </div>
        </li>
        <li>
          <div>Phone:</div>
          <div>
            {{ selectedMember.phone }}
          </div>
        </li>
        <li>
          <div>DOB:</div>
          <div>
            {{ selectedMember.dob.split("T")[0] }}
          </div>
        </li>
        <li>
          <div>Occupation:</div>
          <div>
            {{ selectedMember.profession }}
          </div>
        </li>

        <li>
          <div>Member Number:</div>
          <div>
            {{ selectedMember.workingformnumber }}
          </div>
        </li>
        <li>
          <div>Temporary Address:</div>
          <div>
            {{ selectedMember.fullAddress }}
          </div>
        </li>

        <li>
          <div>Country:</div>
          <div>
            {{ selectedMember.country }}
          </div>
        </li>
        <li>
          <div>State:</div>
          <div>
            {{ selectedMember.state }}
          </div>
        </li>
        <li>
          <div>City:</div>
          <div>
            {{ selectedMember.city }}
          </div>
        </li>
        <li>
          <div>Citizenship No:</div>
          <div>
            {{ selectedMember.citizenshipno }}
          </div>
        </li>
        <li>
          <div>National ID:</div>
          <div>
            {{ selectedMember.nationalId }}
          </div>
        </li>
        <li>
          <div>Address in Nepal:</div>
          <div>
            {{ selectedMember.fullAddressInNepal }}
          </div>
        </li>
        <li>
          <div>Province:</div>
          <div>
            {{ selectedMember.province }}
          </div>
        </li>
        <li>
          <div>District:</div>
          <div>
            {{ selectedMember.district }}
          </div>
        </li>
        <li>
          <div>Municipality:</div>
          <div>
            {{ selectedMember.municipality }}
          </div>
        </li>
        <li>
          <div>Ward No.:</div>
          <div>
            {{ selectedMember.wardno }}
          </div>
        </li>
        <li>
          <div>House Of Representative:</div>
          <div>
            {{ selectedMember.houseofrepresentative }}
          </div>
        </li>
        <li>
          <div>Father Name:</div>
          <div>
            {{ selectedMember.fathermothername }}
          </div>
        </li>
        <li>
          <div>Contribution:</div>
          <div>
            {{ selectedMember.contribution }}
          </div>
        </li>

        <li>
          <div>Passport Size Photo:</div>
          <div>
            <img
              v-if="
                selectedMember &&
                selectedMember.passportphoto &&
                selectedMember.passportphoto.fileLocation
              "
              :src="`${baseUrl}${selectedMember.passportphoto.fileLocation}`"
              alt=""
              width="100"
            />
          </div>
        </li>
        <li>
          <div>Citizenship Certificate or Passport:</div>
          <div>
            <img
              v-if="
                selectedMember &&
                selectedMember.citizenshipfront &&
                selectedMember.citizenshipfront.fileLocation
              "
              :src="`${baseUrl}${selectedMember.citizenshipfront.fileLocation}`"
              alt=""
              width="300"
            />
          </div>
        </li>
        <li>
          <div>Additional Attachments:</div>
          <div>
            <img
              v-if="
                selectedMember &&
                selectedMember.document &&
                selectedMember.document.fileLocation
              "
              :src="`${baseUrl}${selectedMember.document.fileLocation}`"
              alt=""
              width="300"
            />
          </div>
        </li>
        <li>
          <div>Status:</div>
          <div>
            {{ selectedMember.approveStatus ? "Approved" : "Not Approved" }}
          </div>
        </li>

        <!-- <div v-if="selectedMember.approve" class="approveStatus">
            Approved
            <v-icon color="white" class="ml-2">
              mdi-check-circle-outline
            </v-icon>
          </div> -->
        <div v-if="selectedMember.approve">
          <!-- Approved
            <v-icon color="white" class="ml-2">
              mdi-check-circle-outline
            </v-icon> -->
          <!-- <v-btn
              class="approveStatus"
              @click="approveMember(allJanasamparkaMember._id)"
              :loading="loadingApproval"
              >Resend Card</v-btn
            > -->
        </div>
        <div class="buttons">
          <v-btn
            v-if="!selectedMember.approveStatus"
            @click="approveMember(selectedMember._id)"
            :loading="loadingApproval"
            class="primary"
            >Approve</v-btn
          >
          <v-btn
            @click="disapproveMember(selectedMember._id)"
            :loading="loadingDisApproval"
            class="error"
            >Disapprove</v-btn
          >
        </div>

        <!-- 
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
        </v-form> -->
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
  name: "JanaSamparkaMembers",
  components: {
    TitleBreadCrumb,
  },
  data: () => ({
    menu1: false,
    title: "JanaSamparka Members",
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "JanaSamparka Members",
      },
    ],
    passportphoto: undefined,
    nationalIdFront: undefined,
    nationalIdBack: undefined,
    search: "",
    dialog: false,
    selectedMember: undefined,
    loadingApproval: false,
    loadingDisApproval: false,
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
    baseUrl: "http://192.168.1.67:3013",
  }),

  computed: {
    currentPage() {
      if (this.allJanasamparkaMembers.pagination.next) {
        return this.allJanasamparkaMembers.pagination.next - 1;
      }

      if (this.allJanasamparkaMembers.pagination.previous) {
        return this.allJanasamparkaMembers.pagination.previous + 1;
      }
      return 1;
    },

    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["allJanasamparkaMembers", "allJanasamparkaMember"]),
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
      "postJanasamparkaMembers",
      "approveJanasamparkaMember",
      "disapproveJanasamparkaMember",
    ]),
    async approveMember(id) {
      this.loadingApproval = true;

      await this.approveJanasamparkaMember(id);
      this.loadingApproval = false;
    },
    async disapproveMember(id) {
      this.loadingDisApproval = true;

      await this.disapproveJanasamparkaMember(id);
      this.loadingDisApproval = false;
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
    async openOnlineMember(data) {
      this.loadingMember = true;
      this.selectedMember = data;
      this.visibleMember = true;
      this.loadingMember = false;
    },
    closeOnlineMember() {
      this.visibleMember = false;
      this.selectedMember = undefined;
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
    await this.postJanasamparkaMembers({
      page: 1,
      limit: 20,
      search: this.search,

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

.buttons {
  padding-top: 20px;
  display: flex;
  gap: 10px;
  align-self: flex-end;
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
  z-index: 9999;
  background: rgba(0, 0, 0, 0.9);
  header {
    width: 100%;
    text-align: right;
  }
  .listBoxUL {
    background: #fff;

    min-width: 40vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90vh;
    overflow: scroll;
    padding: 30px;
  }
  li {
    display: flex;
    gap: 5rem;
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
