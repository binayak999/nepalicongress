<template>
  <section class="loginWrap">
    <div class="centerBox">
      <h3 class="text-center">Committee Member Dash Login</h3>
      <v-form
        ref="formlogin"
        v-model="validTop"
        lazy-validation
        class="publicforum"
        v-if="displayform == 'login'"
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

          <v-col md="12" class="text-center custbtn" cols="12">
            <CustomButton
              @clickAction="login"
              text="Login"
              :loading="loading"
            />
          </v-col>
        </v-row>
      </v-form>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex/dist/vuex.common.js";
import CustomButton from "../CustomButton.vue";

export default {
  name: "CustomLogin",
  components: {
    CustomButton,
  },
  data() {
    return {
      input: "",
      password: "",
      show1: false,
      validTop: true,
      displayform: "login",
      loading: false,
      nameRules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    ...mapActions(["loginCommitteeUser"]),
    async login() {
      this.loading = true;
      await this.loginCommitteeUser({
        input: this.input,
        password: this.password,
      });
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.loginWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px;
  .centerBox {
    display: flex;
    align-items: center;
    width: 100%;
    flex-flow: column;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 40px 20px 20px;
    width: 40%;
  }
}
</style>