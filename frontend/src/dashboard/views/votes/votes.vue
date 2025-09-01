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
      :items="allVotes"
      sort-by="sn"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <button class="btn btn_primary">
          <router-link :to="'/dashboard/viewvote/'+item._id">View</router-link>
        </button>
      </template>
      <template v-slot:[`item.nep.content`]="{ item }">
        <div v-html="item.nep.content.slice(0, 100)"></div>
      </template>
      <template v-slot:[`item.eng.content`]="{ item }">
        <div v-html="item.eng.content.slice(0, 100)"></div>
      </template>
      <template v-slot:[`item.nep.title`]="{ item }">
        <div v-html="item.nep.title.slice(0, 50)"></div>
      </template>
      <template v-slot:[`item.eng.title`]="{ item }">
        <div v-html="item.eng.title.slice(0, 50)"></div>
      </template>
      <template v-slot:[`item.votesFor`]="{ item }">
        <div v-for="(poll, index) in item.votesFor" :key="index">
          {{ poll.valueEng }} <strong> {{ poll.votecount }}</strong>
        </div>
      </template>

      <template v-slot:[`item.voteStatus`]="{ item }">
        <button
          class="btn"
          v-bind:class="{ btn_primary: item.voteStatus }"
          @click="updateStatus(item)"
          v-if="item.voteStatus"
        >
          {{ item.voteStatus ? "On" : "Off" }}
        </button>
        <button
          class="btn"
          v-bind:class="{ btn_secondary: !item.voteStatus }"
          @click="updateStatus(item)"
          v-if="!item.voteStatus"
        >
          {{ item.voteStatus ? "On" : "Off" }}
        </button>
      </template>
    </v-data-table>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Votes",
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
        title: "Votes",
      },
    ],
    search: "",
    dialog: false,
    headers: [
      { text: "S.N.", value: "__v", width: "3%" },
      {
        text: "Vote Topic",
        align: "start",
        sortable: false,
        value: "voteTopicId",
        width: "10%",
      },
      {
        text: "Number of voters",
        align: "start",
        sortable: false,
        value: "numberofvoters",
        width: "5%",
      },
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
        width: "15%",
      },
      {
        text: "Nepali Title",
        align: "start",
        sortable: false,
        value: "nep.title",
        width: "10%",
      },
      {
        text: "Nepali Date",
        align: "start",
        sortable: false,
        value: "nep.date",
        width: "10%",
      },
      {
        text: "English Date",
        align: "start",
        sortable: false,
        value: "eng.date",
        width: "10%",
      },
      {
        text: "Nepali Content",
        align: "start",
        sortable: false,
        value: "nep.content",
        width: "15%",
      },

      {
        text: "Vote Status",
        align: "start",
        sortable: false,
        value: "voteStatus",
        width: "15%",
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
    ...mapGetters(["allDashCategories", "allVotes"]),
  },

  methods: {
    ...mapActions(["fetchVotes"]),
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
    updateStatus(item) {
      let voteTopic = {
        id: item._id,
        voteStatus: !item.voteStatus,
      };
      this.$store.dispatch("updateStatus", voteTopic);
      this.initialize();
    },
  },
  created() {
    this.initialize();
    this.fetchVotes();
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
.v-sheet {
  display: none;
}
.imagePost {
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
.btn_primary{
  a{
    color: $white;
    text-decoration: none;
  }
}
</style>