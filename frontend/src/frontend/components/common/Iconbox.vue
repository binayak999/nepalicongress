<template>
  <section>
    <v-container fluid>
      <v-row>
        <v-col md="2" v-for="(acttab,index) in actionsTab" :key="index" class="box" cols="6">
          <Tooltip :title="acttab.eng.title" :content="acttab.eng.content" v-if="selectedLanguage.title === 'English'" class="tooltip"/>
          <Tooltip :title="acttab.nep.title" :content="acttab.nep.content" v-if="selectedLanguage.title !== 'English'" v-bind:class="{nep:selectedLanguage.title !== 'English'}"/>
          <router-link :to="acttab.path" class="boxcontent">
            <img :src="acttab.icon" alt />
            <span v-if="selectedLanguage.title === 'English'">{{acttab.eng.title}}</span>
            <span v-if="selectedLanguage.title !== 'English'" v-bind:class="{nep:selectedLanguage.title !== 'English'}">{{acttab.nep.title}}</span>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Tooltip from '../common/Tooltip'
export default {
  name: "IconBox",
  components:{Tooltip},
  computed: {
    ...mapGetters(["actionsTab",'selectedLanguage']),
  },

};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.box {
  position: relative;
  .tooltip{
    display: none;
  }
  &:hover{
    .tooltip{
      display: block;
      
      
    }
  }

  .boxcontent .nep{
   font-size: 18px;
  font-family: $nepalifont;
  color: $dark;
  }
 
  .boxcontent {
    display: flex;
    flex-flow: column;
    align-items: center;
    border: 3px solid $green;
    height: 200px;
    justify-content: center;
    text-decoration: none;
    color: $text;
    transition: 0.1s all ease-in-out;
    box-shadow: 0 5px 10px $midlightgray;
    transition: 0.5s ease-out;
    img {
      width: 70px;
    }
    span {
      font-size: 18px;
      // text-transform: uppercase;
      // letter-spacing: 1px;
      display: block;
      margin-top: 20px;
      text-align: center;
      font-family: $mon;
    }
    &:hover{
      background: $green; 
      cursor: pointer;
      span{
        color: $white;
        text-decoration: underline;
      }
      transition: 0.1s all ease-in-out;
      img{
        filter: grayscale(50) brightness(1000);
      }
    }
  }

}
.row{
  justify-content: center;
}
.nep{
  letter-spacing: 0!important;
  font-family: $nepalifont!important;
}
</style>