<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
    <v-container fluid>
      <v-row class="loginbox">
        <v-col md="5" class="authbox">
          <h2>{{title}}</h2>
          <div>
            <v-form ref="formotp" v-model="validTop" lazy-validation class="publicforum">
              <v-row>
             
                <v-col md="12" cols="12">
                  <v-text-field
                    v-model="otp"
                    :rules="[nameRules.required]"
                    label="OTP Code"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col md="12" cols="12">
                     <v-text-field
                    v-model="password"
                    :rules="[nameRules.required]"
                    label="Password"
                    required
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
                 <v-col md="12" class="forgetpassword subdomainlogin" cols="12">
                  <button @click="resendOTP">Resend OTP ?</button>
                </v-col>
                <v-col md="12" class="text-center">
                  <v-btn color="primary" @click="updatePassword">Set Password</v-btn>
                  <div class="registerlink">
                    Don't have an login ?
                    <router-link to="/register">Register</router-link>
                  </div>
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
import { secureStorage } from '../../../main';
import TitleBreadCrumb from "../../components/common/TitleBreadCrumb";
export default {
  name: "ForgetPassword",
  components: {
    TitleBreadCrumb,
  },
  data() {
    return {
      valid: true,
       show1: false,
      validTop: true,
      title: "Set Password",
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
            title: "Set Password",
          },
          nep: {
            title: "पासवर्ड सेट गर्नुहोस्",
          },
        },
      ],
      otp: "",
      password: "",
      nameRules: {
        required: (value) => !!value || "Required.",
      },
      options: ["abc@gmail.com", "bcd@gmail.com"],
    };
  },
  methods:{
    updatePassword(){
      let newPassword = {
        otp:this.otp,
        input:secureStorage.getItem("input"),
        password:this.password
      }
      this.$store.dispatch("forgetNewPassword",newPassword);
    },
    resendOTP(e){
      e.preventDefault();
      this.$store.dispatch("resendOTP");
    }
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
     @media only screen and (max-width:991px){
    padding: 20px 20px ;
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