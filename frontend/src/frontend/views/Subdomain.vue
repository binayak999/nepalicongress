<template>
  <section v-bind:class="{ nep: selectedLanguage.title !== 'English' }">
    <v-skeleton-loader class="mx-auto mr-btm" type="image" height="120" v-if="loading"></v-skeleton-loader>
    <TitleBreadCrumb :breadcrumbs="breadcrumbs" :language="selectedLanguage.title" v-if="!loading" />

    <v-container fluid>
      <v-row v-if="selectedLanguage.title !== 'English'">
        <v-col md="12" v-if="loading">
          <v-skeleton-loader class="mx-auto mt-0" type="image" height="100"></v-skeleton-loader>
        </v-col>
        <v-col md="12" class="fiterback" v-if="!loading">
          <ul class="filtercat">
            <li v-for="(cat, index) in categoryNepies" :key="index"
              v-bind:class="{ activeSelect: cat.got == selectedcatNep }" @click="changeSelectedNep(cat.got, index)">
              {{ cat.show }}
            </li>
          </ul>
        </v-col>
      </v-row>
      <v-row v-if="
        selectedLanguage.title !== 'English' &&
        selectedcatNep === 'नेपाली कांग्रेस जिल्ला कार्यसमिति'
      " class="submenus">
        <v-col md="2" v-if="loading">
          <v-skeleton-loader class="mx-auto" type="image" height="200"></v-skeleton-loader>
          <v-skeleton-loader class="mx-auto" type="image" height="200"></v-skeleton-loader>
          <v-skeleton-loader class="mx-auto" type="image" height="200"></v-skeleton-loader>
        </v-col>
        <v-col md="2" cols="12" v-if="!loading">
          <ul class="filtercat">
            <li v-for="(cat, index) in subcategoryNepies" :key="index"
              v-bind:class="{ activeSelect: cat.value == selectedsubcatNep }" @click="changeSubSelectedNep(cat.value)">
              {{ cat.name }}
            </li>
          </ul>
        </v-col>
        <v-col v-if="loading">
          <ul class="domainlist">
            <li>
              <v-skeleton-loader class="mx-auto" type="image" height="200" width="320"></v-skeleton-loader>
            </li>
            <li>
              <v-skeleton-loader class="mx-auto" type="image" height="200" width="320"></v-skeleton-loader>
            </li>
            <li>
              <v-skeleton-loader class="mx-auto" type="image" height="200" width="320"></v-skeleton-loader>
            </li>
            <li>
              <v-skeleton-loader class="mx-auto" type="image" height="200" width="320"></v-skeleton-loader>
            </li>
            <li>
              <v-skeleton-loader class="mx-auto" type="image" height="200" width="320"></v-skeleton-loader>
            </li>
            <li>
              <v-skeleton-loader class="mx-auto pt-0" type="image" height="200" width="320"></v-skeleton-loader>
            </li>
            <li>
              <v-skeleton-loader class="mx-auto pt-0" type="image" height="200" width="320"></v-skeleton-loader>
            </li>
            <li>
              <v-skeleton-loader class="mx-auto pt-0" type="image" height="200" width="320"></v-skeleton-loader>
            </li>
          </ul>
        </v-col>
        <v-col v-if="
          selectedcat === 'Nepali Congress District Working Committee' &&
          !loading
        ">
          <ul class="domainlist" v-if="subdomainAll && selectedLanguage.title !== 'English'">
            <div v-for="(sub, index) in subdomainAll" :key="index" v-bind:class="{
              hidebox: sub.subcategoryNep != selectedsubcatNep,
            }">
              <li v-if="sub.subcategoryNep == selectedsubcatNep">
                <router-link :to="'subdomain/' + sub.slug" v-if="selectedLanguage.title !== 'English'">
                  <img v-if="sub.image[0]" :src="baseUrl + sub.image[0].fileUrl" alt />
                  <span>{{ sub.nepname }}</span>
                </router-link>
              </li>
            </div>
          </ul>
          <ul class="domainlist" v-if="subdomainAll && selectedLanguage.title === 'English'">
            <div v-for="(sub, index) in subdomainAll" :key="index"
              v-bind:class="{ hidebox: sub.subcategory !== selectedsubcat }">
              <li v-if="sub.subcategory === selectedsubcat">
                <router-link :to="'subdomain/' + sub.slug" v-if="selectedLanguage.title === 'English'">
                  <img v-if="sub.image[0]" :src="baseUrl + sub.image[0].fileUrl" alt />
                  <span>{{ sub.name }}</span>
                </router-link>
              </li>
            </div>
          </ul>
        </v-col>
      </v-row>
      <v-row v-if="selectedLanguage.title === 'English'">
        <v-col md="12" class="fiterback">
          <ul class="filtercat">
            <li v-for="(cat, index) in categories" :key="index" v-bind:class="{ activeSelect: cat.got == selectedcat }"
              @click="changeSelected(cat.got, index)">
              {{ cat.show }}
            </li>
          </ul>
        </v-col>
      </v-row>
      <v-row v-if="
        selectedLanguage.title === 'English' &&
        selectedcat === 'Nepali Congress District Working Committee'
      " class="submenus">
        <v-col md="2" cols="12">
          <ul class="filtercat">
            <li v-for="(cat, index) in subcategories" :key="index"
              v-bind:class="{ activeSelect: cat.value == selectedsubcat }" @click="changeSubSelected(cat.value)">
              {{ cat.name }}
            </li>
          </ul>
        </v-col>
        <v-col v-if="selectedcat === 'Nepali Congress District Working Committee'">
          <ul class="domainlist" v-if="subdomainAll && selectedLanguage.title === 'English'">
            <div v-for="(sub, index) in subdomainAll" :key="index" v-bind:class="{
              hidebox: sub.subcategory != selectedsubcat,
            }">
              <li v-if="sub.subcategory == selectedsubcat">
                <router-link :to="'subdomain/' + sub.slug" v-if="selectedLanguage.title === 'English'">
                  <img v-if="sub.image[0]" :src="baseUrl + sub.image[0].fileUrl" alt />
                  <span>{{ sub.name }}</span>
                </router-link>
              </li>
            </div>
          </ul>
          <ul class="domainlist" v-if="subdomainAll && selectedLanguage.title === 'English'">
            <div v-for="(sub, index) in subdomainAll" :key="index"
              v-bind:class="{ hidebox: sub.subcategory !== selectedsubcat }">
              <li v-if="sub.subcategory === selectedsubcat">
                <router-link :to="'subdomain/' + sub.slug" v-if="selectedLanguage.title === 'English'">
                  <img v-if="sub.image[0]" :src="baseUrl + sub.image[0].fileUrl" alt />
                  <span>{{ sub.name }}</span>
                </router-link>
              </li>
            </div>
          </ul>
        </v-col>
      </v-row>
      <v-row v-if="
        selectedcat !== 'Nepali Congress District Working Committee' &&
        selectedcatNep !== 'नेपाली कांग्रेस जिल्ला कार्यसमिति'
      ">
        <v-col md="12" cols="12">
          <ul class="domainlist" v-if="subdomainAll && selectedLanguage.title !== 'English'">
            <div v-for="(sub, index) in subdomainAll" :key="index"
              v-bind:class="{ hidebox: sub.categoryNep !== selectedcatNep }">
              <li v-if="sub.categoryNep === selectedcatNep">

                <router-link :to="'subdomain/' + sub.slug"
                  v-if="selectedLanguage.title !== 'English' && sub.categoryNep != 'नेपाली जनसम्पर्क समिति'">
                  <img v-if="sub.image[0]" :src="baseUrl + sub.image[0].fileUrl" alt />

                  <span>{{ sub.nepname }}</span>
                </router-link>
                <router-link :to="'subdomain/' + sub.slug" class="boxSub"
                  v-if="selectedLanguage.title !== 'English' && sub.categoryNep == 'नेपाली जनसम्पर्क समिति'">
                  <img v-if="sub.image[0]" :src="baseUrl + sub.image[0].fileUrl" alt />

                  <span>{{ sub.nepname }}</span>
                </router-link>
              </li>
            </div>
          </ul>
          <ul class="domainlist" v-if="subdomainAll && selectedLanguage.title === 'English'">
            <div v-for="(sub, index) in subdomainAll" :key="index"
              v-bind:class="{ hidebox: sub.category !== selectedcat }">
              <li v-if="sub.category === selectedcat">
                <router-link :to="'subdomain/' + sub.slug" v-if="selectedLanguage.title === 'English'">
                  <img v-if="sub.image[0]" :src="baseUrl + sub.image[0].fileUrl" alt />
                  <span>{{ sub.name }}</span>
                </router-link>
              </li>
            </div>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TitleBreadCrumb from "../components/common/TitleBreadCrumb";
