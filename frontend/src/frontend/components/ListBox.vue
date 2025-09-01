<template>

  <section v-bind:class="{nep:language !== 'English'}">

    <header class="contenttitle" v-if="title" >{{title}}</header>
    <div class="contentsection">
      <div v-for="(list,index) in listdata" :key="index">
        <List :data="list" :language="language" />
      </div>
    </div>
    <button class="btn-readmore">
      <router-link :to="`/${slug}`">{{buttontxt}}</router-link>
    </button>
  </section>
</template>

<script>
import List from "./common/List";
export default {
  name: "ListBox",
  props: ["title", "buttontxt", "listdata", "language", "slug"],
  components: {
    List,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.leftimage {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  img {
    width: 50%;
    height: 250px;
    object-fit: cover;
  }
}
.rightimage {
  width: 100%;
  height: 195px;
}
.topimage,
.bottomimage {
  padding: 0;
}
.topimage {
  margin-bottom: 5px;
}

p {
  padding: 0 20px 30px;
  margin-bottom: 0;
  font-size: 14px;
  font-family: $mon;
  letter-spacing: 1.1px;
  line-height: 22px;
  text-align: center;
}
.nopadding {
  padding: 0 !important;
  padding-right: 15px !important;
}
h3 {
  padding: 0 20px 10px 0;
  text-align: center;
  letter-spacing: 1.1px;
}
.btn-readmore {
  background: $green;
  width: 100%;
  padding: 13px;
  font-size: 14px;
  font-family: $mon;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  transition: background-color 0.5s ease-out;
  a {
    color: $white;
    text-decoration: none;
  }
  &:hover{
    background: $midlightgray;
    a{
    color: $green;
  }
  }
}
.contentsection {
  height: 345px;
  overflow-y: scroll;
  padding: 15px 0;
  &::-webkit-scrollbar {
    display: none;
  }
}
.nep {
  header {
    letter-spacing: 0;
    font-family: $nepalifont!important;
  }
  .btn-readmore {
    letter-spacing: 0;
    font-family: $nepalifont!important;
  }
  p{
      letter-spacing: 0;
      font-family: $nepalifont!important;
  }
}
</style>