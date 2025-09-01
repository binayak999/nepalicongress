<template>
  <section>
    <div v-if="loading">
      <v-row>
        <v-col md="12" class="pt-0">
          <v-skeleton-loader
            class="mx-auto mr-btm pt-0"
            type="image"
            height="200"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12">
          <v-skeleton-loader
            class="mx-auto mr-btm"
            type="image"
            height="200"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12">
          <v-skeleton-loader
            class="mx-auto mr-btm"
            type="image"
            height="200"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
    <div v-if="!loading">
      <div
        class="sidebox"
        v-bind:class="{ nep: selectedLanguage.title !== 'English' }"
      >
        <div class="titleborder">
          <header class="contenttitle">
            {{
              selectedLanguage.title === "English"
                ? "Press Release"
                : "प्रेस विज्ञप्ति"
            }}
          </header>
        </div>
        <div v-for="(list, index) in allPressReleaseHomepage" :key="index">
          <List :data="list" :language="selectedLanguage.title" />
        </div>
      </div>
      <div class="sidebox">
        <div class="titleborder">
          <header class="contenttitle">
            {{
              selectedLanguage.title === "English"
                ? "Congress Work"
                : "कांग्रेसको कर्म"
            }}
          </header>
        </div>

        <div v-for="(list, index) in allNewsHomepage.slice(0, 5)" :key="index">
          <List :data="list" :language="selectedLanguage.title" />
        </div>
      </div>
      <div class="sidebox">
        <div class="titleborder">
          <header class="contenttitle">Social Media</header>
        </div>
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnepalicongresshq&tabs=timeline&width=400&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=409042009638897"
          width="100%"
          height="500"
          style="border:none;overflow:hidden"
          scrolling="no"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import List from "../common/List";
import { fileUrl } from "./../../../main";
export default {
  name: "SideBox",
  components: { List },
  data() {
    return {
      baseUrl: fileUrl,
      loading: true,
    };
  },
  methods: {
    ...mapActions(["fetchPressReleaseHomepage", "fetchNewsHomepage"]),
  },
  computed: mapGetters([
    "selectedLanguage",
    "allPressReleaseHomepage",
    "allNewsHomepage",
  ]),

  async created() {
    await this.fetchPressReleaseHomepage();
    await this.fetchNewsHomepage();
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.boxsingle {
  padding: 30px 15px;
}

img {
  object-fit: cover;
  object-position: top;
  margin-bottom: 20px;
  width: 100%;
  // max-height: 300px;
}

.nep {
  h2 {
    margin-bottom: 15px;
    letter-spacing: 1.1px;
  }
  .contentbox {
    font-family: $nepalifont;
    font-size: 15px;
    letter-spacing: 1.3px;
    line-height: 25px;
    margin-bottom: 20px;
  }
}
h2 {
  margin-bottom: 15px;
  letter-spacing: 1.1px;
}
.contentbox {
  font-size: 14px;
  letter-spacing: 1.3px;
  line-height: 25px;
  margin-bottom: 20px;
  font-family: $mon;
}

.titleborder {
  border-bottom: 1px solid $green;
  margin-bottom: 20px;
}
.sidebox {
  margin-bottom: 30px;
  padding-right: 10px;
  section {
    padding: 0;
    margin-bottom: 20px;
  }
}
.pdf-files {
  display: flex;
  a {
    margin-right: 15px;
  }
}
.video-files {
  .videobox {
    margin-right: 15px;
    height: 700px;
    width: 100%;
    object-fit: cover;
  }
}
</style>
