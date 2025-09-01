<template>
  <section v-bind:class="{nep:selectedLanguage.title === 'Nepali'}">
    <TitleBreadCrumb :breadcrumbs="breadcrumbs" :language="selectedLanguage.title" />
    <v-container fluid>
      <v-row class="loginbox">
        <v-col md="9" class="authbox">
          <h2 v-if="selectedLanguage.title === 'English'">{{breadcrumbs[breadcrumbs.length-1].eng.title}}</h2>
          <h2 v-if="selectedLanguage.title !== 'English'">{{breadcrumbs[breadcrumbs.length-1].nep.title}}</h2>
          <div>
            <router-link
              to="/login"
              class="loginfirst"
              v-if="logged == undefined"
            >Please Login To Proceed Ahead</router-link>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="publicforum"
              v-if="logged != undefined"
            >
              <v-row>
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="phone"
                    :rules="[nameRules.required]"
                    label="Phone"
                    required
                    outlined
                    v-if="logged == undefined"
                  ></v-text-field>
                </v-col>
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="otp"
                    :rules="[nameRules.required]"
                    label="OTP CODE"
                    required
                    outlined
                    v-if="logged == undefined"
                  ></v-text-field>
                </v-col>
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="title"
                    :rules="[nameRules.required]"
                    label="Title"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="6" cols="12">
                  <v-file-input
                    label="Images"
                    :chips="true"
                    :show-size="true"
                    outlined
                    v-model="images"
                    accept="image/*"
                    prepend-icon="mdi-camera"
                  ></v-file-input>
                </v-col>
                <v-col md="12">
                  <!-- <ckeditor
                    :editor="editor"
                    v-model="content"
                    :config="editorConfig"
                    class="texteditorheight"
                  ></ckeditor>-->
                  <v-textarea
                    v-model="content"
                    :rules="[nameRules.required]"
                    label="Content"
                    required
                    outlined
                  ></v-textarea>
                </v-col>

                <v-col md="12" cols="12">
                  <footer>
                    <v-btn color="primary" @click="forumSubmit">Send</v-btn>
                  </footer>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import TitleBreadCrumb from "../components/common/TitleBreadCrumb";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapGetters, mapActions } from "vuex";
import { secureStorage } from '../../main';
export default {
  name: "PublicForum",
  components: {
    TitleBreadCrumb,
  },
  data() {
    return {
      valid: true,
      validTop: true,

      images: [],
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
      nameRules: {
        required: (value) => !!value || "Required.",
      },
      options: ["abc@gmail.com", "bcd@gmail.com"],
      phone: null,
      otp: null,
      content: null,
      title: null,
      email: null,
      first_name: null,
      last_name: null,
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
            title: "Public Forum",
          },
          nep: {
            title: "खुला बहस",
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions(["postForum"]),
    forumSubmit() {
      if (this.$refs.form.validate()) {

          let forumdata = {
            title: this.title,
            content: this.content,
            images: this.images,
          };
          this.$store.dispatch("postForum", forumdata);
        
      }
    },
  },
  computed: mapGetters(["logged","selectedLanguage"]),
  created() {
    if (secureStorage.getItem("userData")) {
      this.$store.state.user.loggedUser = JSON.parse(
        secureStorage.getItem("userData")
      );
    }
    this.$store.state.post.loading = true;
    setTimeout(() => {
      this.$store.state.post.loading = false;
    }, 1500);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
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
  @media only screen and (max-width:991px){
    padding: 20px;
  }
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
  padding: 15px 30px !important;
  border-radius: 0;
  box-shadow: none;
  margin-top: 10px !important;
  letter-spacing: 2px !important;
  font-weight: 400;
}
.loginfirst {
  display: block;
  padding: 10px;
  background: $secondary;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  color: $white;
  letter-spacing: 1.1px;
  width: 30%;
  margin: 0 auto;
}
.nep {
  h2 {
    font-family: $nepalifont !important;
    letter-spacing: 0;
  }
}
</style>