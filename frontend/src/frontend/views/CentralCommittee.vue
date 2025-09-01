<template>
  <section v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }">
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
        <v-col>
          <ul
            class="postbox"
            v-for="n in allCommitteefrontend.length"
            :key="n - 1"
          >
            <li
              v-for="(committee, index) in allCommitteefrontend"
              :key="index"
              class="memberlist"
            >
              <div v-if="committee.sort1 === n - 1" class="bordderbox">
                <img
                  v-if="
                    committee.images != undefined && committee.images.length > 0
                  "
                  :src="baseUrl + committee.images[0].fileUrl"
                  alt
                />
                <div
                  v-if="
                    committee.nep != undefined &&
                      selectedLanguage.title === 'Nepali'
                  "
                  v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }"
                  class="memeberbox top"
                >
                  <h3>{{ committee.nep.title }}</h3>
                  <p>{{ committee.nep.post }}</p>
                </div>
                <div
                  v-if="
                    committee.eng != undefined &&
                      selectedLanguage.title !== 'Nepali'
                  "
                  v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }"
                  class="memeberbox"
                >
                  <h3>{{ committee.eng.title }}</h3>
                  <p>{{ committee.eng.post }}</p>
                </div>
                <ul class="sociallink">
                  <li v-if="committee.facebookUrl != undefined">
                    <a :href="committee.facebookUrl"
                      ><i class="fa fa-facebook"></i
                    ></a>
                  </li>
                  <li v-if="committee.twitterUrl != undefined">
                    <a :href="committee.twitterUrl"
                      ><i class="fa fa-twitter"></i
                    ></a>
                  </li>
                  <!-- <li v-if="committee.instagramUrl != undefined"><a :href="committee.instagramUrl"><i class="fa fa-instagram"></i></a></li> -->
                  <!-- <li v-if="committee.attachment != undefined && committee.attachment.length > 0 "><a :href="baseUrl+committee.attachment[0].fileUrl" target="_blank"><i class="fa fa-download"></i></a></li> -->
                </ul>
              </div>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { fileUrl } from "./../../main";
import TitleBreadCrumb from "../components/common/TitleBreadCrumb";
export default {
  name: "CentralCommittee",
  loading: true,
  components: { TitleBreadCrumb },
  methods: {
    ...mapActions(["fetchCommitteeFrontend"]),
  },
  computed: {
    ...mapGetters(["allCommitteefrontend", "selectedLanguage"]),
  },
  async created() {
    await this.fetchCommitteeFrontend();
    this.loading = false;
    // this.$store.state.post.loading = true;
    // setTimeout(() => {
    //   this.$store.state.post.loading = false;
    // }, 1500);
  },
  data() {
    return {
      baseUrl: fileUrl,
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
            title: "Central Working Committee",
          },
          nep: {
            title: "केन्द्रीय कार्य समिति",
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.postbox {
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-flow: row;
  justify-content: center;
  position: relative;
  flex-wrap: wrap;
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 1px solid $secondary;
    border-radius: 50%;
  }
  .memberlist {
    display: flex;
    flex-flow: row;
    justify-content: center;
    // margin: 15px 5px 0;
  }
  .memeberbox {
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-top: 20px;
  }
  .showmember {
    display: flex;
  }
  .bordderbox {
    border: 2px solid $green;
    padding: 15px 15px;
    margin: 10px;
    display: flex;
    flex-flow: column;
    align-items: center;
  }
}
h3,
p {
  font-family: $mon;
}
.nep {
  h3,
  p {
    font-family: $nepalifont !important;
  }
}
.sociallink {
  display: flex;
  align-items: center;
  padding-left: 0;
  list-style: none;
  li {
    margin: 0 5px;
    .fa-facebook {
      padding: 7px 10px;
      text-align: center;
      background: #3b5999;
      color: white;
      border-radius: 3px;
    }
    .fa-twitter {
      padding: 7px 7px;
      text-align: center;
      background: #55acee;
      color: white;
      border-radius: 3px;
    }
    .fa-instagram {
      padding: 7px 10px;
      text-align: center;
      color: white;
      background: #e4405f;
      border-radius: 3px;
    }
    .fa-download {
      padding: 7px 10px;
      text-align: center;
      color: white;
      background: #e4405f;
      border-radius: 3px;
    }
  }
}
</style>
