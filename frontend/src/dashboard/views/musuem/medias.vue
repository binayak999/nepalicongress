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
      :items="allImages"
      sort-by="sn"
      class="elevation-1"
      :search="search"
      single-line
      hide-details
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>

      <template v-slot:[`item.fileLocation`]="{item}">
        <div v-if="item.fileType === 'images'">
          <img :src="baseUrl+item.fileLocation" class="imagePost" />
        </div>
        <div v-if="item.fileType === 'videos'">
          <video controls class="imagebox">
            <source :src="baseUrl+item.fileLocation" type="video/mp4" />
          </video>
        </div>
      </template>

      <template v-slot:[`item.status`]="{item}">
        <button
          class="btn"
          v-bind:class="{btn_primary:item.status}"
          @click="updateImage(item)"
          v-if="item.status"
        >{{item.status?'Active':'Deactive'}}</button>
        <button
          class="btn"
          v-bind:class="{btn_secondary:!item.status}"
          @click="updateImage(item)"
          v-if="!item.status"
        >{{item.status?'Active':'Deactive'}}</button>
      </template>
    </v-data-table>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
import { fileUrl } from "./../../../main";
export default {
  name: "Medias",
  components: {
    TitleBreadCrumb,
  },
  data: () => ({
    title: "Medias",
    baseUrl: fileUrl,
    breadcrumbs: [
      {
        title: "Dashboard",
        slug: "/dashboard",
      },
      {
        title: "Medias",
      },
    ],
    search: "",
    dialog: false,
    headers: [
      { text: "S.N.", value: "__v", width: "10%" },
      { text: "Images", value: "fileLocation", sortable: false, width: "10%" },
      { text: "Title", value: "assignedTo", sortable: false, width: "10%" },
      { text: "Status", value: "status", sortable: false, width: "10%" },

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
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["allDashCategories", "allImages"]),
  },

  methods: {
    ...mapActions(["fetchPosts", "getAllImage"]),
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
      let mediaUpdate = {
        id: item._id
      };
      this.$store.dispatch("deleteFile", mediaUpdate);
      this.initialize();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    updateImage(item) {
      let mediaUpdate = {
        id: item._id,
        status: !item.status,
      };
      this.$store.dispatch("updateFile", mediaUpdate);
      this.initialize();
    },
  },
  created() {
    this.initialize();
    this.getAllImage();
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/style.scss";
.v-sheet {
  display: none;
}
.imagePost {
  width: 200px;
  margin-top: 10px;
}
.imagebox {
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
video {
  width: 200px;
  margin: 10px 0;
}
</style>