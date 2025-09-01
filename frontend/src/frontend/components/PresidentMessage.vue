<template>
  <section
    v-if="allPresidentHomepage.length != 0"
    v-bind:class="{ nep: selectedLanguage.title !== 'English' }"
  >
    <div class="contentSection" v-if="loading">
      <v-skeleton-loader
        class="mx-auto"
        type="image"
        height="200"
      ></v-skeleton-loader>
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
    <header class="contenttitle" v-if="title">{{ title }}</header>
    <div class="contentsection" v-if="!loading">
      <v-row>
        <v-col md="3" cols="12">
          <div v-if="allPresidentHomepage[0].images.length != 0">
            <img
              :src="baseUrl + allPresidentHomepage[0].images[0].fileUrl"
              alt
            />
          </div>
        </v-col>
        <v-col md="9" cols="12" v-if="selectedLanguage.title === 'English'">
          <h2>{{ allPresidentHomepage[0].eng.title }}</h2>
          <div v-html="allPresidentHomepage[0].eng.content"></div>
        </v-col>
        <v-col md="9" cols="12" v-if="selectedLanguage.title !== 'English'">
          <h2>{{ allPresidentHomepage[0].nep.title }}</h2>
          <div v-html="allPresidentHomepage[0].nep.content"></div>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { fileUrl } from "./../../main";
export default {
  name: "PresidentMessage",
  props: ["title"],
  components: {},
  data() {
    return {
      baseUrl: fileUrl,
      loading: true,
    };
  },
  methods: {
    ...mapActions(["fetchPresidentHomepage"]),
  },
  computed: {
    ...mapGetters(["selectedLanguage", "allPresidentHomepage"]),
  },
  async created() {
    await this.fetchPresidentHomepage();
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.leftimage {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
}
img {
  width: 100%;
  // height: 250px;
  object-fit: cover;
}
.rightimage {
  width: 100%;
  height: 195px;
}
.topimage,
.bottomimage {
  padding: 0;
}
.topimage {
  margin-bottom: 5px;
}

p {
  padding: 0 20px 30px;
  margin-bottom: 0;
  font-size: 14px;
  font-family: $mon;
  letter-spacing: 1.1px;
  line-height: 22px;
  text-align: center;
}
.nopadding {
  padding: 0 !important;
  padding-right: 15px !important;
}
h3 {
  padding: 0 20px 10px 0;
  text-align: center;
  letter-spacing: 1.1px;
}
.btn-readmore {
  background: $darkred;
  width: 100%;
  padding: 13px;
  font-size: 14px;
  font-family: $mon;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  transition: background-color 0.5s ease-out;
  a {
    color: $white;
    text-decoration: none;
  }
  &:hover {
    background: $green;
  }
}
h2 {
  margin-bottom: 20px;
}
.contentsection {
  // height: 380px;
  overflow-y: scroll;
  padding: 15px 0;
  &::-webkit-scrollbar {
    display: none;
  }
}
.nep {
  header {
    letter-spacing: 0;
    font-family: $nepalifont !important;
  }
  .btn-readmore {
    letter-spacing: 0;
    font-family: $nepalifont !important;
  }
  p {
    letter-spacing: 0;
    font-family: $nepalifont !important;
  }
}
</style>
