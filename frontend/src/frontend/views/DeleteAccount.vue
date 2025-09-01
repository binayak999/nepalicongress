<template>
  <v-container>
    <div class="sectionDiv">
      <h1>Delete Account ?</h1>
      <p>
        Deleteing your account will delete all of your data and disconnects
        Nepali Congress from all devices. This action cannot be undone.
      </p>
      <v-btn class="danger" :loading="loading" @click="deleteAccountAction">
        <v-icon>mdi-delete</v-icon>
        Delete Account
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex/dist/vuex.common.js';
import { secureStorage } from '../../main';

export default {
  name: "DeleteAccount",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions(["deleteUser"]),
    async deleteAccountAction() {
      if (confirm("Are you sure you want to delete your account?")) {
        this.loading = true;
        await this.deleteUser();
        this.$store.dispatch("logoutUser");
        this.loading = false;
      }
    },
  },
  created() {
    if (secureStorage.getItem("userData")) {
      this.$store.state.user.loggedUser = JSON.parse(
        secureStorage.getItem("userData")
      );
    }else{
      this.$router.push('/login').catch(error=>console.log(error,"Your are not subdomain or admin !"));
    }
  },
};
</script>

<style lang="scss" scoped>
.danger {
  background-color: red !important;
  color: white;
}
.sectionDiv {
  margin: 20px 40px;
}
</style>