<template>
  <section v-if="data.status">
    <div v-if="language === 'Nepali'" v-bind:class="{nep:language === 'Nepali'}">
      <small>{{data.nep.date}}</small>
      <h4>
        <router-link
          :to="`/single/${data.category[0].slug}/${data.slug}`"
        >{{data.nep.title.length > 100 ? data.nep.title.slice(0,100)+' [...]' : data.nep.title}}</router-link>
      </h4>
    </div>
    <div v-if="language !== 'Nepali'" v-bind:class="{nep:language === 'Nepali'}">
      <small>{{data.eng.date}}</small>
      <h4>
        <router-link
          :to="`/single/${data.category[0].slug}/${data.slug}`"
        >{{data.eng.title.length > 100 ? data.eng.title.slice(0,100)+' [...]' : data.eng.title}}</router-link>
      </h4>
    </div>
  </section>
</template>

<script>
export default {
  name: "List",
  props: ["data", "language"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
section {
  padding: 10px 30px;
}
small {
   letter-spacing: 0.5px;
  margin-bottom: 5px;
  // margin-top: 10px;
  display: block;
  font-size: 13px;
  color: $text;
}
.nep {
  small {
    letter-spacing: 0;
     font-family: $nepalifont!important;
  }
  h4 {
    a {
      letter-spacing: 0;
      font-family: $nepalifont !important;
      color: $dark;
      font-family: $nepalifont;
      font-weight: 600;
      text-decoration: none;
      font-size: 16px;
    }
    &:hover{
      text-decoration: underline;
    }
  }
}

  h4 {
    a {
      letter-spacing: 0.5;
      font-family: $mon !important;
      color: $dark;
      font-weight: 500;
      text-decoration: none;
      font-size: 16px;
    }
    &:hover{
      text-decoration: underline;
    }
  }

img {
  width: 20px;
  margin-right: 10px;
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
</style>