import { fileUrl } from "./../../main";
export default {
  name: "Subdomain",
  components: { TitleBreadCrumb },
  data() {
    return {
      baseUrl: fileUrl,
      loading: true,
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
            title: "Subdomain",
          },
          nep: {
            title: "सबडोमेन",
          },
        },
      ],
      categories: [
        {
          show: "District Working Committees",
          got: "Nepali Congress District Working Committee",
        },
        {
          show: "Sister Organizations",
          got: "Sister Organization",
        },

        {
          show: "Well Wisher Organizations",
          got: "Well Wisher Organization",
        },
        {
          show: "Nepalese People's Co-ordination Committee",
          got: "Nepalese People's Co-ordination Committee",
        },
        {
          show: "Central Policy , Research and Training",
          got: "Central Policy , Research and Training",
        },
        {
          show: "Central Election Committee",
          got: "Central Election Committee",
        },
        {
          show: "Federal Parliamentary Party",
          got: "Nepali Congress Federal Parliamentary Party",
        },
        {
          show: "Province Assembly Parliamentary Parties",
          got: "Nepali Congress Province Assembly Parliamentary Party",
        },
      ],
      categoryNepies: [
        {
          show: " जिल्ला कार्यसमितिहरु",
          got: "नेपाली कांग्रेस जिल्ला कार्यसमिति",
        },
        {
          show: "भातृ संस्थाहरु",
          got: "भातृ संस्था",
        },

        {
          show: "शुभेच्छुक संस्थाहरु",
          got: "शुभेच्छुक संस्था",
        },
        {
          show: "नेपाली जनसम्पर्क समिति समन्वय विभाग",
          got: "नेपाली जनसम्पर्क समिति",
        },
        {
          show: "केन्द्रीय नीति, अनुसन्धान तथा प्रशिक्षण प्रतिष्ठान",
          got: "केन्द्रीय नीति, अनुसन्धान तथा प्रशिक्षण प्रतिष्ठान",
        },
        {
          show: "केन्द्रीय निर्वाचन समिति",
          got: "केन्द्रीय निर्वाचन समिति",
        },
        {
          show: "संघीय संसदीय दल",
          got: "नेपाली कांग्रेस संघीय संसदीय दल",
        },
        {
          show: "प्रदेश सभा संसदीय दलहरु",
          got: "नेपाली कांग्रेस प्रदेश सभा संसदीय दल",
        },
      ],
      selectedcat: "Nepali Congress District Working Committee",
      selectedcatNep: "नेपाली कांग्रेस जिल्ला कार्यसमिति",
      selectedsubcat: "Province No. 1",
      selectedsubcatNep: "प्रदेश नं. १",
      subcategories: [
        {
          name: "Province No. 1",
          value: "Province No. 1",
        },
        {
          name: "Madesh Pradesh",
          value: "Province No. 2",
        },
        {
          name: "Bagmati Pradesh",
          value: "Bagmati Pradesh",
        },
        {
          name: "Gandaki Pradesh",
          value: "Gandaki Pradesh",
        },
        {
          name: "Lumbini Pradesh",
          value: "Lumbini Pradesh",
        },
        {
          name: "Karnali Pradesh",
          value: "Karnali Pradesh",
        },
        {
          name: "Sudurpashchim Pradesh",
          value: "Sudurpashchim Pradesh",
        },
      ],
      subcategoryNepies: [
        {
          name: "प्रदेश नं. १",
          value: "प्रदेश नं. १",
        },
        {
          name: "मधेस प्रदेश",
          value: "प्रदेश नं. २",
        },
        {
          name: "बागमती प्रदेश",
          value: "बागमती प्रदेश",
        },
        {
          name: "गण्डकी प्रदेश",
          value: "गण्डकी प्रदेश",
        },
        {
          name: "लुम्बिनी प्रदेश",
          value: "लुम्बिनी प्रदेश",
        },
        {
          name: "कर्णाली प्रदेश",
          value: "कर्णाली प्रदेश",
        },
        {
          name: "सुदूरपश्चिम प्रदेश",
          value: "सुदूरपश्चिम प्रदेश",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["subdomainAll", "selectedLanguage"]),
  },
  methods: {
    ...mapActions(["subdomainFrontend"]),
    changeSelectedNep(item, i) {
      this.selectedcatNep = item;
      this.selectedcat = this.categories[i].got;
    },
    changeSelected(item, i) {
      this.selectedcat = item;
      this.selectedcatNep = this.categoryNepies[i].got;
    },
    changeSubSelectedNep(item) {
      this.selectedsubcatNep = item;
    },
    changeSubSelected(item) {
      this.selectedsubcat = item;
    },
  },
  async created() {
    // this.$store.state.post.loading = true;
    await this.subdomainFrontend();
    this.loading = false;
    // setTimeout(() => {
    //   this.$store.state.post.loading = false;
    //   this.loading = false;
    // }, 1500);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.activeSelect {
  // background: $primary;
  color: $green;
  cursor: pointer;
  font-family: $mon;
  position: relative;

  &::after {
    content: "";
    left: 20px;
    right: 20px;
    height: 2px;
    background: $secondary;
    position: absolute;
    bottom: 0px;
  }
}

