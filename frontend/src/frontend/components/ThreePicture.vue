<template>
  <section v-bind:class="{nep:language !== 'English'}" v-if="listdata[0].status">
    <header class="contenttitle" v-if="title">{{title}}</header>
    <div class="contentsection" v-if="listdata[0] != undefined">
      <v-row >
        <v-col >
          <img
            :src="listdata[0].images[0] != undefined ?  baseUrl+listdata[0].images[0].fileUrl : ''"
            alt
            class="leftimage"
          />
        </v-col>
        <v-col md="6"  cols="12" v-if="listdata[0].images[1] != undefined ">
          <v-row class="nopadding">
            <v-col md="12" class="topimage">
              <img
                :src="listdata[0].images[1] != undefined ?  baseUrl+listdata[0].images[1].fileUrl : ''"
                alt
                class="rightimage"
              />
            </v-col>
            <v-col md="12" class="bottomimage">
              <img
                :src="listdata[0].images[2] != undefined ?  baseUrl+listdata[0].images[2].fileUrl : ''"
                alt
                class="rightimage"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <div v-if="language === 'Nepali'" v-bind:class="{nep:language === 'Nepali'}">
        <p
          v-html="listdata[0].nep.content.length > 500 ? listdata[0].nep.content.slice(0,500)+' [...]':listdata[0].nep.content"
        ></p>
      </div>
      <div v-if="language !== 'Nepali'" v-bind:class="{nep:language === 'Nepali'}">
        <p
          v-html="listdata[0].eng.content.length > 500 ? listdata[0].eng.content.slice(0,500)+' [...]':listdata[0].eng.content"
        ></p>
      </div>
    </div>
      <button class="btn-readmore">
      <router-link :to="`/${slug}`">{{buttontxt}}</router-link>
    </button>
  </section>
</template>

<script>
import { fileUrl } from "./../../main";
export default {
  name: "ThreePicture",
  props: ["title", "buttontxt", "listdata", "language","slug"],
  data() {
    return {
      baseUrl: fileUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.leftimage {
  width: 100%;
  height: 400px;
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
img {
  object-fit: cover;
}

.nopadding {
  padding: 0 !important;
  padding-right: 15px !important;
}
.btn-readmore {
  background: $midlightgray;
  width: 100%;
  padding: 13px;
  font-size: 14px;
  font-family: $mon;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  a{
    color:$text;
    text-decoration: none;
  }
}
.nep {
  p {
    padding: 0 20px 30px;
    margin-bottom: 0;
    font-size: 15px;
    font-family: $nepalifont;
    letter-spacing: 1.1px;
    line-height: 22px;
  }
}
p {
  padding: 0 20px 30px;
  margin-bottom: 0;
  font-size: 14px;
  font-family: $mon;
  letter-spacing: 1.1px;
  line-height: 22px;
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