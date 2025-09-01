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
                  :items="sorts"
                  required
                  outlined
                  label="Sort 1"
                  @change="changeSelect(sort1, sort2)"
                ></v-text-field>
              </v-col>
              <v-col md="6">
                <v-text-field
                  v-model="sort2"
                  :items="sorts"
                  required
                  outlined
                  label="Sort 2"
                  @change="changeSelect(sort1, sort2)"
                ></v-text-field>
              </v-col>
              <!-- <v-col md="4">
              <v-text-field
                  v-model="sortConCat"

                  required
                  outlined
                  label="Sorts"
                ></v-text-field>
              </v-col>-->
              <v-col md="12" v-if="oldImage.length != 0">
                <div class="flexboxfile">
                  <div
                    v-for="(data, index) in oldImage"
                    :key="index"
                    class="filebox"
                  >
                    <div class="imageboxaction">
                      <div class="deletebutton">
                        <i
                          class="fa fa-close"
                          @click="removeImage(data.fileUrl)"
                        ></i>
                      </div>
                      <img :src="baseUrl + data.fileUrl" alt class="imageold" />
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
              <v-col md="12">Image</v-col>
              <v-col md="12">
                <button
                  class="btn btn-primary"
                  v-if="!addnewmedias"
                  @click="addMedia"
                >
                  Add New Medias
                </button>
                <button
                  class="btn btn-primary"
                  v-if="addnewmedias"
                  @click="addMedia"
                >
                  No New Media
                </button>
              </v-col>
              <v-col md="12">
                <v-file-input
                  v-if="addnewmedias"
                  label="Image"
                  :chips="true"
                  :show-size="true"
                  outlined
                  v-model="images"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                ></v-file-input>
                <v-file-input
                  v-if="addnewmedias"
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
              >Update Committee</v-btn
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
import { mapActions, mapGetters } from "vuex";
import { fileUrl } from "./../../../main";
export default {
  name: "UpdateDistrictCommittee",
  components: { TitleBreadCrumb },
  data() {
    return {
      instagramUrl: "#",
      facebookUrl: "#",
      twitterUrl: "#",
      baseUrl: fileUrl,
      valid: true,
      title: "Update Wokring Committee",
      language: false,
      images: [],
      sorts: [0, 1, 2, 3, 4, 5],
      sortConCat: "00",
      oldImage: [],
      oldAttachment: [],
      addnewmedias: false,
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Update Working Committee",
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
      date: new Date().toISOString().substr(0, 10),
      nepalidate: new NepaliDate(
        parseISO(new Date().toISOString().substr(0, 10))
      ),
      removedImage: [],
      removedAttachment: [],
    };
  },
  methods: {
    ...mapActions(["fetchSingleDisCommittee"]),
    validate() {
      this.languageswitch("eng");
      if (this.engTitle != "") {
        if (this.$refs.form.validate()) {
          let updateCommittee = {
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
            oldImage: this.oldImage,
            oldAttachment: this.oldAttachment,
            removedImage: this.removedImage,
            removedAttachment: this.removedAttachment,
            images: this.images,
            sort1: this.sort1,
            sort2: this.sort2,
            sorts: new Date().getTime() + this.sortConCat,
            facebookUrl: this.facebookUrl,
            twitterUrl: this.twitterUrl,
            instagramUrl: this.instagramUrl,
            imageFile: "centralcommittee",
            id: this.allSingleDisCommittee._id,
          };

          this.$store.dispatch("updateDisCentralCommittee", updateCommittee);
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
    removeAttachment(data) {
      this.removedAttachment.push({ fileUrl: data });
      this.oldAttachment = this.oldAttachment.filter((ele) => {
        return ele.fileUrl !== data;
      });
    },
  },
  computed: {
    ...mapGetters(["allSingleDisCommittee"]),
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
    this.fetchSingleDisCommittee(this.$route.params.id);
    setTimeout(() => {
      this.nepTitle = this.allSingleDisCommittee.nep.title;
      this.engTitle = this.allSingleDisCommittee.eng.title;
      this.engPost = this.allSingleDisCommittee.eng.post;
      this.nepPost = this.allSingleDisCommittee.nep.post;
      this.sort1 = this.allSingleDisCommittee.sort1;
      this.sort2 = this.allSingleDisCommittee.sort2;
      this.facebookUrl = this.allSingleDisCommittee.facebookUrl;
      this.twitterUrl = this.allSingleDisCommittee.twitterUrl;
      this.instagramUrl = this.allSingleDisCommittee.instagramUrl;
      this.oldImage = this.allSingleDisCommittee.images;
         this.oldAttachment = this.allSingleDisCommittee.attachment;
      this.sortConCat = this.allSingleDisCommittee.sorts;
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
.btn-primary {
  background: $primary;
  font-size: 12px;
  color: $white;
  padding: 10px 15px;
  letter-spacing: 1.2px;
}
</style>