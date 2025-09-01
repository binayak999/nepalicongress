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
                <label>English Title</label>
                <v-text-field
                  v-model="engTitle"
                  :rules="[engTitleRules.required]"
                  label="English Title"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <label>English Content</label>
                <ckeditor
                  :editor="editor"
                  v-model="engContent"
                  :config="editorConfig"
                  :rules="[engContentRules.required]"
                  class="texteditorheight"
                ></ckeditor>
              </v-col>
            </v-row>
            <v-row v-if="!language">
              <v-col md="12">
                <label>Nepali Title</label>
                <v-text-field
                  v-model="nepTitle"
                  :rules="[nepTitleRules.required]"
                  label="Nepali Title"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <label>Nepali Content</label>
                <ckeditor
                  :editor="editor"
                  v-model="nepContent"
                  :config="editorConfig"
                  :rules="[nepContentRules.required]"
                  class="texteditorheight"
                ></ckeditor>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <div>Menu Position</div>
                <button
                  class="btncondition"
                  @click="noSms"
                  v-bind:class="{activebtn:position === 'Header'}"
                >Top</button>
                <button
                  class="btncondition"
                  @click="yesSms"
                  v-bind:class="{activebtn:position === 'Footer'}"
                >Bottom</button>
              </v-col>
              <v-col cols="6">
                <div>Page Type</div>
                <button
                  class="btncondition"
                  @click="memberCheck"
                  v-bind:class="{activebtn:pageType === 'Dynamic'}"
                >Dynamic</button>
                <button
                  class="btncondition"
                  @click="sudomainCheck"
                  v-bind:class="{activebtn:pageType === 'Static'}"
                >Static</button>
              </v-col>

              <v-col cols="12">
                <div>Parent Page</div>

                <button
                  v-for="(page,index) in allPage"
                  :key="index"
                  type="button"
                  class="btncondition"
                  @click="pageChange(page._id)"
                  v-bind:class="{activebtn:page._id === selectedPage}"
                >{{page.eng.title}}</button>
                <button type="button" @click="removeParent" class="removebtn">Remove Parent Page</button>
              </v-col>

              <v-col md="12">Medias</v-col>

              <v-col md="6">
                <v-file-input
                  multiple
                  label="Images"
                  :chips="true"
                  :show-size="true"
                  outlined
                  v-model="images"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                ></v-file-input>
              </v-col>
              <v-col md="6">
                <v-file-input
                  label="Video"
                  :chips="true"
                  :show-size="true"
                  outlined
                  v-model="videos"
                  accept="video/*"
                  prepend-icon="mdi-video"
                ></v-file-input>
              </v-col>
              <v-col md="6">
                <v-file-input
                  multiple
                  label="Attachment"
                  :chips="true"
                  :show-size="true"
                  outlined
                  v-model="attachment"
                  accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf"
                  prepend-icon="mdi-file"
                ></v-file-input>
              </v-col>
              <v-col md="6">
                <v-text-field v-model="embeded" label="External Video Link" required outlined></v-text-field>
              </v-col>
            </v-row>

            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Add Page</v-btn>
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import moment from "moment";
import { format, parseISO } from "date-fns";
import NepaliDate from "nepali-date-converter";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AddPage",
  components: { TitleBreadCrumb },
  data() {
    return {
      valid: true,
      title: "Add Page",
      selectedPage: null,
      language: false,
      images: [],
      videos: null,
      attachment: [],
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Page",
        },
      ],
      engTitle: "",
      engContent: "",
      nepTitle: "",
      nepContent: "",
      embeded: "",
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
      date: new Date().toISOString().substr(0, 10),
      nepalidate: new NepaliDate(
        parseISO(new Date().toISOString().substr(0, 10))
      ),
      positions: ["Header", "Footer"],
      position: "Footer",
      pageTypes: ["Static", "Dynamic"],
      pageType: "Dynamic",
    };
  },
  methods: {
    ...mapActions(["fetchPages"]),
    removeParent() {
      this.selectedPage = null;
    },
    pageChange(id) {
      this.selectedPage = id;
    },
    validate() {
      if (
        this.engTitle != "" &&
        this.nepTitle != "" &&
        this.engContent != "" &&
        this.nepContent != ""
      ) {
        this.languageswitch("eng");
        let addPage;
        if (this.$refs.form.validate()) {
          if (this.selectedPage != null) {
            addPage = {
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
              images: this.images,
              videos: this.videos,
              attachment: this.attachment,
              externallink: this.embeded !== "" ? this.embeded : "default",
              imageFile: "pages",
              position: this.position,
              pageType: this.pageType,
              parentPage: this.selectedPage,
            };
          } else {
            addPage = {
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
              images: this.images,
              videos: this.videos,
              attachment: this.attachment,
              externallink: this.embeded !== "" ? this.embeded : "default",
              imageFile: "pages",
              position: this.position,
              pageType: this.pageType,
            };
          }

          this.$store.dispatch("createPage", addPage);
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
    yesSms(e) {
      e.preventDefault();
      this.position = "Footer";
    },
    noSms(e) {
      e.preventDefault();
      this.position = "Header";
    },
    memberCheck(e) {
      e.preventDefault();
      this.pageType = "Dynamic";
    },
    sudomainCheck(e) {
      e.preventDefault();
      this.pageType = "Static";
    },
  },
  computed: {
    ...mapGetters(["allPage"]),
    computedDateFormattedMomentjs() {
      this.changeDate();
      return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    },
    computedDateFormattedDatefns() {
      return this.date ? format(this.date, "EEEE, MMMM do yyyy") : "";
    },
  },
  created() {
    this.fetchPages();
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
</style>