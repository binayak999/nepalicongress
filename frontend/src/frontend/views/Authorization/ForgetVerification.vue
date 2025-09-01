<template>
  <section>
    <TitleBreadCrumb :breadcrumbs="breadcrumbs" :language="selectedLanguage.title" />
    <v-container fluid>
      <v-row class="loginbox">
        <v-col md="4" class="authbox">
          <h2>{{title}}</h2>
          <div>
            <v-form ref="form" v-model="valid" lazy-validation class="publicforum">
              <v-row>
                <v-col md="12" cols="12">
                  <v-text-field
                    v-model="input"
                    :rules="[nameRules.required]"
                    label="Email Or Phone"
                    required
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col md="12" class="text-center custbtn">
                  <v-btn color="primary" @click="forgetPassword">Forget Password</v-btn>
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
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
import {mapGetters} from 'vuex';
export default {
  name: "ForgetVerification",
  components: {
    TitleBreadCrumb,
  },
  data() {
    return {
      valid: true,
      title: "Forget Password",
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
            title: "Forget Password",
          },
          nep: {
            title: "पासवर्ड बिर्सनुहोस्",
          },
        },
      ],
      input: "",
      nameRules: {
        required: (value) => !!value || "Required.",
      },
      options: ["abc@gmail.com", "bcd@gmail.com"],
    };
  },
  computed:{
    ...mapGetters(['selectedLanguage'])
  },
  methods: {
    forgetPassword() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("forgetPassword",this.input);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.loginbox {
  justify-content: center;
  padding: 100px 0 100px;
  h2 {
    text-align: center;
    padding: 20px 0;
  }
}
.forgetpassword {
  display: flex;
  justify-content: flex-end;
  a {
    font-size: 14px;
    text-align: right;
    color: $dark;
  }
}
.authbox {
  border: 1px solid $midwhite;
  background: white;
  padding: 0;
  box-shadow: 0px 1px 20px #c4c4c4;
  @media only screen and (max-width: 991px) {
    padding: 20px 20px;
  }
  h2{
    background: $secondary;
    color: $midlightgray;
    background-position: center center;
  }
 .publicforum{
    padding: 20px 90px 40px;
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
  font-size: 28px;
  margin-bottom: 20px;
}
.primary {
  background: $secondary !important;
  padding: 20px 40px !important;
  border-radius: 0;
  box-shadow: none;
  margin-top: 10px !important;
  letter-spacing: 2px !important;
  font-weight: 400;
}

.custbtn .primary{
  padding: 30px 30px !important;
  font-size: 18px;
  &:hover{
    background: $secondary;
  }
}

.registerlink {
  font-size: 14px;
  margin-top: 30px;
  letter-spacing: 1px;
  a {
    color: $dark;
    font-weight: 600;
  }
}
</style>