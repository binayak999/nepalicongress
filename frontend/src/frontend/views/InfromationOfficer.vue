<template>
  <section v-bind:class="{nep:selectedLanguage.title === 'Nepali'}">
    <TitleBreadCrumb :breadcrumbs="breadcrumbs" :language="selectedLanguage.title" />
    <div class="information-officer">
      <img :src="require(`@/assets/images/kesh.jpeg`)" alt />
      <ul v-if="selectedLanguage.title === 'English'">
        <li>Keshav Rijal, Advocate <br/>Secretary</li>
        <li>
          Contact No:
          <strong>9841283078</strong>
        </li>
        <li>
          Email :
          <strong>rijalkdang@gmail.com</strong>
        </li>
      </ul>
      <ul v-if="selectedLanguage.title === 'Nepali'">
        <li>केशब रिजाल, अधिवक्ता <br/>सचिव</li>
        <li>
          संपर्क नम्बर:
          <strong>९८४१२८३०७८</strong>
        </li>
        <li>
          ईमेल :
          <strong>rijalkdang@gmail.com</strong>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import TitleBreadCrumb from "../components/common/TitleBreadCrumb";
import { mapGetters } from "vuex";
export default {
  name: "InfromationOfficer",
  computed: mapGetters(["selectedLanguage"]),
  components: { TitleBreadCrumb },
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
            title: "Information Officer",
          },
          nep: {
            title: "सूचना अधिकारी",
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.information-officer {
  padding: 50px 0 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  text-align: center;
  ul {
    list-style: none;
    padding-left: 0;
    margin-top: 20px;
    font-family: $mon;
    li {
      margin-bottom: 10px;
      &:first-of-type {
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
  img {
    width: 200px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
}
.nep {
  ul {
    font-family: $nepalifont !important;
    li {
      margin-bottom: 10px;
    }
  }
}
</style>