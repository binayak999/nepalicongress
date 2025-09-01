<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col></v-col>

        <v-col md="4">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-data-table
      :headers="headers"
      :items="allReport"
      sort-by="sn"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }" v-if="logged.user.role === 'admin'">
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:[`item.images`]="{item}" >
        <div v-for="(image,index) in item.images" :key="index">
          <img :src="baseUrl+image.fileUrl" class="imagePost" v-if="index==0" />
        </div>
      </template>
    </v-data-table>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import { fileUrl, secureStorage } from "./../../../main";
export default {
  name: "Reports",
  components: {
    TitleBreadCrumb,
  },
  data: () => ({
    title: "Reports",
    baseUrl: fileUrl,
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Reports",
      },
    ],
    search: "",
    dialog: false,
    headers: [
      { text: "S.N.", value: "__v", width: "3%" },
      { text: "Images", value: "images", sortable: false, width: "10%" },
      {
        text: "Title",
        align: "start",
        sortable: false,
        value: "title",
        width: "10%",
      },
      {
        text: "Content",
        align: "start",
        sortable: false,
        value: "content",
        width: "10%",
      },
      {
        text: "User",
        align: "start",
        sortable: false,
        value: "userHandle",
        width: "10%",
      },

      { text: "Actions", value: "actions", sortable: false, width: "3%" },
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
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["allDashCategories", "allReport","logged"]),
  },

  methods: {
    ...mapActions(["fetchReports"]),
    initialize() {
      this.desserts = this.allDashCategories.desserts;
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      console.log(item);
    },
    deleteItem(item) {
      this.$store.dispatch("deleteReport", item._id);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  created() {
    this.initialize();
    this.fetchReports();
     if (secureStorage.getItem("userData")) {
      this.$store.state.user.loggedUser = JSON.parse(
        secureStorage.getItem("userData")
      );
    }
  },
};
</script>
<style lang="scss">
.v-sheet {
  display: none;
}
.imagePost {
  width: 150px;
}
</style>