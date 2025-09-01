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
      :items="allPage"
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
        <div v-for="(image, index) in item.images" :key="index">
          <img
            :src="baseUrl + image.fileUrl"
            class="imagePost"
            v-if="index == 0"
          />
        </div>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <button
          class="btn"
          v-bind:class="{ btn_primary: item.status }"
          @click="updateStatus(item)"
          v-if="item.status"
        >
          {{ item.status ? "Active" : "Deactive" }}
        </button>
        <button
          class="btn"
          v-bind:class="{ btn_secondary: !item.status }"
          @click="updateStatus(item)"
          v-if="!item.status"
        >
          {{ item.status ? "Active" : "Deactive" }}
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
  name: "NotificationDevices",
  components: {
    TitleBreadCrumb,
  },
  data: () => ({
    title: "Notification Devices",
    baseUrl: fileUrl,
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Notification Devices",
      },
    ],
    search: "",
    dialog: false,
    headers: [
      { text: "S.N.", value: "__v", width: "10%" },
      { text: "Device Token", value: "devicetoken", sortable: false, width: "10%" },
      { text: "Email", value: "email", sortable: false, width: "10%" },
      { text: "Phone", value: "phone", sortable: false, width: "10%" },
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
    ...mapGetters(["allDashCategories", "allPage", "logged"]),
  },

  methods: {
    ...mapActions(["fetchPages"]),
    initialize() {
      this.desserts = this.allDashCategories.desserts;
    },
    editItem(item) {
      this.$router.push(`/dashboard/editpage/${item.slug}`);
    },
    deleteItem(item) {
      if (confirm("Are you sure ? You want to delete")) {
        this.$store.dispatch("deletePage", item._id);
        this.initialize();
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    updateStatus(item) {
      let addPost = {
        id: item._id,
        eng: {
          title: item.eng.title,
          content: item.eng.content,
          date: item.eng.date,
        },
        nep: {
          title: item.nep.title,
          content: item.nep.content,
          date: item.nep.date,
        },
        oldImage: item.images,
        oldVideos: item.videos,
        oldAttachment: item.attachment,
        pageType: item.pageType,
        position: item.position,
        externallink: item.externallink,
        imageFile: "pages",
        status: !item.status,
      };
      this.$store.dispatch("updateStatusPageInside", addPost);
    },
  },
  created() {
    this.initialize();
    this.fetchPages();
    if (secureStorage.getItem("userData")) {
      this.$store.state.user.loggedUser = JSON.parse(
        secureStorage.getItem("userData")
      );
    }

    if (
      this.logged.user.role !== "admin" ||
      this.logged.user.role === "subdomain"
    ) {
      this.$router
        .push("/")
        .catch((error) =>
          console.log(error, "Your are not subdomain or admin !")
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