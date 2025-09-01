<template>
  <section>
    <header class="contenttitle" v-if="title">{{ title }}</header>
    <div class="contentsection">
      <div class="facebookscroll">
        <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnepalicongresshq&tabs=timeline&width=400&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=409042009638897"
        width="100%"
        height="300"
        style="border:none;overflow:hidden"
        scrolling="no"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Facebookbox",
  props: ["title"],
  components: {},
  computed: {
    ...mapGetters(["selectedLanguage"]),
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
  background: $darkred;
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
  &:hover {
    background: $green;
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
    font-family: $nepalifont !important;
  }
  .btn-readmore {
    letter-spacing: 0;
    font-family: $nepalifont !important;
  }
  p {
    letter-spacing: 0;
    font-family: $nepalifont !important;
  }
}
</style>