.hidebox {
  display: none;
}

.filtercat {
  display: flex;
  list-style: none;
  justify-content: flex-start;
  // margin-top: 25px;
  margin-left: 0;
  // margin-bottom: 20px;
  flex-wrap: wrap;
  background: $whitegray;

  @media only screen and (max-width: 991px) {
    flex-flow: column;
    font-size: 16px;
  }

  li {
    padding: 10px 20px;
    margin: 5px 0;
    font-family: $mon;
    cursor: pointer;
  }

  &:nth-of-type(2) {
    margin-top: 0;
  }
}

.domainlist {
  padding-left: 0;
  margin-left: 0;
  list-style: none;
  margin: 30px 0;
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  @media only screen and (max-width: 991px) {
    flex-flow: column;
  }

  div {
    width: 25%;

    @media only screen and (max-width: 991px) {
      width: 100%;
    }
  }

  li {
    // width: 25%;
    font-family: $mon;
    box-sizing: border-box;
    padding: 10px;
    height: 100%;

    a {
      height: 100%;
    }

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      margin-bottom: -10px;
      filter: brightness(50%);
    }

    @media only screen and (max-width: 991px) {
      width: 100%;
    }
  }

  a,
  .boxSub {
    overflow: hidden;
    border-radius: 10px;
    display: block;
    border: 1px solid $secondary;
    width: 100%;
    color: $text;
    text-align: center;
    text-decoration: none;
    min-height: 50px;
    // letter-spacing: 2px;
    font-family: $mon;

    &:hover {
      background: $secondary;
      color: $white;

      span {
        background: $secondary;
      }
    }

    position: relative;

    span {
      padding: 15px 20px;
      display: block;
      position: absolute;
      z-index: 999;
      left: 0;
      right: 30px;
      left: 30px;
      top: 50%;
      transform: translateY(-50%);
      background: $white;
    }
  }
}

.nep {
  li {
    letter-spacing: 0;
    font-family: $nepalifont;
  }

  a {
    letter-spacing: 0;
    font-family: $nepalifont;
  }
}

.fiterback {
  background: $whitegray;

  ul {
    padding-left: 0;
  }
}

.submenus {

  // margin-top: -40px;
  // border-top:1px solid rgb(180, 177, 177);
  .col-md-2 {
    background: $whitegray;
  }

  .filtercat {
    flex-flow: column;
    margin-top: 0;
    background: $whitegray;
    padding-left: 0;
    padding: 20px 0;
  }
}
</style>
``