<template>
  <section v-bind:class="{ nep: selectedLanguage.title !== 'English' }">
    <v-container fluid>
      <header class="contenttitle" v-if="title">{{ title }}</header>

      <div class="contentsection">
        <v-row>
          <!-- <div class="contentSection" v-if="!loading">
            <v-skeleton-loader
              class="mx-auto"
              type="image"
              height="200"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="mx-auto"
              type="image"
              height="100"
            ></v-skeleton-loader>
          </div> -->
          <v-col
            md="3"
            cols="12"
            v-for="(data, index) in allVideo"
            :key="index"
            v-bind:class="{ zoombox: data.status }"
          >
            <div v-if="loading">
              <v-skeleton-loader
                class="mx-auto"
                type="image"
                height="200"
              ></v-skeleton-loader>
              <v-skeleton-loader
                class="mx-auto"
                type="image"
                height="100"
              ></v-skeleton-loader>
            </div>
            <div v-if="!loading">
              <Videobox
                :url="baseUrl + data.fileLocation"
                v-if="data.status"
                :text="data.assignedTo"
              />
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<script>
import Videobox from "./common/Videobox";
import { fileUrl } from "./../../main";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "VideoSection",
  props: ["title"],
  components: {
    Videobox,
  },
  data() {
    return {
      baseUrl: fileUrl,
      loading: true,
    };
  },
  methods: {
    ...mapActions(["getAllVideo"]),
  },
  computed: {
    ...mapGetters(["allVideo", "selectedLanguage"]),
  },
  async created() {
    await this.getAllVideo();
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.nep {
  letter-spacing: 0 !important;
  header {
    letter-spacing: 0;
  }
  .btn-readmore {
    letter-spacing: 0;
  }
  p {
    letter-spacing: 0;
  }
}
</style>
