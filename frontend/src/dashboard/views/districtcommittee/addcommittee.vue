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
                  label="English Name"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-text-field
                  v-model="engPost"
                  :rules="[engTitleRules.required]"
                  label="English Post"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="!language">
              <v-col md="12">
                <v-text-field
                  v-model="nepTitle"
                  :rules="[nepTitleRules.required]"
                  label="Nepali Name"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-text-field
                  v-model="nepPost"
                  :rules="[engTitleRules.required]"
                  label="Nepali Post"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="12">
                <v-text-field
                  v-model="facebookUrl"
                  label="Facebook Url"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-text-field
                  v-model="twitterUrl"
                  label="Twitter Url"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-text-field
                  v-model="instagramUrl"
                  label="Instagram Url"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <!-- <v-col md="12">
                <v-select :items="items" label="Parent Page" outlined></v-select>
              </v-col>-->
              <v-col md="6">
                <v-text-field
                  v-model="sort1"
                  :rules="numberBox"
                  required
                  outlined
                  label="Sort 1"
                  @change="changeSelect(sort1, sort2)"
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="sort2"
                  :rules="numberBox"
                  required
                  outlined
                  label="Sort 2"
                  @change="changeSelect(sort1, sort2)"
                ></v-text-field>
              </v-col>
            

              <v-col md="12">Image</v-col>

              <v-col md="12">
                <v-file-input
                  label="Image"
                  :chips="true"
                  :show-size="true"
                  outlined
                  v-model="images"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                ></v-file-input>
              </v-col>
               <v-col md="12">Attachment</v-col>
              <v-col md="12">
               <v-file-input
                  multiple
                  label="Attachment"
                  :chips="true"
                  :show-size="true"
                  outlined
                  v-model="attachment"
                  accept="application/pdf"
                  prepend-icon="mdi-file"
                ></v-file-input>
              </v-col>
            </v-row>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
              >Add Committee</v-btn
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
             <img
                  :src="require(`@/assets/images/treestructure.png`)"
                  alt="" width="100%"
                />
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
export default {
  name: "AddWorkingCommittee",
  components: { TitleBreadCrumb },
  data() {
    return {
      instagramUrl: "#",
      facebookUrl: "#",
      twitterUrl: "#",
      valid: true,
      title: "Add Working Committee",
      language: false,
      images: [],
      attachment: [],
      sorts: [0, 1, 2, 3, 4, 5],
      sortConCat: "00",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Working Committee",
        },
      ],
      engTitle: "",
      engPost: "",
      nepTitle: "",
      nepPost: "",
      sort1: 0,
      sort2: 0,
      engTitleRules: {
        required: (value) => !!value || "Required.",
      },
      nepTitleRules: {
        required: (value) => !!value || "Required.",
      },
      numberBox: [(v) => !isNaN(v) || "Please enter number"],
      date: new Date().toISOString().substr(0, 10),
      nepalidate: new NepaliDate(
        parseISO(new Date().toISOString().substr(0, 10))
      ),
    };
  },
  methods: {
    validate() {
      this.languageswitch("eng");
      if (this.engTitle != "") {
        if (this.$refs.form.validate()) {
          let addCommittee = {
            eng: {
              title: this.engTitle,
              post: this.engPost,
              date: this.computedDateFormattedMomentjs,
            },
            nep: {
              title: this.nepTitle,
              post: this.nepPost,
              date: this.nepalidate,
            },
            images: this.images,
            attachment: this.attachment,
            sort1: this.sort1,
            sort2: this.sort2,
            sorts: new Date().getTime() + this.sortConCat,
            facebookUrl: this.facebookUrl,
            twitterUrl: this.twitterUrl,
            instagramUrl: this.instagramUrl,
            imageFile: "centralcommittee",
          };

          this.$store.dispatch("createDisCommittee", addCommittee);
        }
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
    changeSelect(e, f) {
      this.sortConCat = e + "" + f;
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
  created() {
    this.sortConCat = this.sort1 + "" + this.sort2;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
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
.container {
  max-width: 100%;
}
</style>