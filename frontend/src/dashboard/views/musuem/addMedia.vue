<template>
  <section>
    <TitleBreadCrumb :title="maintitle" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col cols="8" class="formbox">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col md="12">
                <v-text-field
                  v-model="title"
                  :rules="[titleRules.required]"
                  label="English Title"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col md="12">Medias</v-col>
              <v-col md="12">
                <ul class="tabs">
                  <li>
                    <span
                      class="formtitle"
                      @click="changeFile('image')"
                      v-bind:class="{active:filebox}"
                    >Image</span>
                  </li>
                  <li>
                    <span
                      class="formtitle"
                      @click="changeFile('video')"
                      v-bind:class="{active:!filebox}"
                    >Video</span>
                  </li>
                </ul>
              </v-col>
              <v-col md="12" v-if="filebox">
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
              <v-col md="12" v-if="!filebox">
                <v-file-input
                  label="Video"
                  :chips="true"
                  :show-size="true"
                  outlined
                  v-model="videos"
                  accept="video/*"
                  prepend-icon="mdi-video"
                ></v-file-input>
              </v-col>
            </v-row>

            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Add Media</v-btn>
          </v-form>
        </v-col>
        <v-col cols="4">
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
  name: "AddMedia",
  components: { TitleBreadCrumb },
  data() {
    return {
      value: [],
      valid: true,
      maintitle: "Add Media",
      filebox: true,
      images: null,
      videos: null,
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Media",
        },
      ],
      title: "",
      nepTitle: "",
      titleRules: {
        required: (value) => !!value || "Required.",
      },
      fileType: "image",
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        if (this.images != null) {
          let addMedia = {
            title: this.title,
            images: this.images,
            videos: this.videos,
            imageFile: "medias",
          };
          this.$store.dispatch("createImage", addMedia);
        }else{
          let addMedia = {
            title: this.title,
            images: this.images,
            videos: this.videos,
            imageFile: "medias",
          };
          console.log(addMedia);
          this.$store.dispatch("createVideo", addMedia);
        }
      }
    },

    changeFile(fileType) {
      if (fileType === "image") {
        this.filebox = true;
      } else {
        this.filebox = false;
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