<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="formbox">
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
             
            </v-row>
            
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Add Category</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
export default {
  name: "AddCategory",
  components: { TitleBreadCrumb },
  data() {
    return {
      valid: true,
      title: "Add Category",
      language: false,

      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Category",
        },
      ],
      engTitle: null,
      nepTitle: null,
      engTitleRules: {
        required: (value) => !!value || "Required.",
      },
   
      nepTitleRules: {
        required: (value) => !!value || "Required.",
      },

    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        let addCategory = {
          eng:{
            title:this.engTitle
          },
          nep:{
            title:this.nepTitle
          }
        }
        this.$store.dispatch("postCategory",addCategory);
      }
      
    },
    languageswitch(lang) {
      if (lang === "eng") {
        this.language = true;
      } else {
        this.language = false;
      }
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
.container{
  max-width: 100%;
}
</style>