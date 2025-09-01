<template>
  <section>
    <router-link :to="`/single/${data.category[0].slug}/${data.slug}`">
      <img
        :src="data.images[0] != undefined ?  baseUrl+data.images[0].fileUrl : 'https://nepalicongress.org/img/aboutimage.6d9fbb33.jpg'"
        alt
        class="imagebox"
      />
    </router-link>
    <div v-if="language === 'Nepali'" v-bind:class="{nep:language === 'Nepali'}">
      <small>{{data.nep.date}}</small>
      <h4>
        <router-link :to="`/single/${data.category[0].slug}/${data.slug}`">{{data.nep.title}}</router-link>
      </h4>
      <p v-html="data.nep.content.slice(0,150)+' [...]'" class="textheight">
      </p>
    </div>
    <div v-if="language !== 'Nepali'" v-bind:class="{nep:language === 'Nepali'}">
      <small>{{data.eng.date}}</small>
      <h4>
        <router-link :to="`/single/${data.category[0].slug}/${data.slug}`">{{data.eng.title}}</router-link>
      </h4>
    </div>
  </section>
</template>

<script>
export default {
  name: "ImageContentSlide",
  props: ["data", "language", "baseUrl"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
section {
  margin-bottom: 10px;
  padding: 0 20px;
  display: flex;
  @media only screen and (max-width:991px){
    flex-flow: column;
  }
}
small {
  letter-spacing: 0.5px;
  margin-bottom: 5px;
  // margin-top: 10px;
  display: block;
  font-size: 13px;
  color: $text;
}
.textheight{
  line-height: 24px!important;
  margin-top: 5px;
  color: $text;
    font-size: 15px;
  @media only screen and (max-width:991px){
   line-height: 20px;
  }
}
.nep {
  letter-spacing: 0 !important;
  font-family: $nepalifont !important;
  small {
    letter-spacing: 0 !important;
    font-family: $nepalifont !important;
  }

  h4 {
    a {
      letter-spacing: 0;
      font-family: $nepalifont !important;
      color: $dark;
      font-family: $nepalifont;
      font-weight: 600;
      text-decoration: none;
      font-size: 18px;
    }
    &:hover{
      text-decoration: underline;
    }
  }
}
h4 {
  a {
    letter-spacing: 0px;
    color: $dark;
    font-family: $mon;
    font-weight: 500;
    text-decoration: none;
    font-size: 16px;
  }
  &:hover{
    text-decoration: underline;
  }
}
.transicon {
  width: 20px;
  margin-right: 10px;
}
.imagebox {
  width: 200px;
  // height: 200px;
  object-fit: cover;
  object-position: top;
  margin-right: 15px;
}
span {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 14px;
  letter-spacing: 1.2px;
  cursor: pointer;
}
.backgroundlist {
  section {
    display: flex;

    .imagebox {
      width: 400px;
      
      margin-right: 30px;
      margin-top: 15px;
    }
    small {
      margin-top: 15px;
      // padding-top: 0;
    }
  }
}
p{
  line-height: 22px!important;
}
</style>