<template>
  <section>
    <section class="pdfbox" ref="doc" v-if="showSomeTime">
        <ul class="imageheader">
          <li>
            <img :src="require(`@/assets/images/flag.jpg`)" alt />
          </li>
          <li>
            <h1>नेपाली कांग्रेसको</h1>
            <h2>कृयासिल सदस्यताको नामावली</h2>
          </li>
          <li>
            <img :src="require(`@/assets/images/tree.png`)" alt />
          </li>
        </ul>
        <table class="table table-responsive" border="1">
          <thead>
            <tr>
              <th v-for="(heading, index) in headings" :key="index">
                {{ heading }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(body, index) in allCircular" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ body.workingformnumber }}</td>
              <td>{{ body.membername }}</td>
              <td>{{ body.fathermothername }}</td>
              <td>{{ body.husbandwifename }}</td>
              <td>{{ body.age }}</td>
              <td>{{ body.profession }}</td>
              <td>{{ body.gender }}</td>
              <td>{{ body.region }}</td>
              <td>{{ body.district }}</td>
              <td>{{ body.houseofrepresentative }}</td>
              <td>{{ body.pradeshassemblyconstituency }}</td>
              <td>{{ body.municipality }}</td>
              <td>{{ body.wardno }}</td>
              <td>{{ body.inclusivegroup }}</td>
            </tr>
          </tbody>
        </table>
      </section>

    <table border="">
      <thead>
        <tr>
          <td v-for="(data, index) in headers" :key="index">
            {{ data.text }}
          </td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(data, index) in list" :key="index">
          <td>{{ (pagination.next - 2) * 100 + index + 1 }}</td>
          <td>{{ data.workingformnumber }}</td>
          <td v-if="data.workingformnumberold != 'N/A'">
            {{ data.workingformnumberold }}
          </td>
          <td>{{ data.membername }}</td>
          <td>{{ data.municipality }}</td>

          <td>{{ data.gender }}</td>
          <td>{{ data.userHandle }}</td>
          <td>
            {{ changeDate(data.createdAt) }}
            <strong>{{ changeTime(data.createdAt) }}</strong>
          </td>
          <td>{{ data.userName }}</td>
          <td>
            <v-icon
              small
              class="mr-3"
              v-if="list && list.optionAction && data.subdomainStatus"
              @click="editItem(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small class="mr-3" @click="viewCircular(data)"
              >mdi-eye</v-icon
            >
            <i class="fa fa-print" @click="activeItem(data)"></i>
            <i
              v-if="list && list.optionAction"
              class="fa fa-trash btn-trash"
              @click="deleteBtn(item)"
            ></i>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="10" class="listbox">
            <div>
              <div class="mr-4">
                <b class="mr-2">Total</b>
                {{ pagination.total }}
              </div>
              <ul class="list">
                <li>
                  <button
                    v-if="pagination.previous"
                    class="btn"
                    @click="prevAction(pagination.previous)"
                  >
                    Previous
                    <v-progress-circular
                      indeterminate
                      color="white"
                      size="18"
                      width="2"
                      class="ml-2"
                      v-if="loading && buttonAction === 'previous'"
                    ></v-progress-circular>
                  </button>
                  <button
                    v-if="pagination.next"
                    class="btn"
                    @click="nextAction(pagination.next)"
                  >
                    Next
                    <v-progress-circular
                      indeterminate
                      color="white"
                      size="18"
                      width="2"
                      class="ml-2"
                      v-if="loading && buttonAction === 'next'"
                    ></v-progress-circular>
                  </button>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="popupbox" v-if="single != ''">
      <PopViewCircularSingle :single="single" @clickBox="closepopup" />
    </div>
    <UpdateMemberShipFormVue
      v-if="popupupdate"
      :data="circulardata"
      @closePopup="closePopupUpdate"
    />
  </section>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex/dist/vuex.common.js";
import NepaliDate from "nepali-date-converter";
import { parseISO } from "date-fns";
import UpdateMemberShipFormVue from "./UpdateMemberShipForm.vue";
import PopViewCircularSingle from "./PopViewCircularSingle";
import html2pdf from "html2pdf.js";

export default {
  name: "TableCongress",
  props: ["list", "headers", "pagination","memberType"],
  components: {
    UpdateMemberShipFormVue,
    PopViewCircularSingle,
  },
  data: () => {
    return {
      loading: false,
      buttonAction: "",
      popupupdate:false,
      single:""
    };
  },
  methods: {
    ...mapActions(["fetchCircular"]),
    changeDate(datehere) {
      let np = new NepaliDate(parseISO(datehere));
      return np.format("ddd DD, MMMM YYYY", "np");
    },
    changeTime(datehere) {
      return moment(datehere).format("LTS");
    },

    async nextAction(page) {
      this.buttonAction = "next";
      this.loading = true;
      await this.fetchCircular({
        limit: 100,
        page: page,
        memberType: this.memberType,
      });
      this.loading = false;
    },
    async prevAction(page) {
      this.buttonAction = "previous";
      this.loading = true;
      await this.fetchCircular({
        limit: 100,
        page: page,
        memberType: this.memberType,
      });
      this.loading = false;
    },
    closepopup() {
      this.single = "";
    },
    viewCircular(item) {
      this.single = item;
    },
    selectCircular(data) {
      this.popupupdate = true;
      this.circulardata = data;
    },
    closePopupUpdate() {
      this.popupupdate = false;
    },
    activeItem(item) {
      this.$router.push(`/dashboard/activeMember/${item._id}`);
    },
    exportToPDF() {
      this.showSomeTime = true;
      setTimeout(() => {
        html2pdf(this.$refs.document, {
          filename: "document.pdf",
          jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
        });
      }, 100);
      setTimeout(() => {
        this.showSomeTime = false;
      }, 3000);
    },
  },
};
</script>

<style scoped lang="scss">
table {
  width: 97%;
  margin-top: 10px;
  border-collapse: collapse;
  margin: 15px 25px;
  th {
    font-size: 12px;
    font-weight: 500;
  }
  td {
    padding: 2px 10px;
  }
}
.listbox {
  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  padding: 10px 15px;
}
.list {
  list-style: none;
  padding-left: 0;
  display: flex;

  li {
    display: flex;
    align-items: center;
    button {
      margin-left: 10px;
      padding: 5px 20px;
      border-radius: 20px;
      font-size: 14px;
      display: flex;
      align-items: center;
    }
  }
}
.loadingBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>