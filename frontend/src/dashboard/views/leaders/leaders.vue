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
      :items="allLeader"
      sort-by="sn"
      class="elevation-1"
      :search="search"
      single-line
      hide-details
    >
      <template v-slot:[`item.actions`]="{ item }">
        <!-- <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon> -->
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:[`item.nep.content`]="{ item }">
        <div v-html="item.nep.content.slice(0, 50)"></div>
      </template>
      <template v-slot:[`item.eng.content`]="{ item }">
        <div v-html="item.eng.content.slice(0, 50)"></div>
      </template>
      <template v-slot:[`item.nep.title`]="{ item }">
        <div v-html="item.nep.title.slice(0, 50)"></div>
      </template>
      <template v-slot:[`item.eng.title`]="{ item }">
        <div v-html="item.eng.title.slice(0, 50)"></div>
      </template>
      <template v-slot:[`item.images`]="{ item }">
        <div v-for="(image, index) in item.images" :key="index">
          <!-- {{image.fileUrl}} -->
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
  name: "Leader",
  components: {
    TitleBreadCrumb,
  },
  data: () => ({
    title: "Leader",
    baseUrl: fileUrl,
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Leader",
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
        value: "eng.content",
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
        value: "nep.content",
        width: "20%",
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
    ...mapGetters(["allDashCategories", "allLeader"]),
  },

  methods: {
    ...mapActions(["fetchLeader"]),
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
      if (confirm("Are you sure ? You want to delete")) {
        this.$store.dispatch("deleteLeader", item._id);
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
    this.fetchLeader();
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