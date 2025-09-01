<template>
  <section>
    <TitleBreadCrumb
      :breadcrumbs="breadcrumbs"
      :language="selectedLanguage.title"
    />
    <v-container fluid class="mediapage">
      <v-row>
        <v-col md="12">
          <div>
            <ul class="categorymedia">
              <li>
                <router-link to="/videogallery">
                  <i class="fa fa-5x fa-film"></i>
                  <h4>Videos</h4>
                </router-link>
              </li>
              <li>
                <router-link to="/imagegallery">
                  <i class="fa fa-5x fa-image"></i>
                  <h4>Images</h4>
                </router-link>
              </li>
              <!-- <li>
                <i class="fa fa-5x fa-file-pdf-o"></i>
                <h4>Documents</h4>
              </li> -->
              <li>
                <router-link to="/addmusuem">
                  <i class="fa fa-5x fa-plus-square-o"></i>
                  <h4>Submit File</h4>
                </router-link>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import TitleBreadCrumb from "../components/common/TitleBreadCrumb";
import { mapGetters } from "vuex";
export default {
  name: "OnlineMuseum",
  components: {
    TitleBreadCrumb,
  },
  data() {
    return {
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
            title: "Online Museum",
          },
          nep: {
            title: "अनलाइन संग्रहालय",
          },
          slug: "onlinemuseum",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["selectedLanguage"]),
  },
  created() {
    this.$store.state.post.loading = true;
    setTimeout(() => {
      this.$store.state.post.loading = false;
    }, 1500);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.mediapage {
  padding: 50px 30px;
}
.categorymedia {
  list-style: none;
  padding-left: 0;
  display: flex;
  @media only screen and (max-width: 991px) {
    flex-flow: column;
  }
  li {
    width: 15%;

    margin: 20px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 40px;
    padding-top: 40px;
    text-transform: uppercase;
    letter-spacing: 1.4px;
    @media only screen and (max-width: 991px) {
      width: 100%;
      margin: 20px 0;
    }
    a {
      display: block;
      text-align: center;
      color: $dark;
      text-decoration: none;
    }
    .fa {
      color: $primary;
      margin-bottom: 20px;
      object-fit: contain;
    }
  }
}
</style>
