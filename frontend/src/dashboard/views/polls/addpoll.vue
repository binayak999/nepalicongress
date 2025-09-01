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
                      v-bind:class="{active:!language}"
                    >Nepali</span>
                  </li>
                  <li>
                    <span
                      class="formtitle"
                      @click="languageswitch('eng')"
                      v-bind:class="{active:language}"
                    >English</span>
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
                  v-model="votetopic"
                  :rules="[votetopicRules.required]"
                  label="Poll Topic"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="6" class="dateinput">
                <div class="spantitle">English Date</div>
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
                  <v-date-picker v-model="date" @change="menu1 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col md="6">
                <div class="spantitle">Nepali Date</div>
                <span class="nepaliDate">{{nepalidate}}</span>
              </v-col>
            </v-row>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Add Poll</v-btn>
          </v-form>
        </v-col>
        <v-col cols="4">
          <iframe
            src="https://www.hamropatro.com/widgets/calender-medium.php"
            frameborder="0"
            scrolling="no"
            marginwidth="0"
            marginheight="0"
            style="border:none; overflow:hidden; width:295px; height:385px;"
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
import {mapActions} from 'vuex';
export default {
  name: "AddPoll",
  components: { TitleBreadCrumb },
  data() {
    return {
      valid: true,
      title: "Add Poll",
      language: false,
      images: [],
      video: null,
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Poll",
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

      votes: [
        {
          valueEng: "Yes",
          valueNep: "हो",
          votecount: 0,
        },
        {
          valueEng: "No",
          valueNep: "होईन",
          votecount: 0,
        },
      ],
      votetopic: "",
    };
  },
  methods: {
    ...mapActions(['postPoll']),
    validate() {
      if (this.$refs.form.validate()) {
        const voting = {
          pollTopicId: this.votetopic,
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
          votesFor: this.votes,
        };
        this.$store.dispatch('postPoll',voting);
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
    addNewVote(e) {
      e.preventDefault();
      this.votes.push({
        value: "",
        votecount: 0,
      });
    },
    deleteVote(e) {
      e.preventDefault();
      this.votes.pop();
    },
    
  },
  computed: {
    computedDateFormattedMomentjs() {
      this.changeDate();
      return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    },
    computedDateFormattedDatefns() {
      return this.date ? format(this.date, "EEEE, MMMM do yyyy") : "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
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
  padding: 10px 20px;
  border: 1px solid $primary;
  color: $dark;
  width: 100%;
}
.container {
  max-width: 100%;
}
.spantitle {
  margin-bottom: 10px;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>