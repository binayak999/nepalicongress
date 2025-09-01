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
      :items="allLetters"
      sort-by="sn"
      class="elevation-1"
      :search="search"
      single-line
      hide-details
    >
      <template v-slot:[`item.actions`]="{ item }">
        <!-- <v-icon small @click="deleteItem(item)" class="actionbutton  actionbutton-del">mdi-delete</v-icon> -->
        <v-icon small @click="deleteItem(item)" class="actionbutton">mdi-eye</v-icon>
      </template>

      <template v-slot:[`item.content`]="{item}">
        <div v-html="item.content.slice(0, 50)"></div>
      </template>
    </v-data-table>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import { fileUrl } from "./../../../main";
export default {
  name: "Lettertoleader",
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
        width: "20%",
      },

      {
        text: "Added By",
        align: "start",
        sortable: false,
        value: "userHandle",
        width: "10%",
      },
      {
        text: "To",
        align: "start",
        sortable: false,
        value: "email",
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
    ...mapGetters(["allDashCategories", "allLeader", "allLetters"]),
  },

  methods: {
    ...mapActions(["fetchLeader", "getLetters"]),
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
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
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
    this.getLetters();
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
.v-sheet {
  display: none;
}
.actionbutton {
  padding: 10px;
  margin: 0 5px;
  background: $secondary;
  &::before{
    color: $white;
  }
  &-del{
      background: red;
  }
}
.imagePost {
  width: 150px;
}
</style>