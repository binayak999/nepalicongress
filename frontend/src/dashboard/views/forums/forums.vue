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
      :items="allForum"
      sort-by="sn"
      class="elevation-1"
      :search="search"
      single-line
      hide-details
    >
       <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-reply</v-icon>
        <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon> -->
      </template>

      <template v-slot:[`item.content`]="{item}">
        <div v-html="item.content.slice(0,100)"></div>
      </template>
          <template v-slot:[`item.title`]="{item}">
        <div v-html="item.title.slice(0,50)"></div>
      </template>
      
      <template v-slot:[`item.images`]="{item}">
        <div v-for="(image,index) in item.images" :key="index">
         <img :src="baseUrl+image.fileUrl" class="imagePost" v-if="index==0"/>
        </div>
      </template>
    </v-data-table>
    <div class="popreply" v-if="closebox">
      <ReplyPublic  @closePop="closePopUP" :letterdata="letterdata"/>
    </div>
  </section>

</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import { fileUrl } from "./../../../main";
import ReplyPublic from "../../components/common/ReplyPublic";
export default {
  name: "Forums",
  components: {
    TitleBreadCrumb,
    ReplyPublic
  },
  data: () => ({
    title: "Forums",
    baseUrl:fileUrl,
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Forums",
      },
    ],
    search: "",
    dialog: false,
    headers: [
      { text: "S.N.", value: "__v", width: "5%" },
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
        width: "20%",
      },
      {
        text: "User",
        align: "start",
        sortable: false,
        value: "userHandle",
        width: "20%",
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
    closebox:false,
    userHandle:"binayak",
    letterdata:null
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["allDashCategories", "allForum"]),
  },

  methods: {
    ...mapActions(["fetchForums"]),
    initialize() {
      this.desserts = this.allDashCategories.desserts;
    },
    editItem(item) {
      this.letterdata = item;
      this.closebox = true;
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
    closePopUP(status){
      this.closebox = status;
    }
  },
  created() {
    this.initialize();
    this.fetchForums();
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
.v-sheet {
  display: none;
}
.imagePost{
  width: 150px;
}
.popreply{
  position: fixed;
  background: rgba(0,0,0,0.4);
  top:0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
 
}
</style>