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
                    <span class="formtitle" @click="languageswitch('nep')"
                      v-bind:class="{ active: !language }">Nepali</span>
                  </li>
                  <li>
                    <span class="formtitle" @click="languageswitch('eng')"
                      v-bind:class="{ active: language }">English</span>
                  </li>
                </ul>
              </v-col>
            </v-row>
            <v-row v-if="language">
              <v-col md="12">
                <label for>English Title</label>
                <v-text-field v-model="engTitle" :rules="[engTitleRules.required]" label="English Title" required
                  outlined></v-text-field>
              </v-col>
              <v-col md="12">
                <label for>English Content</label>
                <ckeditor :editor="editor" v-model="engContent" :config="editorConfig"
                  :rules="[engContentRules.required]" class="texteditorheight"></ckeditor>
              </v-col>
            </v-row>
            <v-row v-if="!language">
              <v-col md="12">
                <label for>Nepali Title</label>
                <v-text-field v-model="nepTitle" :rules="[nepTitleRules.required]" label="Nepali Title" required
                  outlined></v-text-field>
              </v-col>
              <v-col md="12">
                <label for>Nepali Content</label>
                <ckeditor :editor="editor" v-model="nepContent" :config="editorConfig"
                  :rules="[nepContentRules.required]" class="texteditorheight"></ckeditor>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6" class="dateinput">
                <div>English Date</div>
                <v-menu v-model="menu1" :close-on-content-click="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field :value="computedDateFormattedMomentjs" clearable readonly v-bind="attrs"
                      v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @change="menu1 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col md="6">
                <div>Nepali Date</div>
                <span class="nepaliDate">{{ nepalidate }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6">
                <div>Sort</div>
                <v-text-field v-model="sort" label="Sort" required outlined></v-text-field>
              </v-col>
              <v-col md="12">Medias</v-col>

              <v-col md="6">
                <v-file-input multiple label="Images" :chips="true" :show-size="true" outlined v-model="images"
                  :rules="imgrules" accept="image/*" prepend-icon="mdi-camera"></v-file-input>
              </v-col>
              <v-col md="6">
                <v-file-input label="Video" :chips="true" :show-size="true" outlined v-model="videos" :rules="vidrules"
                  accept="video/*" prepend-icon="mdi-video"></v-file-input>
              </v-col>
              <v-col md="6">
                <v-file-input multiple label="Attachment" :chips="true" :show-size="true" outlined v-model="attachment"
                  accept="application/pdf" prepend-icon="mdi-file"></v-file-input>
              </v-col>
              <v-col md="6">
                <v-text-field v-model="embeded" label="External Video Link" required outlined></v-text-field>
              </v-col>
            </v-row>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">{{ title }}</v-btn>
          </v-form>
        </v-col>
        <v-col cols="4">
          <iframe src="https://www.hamropatro.com/widgets/calender-medium.php" frameborder="0" scrolling="no"
            marginwidth="0" marginheight="0" style="border: none; overflow: hidden; width: 295px; height: 385px"
            allowtransparency="true"></iframe>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TitleBreadCrumb from "./TitleBreadCrumb";
import moment from "moment";
import { format, parseISO } from "date-fns";
import NepaliDate from "nepali-date-converter";
import { mapGetters } from "vuex";
export default {
  name: "CustomDatePost",
  components: { TitleBreadCrumb },
  props: ["fortitle", "title", "breadcrumbs"],
  data() {
    return {
      valid: true,
      imgrules: [
        (files) =>
          !files ||
          !files.some((file) => file.size > 2097152) ||
          "Avatar size should be less than 2 MB!",
      ],
      vidrules: [
        (value) =>
          !value ||
          value.size <= 60000000 ||
          "Avatar size should be less than 60 MB!",
      ],
      language: false,
      images: [],
      videos: null,
      attachment: [],

      engTitle: null,
      engContent: "",
      nepTitle: null,
      nepContent: "",
      embeded: "",
      sort: 0,
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
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      nepalidate: new NepaliDate(
        parseISO(new Date().toISOString().substr(0, 10))
      ),
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "blockQuote",
          "insertTable",
        ],
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
      },
    };
  },
  methods: {
    validate() {
      // this.languageswitch("eng");
      if (
        this.engTitle != "" &&
        this.nepTitle != "" &&
        this.engContent != "" &&
        this.nepContent != ""
      ) {
        if (this.$refs.form.validate()) {
          let addPost = {
            eng: {
              title: this.engTitle,
              content: this.engContent,
              date: this.computedDateFormattedMomentjs,
              timestamp: new Date(this.date),
            },
            nep: {
              title: this.nepTitle,
              content: this.nepContent,
              date: this.nepalidate,
              timestamp: new NepaliDate(parseISO(this.date)).getYear() + '-' + parseInt(parseInt(new NepaliDate(parseISO(this.date)).getMonth()) + 1) + '-' + new NepaliDate(parseISO(this.date)).getDate(),
            },
            slug: this.fortitle,
            images: this.images,
            videos: this.videos,
            externallink: this.embeded !== "" ? this.embeded : "default",
            attachment: this.attachment,
            imageFile: this.fortitle,
            userRole: this.logged.user.role,
            sort: this.sort,
          };

          // console.log(addPost);
          this.$store.dispatch("createPost", addPost);
        }
      } else {
        let info = {
          icon: "warning",
          status: true,
          title: `warning`,
          subtitle: `Please Fill All The Fileds Both Nepali And English`,
        };
        this.$store.dispatch("alertNow", info);
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
    onUpdate(text) {
      this.engContent = text;
    },
  },
  computed: {
    ...mapGetters(["logged"]),
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
}

.container {
  max-width: 100%;
}
</style>
