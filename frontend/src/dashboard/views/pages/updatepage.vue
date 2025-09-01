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
                <v-text-field
                  v-model="nepTitle"
                  :rules="[nepTitleRules.required]"
                  label="Nepali Title"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="12">
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
              <!-- <v-col md="12">
                <v-select v-model="position" :items="positions" label="Parent Page" outlined  attach chips ></v-select>
               
              </v-col>
              <v-col md="12">
                <v-select v-model="pageType" :items="pageTypes" label="Page types" outlined  attach chips ></v-select>
                
              </v-col>-->
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
              <v-col md="12" v-if="oldImage.length !=0">
                <div class="flexboxfile">
                  <div v-for="(data,index) in oldImage" :key="index" class="filebox">
                    <div class="imageboxaction">
                      <div class="deletebutton">
                        <i class="fa fa-close" @click="removeImage(data.fileUrl)"></i>
                      </div>
                      <img :src="baseUrl+data.fileUrl" alt class="imageold" />
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col md="12" v-if="oldVideos.length !=0">
                <div class="flexboxfile">
                  <div v-for="(data,index) in oldVideos" :key="index" class="filebox">
                    <div class="imageboxaction">
                      <div class="deletebutton">
                        <i class="fa fa-close" @click="removedVideo(data.fileUrl)"></i>
                      </div>
                      <video controls class="imagebox">
                        <source :src="baseUrl+data.fileUrl" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col md="12" v-if="oldAttachment.length !=0">
                <div class="flexboxfile">
                  <div v-for="(data,index) in oldAttachment" :key="index" class="filebox">
                    <div class="imageboxaction">
                      <div class="deletebutton">
                        <i class="fa fa-close" @click="removeAttachment(data.fileUrl)"></i>
                      </div>
                      <iframe :src="baseUrl+data.fileUrl" frameborder="0" width="100%"></iframe>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col md="12">
                <button
                  class="btn btn-primary"
                  v-if="!addnewmedias"
                  @click="addMedia"
                >Add New Medias</button>
                <button class="btn btn-primary" v-if="addnewmedias" @click="addMedia">No New Media</button>
              </v-col>
              <v-col md="6" v-if="addnewmedias">
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
              <v-col md="6" v-if="addnewmedias">
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
              <v-col md="6" v-if="addnewmedias">
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
              <v-col md="6" v-if="addnewmedias">
                <v-text-field v-model="embeded" label="External Video Link" required outlined></v-text-field>
              </v-col>
            </v-row>

            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Update Page</v-btn>
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
import { fileUrl } from "./../../../main";
export default {
  name: "AddPage",
  components: { TitleBreadCrumb },
  data() {
    return {
      addnewmedias: false,
      baseUrl: fileUrl,
      valid: true,
      title: "Add Page",
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
      oldImage: [],
      oldVideos: [],
      oldAttachment: [],
      removedImage: [],
      removedVideo: [],
      removedAttachment: [],
      selectedPage: null,
    };
  },
  methods: {
    ...mapActions(["singlePage", "fetchPages"]),
    pageChange(id) {
      this.selectedPage = id;
    },
    removeParent() {
      this.selectedPage = null;
    },
    validate() {
      if (
        this.engTitle != "" &&
        this.nepTitle != "" &&
        this.engContent != "" &&
        this.nepContent != ""
      ) {
        if (this.$refs.form.validate()) {
          let addPost;
          if (this.selectedPage != null) {
            addPost = {
              id: this.singlePageAll._id,
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
              oldImage: this.oldImage,
              oldVideos: this.oldVideos,
              oldAttachment: this.oldAttachment,
              removedImage: this.removedImage,
              removedVideo: this.removedVideo,
              removedAttachment: this.removedAttachment,
              pageType: this.pageType,
              position: this.position,
              externallink: this.embeded !== "" ? this.embeded : "default",
              attachment:
                this.addnewmedias && this.attachment.length > 0
                  ? this.attachment
                  : [],
              videos:
                this.addnewmedias && this.videos != null ? this.videos : null,
              images:
                this.addnewmedias && this.images.length > 0 ? this.images : [],
              imageFile: "pages",
              status: true,
              parentPage: this.selectedPage,
            };
          } else {
            addPost = {
              id: this.singlePageAll._id,
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
              oldImage: this.oldImage,
              oldVideos: this.oldVideos,
              oldAttachment: this.oldAttachment,
              removedImage: this.removedImage,
              removedVideo: this.removedVideo,
              removedAttachment: this.removedAttachment,
              pageType: this.pageType,
              position: this.position,
              externallink: this.embeded !== "" ? this.embeded : "default",
              attachment:
                this.addnewmedias && this.attachment.length > 0
                  ? this.attachment
                  : [],
              videos:
                this.addnewmedias && this.videos != null ? this.videos : null,
              images:
                this.addnewmedias && this.images.length > 0 ? this.images : [],
              imageFile: "pages",
              status: true,
            };
          }

          this.$store.dispatch("updateStatusPageInside", addPost);
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
    ...mapGetters(["singlePageAll", "allPage"]),
    computedDateFormattedMomentjs() {
      this.changeDate();
      return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    },
    computedDateFormattedDatefns() {
      return this.date ? format(this.date, "EEEE, MMMM do yyyy") : "";
    },
  },
  created() {
    this.singlePage(this.$route.params.slug);
    setTimeout(() => {
      this.nepTitle = this.singlePageAll.nep.title;
      this.engTitle = this.singlePageAll.eng.title;
      this.nepContent = this.singlePageAll.nep.content;
      this.engContent = this.singlePageAll.nep.content;
      this.position = this.singlePageAll.position;
      this.pageType = this.singlePageAll.pageType;
      this.embeded = this.singlePageAll.externallink;
      this.oldImage = this.singlePageAll.images;
      this.oldVideos = this.singlePageAll.videos;
      this.selectedPage = this.singlePageAll.parentPage;
      this.oldAttachment = this.singlePageAll.attachment;
    }, 1500);
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
    width: 30%;
    img {
      height: 200px;
      object-fit: cover;
    }
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
</style>