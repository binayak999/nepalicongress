<template>
  <section>
    <TitleBreadCrumb
      :breadcrumbs="breadcrumbs"
      :language="selectedLanguage.title"
      v-if="false"
    />
    <v-container fluid>
      <v-row>
        <v-col md="9" class="boxsingle">
          <div class="paginationmain tbmr">
            <ul
              class="paginationbox bdr"
              v-if="allPressReleaseFrontend.pagination"
            >
              <li>
                <span
                  >{{ allPressReleaseFrontend.pagination.next - 1 }} -
                  {{
                    (allPressReleaseFrontend.pagination.total / limit).toFixed(
                      0
                    )
                  }}
                  Pages</span
                >
              </li>
            </ul>
            <ul class="paginationbox" v-if="allPressReleaseFrontend.pagination">
              <li><v-btn @click="prevPage">Prev</v-btn></li>

              <li><v-btn @click="nextPage">Next</v-btn></li>
            </ul>
          </div>
          <template v-if="loading">
            <v-skeleton-loader
              class="mx-auto mr-btm"
              type="image"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="mx-auto mr-btm"
              type="image"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="mx-auto mr-btm"
              type="image"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="mx-auto mr-btm"
              type="image"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="mx-auto mr-btm"
              type="image"
            ></v-skeleton-loader>
          </template>
          <template v-if="!loading">
            <div
              class="backgroundlist"
              v-for="(list, index) in allPressReleaseFrontend.posts"
              :key="index"
            >
              <ListImageBig
                :data="list"
                :language="selectedLanguage.title"
                v-if="list.images.length !== 0"
                slug="partycontitution"
              />
              <ListBig
                :data="list"
                :language="selectedLanguage.title"
                v-if="list.images.length === 0"
                slug="partycontitution"
              />
            </div>
          </template>
          <div class="paginationmain">
            <ul
              class="paginationbox bdr"
              v-if="allPressReleaseFrontend.pagination"
            >
              <li>
                <span
                  >{{ allPressReleaseFrontend.pagination.next - 1 }} -
                  {{
                    (allPressReleaseFrontend.pagination.total / limit).toFixed(
                      0
                    )
                  }}
                  Pages</span
                >
              </li>
            </ul>
            <ul class="paginationbox" v-if="allPressReleaseFrontend.pagination">
              <li><v-btn @click="prevPage">Prev</v-btn></li>

              <li><v-btn @click="nextPage">Next</v-btn></li>
            </ul>
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
  name: "PressRelease",
  components: {
    TitleBreadCrumb,
    ListImageBig,
    ListBig,
    SideBox,
  },
  data() {
    return {
      loading: true,
      skip: 1,
      limit: 5,
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
            title: "Press Release",
          },
          nep: {
            title: "प्रेस विज्ञप्ति",
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["allPressReleaseFrontend", "selectedLanguage"]),
  },
  methods: {
    ...mapActions(["fetchPressReleaseFrontend"]),
    async nextPage() {
      this.loading = true;
      await this.fetchPressReleaseFrontend({
        skip: this.allPressReleaseFrontend.pagination.next,
        limit: this.limit,
      });
      this.loading = false;
    },
    async prevPage() {
      this.loading = true;
      await this.fetchPressReleaseFrontend({
        skip: this.allPressReleaseFrontend.pagination.prev,
        limit: this.limit,
      });
      this.loading = false;
    },
  },
  async created() {
    await this.fetchPressReleaseFrontend({
      skip: this.skip,
      limit: this.limit,
    });
    this.loading = false;
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
.mr-btm {
  margin-bottom: 20px;
}
.paginationbox {
  list-style: none;
  padding-left: 0;
  margin-left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  li {
    padding: 0 2px;
    span {
      padding: 0 10px;
      display: flex;
      height: 36px;
      align-items: center;
      // background: #2c9132;
      // color: $white;
    }
    .v-btn {
      background: $secondary !important;
      color: $white;
      border-radius: 0;
      box-shadow: none;
    }
  }
}
.paginationmain {
  display: flex;
  justify-content: space-between;
}
.bdr {
  border: 1px solid $secondary;
}
.tbmr {
  margin-bottom: 20px;
}
</style>
