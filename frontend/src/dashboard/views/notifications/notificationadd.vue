<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="formbox">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col md="12">
                <ul class="tabs">
                  <li>
                    <span
                      class="formtitle"
                      @click="languageswitch('nep')"
                      v-bind:class="{ active: !language }"
                      >Nepali</span
                    >
                  </li>
                  <li>
                    <span
                      class="formtitle"
                      @click="languageswitch('eng')"
                      v-bind:class="{ active: language }"
                      >English</span
                    >
                  </li>
                </ul>
              </v-col>
            </v-row>
            <v-row v-if="language">
              <v-col md="12">
                <v-text-field
                  v-model="engTitle"
                  :rules="[engTitleRules.required]"
                  label="English Title"
                  required
                  outlined
                ></v-text-field>
                <v-textarea
                  v-model="engContent"
                  :rules="[engTitleRules.required]"
                  label="English Description"
                  required
                  outlined
                  rows="5"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row v-if="!language">
              <v-col md="12">
                <v-text-field
                  v-model="nepTitle"
                  :rules="[nepTitleRules.required]"
                  label="Nepali Title"
                  required
                  outlined
                ></v-text-field>
                <v-textarea
                  v-model="nepContent"
                  :rules="[nepTitleRules.required]"
                  label="Nepali Description"
                  required
                  outlined
                  rows="5"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6">
                <v-selection
                  v-model="notificationGroup"
                  placeholder="Notification For"
                  :options="userrole"
                  :filterable="true"
                  :value="categorySelect(notificationFor)"
                ></v-selection>
              </v-col>
              <v-col md="6">
               
                <v-text-field
                  v-model="notificationLink"
           
                  label="https://yourexternalurl.com"
     
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-selection
                  v-model="notificationFor"
                  class="selectnotfication"
                  placeholder="Notification is related to ?"
                  :options="categories"
                  :filterable="true"
                  :value="categorySelect(notificationFor)"
                ></v-selection>
              </v-col>
              <v-col md="6">
                <v-file-input
                  label="Images"
                  :chips="true"
                  :show-size="true"
                  outlined
 
                  v-model="images"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
              >{{ title }}</v-btn
            >
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
export default {
  name: "NotificationAdd",
  components: { TitleBreadCrumb },
  data() {
    return {
      categories: [
        "notice",
        "history",
        "party-constitution",
        "press-release",
        "rules-and-regulations",
        "our-inspiration",
        "posts",
        "news",
        "online-library",
        "events",
        "documents",
        "popposts",
        "circulars",
        "president",
        "datehistory",
        "calendar-events",
      ],
      userrole: ["all"],
      // userrole: ["all", "user", "member", "subdomain"],
      valid: true,
      title: "Add Notification",
      language: false,

      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Notification",
        },
      ],
      engTitle: null,
      nepTitle: null,
      engTitleRules: {
        required: (value) => !!value || "Required.",
      },

      imgrules: [
        (value) =>
          !value ||
          value.size <= 60000000 ||
          "Avatar size should be less than 60 MB!",
      ],
      urlValidate:{
         required: (value) => !!value || "Required!",
      },
      notificationFor: "all",
      notificationLink: "",
      notificationGroup: "",
      nepContent: "",
      engContent: "",
      images: [],
      nepTitleRules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        let addNotification = {
          eng: {
            title: this.engTitle,
            content: this.engContent,
          },
          nep: {
            title: this.nepTitle,
            content: this.nepContent,
          },
          notificationFor: this.notificationFor,
          notificationLink: this.notificationLink,
          notificationGroup: this.notificationGroup,
          images: this.images,
        };
        console.log(addNotification);
        this.$store.dispatch("createNotification", addNotification);
      }
    },
    languageswitch(lang) {
      if (lang === "eng") {
        this.language = true;
      } else {
        this.language = false;
      }
    },
    categorySelect(data) {
      if (data != "") {
        // console.log(data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.formtitle {
  background: $ligtgray;
  color: $white;
  display: inline-block;
  padding: 5px 20px;
  font-size: 14px;
}
.active {
  background: $primary;
}
.tabs {
  display: flex;
  list-style: none;
  padding-left: 0;
  li {
    margin-right: 5px;
    cursor: pointer;
  }
}
.formbox {
  padding: 20px 30px;
}
.container {
  max-width: 100%;
}
.selectnotfication {
  text-transform: capitalize;
}
</style>