<template>
  <section v-bind:class="{nep:selectedLanguage.title === 'Nepali'}">
    <TitleBreadCrumb :breadcrumbs="breadcrumbs" :language="selectedLanguage.title" />
    <v-container fluid>
      <v-row class="loginbox">
        <v-col md="9" class="authbox">
          <h2
            v-if="selectedLanguage.title === 'English'"
          >{{breadcrumbs[breadcrumbs.length-1].eng.title}}</h2>
          <h2
            v-if="selectedLanguage.title !== 'English'"
          >{{breadcrumbs[breadcrumbs.length-1].nep.title}}</h2>
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
              class="lettertoleader"
              v-if="logged != undefined"
            >
              <v-row>
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
                  <v-select
                    v-model="select"
                    :items="items"
                    label="Leader Select"
                    dense
                    item-text="name"
                    item-value="email"
                    outlined
                    class="selectleader"
                  ></v-select>
                </v-col>
                <v-col md="12" cols="12">
                  <ckeditor
                    :editor="editor"
                    v-model="content"
                    :config="editorConfig"
                    class="texteditorheight"
                  ></ckeditor>
                </v-col>

                <v-col md="12" cols="12">
                  <footer>
                    <v-btn color="primary" @click="forumSubmit">Send</v-btn>
                  </footer>
                </v-col>
                <v-col md="12" class="alertsform" v-if="alertstatus" cols="12">
                  <v-alert :type="actions">{{alertmessage}}</v-alert>
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
  name: "Lettertoleader",
  components: {
    TitleBreadCrumb,
  },
  data() {
    return {
      valid: false,
      validTop: true,
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
            title: "Letter to leader",
          },
          nep: {
            title: "नेतृत्वलाई पत्र",
          },
        },
      ],
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
      title: "",
      content: "",
      nameRules: {
        required: (value) => !!value || "Required.",
      },
      options: ["abc@gmail.com", "bcd@gmail.com"],
      select: null,
      items: [],
      alertstatus: false,
      actions: "success",
      alertmessage: "Thank you for the message, We will reply you back soon !",
    };
  },
  methods: {
    ...mapActions(["getLeaders"]),
    forumSubmit() {
      if (this.content != "") {
        if (this.$refs.form.validate()) {
          let forumdata = {
            title: this.title,
            content: this.content,
            email: this.select,
          };
          console.log(forumdata);
          this.successmethond();
          this.$store.dispatch("postLetter", forumdata);
        } else {
          this.errorMethod();
        }
      } else {
        this.errorMethod();
      }
    },
    errorMethod() {
      this.alertstatus = true;
      (this.actions = "error"),
        (this.alertmessage =
          "Please fill enter the content that you want to send first !");
      setTimeout(() => {
        this.alertstatus = false;
      }, 3000);
    },
    successmethond() {
      this.alertstatus = true;
      (this.actions = "success"),
        (this.alertmessage =
          "Thank you for the message, We will reply you back soon !");
      setTimeout(() => {
        this.alertstatus = false;
      }, 3000);
    },
  },
  computed: mapGetters(["logged", "selectedLanguage", "allLeaders"]),
  created() {
    if (secureStorage.getItem("userData")) {
      this.$store.state.user.loggedUser = JSON.parse(
        secureStorage.getItem("userData")
      );
      this.getLeaders();
    setTimeout(() => {
      this.select = this.allLeaders[0].email;
      this.allLeaders.forEach((element) => {
        this.items.push({ name: element.eng.title, email: element.email });
      });
    }, 1000);
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
.nep {
  h2 {
    font-family: $nepalifont !important;
    letter-spacing: 0;
  }
}
</style>