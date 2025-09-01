<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col cols="8" class="formbox">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row v-if="language">
              <v-col md="12">
                <v-text-field
                  v-model="name"
                  :rules="[titleRules.required]"
                  label="Title"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-textarea
                  v-model="content"
                  :rules="[contentRules.required]"
                  label="Content"
                  required
                  outlined
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col md="12">Image</v-col>
              <v-col md="12">
                <v-file-input
                  multiple
                  label="Image"
                  :chips="true"
                  :show-size="true"
                  outlined
                  v-model="images"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Add Report</v-btn>
          </v-form>
        </v-col>
        <v-col md="4">
          <iframe
            src="https://www.hamropatro.com/widgets/calender-medium.php"
            frameborder="0"
            scrolling="no"
            marginwidth="0"
            marginheight="0"
            style="border:none; overflow:hidden; width:295px; height:385px;"
            allowtransparency="true"
          ></iframe>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
export default {
  name: "AddReport",
  components: { TitleBreadCrumb },
  data() {
    return {
      valid: true,
      title: "Add Report",
      language: true,
      images: [],
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Report",
        },
      ],
      name: null,
      content: null,
      titleRules: {
        required: (value) => !!value || "Required.",
      },
      contentRules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        let addReport = {
          title: this.name,
          content: this.content,
          images: this.images,
        };
        console.log(addReport);
        this.$store.dispatch("postReports", addReport);
      }
    },
    languageswitch(lang) {
      if (lang === "eng") {
        this.language = true;
      } else {
        this.language = false;
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
</style>