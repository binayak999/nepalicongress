<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row >
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
      :items="allUserActive"
      sort-by="sn"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:[`item.status`]="{item}">
      <button
          class="btn"
          v-bind:class="{btn_secondary:!item.status}"
          @click="acStatus(item)"
          v-if="!item.status"
        >{{item.status?'Active':'Deactive'}}</button>
        <button
          class="btn"
          v-bind:class="{btn_primary:item.status}"
          @click="deStatus(item)"
          v-if="item.status"
        >{{item.status?'Active':'Deactive'}}</button>
      </template>
       <template v-slot:[`item.createdAt`]="{item}">
    
        <div
  
        >{{ new Date(item.createdAt)}}</div>
      </template>
       <template v-slot:[`item._id`]="{item}">
    
        <div
  
        ><v-btn class="btn btn_primary" @click="updateLocation(item._id)"> <v-icon> mdi-pencil </v-icon></v-btn></div>
      </template>

    </v-data-table>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters,mapActions } from "vuex";

export default {
  name: "CardPrintloginlist",
  components: {
    TitleBreadCrumb,
  },
  data: () => ({
    title: "Card Print Login List",
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Users",
      },
    ],
    search: "",
    dialog: false,
    headers: [
      { text: "S.N.",  value: "__v"},
      {
        text: "First Name",
        align: "start",
        sortable: false,
        value: "first_name",
      },
      {
        text: "Last Name",
        align: "start",
        sortable: false,
        value: "last_name",
      },
      { text: "Email", value: "email" },
      { text: "Phone", value: "phone" },
      { text: "Username", value: "userHandle" },
      { text: "Subdomain", value: "subDomain" },
      { text: "Status", value: "status" },
      { text: "Created At", value: "createdAt" },
      { text: "Action", value: "_id" },
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
    ...mapGetters(['allDashCategories','allUserActive'])
  },


 

  methods: {
    ...mapActions(['fetchActiveUsers']),
    updateLocation(id){
      this.$router.push(`createactivelogin/${id}`);
    },
    deStatus(item){
      this.$store.dispatch("changeStatus",{status:false,input:item.phone})
    },
    acStatus(item){
      this.$store.dispatch("changeStatus",{status:true,input:item.phone})
    },
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
    this.fetchActiveUsers("printcard");
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
.v-sheet {
  display: none;
}
.btn {
  &_primary {
    background: $btncolor;
  }
  &_secondary {
    background: $secondary;
  }

  padding: 8px 20px;
  color: $white;
  font-size: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  &:focus {
    outline: none;
  }
}
</style>