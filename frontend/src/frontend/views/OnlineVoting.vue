<template>
  <section v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }">
    <TitleBreadCrumb
      :breadcrumbs="breadcrumbs"
      :language="selectedLanguage.title"
    />

    <v-container fluid v-if="allVotesFrontend.length == 0">
      <v-row>
        <v-col md="12">
          <div class="vote">
            <img src="@/assets/images/icons/nodata.svg" alt />
            <h1>Voting has not been open for now</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid v-if="allVotesFrontend.length != 0">
      <v-row class="loginbox" v-if="setVoted == undefined">
        <v-col md="5" class="authbox">
          <h2>Login To Vote</h2>
          <div>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="publicforum"
            >
              <v-row>
                <v-col md="12" cols="12">
                  <v-text-field
                    v-model="username"
                    :rules="[nameRules.required]"
                    label="Username"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="12" cols="12">
                  <v-text-field
                    v-model="password"
                    :rules="[nameRules.required]"
                    label="Password"
                    required
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>

                <v-col md="12" class="text-center" cols="12">
                  <v-btn color="primary" @click="validForm">Login</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid v-if="setVoted != undefined">
      <v-row
        class="loginbox centerbox"
        v-for="(vote, index) in allVotesFrontend"
        :key="index"
      >
        <v-col md="10" class="authbox">
          <div
            v-if="vote.nep != undefined && selectedLanguage.title === 'Nepali'"
            v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }"
          >
            <h2>{{ vote.nep.title }}</h2>
            <p class="text-center paratext">{{ vote.nep.content }}</p>
            <p class="text-center datetext">{{ vote.nep.date }}</p>
          </div>
          <div
            v-if="vote.eng != undefined && selectedLanguage.title !== 'Nepali'"
            v-bind:class="{ nep: selectedLanguage.title === 'Nepali' }"
          >
            <h2>{{ vote.eng.title }}</h2>
            <p class="text-center paratext">{{ vote.eng.content }}</p>
            <p class="text-center datetext">{{ vote.eng.date }}</p>
          </div>
          <div>
            <v-row class="votebuttons">
              <v-col
                class="btn-vote"
                md="5"
                v-for="(vv, index) in vote.votesFor"
                :key="index"
              >
                <!-- <span class="d-none">{{ topup }}</span> -->
                
                <h3
                  v-if="selectedLanguage.title !== 'Nepali'"
                  class="text-center heading3"
                >
                  {{ vv.votingTopic.eng }}
                </h3>
                <div
                  class="btnvotes text-center"
                  v-if="selectedLanguage.title !== 'Nepali'"
                >
                  <div v-for="(v, i) in vv.votes" :key="i">
                    <v-radio-group v-model="vv.votingTopic.nep" column>
                      <v-radio
                        :label="v.valueEng"
                        color="orange"
                        :value="v.valueEng"
                        class="radiobutton"
                        @click="
                          voteNow({
                            id: vote._id,
                            valueEng: v.valueEng,
                            valueNep: v.valueNep,
                            votecount: 1,
                            voteTopicId: vote.voteTopicId,
                            subMainTopicEng: vv.votingTopic.eng,
                            subMainTopicNep: vv.votingTopic.nep,
                            ind: index,
                            subindex: i,
                          })
                        "
                      ></v-radio>
                    </v-radio-group>
                  </div>
                </div>
                <h3
                  v-if="selectedLanguage.title === 'Nepali'"
                  class="text-center heading3"
                >
                  {{ vv.votingTopic.nep }}
                </h3>
                <div
                  class="btnvotes"
                  v-if="selectedLanguage.title === 'Nepali'"
                >
                  <div v-for="(v, i) in vv.votes" :key="i">
                    <v-radio-group v-model="vv.votingTopic.eng" column>
                      <v-radio
                        :label="v.valueNep"
                        color="#2C9131"
                        class="radiobutton"
                        :value="v.valueNep"
                        @click="
                          voteNow({
                            id: vote._id,
                            valueEng: v.valueEng,
                            valueNep: v.valueNep,
                            votecount: 1,
                            voteTopicId: vote.voteTopicId,
                            subMainTopicEng: vv.votingTopic.eng,
                            subMainTopicNep: vv.votingTopic.nep,
                            ind: index,
                            subindex: i,
                          })
                        "
                      ></v-radio>
                    </v-radio-group>
                  </div>
                </div>
              </v-col>

              <!-- <v-col md="4">
                <div>You have voted for</div>
                 <div class="tablebox">
                    <div>
                      <h5>Topic</h5>
                    </div>
                    <div>
                      <h5>Voted To :</h5>
                    </div>
                  </div>
                <div v-for="(vote, index) in votedOn" :key="index">
                 
                  <div class="tablebox">
                    <div>
                      <ul>
                        <li>{{ vote.subMainTopicEng }}</li>
                      </ul>
                    </div>
                    <div>
                      <ul>
                        <li>{{ vote.valueEng }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </v-col> -->
              <v-col md="12" class="text-center">
                <v-btn @click="votingConfirm">Vote Now</v-btn>
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
import { secureStorage } from '../../main';
export default {
  name: "OnlineVoting",
  components: {
    TitleBreadCrumb,
  },
  data() {
    return {
      title: "Online Voting",
      vote: false,
      show1: false,
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
            title: "Online Vote",
          },
          nep: {
            title: "अनलाइन भोट",
          },
        },
      ],
      valid: true,
      validTop: false,
      username: "",
      password: "",
      ex7: "red",
      ex8: "primary",
      nameRules: {
        required: (value) => !!value || "Required.",
      },
      votedOn: [],
      topup: "hey",
    };
  },
  computed: {
    ...mapGetters(["selectedLanguage", "allVotesFrontend", "setVoted"]),
  },
  methods: {
    ...mapActions(["fetchVoteFrontend"]),
    validForm() {
      if (this.$refs.form.validate()) {
        let auth = {
          username: this.username,
          password: this.password,
          votingid: this.allVotesFrontend[0]._id,
        };
        this.$store.dispatch("voteLogin", auth);
      }
    },
    voteNow(data) {
      this.topup = Math.random();
      this.votedOn[data.ind] = data;
      this.votedOn;
    },
    votingConfirm() {
      // console.log(this.votedOn);
      this.$store.dispatch("voteNow", this.votedOn);
    },
  },
  created() {
    this.fetchVoteFrontend();
    if (secureStorage.getItem("votetoken")) {
      this.$store.state.vote.vottingnow = secureStorage.getItem("votetoken");
    }
    this.$store.state.post.loading = true;
    setTimeout(() => {
      this.$store.state.post.loading = false;
      this.allVotesFrontend.forEach((ele) => {
        ele.votesFor.forEach((e) => {
          console.log(e);
          this.votedOn.push({ added: "added" });
        });
      });
    }, 1500);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.tablebox {
  display: flex;
  & > div {
    padding: 10px;
    ul {
      margin-left: 0;
      padding-left: 0;
    }
    li {
      list-style: none;
    }
  }
}
.heading3 {
  width: 100%;
  background: $secondary;
  color: $white;
  padding: 10px;
}

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
  padding: 20px 100px;
  background: $midwhite;
  footer {
    div {
      margin-top: 20px;
    }
  }
}
.radiobutton {
  border: 1px solid $secondary;
  margin: 0 10px;
  padding: 10px 20px;
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
.centerbox {
  .row {
    justify-content: center;
  }
}
.btn-vote {
  display: flex;
  align-items: center;
  justify-content: center;
  border:1px solid $secondary;
  margin:0 10px 20px;
  
  padding: 0;
  .v-btn {
    padding: 20px 70px;
    font-size: 16px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    background: $primary !important;
    color: $white;
    letter-spacing: 1.4px;
  }
}

.nep {
  h2 {
    font-family: $nepalifont !important;
    letter-spacing: 0;
  }
}
.votebuttons {
  .btn-vote {
    flex-flow: column;
  }
  .btnvotes {
    display: flex;
    .btnvt {
      margin: 10px 20px;
    }
  }
}
</style>