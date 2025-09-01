<template>
  <section>
    <TitleBreadCrumb :breadcrumbs="breadcrumbs" :language="selectedLanguage.title" />
    <v-container fluid>
      <v-row>
        <v-col md="9" class="boxsingle" v-if="paged.length == 0">
          <div class="vote">
            <img src="@/assets/images/icons/nodata.svg" alt />
            <h1>Not Manifesto Found</h1>
          </div>
        </v-col>
        <v-col md="9" class="boxsingle" v-if="paged.length != 0">
          <div class="backgroundlist" v-for="(list,index) in paged" :key="index">
            <ListImageBig
              :data="list"
              :language="selectedLanguage.title"
              v-if="list.images.length !== 0"
              slug="manifesto"
            />
            <ListBig
              :data="list"
              :language="selectedLanguage.title"
              v-if="list.images.length === 0"
              slug="manifesto"
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
  name: "Manifesto",
  components: {
    TitleBreadCrumb,
    ListImageBig,
    ListBig,
    SideBox
  },
  data() {
    return {
      page: 1,
      rows: 10,
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
            title: "Manifesto",
          },
          nep: {
            title: "घोषणापत्र",
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["allNoticeFrontend", "selectedLanguage"]),
    currentPage: function () {
      return this.page;
    },
    indexOfLastPost: function () {
      return this.page * this.rows;
    },
    indexOfFirstPost: function () {
      return this.indexOfLastPost - this.rows;
    },
    numberOfPage: function () {
      if (this.allNoticeFrontend) {
        return Math.ceil(this.allNoticeFrontend.length / this.rows);
      } else {
        return 0;
      }
    },
    paged: function () {
      if (this.allNoticeFrontend) {
        return this.allNoticeFrontend.slice(
          this.indexOfFirstPost,
          this.indexOfLastPost
        );
      } else {
        return [];
      }
    },
  },
  methods: {
    ...mapActions(["fetchNoticeFrontend"]),
  },
  created() {
    this.fetchNoticeFrontend();
    this.$store.state.post.loading = true;
    setTimeout(() => {
      this.$store.state.post.loading = false;
    }, 1500);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
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
  img{
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
</style>