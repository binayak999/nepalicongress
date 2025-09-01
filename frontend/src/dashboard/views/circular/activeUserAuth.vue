<template>
  <section>
    <v-container>
      <v-row>
        <v-col md="12">
          <h3 class="text-center">Active Member Dash Login</h3>
        </v-col>
        <v-col md="3"></v-col>
        <v-col md="6">
          <v-form
            ref="formlogin"
            v-model="validTop"
            lazy-validation
            class="publicforum"
            v-if="displayform=='login'"
          >
            <v-row>
              <v-col md="12" cols="12">
                <v-text-field
                  v-model="input"
                  :rules="[nameRules.required]"
                  label="Phone"
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

              <v-col md="12" class="forgetpassword" cols="6">
                <span @click="swtichForm('forget')">Forget Password ?</span>
              </v-col>
              <v-col md="12" class="text-center custbtn" cols="12">
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-form
            ref="formreset"
            v-model="validTop"
            lazy-validation
            class="publicforum"
            v-if="displayform=='forget'"
          >
            <v-row>
              <v-col md="12" cols="12">
                <v-text-field
                  v-model="input"
                  :rules="[nameRules.required]"
                  label="Phone Number"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col md="12" cols="12">
                <v-text-field
                  v-model="password"
                  :rules="[nameRules.required]"
                  label="Old Password"
                  required
                  outlined
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
              <v-col md="12" cols="12">
                <v-text-field
                  v-model="confirmpassword"
                  :rules="[nameRules.required]"
                  label="New Password"
                  required
                  outlined
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>

              <v-col md="12" class="forgetpassword" cols="6">
                <span @click="swtichForm('login')">Login ?</span>
              </v-col>
              <v-col md="12" class="text-center custbtn" cols="12">
                <v-btn color="primary" @click="forget">Reset Password</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col md="3"></v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "ActiveUserAuth",
  data() {
    return {
      show1: false,
      input: "",
      password: "",
      displayform: 'login',
      confirmpassword:'',
      nameRules: {
        required: (value) => !!value || "Required.",
      },
      validTop: true,
    };
  },
  methods: {
    login() {
      let auth = {
        input: this.input,
        password: this.password,
      };
      this.$store.dispatch("loginActiveUser", auth);
    },
    forget(){
      let auth = {
        input:this.input,
        password:this.password,
        confirmpassword:this.confirmpassword,
      }
      this.$store.dispatch("forgetPasswordActive",auth);
    },
    swtichForm(formof) {
      if (formof == "login") {
        this.displayform = "login";
      }else if (formof == "forget") {
        this.displayform = "forget";
      }if (formof == "verify") {
        this.displayform = "verify";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.loginbox {
  justify-content: center;
  padding: 50px 0 50px;
  // background: url('/img/bgpattern.jpg');

  h2 {
    text-align: center;
    padding: 20px 0;
    font-size: 16px;
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
.subdomainlogin {
  display: flex;
  justify-content: flex-start;
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
  h2 {
    background: $secondary;
    color: $midlightgray;
    background-position: center center;
    padding: 0;
  }
  .publicforum {
    padding: 20px 20px 40px;
  }
  footer {
    div {
      margin-top: 20px;
    }
  }
}
h2 {
  text-transform: uppercase;
  color: $dark;
  letter-spacing: 1.5px;
  font-size: 28px;

  margin-bottom: 20px;
}
.primary {
  background: $green !important;
  padding: 20px 40px !important;
  border-radius: 0;
  box-shadow: none;

  letter-spacing: 2px !important;
  font-weight: 400;
}

.custbtn .primary {
  padding: 25px 40px !important;
  font-size: 16px;
  &:hover {
    background: $secondary;
  }
}

.registerlink {
  font-size: 14px;
  margin-top: 30px;
  letter-spacing: 1px;
  a {
    color: $dark;
    font-weight: 500;
  }
}
.forgetpassword{
  span{
    cursor: pointer;
    font-size: 14px;
  }
}
</style>