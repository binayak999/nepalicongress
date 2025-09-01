<template>
  <section v-bind:class="{nep:language !== 'English'}">
    <header class="contenttitle" v-if="title">{{title}}</header>
    <div class="contentsection" v-if="listdata[0] != undefined">
      <v-row>
        <v-col md="14" class="leftimage">
          <img :src="listdata[0].images[0] != undefined ?  baseUrl+listdata[0].images[0].fileUrl : 'https://nepalicongress.org/img/aboutimage.6d9fbb33.jpg'" alt />
        </v-col>
      </v-row>
      <div v-if="language === 'Nepali'" v-bind:class="{nep:language === 'Nepali'}">
        <h3>{{listdata[0].nep.title}}</h3>
        <p v-html="listdata[0].nep.content.length > 300 ? listdata[0].nep.content.slice(0,300)+' [...]':listdata[0].nep.content"></p>
      </div>
      <div v-if="language !== 'Nepali'" v-bind:class="{nep:language === 'Nepali'}">
        <h3>{{listdata[0].eng.title}}</h3>
        <p
          v-html="listdata[0].eng.content.length > 300 ? listdata[0].eng.content.slice(0,300)+' [...]':listdata[0].eng.content"
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
  name: "HighlistContent",
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
  h3 {
    padding: 0 20px 10px 0;
    text-align: center;
    letter-spacing: 1.1px;
    color: $text;
    font-family: $nepalifont;
    font-weight: 600;
    text-decoration: none;
  }
  p {
    padding: 0 20px 30px;
    margin-bottom: 0;
    font-size: 15px;
    font-family: $nepalifont;
    letter-spacing: 1.1px;
    line-height: 22px;
    text-align: center;
  }
}
h3 {
  padding: 0 20px 10px 0;
  text-align: center;
  letter-spacing: 1.1px;
  font-family: $mon;

  letter-spacing: 1.2px;
  color: $text;
  font-family: $mon;
  font-weight: 500;
  text-decoration: none;
}

p {
  padding: 0 20px 30px;
  margin-bottom: 0;
  font-size: 14px;
  font-family: $mon;
  letter-spacing: 1.2px;
  line-height: 22px;
  text-align: center;
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