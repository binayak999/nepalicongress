<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container>
      <v-row>
        <v-col cols="8" class="formbox">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col md="12">
                <ul class="tabs">
                  <li>
                    <span
                      class="formtitle"
                      @click="languageswitch('nep')"
                      v-bind:class="{ active: !language }"
                      >Nepali</span
                    >
                  </li>
                  <li>
                    <span
                      class="formtitle"
                      @click="languageswitch('eng')"
                      v-bind:class="{ active: language }"
                      >English</span
                    >
                  </li>
                </ul>
              </v-col>
            </v-row>
            <v-row v-if="language">
              <v-col md="12">
                <v-text-field
                  v-model="engTitle"
                  :rules="[engTitleRules.required]"
                  label="English Title"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-textarea
                  v-model="engContent"
                  :rules="[engContentRules.required]"
                  label="English Content"
                  required
                  outlined
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row v-if="!language">
              <v-col md="12">
                <v-text-field
                  v-model="nepTitle"
                  :rules="[nepTitleRules.required]"
                  label="Nepali Title"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-textarea
                  v-model="nepContent"
                  :rules="[nepContentRules.required]"
                  label="Nepali Content"
                  required
                  outlined
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="numberofvoters"
                  :rules="[numberofvotersRules.required]"
                  label="Number of Voters"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <div class="fulldiv">
                <ul class="adctionbutton">
                  <li>
                    <button @click="addNewVoteTopic" type="button">
                      <i class="fa fa-plus"></i> Add Vote Topic
                    </button>
                  </li>
                  <li>
                    <button @click="addNewVoteTopic" type="button">
                      <i class="fa fa-plus"></i> Delete Vote Topic
                    </button>
                  </li>
                </ul>
                <v-row v-for="(voteT, index) in votesPosts" :key="index">
                  <v-col cols="6">
                    <label class="labeltitle">Voting Topic</label>
                    <v-text-field
                      v-model="voteT.votingTopic.eng"
                      :rules="[engTitleRules.required]"
                      label="VotingTopic Eng"
                      required
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="voteT.votingTopic.nep"
                      :rules="[engTitleRules.required]"
                      label="VotingTopic Nep"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <ul class="adctionbutton">
                      <li>
                        <button @click="addNewVote(index)" type="button">
                          <i class="fa fa-plus"></i> Add Vote
                        </button>
                      </li>

                      <li>
                        <button @click="deleteVote(index)" type="button">
                          <i class="fa fa-times"></i> Delete Vote
                        </button>
                      </li>
                    </ul>
                    <div v-for="(vote, i) in voteT.votes" :key="i">
                      <v-row>
                        <v-col>
                          <v-text-field
                            v-model="vote.valueEng"
                            :rules="[engTitleRules.required]"
                            label="Vote For In English"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="vote.valueNep"
                            :rules="[engTitleRules.required]"
                            label="Vote For In Nepali"
                            required
                            outlined
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                </v-row>
              </div>

              <v-col cols="6">
                <div>Wanna Send SMS</div>
                <button
                  class="btncondition"
                  @click="yesSms"
                  v-bind:class="{ activebtn: sms === 'Yes' }"
                >
                  Yes
                </button>
                <button
                  class="btncondition"
                  @click="noSms"
                  v-bind:class="{ activebtn: sms === 'No' }"
                >
                  No
                </button>
              </v-col>
              <v-col cols="6">
                <div>Send SMS To</div>
                <div class="voterslist">
                  <div
                    v-for="(data, index) in allUniqueVoters"
                    :key="index"
                    class="checkbutton"
                  >
                    <label :for="index">
                      <span>{{ data }}</span>
                    </label>
                    <input
                      type="radio"
                      :ref="index"
                      v-model="smsTo"
                      name="smsto"
                      :value="data"
                      :id="index"
                      @change="handleSelectVoters(index, data)"
                    />
                  </div>
                </div>
              </v-col>
              <v-col md="6" class="dateinput">
                <div>English Date</div>
                <v-menu v-model="menu1" :close-on-content-click="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="computedDateFormattedMomentjs"
                      clearable
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @change="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col md="6">
                <div>Nepali Date</div>
                <span class="nepaliDate">{{ nepalidate }}</span>
              </v-col>
            </v-row>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
              >Add Vote</v-btn
            >
          </v-form>
        </v-col>
        <v-col cols="4">
          <iframe
            src="https://www.hamropatro.com/widgets/calender-medium.php"
            frameborder="0"
            scrolling="no"
            marginwidth="0"
            marginheight="0"
            style="border: none; overflow: hidden; width: 295px; height: 385px"
            allowtransparency="true"
          ></iframe>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import moment from "moment";
