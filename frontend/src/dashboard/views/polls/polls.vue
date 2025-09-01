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
      :items="allPolls"
      sort-by="sn"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
          <template v-slot:[`item.nep.content`]="{item}">
        <div v-html="item.nep.content.slice(0,100)"></div>
      </template>
      <template v-slot:[`item.eng.content`]="{item}">
        <div v-html="item.eng.content.slice(0,100)"></div>
      </template>
          <template v-slot:[`item.nep.title`]="{item}">
        <div v-html="item.nep.title.slice(0,50)"></div>
      </template>
      <template v-slot:[`item.eng.title`]="{item}">
        <div v-html="item.eng.title.slice(0,50)"></div>
      </template>
      <template v-slot:[`item.votesFor`]="{item}">
        <div v-for="(poll,index) in item.votesFor" :key="index">
          {{poll.valueEng}} <strong>  {{poll.votecount}}</strong>
        </div>
      </template>
     <template v-slot:[`item.pollStatus`]="{item}">
        <button
          class="btn"
          v-bind:class="{btn_primary:item.pollStatus}"
          @click="updateStatus(item)"
          v-if="item.pollStatus"
        >  {{item.pollStatus?'On':'Off'}}</button>
        <button
          class="btn"
          v-bind:class="{btn_secondary:!item.pollStatus}"
          @click="updateStatus(item)"
          v-if="!item.pollStatus"
        >  {{item.pollStatus?'On':'Off'}}</button>
      </template>
     
    </v-data-table>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Polls",
  components: {
    TitleBreadCrumb,
  },
  data: () => ({
    title: "Polls",
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Polls",
      },
    ],
    search: "",
    dialog: false,
    headers: [
      { text: "S.N.", value: "__v",width: "3%"  },
      {
        text: "Poll Topic",
        align: "start",
        sortable: false,
        value: "pollTopicId",
        width: "10%" 
      },
      {
        text: "English Title",
        align: "start",
        sortable: false,
        value: "eng.title",
        width: "10%" 
      },
        {
        text: "English Content",
        align: "start",
        sortable: false,
        value: "eng.content",
        width: "15%" 
      },
      {
        text: "Nepali Title",
        align: "start",
        sortable: false,
        value: "nep.title",
        width: "10%" 
      },
      {
        text: "Nepali Date",
        align: "start",
        sortable: false,
        value: "nep.date",
        width: "10%" 
      },
      {
        text: "English Date",
        align: "start",
        sortable: false,
        value: "eng.date",
        width: "10%" 
      },
      {
        text: "Nepali Content",
        align: "start",
        sortable: false,
        value: "nep.content",
        width: "15%" 
      },
      {
        text: "Poll List",
        align: "start",
        sortable: false,
        value: "votesFor",
        width: "15%" 
      },
      {
        text: "Poll Status",
        align: "start",
        sortable: false,
        value: "pollStatus",
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
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["allDashCategories", "allPolls"]),
  },

  methods: {
    ...mapActions(["fetchPolls"]),
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
      let pollStat = {
        id: item._id,
        pollStatus: !item.pollStatus,
      };
      this.$store.dispatch("updateStatusPoll", pollStat);
      this.initialize();
    },
  },
  created() {
    this.initialize();
    this.fetchPolls();
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