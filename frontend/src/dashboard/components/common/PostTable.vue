<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <download-csv class="btn btn-default" :data="json_data" name="filename.csv">
      <button class="btn btn_secondary btn-small">  Download CSV</button>
    </download-csv>

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
      :items="allPost"
      sort-by="sn"
      class="elevation-1"
      :search="search"
      single-line
      hide-details
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="edit(item)">mdi-pencil</v-icon>
        <v-icon small @click="deletePost(item)">mdi-delete</v-icon>
        <v-icon small @click="view(item)">mdi-eye</v-icon>
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
          v-bind:class="{ btn_secondary: item.status }"
          @click="updateStatus(item)"
          v-if="item.status && logged.user.role === 'admin'"
        >
          {{ !item.status ? "Activate" : "Deactivate" }}
        </button>
        <button
          class="btn"
          v-bind:class="{ btn_secondary: item.status }"
   @click="updateStatus(item)"
          v-if="item.status && logged.user.role === 'subdomain'"
        >
          {{ !item.status ? "Activate" : "Deactivate" }}
        </button>
        <button
          class="btn"
          v-bind:class="{ btn_primary: !item.status }"
          @click="updateStatus(item)"
          v-if="!item.status && logged.user.role === 'admin'"
        >
          {{ !item.status ? "Activate" : "Deactivate" }}
        </button>
        <button
          class="btn"
          v-bind:class="{ btn_primary: !item.status }"
          v-if="!item.status && logged.user.role === 'subdomain'"
          @click="updateStatus(item)"
        >
          {{ !item.status ? "Activate" : "Deactivate" }}
        </button>
      </template>
    </v-data-table>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import { fileUrl, secureStorage } from "./../../../main";

export default {
  name: "PostTable",
  components: {
    TitleBreadCrumb,
  },
  props: ["title", "breadcrumbs", "slug", "allPost"],
  data: () => ({
    baseUrl: fileUrl,
    search: "",
    dialog: false,
    json_data: [],
    headers: [
      { text: "S.N.", value: "__v", width: "10%" },
      { text: "Images", value: "images", sortable: false, width: "10%" },
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
        text: "Position",
        align: "start",
        sortable: false,
        value: "sort",
        width: "20%",
      },
      {
        text: "Subdomain",
        align: "start",
        sortable: false,
        value: "userHandle",
        width: "5%",
      },
      {
        text: "Status",
        align: "start",
        sortable: false,
        value: "status",
        width: "5%",
      },

      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      content: "",
    },
    defaultItem: {
      name: "",
      content: "",
    },
    userRole: "",
  }),
  methods: {
    updateStatus(item) {
      if(this.logged.user.name != 'Nepali Public Relations Committee Coordination Department' && this.logged.user.role === 'subdomain'){
        alert("Not Authozied")
        return ;
      }else{
        let post = {
        id: item._id,
        slug: item.category[0].slug,
        userRole: this.logged.user.role,
      };
      this.$store.dispatch("updateStatusPost", post);
      }
    },
    deletePost(item) {
      if (confirm("Are you sure ? You want to delete")) {
        let post = {
          id: item._id,
          slug: item.category[0].slug,
          userRole: this.logged.user.role,
        };
        this.$store.dispatch("deletePost", post);
      }
    },
    view(item) {
      let route = `/single/${item.category[0].slug}/${item.slug}`;
      this.$router.push(route).catch((error) => console.log(error));
    },
    edit(item) {
      let route = `/dashboard/editposts/${item.category[0].slug}/${item._id}`;
      this.$router.push(route).catch((error) => console.log(error));
    },
  },
  computed: {
    ...mapGetters(["logged"]),
  },
  created() {
    if (secureStorage.getItem("userData")) {
      this.$store.state.user.loggedUser = JSON.parse(
        secureStorage.getItem("userData")
      );
    }
    setTimeout(() => {
      this.allPost.forEach((element) => {
        this.json_data.push({
          "English Type": element.category[0].eng.title,
          "Nepali Type": element.category[0].nep.title,
          "English Title": element.eng.title,
          "English Description": element.eng.content,
          "English Date": element.eng.date,
          user: element.userHandle,
          "Nepali Title": element.nep.title,
          "Nepali Description": element.nep.content,
          "Nepali Date": element.nep.date,
          "Views": element.countView,
        });
      });
    }, 2000);
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
display: inline-block;
  padding: 8px 20px;
  color: $white;
  font-size: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  &:focus {
    outline: none;
  }
}
.btn-small{
  font-size: 12px;
}
</style>