import { format, parseISO } from "date-fns";
import NepaliDate from "nepali-date-converter";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AddVote",
  components: { TitleBreadCrumb },
  data() {
    return {
      valid: true,
      title: "Add Vote",
      language: false,
      images: [],
      video: null,
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Vote",
        },
      ],
      engTitle: null,
      engContent: null,
      nepTitle: null,
      nepContent: null,
      engTitleRules: {
        required: (value) => !!value || "Required.",
      },
      engContentRules: {
        required: (value) => !!value || "Required.",
      },
      nepTitleRules: {
        required: (value) => !!value || "Required.",
      },
      nepContentRules: {
        required: (value) => !!value || "Required.",
      },
      numberofvotersRules: {
        required: (value) => !!value || "Required.",
      },
      votetopicRules: {
        required: (value) => !!value || "Required.",
      },
      numberofvoters: 0,
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      nepalidate: new NepaliDate(
        parseISO(new Date().toISOString().substr(0, 10))
      ),
      items: ["Member", "Subdomain"],
      smsTo: "",
      smscond: ["Yes", "No"],
      sms: "Yes",
      votesPosts: [
        {
          votingTopic: {
            eng: "",
            nep: "",
          },
          votes: [
            {
              valueEng: "",
              valueNep: "",
              votecount: 0,
            },
          ],
        },
      ],

      votetopic: new Date().toISOString().substr(0, 10).toString(),
    };
  },
  methods: {
    ...mapActions(["fetchUniqueVoters"]),
    validate() {
      let voting;
      if (this.$refs.form.validate()) {
        if (this.sms === "Yes") {
          voting = {
            voteTopicId: this.engTitle,
            eng: {
              title: this.engTitle,
              content: this.engContent,
              date: this.computedDateFormattedMomentjs,
            },
            nep: {
              title: this.nepTitle,
              content: this.nepContent,
              date: this.nepalidate,
            },
            numberofvoters: this.numberofvoters,
            votesFor: this.votesPosts,
            smsSentTo: [this.smsTo],
            sms: this.sms,
          };
        } else {
          voting = {
            voteTopicId: this.engTitle,
            eng: {
              title: this.engTitle,
              content: this.engContent,
              date: this.computedDateFormattedMomentjs,
            },
            nep: {
              title: this.nepTitle,
              content: this.nepContent,
              date: this.nepalidate,
            },
            numberofvoters: this.numberofvoters,
            votesFor: this.votesPosts,
            smsSentTo: [this.smsTo],
            sms: this.sms,
          };
        }
        this.$store.dispatch("postVote", voting);
      }
    },
    languageswitch(lang) {
      if (lang === "eng") {
        this.language = true;
      } else {
        this.language = false;
      }
    },
    changeDate() {
      let np = new NepaliDate(parseISO(this.date));
      this.nepalidate = np.format("ddd DD, MMMM YYYY", "np");
    },
    addNewVote(i) {
      this.votesPosts[i].votes.push({
        valueEng: "",
        valueNep: "",
        votecount: 0,
      });
    },
    addNewVoteTopic() {
      this.votesPosts.push({
        votingTopic: {
          eng: "",
          nep: "",
        },
        votes: [
          {
            valueEng: "",
            valueNep: "",
            votecount: 0,
          },
        ],
      });
    },
    deleteVote(e) {
      e.preventDefault();
      this.votes.pop();
    },
    yesSms(e) {
      e.preventDefault();
      this.sms = "Yes";
    },
    noSms(e) {
      e.preventDefault();
      this.sms = "No";
    },
    handleSelectVoters(i, v) {
      console.log(i, v);
    },
    // memberCheck(e) {
    //   e.preventDefault();
    //   this.smsTo = "Member";
    // },
    // sudomainCheck(e) {
    //   e.preventDefault();
    //   this.smsTo = "Subdomain";
    // },
  },
  computed: {
    computedDateFormattedMomentjs() {
      this.changeDate();
      return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    },
    computedDateFormattedDatefns() {
      return this.date ? format(this.date, "EEEE, MMMM do yyyy") : "";
    },
    ...mapGetters(["allUniqueVoters"]),
  },
  created() {
    this.fetchUniqueVoters();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.fulldiv {
  width: 100%;
}
.activebtn {
  background: $secondary;
  padding: 10px 20px;
  // margin-right: 10px;
  color: $white;
  border: 1px solid $secondary;
}
.btncondition {
  margin-top: 10px;
  // margin-right: 10px;
  font-size: 14px;
  border: 1px solid $secondary;
  padding: 10px 20px;
}
.adctionbutton {
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding-left: 0;
  font-size: 12px;
  li {
    &:first-of-type {
      button {
        background: green;
        color: $white;
      }
    }
    &:nth-of-type(2) {
      button {
        background: red;
        color: $white;
      }
    }
  }
  button {
    // border: 1px solid $ligtgray;
    padding: 5px 15px;
    margin-bottom: 15px;
    &:focus {
      outline: none;
    }
  }
  .fa {
    margin-right: 10px;
  }
}

.labeltitle {
  padding: 10px 0;
  display: block;
}
.formtitle {
  background: $ligtgray;
  color: $white;
  display: inline-block;
  padding: 5px 20px;
  font-size: 14px;
}
.active {
  background: $primary;
}
.tabs {
  display: flex;
  list-style: none;
  padding-left: 0;
  li {
    margin-right: 5px;
    cursor: pointer;
  }
}
.formbox {
  padding: 20px 30px;
}
.nepaliDate {
  display: inline-block;
  padding: 12px 20px;
  border: 1px solid $primary;
  color: $dark;
  width: 100%;
}
.container {
  max-width: 100%;
}
.checkbutton {
  position: relative;
  min-width: 100px;
  padding: 10px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $dark;
  padding: 0 15px;
  cursor: pointer;
  span {
    position: relative;
    z-index: 999;
    // color: $white;
  }
}
.voterslist {
  display: flex;
  margin-top: 10px;
}
</style>