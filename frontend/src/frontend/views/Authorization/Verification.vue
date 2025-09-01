<template>
  <section>
 <TitleBreadCrumb :breadcrumbs="breadcrumbs" :language="selectedLanguage.title" />
    <v-container fluid>
      <v-row class="loginbox">
        <v-col md="5" class="authbox">
          <h2>{{title}}</h2>
          <div>
            <v-form ref="form" v-model="validTop" lazy-validation>
              <v-row>
                <v-col md="12">
                  
                  <v-text-field 
                    v-model="input"
                    :rules="[nameRules.required]"
                    label="Email Or Phone"
                    required
                    outlined
                    v-if="inputed==null"
                  ></v-text-field>
                </v-col>
                <v-col md="12">
                  <v-text-field
                    v-model="otp"
                    :rules="[nameRules.required]"
                    label="Enter your otp code"
                    required
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col md="12" class="text-center">
                  <v-btn color="primary" @click="verifybutton">Verify</v-btn>
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
import {mapGetters,mapActions} from 'vuex';
import { secureStorage } from '../../../main';
export default {
  name: "Verification",
  components: {
    TitleBreadCrumb,
  },
  data() {
    return {
      valid: true,
      validTop: true,
      title: "Verification",

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
            title: "VERIFICATION",
          },
          nep: {
            title: "प्रमाणीकरण",
          },
        },
      ],
      inputed: secureStorage.getItem('input'),
      input: "",
      otp: "",
      nameRules: {
        required: (value) => !!value || "Required.",
      },
      options: ["abc@gmail.com", "bcd@gmail.com"],
    };
  },
  methods: {
    ...mapActions(['verifyOtp']),
    verifybutton() {
      if (this.$refs.form.validate()) {
        let verifyform = {
          input: this.inputed != undefined? this.inputed : this.input ,
          otp: this.otp,
        };
        this.$store.dispatch('verifyOtp',verifyform);
       
      }
    },
  },
  computed:{
    ...mapGetters(['selectedLanguage'])
  }
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
  padding: 20px 40px !important;
  border-radius: 0;
  box-shadow: none;
  margin-top: 10px !important;
  letter-spacing: 2px !important;
  font-weight: 400;
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