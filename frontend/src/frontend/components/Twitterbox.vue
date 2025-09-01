<template>

  <section >

    <header class="contenttitle" v-if="title">{{title}}</header>
  
    <div class="contentsection">
      
        <div class="twitterscroll">
          <Timeline id="NepaliCongress" sourceType="profile" :options="{ tweetLimit: '100' }"/>
         <!-- <a class="twitter-timeline" href="https://twitter.com/NepaliCongress?ref_src=twsrc%5Etfw">Tweets by NepaliCongress</a>  -->
        </div>
     
    </div>
   
  </section>
</template>
// <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>   
<script>
import { Tweet,Timeline  } from 'vue-tweet-embed'

import { mapGetters } from 'vuex';
export default {
  name: "Twitterbox",
  props: ["title"],
  components: {
   Timeline
  },
   computed:{
    ...mapGetters(['selectedLanguage'])
  }
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
  &:hover{
    background: $green;
  }
}
.contentsection {
  height: 380px;
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