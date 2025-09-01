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
      :items="allnotifications"
      sort-by="sn"
      class="elevation-1"
      :search="search"
      single-line
      hide-details
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
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
      <template v-slot:[`item.images`]="{ item }">
        <div  v-if="item.image != undefined">
           <img :src="baseUrl + item.image.fileUrl" class="imagePost"/>
        </div>
       
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <button
          class="btn btn_primary"
          v-bind:class="{ btn_primary: item.status }"
          @click="sendNotification(item)"
        >
          Send <i class="fa fa-angle-right"></i>
        </button>
      </template>
    </v-data-table>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import { fileUrl, secureStorage } from "./../../../main";
export default {
  name: "Notifications",
  components: {
    TitleBreadCrumb,
  },
  data: () => ({
    title: "Notifications",
    baseUrl: fileUrl,
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Notifications",
      },
    ],
    search: "",
    dialog: false,
    headers: [
      { text: "Images", value: "images", sortable: false, width: "5%" },
      { text: "Post type", value: "pageType", sortable: false, width: "10%" },
      {
        text: "English Title",
        align: "start",
        sortable: false,
        value: "eng.title",
        width: "10%",
      },
      {
        text: "Nepali Title",
        align: "start",
        sortable: false,
        value: "nep.title",
        width: "10%",
      },
      {
        text: "English Content",
        align: "start",
        sortable: false,
        value: "eng.content",
        width: "10%",
      },
      {
        text: "Nepali Content",
        align: "start",
        sortable: false,
        value: "nep.content",
        width: "10%",
      },
      {
        text: "Send",
        align: "start",
        sortable: false,
        value: "status",
        width: "10%",
      },
      {
        text: "Date",
        align: "start",
        sortable: false,
        value: "createdAt",
        width: "10%",
      },
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
    ...mapGetters(["allnotifications"]),
  },

  methods: {
    ...mapActions(["fetchNotification"]),

    sendNotification(data) {
      let notidata = {
        id: data._id,
        notificationFor: data.notificationFor,
      };
      this.$store.dispatch("sendNotification", notidata);
    },
  },
  created() {
    // this.initialize();
    this.fetchNotification();
    if (secureStorage.getItem("userData")) {
      this.$store.state.user.loggedUser = JSON.parse(
        secureStorage.getItem("userData")
      );
    }
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
.v-sheet {
  display: none;
}
.imagePost {
  width: 80px;
  height: 80px;
  object-fit: contain;
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