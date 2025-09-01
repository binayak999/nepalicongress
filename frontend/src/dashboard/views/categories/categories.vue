<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container fluid class="formbox">
      <v-row>
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
      :items="allCategory"
      sort-by="sn"
      class="elevation-1 formbox"
      :search="search"
    >
     
      <!-- <template v-slot:[`item.actions`]="{ item }"> -->
        <!-- <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon> -->
        <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
      <!-- </template> -->
    
    </v-data-table>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Categories",
  components: {
    TitleBreadCrumb,
  },
  data: () => ({
    title: "Categories",
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Categories",
      },
    ],
    search: "",
    dialog: false,
    headers: [
      { text: "S.N.", value: "__v" },
      {
        text: "English Title",
        align: "start",
        sortable: false,
        value: "eng.title",
      },
      {
        text: "Nepali Title",
        align: "start",
        sortable: false,
        value: "nep.title",
      },
    //  { text: 'Actions', value: 'actions', sortable: false },
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
    ...mapGetters(['allDashCategories',"allCategory"])
  },


  

  methods: {
      ...mapActions(['fetchCategories']),
    initialize() {
      this.desserts = this.allDashCategories.desserts;
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      console.log(item)
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
    this.fetchCategories();
  },
};
</script>
<style lang="scss">
.v-sheet {
  display: none;
}
.formbox {
  padding: 20px 30px;
}
</style>