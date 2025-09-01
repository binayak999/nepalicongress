<template>
  <div>
    <ul
      class="leadersimages"
      v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }"
    >
      <div class="abstitle">
        <ul>
          <li>राष्ट्रियता</li>
          <li>लोकतन्त्र,</li>
          <li>समाजवाद</li>
        </ul>
      </div>

      <li>
        <img :src="require(`@/assets/images/congressleader/flag.gif`)" alt />
      </li>
      <li>
        <img :src="require(`@/assets/images/congressleader/03.png`)" alt />
        <strong v-if="selectedLanguage.title === 'English'">B P Koirala</strong>
        <strong v-if="selectedLanguage.title !== 'English'"
          >वीपी कोइराला</strong
        >
      </li>

      <li>
        <img :src="require(`@/assets/images/congressleader/02.png`)" alt />
        <strong v-if="selectedLanguage.title === 'English'"
          >Subarna Samsher Rana</strong
        >
        <strong v-if="selectedLanguage.title !== 'English'"
          >सुवर्ण शमशेर</strong
        >
      </li>
      <li>
        <img :src="require(`@/assets/images/congressleader/01.png`)" alt />
        <strong v-if="selectedLanguage.title === 'English'"
          >Ganesh Man Singh</strong
        >
        <strong v-if="selectedLanguage.title !== 'English'"
          >गणेशमान सिंह</strong
        >
      </li>
      <li>
        <img :src="require(`@/assets/images/congressleader/04.png`)" alt />
        <strong v-if="selectedLanguage.title === 'English'"
          >Krishna Prasad Bhattarai</strong
        >
        <strong v-if="selectedLanguage.title !== 'English'"
          >कृष्णप्रसाद भट्टराई</strong
        >
      </li>
      <li>
        <img :src="require(`@/assets/images/congressleader/05.png`)" alt />
        <strong v-if="selectedLanguage.title === 'English'"
          >Girija Prasad Koirala</strong
        >
        <strong v-if="selectedLanguage.title !== 'English'"
          >गिरिजाप्रसाद कोइराला</strong
        >
      </li>
      <li>
        <img :src="require(`@/assets/images/congressleader/06.png`)" alt />
        <strong v-if="selectedLanguage.title === 'English'"
          >Sushil Koirala</strong
        >
        <strong v-if="selectedLanguage.title !== 'English'"
          >सुशील कोइराला</strong
        >
      </li>
      <li>
        <img
          :src="require(`@/assets/images/congressleader/flag.png`)"
          alt
          width="100"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Leaders",
  props: ["selectedLanguage"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.leadersimages {
  padding-left: 0;
  list-style: none;
  padding-left: 0 !important;
  margin-left: 0;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  padding: 70px 0 15px;
  background: linear-gradient(to top, #0a510f, #cbefbf);
  @media only screen and (max-width: 991px) {
    flex-flow: row;
    flex-wrap: wrap;
    padding-left: 0;
  }
  li {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    color: $white;

    img {
      margin-bottom: 15px;
      border-radius: 50%;
      border: 3px solid $ligtgray;
      width: 120px;
      height: 140px;
      object-fit: cover;
      box-shadow: 0 5px 10px #1c4a23;
      // filter: grayscale(1);
      @media only screen and (max-width: 991px) {
        width: 100px;
        height: 140px;
      }
    }
    &:nth-of-type(1) {
      img {
        border-radius: 0;
        height: auto;
        border: 0;
        filter: grayscale(0);
        width: 100px;
        box-shadow: none;
      }
      @media only screen and (max-width: 991px) {
        width: 100%;
      }
    }
    &:last-of-type {
      img {
        border-radius: 0;
        width: 160px;
        height: auto;
        border: 0;
        filter: grayscale(0);
        box-shadow: none;
        @media only screen and (max-width: 991px) {
          object-fit: contain;
        }
      }
      @media only screen and (max-width: 991px) {
        width: 100%;
      }
    }
    @media only screen and (max-width: 991px) {
      margin-bottom: 20px;
      width: 50%;
    }
  }

  .abstitle {
    position: absolute;
    top: 15px;
    ul {
      display: flex;
      @media only screen and (max-width: 991px) {
        flex-flow: row;
        flex-wrap: wrap;
        padding-left: 0;
      }
      li {
        margin: 0 40px;
        @media only screen and (max-width: 991px) {
          margin: 0 10px;
          width: auto;
        }
        color: #112c4c;
        font-weight: 600;
        font-size: 25px;
        font-family: aakriti;
      }
    }
  }
}
strong {
  font-family: $mon !important;
  font-weight: 400;
  letter-spacing: 0.5px;
  font-size: 14px;
}
.nep {
  strong {
    font-weight: 500;
    font-size: 20px;
    font-family: $nepalifont !important;
    letter-spacing: 0;
  }
}
</style>