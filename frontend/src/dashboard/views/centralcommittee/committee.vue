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
      :items="allCommittee"
      sort-by="sn"
      class="elevation-1"
      :search="search"
      single-line
      hide-details
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>

      <template v-slot:[`item.nep.title`]="{ item }">
        <div v-html="item.nep.title.slice(0, 50)"></div>
      </template>
      <template v-slot:[`item.eng.title`]="{ item }">
        <div v-html="item.eng.title.slice(0, 50)"></div>
      </template>
      <template v-slot:[`item.images`]="{ item }">
        <div v-for="(image, index) in item.images" :key="index">
          <img
            :src="baseUrl + image.fileUrl"
            class="imagePost"
            v-if="index == 0"
          />
        </div>
      </template>
    </v-data-table>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import { fileUrl } from "./../../../main";
export default {
  name: "Committee",
  components: {
    TitleBreadCrumb,
  },
  data: () => ({
    title: "Central Committee",
    baseUrl: fileUrl,
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Central Committee",
      },
    ],
    search: "",
    dialog: false,
    headers: [
      { text: "S.N.", value: "__v", width: "10%" },
      { text: "Images", value: "images", sortable: false, width: "10%" },
      {
        text: "English Title",
        align: "start",
        sortable: false,
        value: "eng.title",
        width: "10%",
      },
      {
        text: "English Content",
        align: "start",
        sortable: false,
        value: "eng.post",
        width: "20%",
      },
      {
        text: "Nepali Title",
        align: "start",
        sortable: false,
        value: "nep.title",
        width: "10%",
      },

      {
        text: "Nepali Content",
        align: "start",
        sortable: false,
        value: "nep.post",
        width: "20%",
      },
      {
        text: "Post Position",
        align: "start",
        sortable: false,
        value: "sorts",
        width: "10%",
      },
      {
        text: "Added By",
        align: "start",
        sortable: false,
        value: "userHandle",
        width: "10%",
      },

      { text: "Actions", value: "actions", sortable: false, width: "10%" },
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
    ...mapGetters(["allDashCategories", "allCommittee"]),
  },

  methods: {
    ...mapActions(["fetchCommittee"]),
    initialize() {
      this.desserts = this.allDashCategories.desserts;
    },
    editItem(item) {
      this.$router.push(`/dashboard/editcentralcommittee/${item._id}`);
    },
    deleteItem(item) {
      if (confirm("Are you sure ? You want to delete")) {
        this.$store.dispatch("deleteCommittee", item._id);
        this.initialize();
      }
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
    this.fetchCommittee();
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