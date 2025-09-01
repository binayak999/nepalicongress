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
      :items="allVotersProcessed"
      sort-by="sn"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small v-if="!item.smsSent" @click="sendsms(item)" class="sendSms">mdi-send</v-icon>
      </template>
       
     
    </v-data-table>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "VotersProcessed",
  components: {
    TitleBreadCrumb,
  },
  data: () => ({
    title: "Votes",
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Voters",
      },
    ],
    search: "",
    dialog: false,
    headers: [
      { text: "S.N.", value: "__v",width: "3%"  },
      {
        text: "Voter Name",
        align: "start",
        sortable: false,
        value: "voteTopicId",
        width: "10%" 
      },
      {
        text: "Username",
        align: "start",
        sortable: false,
        value: "username",
        width: "5%" 
      },
     
        {
        text: "Voting Topic Id",
        align: "start",
        sortable: false,
        value: "voteTopicId",
        width: "15%" 
      },
        {
        text: "Phone",
        align: "start",
        sortable: false,
        value: "phone",
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
    ...mapGetters(["allVotersProcessed"]),
  },

  methods: {
    ...mapActions(["fetchVotesProcessed"]),
    sendsms(item){
      this.$store.dispatch("sendSMS",{id:item._id})
    },
  },
  created() {
    this.fetchVotesProcessed();
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