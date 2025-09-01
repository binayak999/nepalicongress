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
      :items="allMember"
      sort-by="sn"
      class="elevation-1"
      :search="search"
    >
     
      <!-- <template v-slot:[`item.actions`]="{ item }"> -->
        <!-- <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon> -->
        <!-- <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template> -->
      <template v-slot:[`item.verified`]="{ item }">
        <div class="boxdiv">{{item.verified ? 'Yes':'No'}}</div>
      </template>
      <template v-slot:[`item.verifiedAsMember`]="{ item }">
        <button @click="approve(1,item._id)" class="boxdiv " v-if="logged.user.role === 'subdomain' && item.verifiedAsMember != 1">{{item.verifiedAsMember != 1 ? `Approve`:'Already Approved'}}</button>
        <div @click="approve(1,item._id)" class="boxdiv " v-if="logged.user.role === 'subdomain' && item.verifiedAsMember != 0">{{item.verifiedAsMember != 0 ? `Approve`:'Already Approved'}}</div>
        <button @click="approve(2,item._id)" class="boxdiv" v-if="logged.user.role === 'admin' && item.verifiedAsMember == 1">{{item.verifiedAsMember == 1 ? `Approve`:'Disapprove'}}</button>
        <div class="boxdiv" v-if="logged.user.role === 'admin' && item.verifiedAsMember != 1">{{item.verifiedAsMember == 2 ? `Approved`:'Not Approved'}}</div>
      </template>
    </v-data-table>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters,mapActions } from "vuex";
export default {
  name: "Members",
  components: {
    TitleBreadCrumb,
  },
  data: () => ({
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
    search: "",
    dialog: false,
    headers: [
      { text: "S.N.",  value: "__v"},

           { text: "First Name", value: "first_name" },
      { text: "Last Name", value: "last_name" },
      { text: "Email", value: "email" },
 
      // { text: "Userhandle", value: "userHandle" },
      { text: "Subdomain", value: "applyMemberShipFor" },
      { text: "District", value: "district" },
      { text: "Ward No.", value: "ward" },
      { text: "Province", value: "province" },
      // { text: "Nearest Landmark", value: "nearestlandmark" },
      { text: "Verified", value: "verified" },
      { text: "City", value: "city" },
      { text: "Address", value: "address" },
      { text: "Verfiy Status", value: "verifiedAsMember" },
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
    ...mapGetters(['allDashCategories','allMember','logged'])
  },


 

  methods: {
    ...mapActions(['fetchMembers']),
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
    approve(i,e){
      this.$store.dispatch("approveMember",{verifiedAsMember:i,id:e})
    }
  },
   created() {
    this.initialize();
    this.fetchMembers();
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
.v-sheet {
  display: none;
}
.boxdiv{
  background: $secondary;
  color:$white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
button.boxdiv{
  background: $primary;
}
</style>