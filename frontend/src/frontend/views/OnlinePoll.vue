<template>
  <section>
    <TitleBreadCrumb :breadcrumbs="breadcrumbs" :language="selectedLanguage.title" />
    <v-container fluid v-if="!vote">
      <v-row>
        <v-col md="12">
          <div class="vote">
            <img src="@/assets/images/icons/nodata.svg" alt />
            <h1>Poll has not been open for now</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid v-if="vote">
      <v-row class="loginbox centerbox" v-for="(vote,index) in allPollsFrontend" :key="index">
        <v-col md="10" class="authbox">
          <div
            v-if="vote.nep != undefined && selectedLanguage.title === 'Nepali'"
            v-bind:class="{nep:selectedLanguage.title === 'Nepali'}"
          >
            <h2>{{vote.nep.title}}</h2>
            <p class="text-center paratext">{{vote.nep.content}}</p>
            <p class="text-center datetext">{{vote.nep.date}}</p>
          </div>
          <div
            v-if="vote.eng != undefined && selectedLanguage.title !== 'Nepali'"
            v-bind:class="{nep:selectedLanguage.title === 'Nepali'}"
          >
            <h2>{{vote.eng.title}}</h2>
            <p class="text-center paratext">{{vote.eng.content}}</p>
            <p class="text-center datetext">{{vote.eng.date}}</p>
          </div>

          <div>
            
              <v-row>
                <v-col class="btn-vote" md="2" v-for="(v,index) in vote.votesFor" :key="index">
                  <v-btn
                    v-if="selectedLanguage.title !== 'Nepali'"
                    v-bind:class="{nep:selectedLanguage.title === 'Nepali'}"
                    @click="pollNow( {id:vote._id,valueEng: v.valueEng,valueNep: v.valueNep,votecount: 1})"
                  >{{v.valueEng}}</v-btn>
                  <v-btn
                    v-if="selectedLanguage.title === 'Nepali'"
                    v-bind:class="{nep:selectedLanguage.title === 'Nepali'}"
                    @click="pollNow( {id:vote._id,valueEng: v.valueEng,valueNep: v.valueNep,votecount: 1})"
                  >{{v.valueNep}}</v-btn>
                </v-col>
              </v-row>
       
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import TitleBreadCrumb from "../components/common/TitleBreadCrumb";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "OnlinePoll",
  components: {
    TitleBreadCrumb,
  },
  data() {
    return {
      title: "Online Poll",
      vote: true,
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
            title: "Online Poll",
          },
          nep: {
            title: "अनलाइन पोल",
          },
        },
      ],
      valid: true,
      nameRules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    ...mapActions(["fetchPollsFrontend", "pollNow"]),
    pollNow(data) {
      this.$store.dispatch("pollNow",data);
    },
  },
  computed: {
    ...mapGetters(["allPollsFrontend", "selectedLanguage"]),
  },
  created() {
    this.fetchPollsFrontend();
      this.$store.state.post.loading = true;
    setTimeout(() => {
      this.$store.state.post.loading = false;
    }, 1500);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.datetext {
  background: $secondary;
  width: 25%;
  margin: -30px auto 50px;
  color: $white;
  padding: 10px 15px;
}
.paratext {
  margin-top: -30px;
  margin-bottom: 50px;
  font-size: 20px;
}
.loginbox {
  justify-content: center;
  padding: 50px 0 100px;
  h2 {
    text-align: center;
    padding: 20px 0;
  }
}
.authbox {
  border: 1px solid $midwhite;
  padding: 50px 100px;
  background: $midwhite;
  footer {
    div {
      margin-top: 20px;
    }
  }
}
h2 {
  text-transform: uppercase;
  color: $primary;
  letter-spacing: 1.5px;
  text-decoration: underline;
  font-size: 28px;
  margin-bottom: 20px;
}
.primary {
  background: $secondary !important;
  padding: 20px 40px !important;
  border-radius: 0;
  box-shadow: none;
  margin-top: 10px !important;
  letter-spacing: 2px !important;
  font-weight: 400;
}
.centerbox {
  .row {
    justify-content: center;
  }
}
.vote {
  background: $midwhite;
  padding: 100px 20px;
  margin: 30px 25%;
  display: flex;
  justify-content: center;
  h1 {
    text-align: center;
    letter-spacing: 1.3px;
    font-size: 35px;
    width: 50%;
    // background: red;
  }
}
.btn-vote {
  display: flex;
  align-items: center;
  justify-content: center;
  .v-btn {
    padding: 50px 70px;
    font-size: 16px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    background: $primary !important;
    color: $white;
    letter-spacing: 1.4px;
  }
}
</style>