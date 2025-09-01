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
                <v-text-field v-model="engTitle" :rules="[engTitleRules.required]" label="English Title" required
                  outlined></v-text-field>
              </v-col>
              <v-col md="12">
                <ckeditor :editor="editor" v-model="engContent" :config="editorConfig"
                  :rules="[engContentRules.required]" class="texteditorheight"></ckeditor>
              </v-col>
            </v-row>
            <v-row v-if="!language">
              <v-col md="12">
                <v-text-field v-model="nepTitle" :rules="[nepTitleRules.required]" label="Nepali Title" required
                  outlined></v-text-field>
              </v-col>
              <v-col md="12">
                <ckeditor :editor="editor" v-model="nepContent" :config="editorConfig"
                  :rules="[nepContentRules.required]" class="texteditorheight"></ckeditor>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6" class="dateinput">
                <div class="dateold">
                  <div>Old English Date</div>
                  <div>{{ oldDateEng }}</div>
                </div>
              </v-col>
              <v-col md="6">
                <div class="dateold">
                  <div>Old Nepali Date</div>
                  <div>{{ oldDateNep }}</div>
                </div>
                <!-- 
                <div>Nepali Date</div>

                <span class="nepaliDate">{{nepalidate}}</span>-->
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6">
                <div>Sort</div>
                <v-text-field v-model="sort" label="Sort" required outlined></v-text-field>
              </v-col>

              <v-col md="6" v-if="$route.params.page == 'datehistory'">
                <div>Year of history</div>
                <v-text-field v-model="dateofhistory" label="Year of history" required outlined></v-text-field>
              </v-col>
              <v-col md="12">Medias</v-col>
              <v-col md="12" v-if="oldImage.length != 0">
                <div class="flexboxfile">
                  <div v-for="(data, index) in oldImage" :key="index" class="filebox">
                    <div class="imageboxaction">
                      <div class="deletebutton">
                        <i class="fa fa-close" @click="removeImage(data.fileUrl)"></i>
                      </div>
                      <img :src="baseUrl + data.fileUrl" alt class="imageold" />
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col md="12" v-if="oldVideos.length != 0">
                <div class="flexboxfile">
                  <div v-for="(data, index) in oldVideos" :key="index" class="filebox">
                    <div class="imageboxaction">
                      <div class="deletebutton">
                        <i class="fa fa-close" @click="removeVideo(data.fileUrl)"></i>
                      </div>
                      <video controls class="imagebox">
                        <source :src="baseUrl + data.fileUrl" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col md="12" v-if="oldAttachment.length != 0">
                <div class="flexboxfile">
                  <div v-for="(data, index) in oldAttachment" :key="index" class="filebox">
                    <div class="imageboxaction">
                      <div class="deletebutton">
                        <i class="fa fa-close" @click="removeAttachment(data.fileUrl)"></i>
                      </div>
                      <iframe :src="baseUrl + data.fileUrl" frameborder="0" width="100%"></iframe>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col md="12">
                <button class="btn btn-primary" v-if="!addnewmedias" @click="addMedia">Add New Medias</button>
                <button class="btn btn-primary" v-if="addnewmedias" @click="addMedia">No New Media</button>
              </v-col>
              <v-col md="6" v-if="addnewmedias">
                <v-file-input multiple label="Images" :chips="true" :show-size="true" outlined v-model="images"
                  :rules="imgrules" accept="image/*" prepend-icon="mdi-camera"></v-file-input>
              </v-col>
              <v-col md="6" v-if="addnewmedias">
                <v-file-input label="Video" :chips="true" :show-size="true" outlined v-model="videos" :rules="vidrules"
                  accept="video/*" prepend-icon="mdi-video"></v-file-input>
              </v-col>
              <v-col md="6" v-if="addnewmedias">
                <v-file-input multiple label="Attachment" :chips="true" :show-size="true" outlined v-model="attachment"
                  accept="application/pdf" prepend-icon="mdi-file"></v-file-input>
              </v-col>
              <v-col md="6" v-if="addnewmedias">
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
import { mapActions, mapGetters } from "vuex";
import { fileUrl } from "./../../../main";
export default {
  name: "PostUpdate",
  components: { TitleBreadCrumb },
  props: ["fortitle", "title", "breadcrumbs"],
  data() {
    return {
      imgrules: [files => !files || !files.some(file => file.size > 2097152) || "Avatar size should be less than 2 MB!"],

      vidrules: [
        (value) =>
          !value ||
          value.size <= 60000000 ||
          "Avatar size should be less than 60 MB!",
      ],
      baseUrl: fileUrl,
      valid: true,
      language: false,
      images: [],
      videos: null,
      attachment: [],
      addnewmedias: false,
      engTitle: null,
      engContent: "",
      nepTitle: null,
      nepContent: "",
      embeded: "",
      oldDateEng: "",
      oldDateNep: "",
      slugbox: "",
      dateofhistory: "",
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
      oldImage: [],
      oldVideos: [],
      oldAttachment: [],
      removedImage: [],
      removedVideo: [],
      removedAttachment: [],
      editor: ClassicEditor,
      sort: 0,
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
    ...mapActions(["fetchSingleDash"]),
    validate() {
      if (
        this.engTitle != "" &&
        this.nepTitle != "" &&
        this.engContent != "" &&
        this.nepContent != ""
      ) {
        if (this.$refs.form.validate()) {
          let addPost = {
            id: this.singlePostAll._id,
            eng: {
              title: this.engTitle,
              content: this.engContent,
              date: this.oldDateEng,
            },
            nep: {
              title: this.nepTitle,
              content: this.nepContent,
              date: this.oldDateNep,
            },
            slug: this.slugbox,
            oldImage: this.oldImage,
            oldVideos: this.oldVideos,
            oldAttachment: this.oldAttachment,
            removedImage: this.removedImage,
            removedVideo: this.removedVideo,
            removedAttachment: this.removedAttachment,
            externallink: this.embeded !== "" ? this.embeded : "default",
            dateofhistory: this.dateofhistory,
            attachment:
              this.addnewmedias && this.attachment.length > 0
                ? this.attachment
                : [],
            videos:
              this.addnewmedias && this.videos != null ? this.videos : null,
            images:
              this.addnewmedias && this.images.length > 0 ? this.images : [],
            imageFile: this.slugbox,
            status: true,
            userRole: this.logged.user.role,
            sort: this.sort,
          };
          this.$store.dispatch("updateStatusPostInside", addPost);
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
    addMedia(e) {
      e.preventDefault();
      this.addnewmedias = !this.addnewmedias;
    },
    removeImage(data) {
      this.removedImage.push({ fileUrl: data });
      this.oldImage = this.oldImage.filter((ele) => {
        return ele.fileUrl !== data;
      });
    },
    removeVideo(data) {
      this.removedVideo.push({ fileUrl: data });
      this.oldVideos = this.oldVideos.filter((ele) => {
        return ele.fileUrl !== data;
      });
    },
    removeAttachment(data) {
      this.removedAttachment.push({ fileUrl: data });
      this.oldAttachment = this.oldAttachment.filter((ele) => {
        return ele.fileUrl !== data;
      });
    },
  },
  computed: {
    ...mapGetters(["singlePostAll", "logged"]),
    computedDateFormattedMomentjs() {
      this.changeDate();
      return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    },
    computedDateFormattedDatefns() {
      return this.date ? format(this.date, "EEEE, MMMM do yyyy") : "";
    },
  },
  created() {
    let params = {
      page: this.$route.params.page,
      slug: this.$route.params.slug,
    };
    this.fetchSingleDash(params);
    setTimeout(() => {
      this.engTitle = this.singlePostAll.eng.title;
      this.nepTitle = this.singlePostAll.nep.title;
      this.engContent = this.singlePostAll.eng.content;
      this.nepContent = this.singlePostAll.nep.content;
      this.oldDateEng = this.singlePostAll.eng.date;
      this.oldDateNep = this.singlePostAll.nep.date;
      this.embeded = this.singlePostAll.externallink;
      this.oldImage = this.singlePostAll.images;
      this.oldVideos = this.singlePostAll.videos;
      this.oldAttachment = this.singlePostAll.attachment;
      this.slugbox = this.singlePostAll.category[0].slug;
      if (this.$route.params.page == "datehistory") {
        this.dateofhistory = this.singlePostAll.dateofhistory;
      }

      this.sort =
        this.singlePostAll.sort != undefined ? this.singlePostAll.sort : 0;
    }, 1500);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.flexboxfile {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  iframe {
    width: 100%;
    height: 300px;
    display: block;
  }

  .filebox {
    margin-bottom: 50px;
    width: 45%;
  }
}

.btn-primary {
  background: $primary;
  font-size: 12px;
  color: $white;
  padding: 10px 15px;
  letter-spacing: 1.2px;
}

.imageold {
  width: 100%;
}

.imageboxaction {
  position: relative;
  width: 100%;
}

.deletebutton {
  position: absolute;
  top: -15px;
  right: -15px;
  background: $white;
  border: 1px solid $dark;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dateold {
  margin-bottom: 20px;
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
}

.container {
  max-width: 100%;
}

video {
  width: 100%;
}
</style>