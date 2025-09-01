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
      :items="allVoters"
      sort-by="sn"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
       
     
    </v-data-table>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "VoteCandidates",
  components: {
    TitleBreadCrumb,
  },
  data: () => ({
    title: "VoteCandidates",
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "VoteCandidates",
      },
    ],
    search: "",
    dialog: false,
    headers: [
      { text: "S.N.", value: "__v",width: "3%"  },
      {
        text: "Vote Candidate Group",
        align: "start",
        sortable: false,
        value: "votingGroup",
        width: "10%" 
      },
      {
        text: "First Name",
        align: "start",
        sortable: false,
        value: "first_name",
        width: "5%" 
      },
      {
        text: "Last Name",
        align: "start",
        sortable: false,
        value: "last_name",
        width: "10%" 
      },
        {
        text: "Phone",
        align: "start",
        sortable: false,
        value: "phone",
        width: "15%" 
      },
        {
        text: "Voters Id",
        align: "start",
        sortable: false,
        value: "voter_id",
        width: "15%" 
      },
      { text: "Actions", value: "actions", sortable: false,width: "3%"  },
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
    ...mapGetters(["allVoters"]),
  },

  methods: {
    ...mapActions(["fetchVoters"]),
    deleteItem(item){
      this.$store.dispatch("deleteVoter",item._id)
    },
  },
  created() {
    this.fetchVoters();
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