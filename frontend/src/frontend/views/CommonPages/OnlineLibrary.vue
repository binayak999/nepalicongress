<template>
  <section>
    <v-skeleton-loader
      class="mx-auto mr-btm"
      type="image"
      height="120"
      v-if="loading"
    ></v-skeleton-loader>
    <TitleBreadCrumb
      :breadcrumbs="breadcrumbs"
      :language="selectedLanguage.title"
      v-if="!loading"
    />

    <v-container fluid>
      <v-row>
        <v-col
          cols="9"
          v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }"
        >
          <div class="searchhere">
            <h4 class="searchtitle" v-if="selectedLanguage.title !== 'English'">
              {{ searchText.nep }}
            </h4>
            <h4 class="searchtitle" v-if="selectedLanguage.title === 'English'">
              {{ searchText.eng }}
            </h4>
            <v-text-field
              v-model="searchtext"
              outlined
              @keyup="seachData"
              class="textbox"
            ></v-text-field>
          </div>
          <div v-if="loading">
            <v-skeleton-loader
              class="mx-auto"
              type="image"
              height="200"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="mx-auto pt-3"
              type="image"
              height="200"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="mx-auto pt-3"
              type="image"
              height="200"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="mx-auto pt-3"
              type="image"
              height="200"
            ></v-skeleton-loader>
          </div>
          <div v-if="paged.length == 0">
            <div class="vote">
              <img src="@/assets/images/icons/nodata.svg" alt />
              <h1>Not Content Found</h1>
            </div>
          </div>
          <div v-if="paged.length != 0 && !loading">
            <div
              class="backgroundlist"
              v-for="(list, index) in paged"
              :key="index"
            >
              <ListImageBig
                :data="list"
                :language="selectedLanguage.title"
                v-if="list.images.length !== 0"
                slug="online-library"
              />
              <ListBig
                :data="list"
                :language="selectedLanguage.title"
                v-if="list.images.length === 0"
                slug="online-library"
              />
            </div>
            <v-pagination
              v-model="page"
              :length="numberOfPage"
              prev-icon="mdi-menu-left"
              v-if="paged.length != 0"
              next-icon="mdi-menu-right"
              class="centerbox"
            ></v-pagination>
          </div>
        </v-col>

        <v-col md="3">
          <SideBox />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import SideBox from "../../components/common/SideBox";
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import ListImageBig from "../../components/common/ListImageBig";
import ListBig from "../../components/common/ListBig";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "OnlineLibrary",
  components: {
    TitleBreadCrumb,
    ListImageBig,
    ListBig,
    SideBox,
  },
  data() {
    return {
      page: 1,
      rows: 10,
      searchtext: "",
      loading: true,
      searchText: {
        eng: "Search By Title",
        nep: "शीर्षकबाट खोजी गर्नुहोस्",
      },
      breadcrumbs: [
        {
          eng: {
            title: "Home",
          },
          nep: {
            title: "गृहपृष्ठ",
          },
          slug: "/",
        },
        {
          eng: {
            title: "Online Library",
          },
          nep: {
            title: "अनलाइन पुस्तकालय",
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["allOnlineLibraryFrontend", "selectedLanguage"]),
    currentPage: function() {
      return this.page;
    },
    indexOfLastPost: function() {
      return this.page * this.rows;
    },
    indexOfFirstPost: function() {
      return this.indexOfLastPost - this.rows;
    },
    numberOfPage: function() {
      if (this.allOnlineLibraryFrontend) {
        return Math.ceil(this.allOnlineLibraryFrontend.length / this.rows);
      } else {
        return 0;
      }
    },
    paged: function() {
      if (this.allOnlineLibraryFrontend) {
        return this.allOnlineLibraryFrontend.slice(
          this.indexOfFirstPost,
          this.indexOfLastPost
        );
      } else {
        return [];
      }
    },
  },
  methods: {
    ...mapActions(["fetchOnlineLibraryFrontend"]),
    seachData() {
      this.$store.dispatch("searchLibrary", this.searchtext);
    },
  },
  async created() {
    await this.fetchOnlineLibraryFrontend();
    this.loading = false;
    // this.$store.state.post.loading = true;
    // setTimeout(() => {
    //   this.$store.state.post.loading = false;
    // }, 1500);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.searchhere {
  margin-bottom: 20px;
}
.backgroundlist {
  background: $ligtgrey;
  padding: 10px 20px 10px;
  margin-bottom: 10px;
}
.about {
  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    object-position: top;
  }
}

.contentbox {
  font-family: $mon;
  h3 {
    margin-bottom: 15px;
    letter-spacing: 1.3px;
  }
  p {
    font-size: 13px;
    letter-spacing: 1.3px;
    line-height: 25px;
    margin-bottom: 20px;
  }
}
.titleborder {
  border-bottom: 1px solid $green;
  margin-bottom: 20px;
}
.sidebox {
  margin-bottom: 30px;
  section {
    padding: 0;
    margin-bottom: 20px;
  }
}
.vote {
  background: $midwhite;
  padding: 100px 20px;
  // margin: 30px 25%;s
  display: flex;
  justify-content: center;
  img {
    width: 200px;
  }
  h1 {
    text-align: center;
    letter-spacing: 1.3px;
    font-size: 35px;
    width: 50%;
    // background: red;
  }
}
.searchtitle {
  font-weight: 600;
  letter-spacing: 1px;
  font-family: $mon;
  margin-bottom: 10px;
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
}
.textbox {
  font-family: $mon;
}
.nep {
  .searchtitle {
    font-weight: 600;
    letter-spacing: 0;
    font-family: $nepalifont !important;
    margin-bottom: 10px;
    font-size: 25px;
    text-align: center;
  }
  .textbox {
    font-weight: 400;
    letter-spacing: 0;
    font-family: $nepalifont !important;
  }
}
</style>
