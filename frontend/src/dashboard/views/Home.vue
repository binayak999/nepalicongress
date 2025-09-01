<template>
  <div class="home">
    <v-container v-if="logged != 'activeviewer'">
      <v-row v-if="loading">
        <v-col class="numberbox" md="3" v-for="(data, index) in 8" :key="index">
          <v-skeleton-loader type="text" width="100%" height="150px" />
        </v-col>
      </v-row>
      <v-row v-if="!loading">
        <v-col
          class="numberbox"
          md="3"
          v-for="(data, index) in allDasboard"
          :key="index"
        >
          <div>
            <h2>{{ data.count }}</h2>
            <span>{{ data.name }}</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data: () => ({
    title: "Home",
    loading: true,
  }),

  computed: {
    ...mapGetters(["allDasboard"]),
  },

  methods: {
    ...mapActions(["getDashboard"]),
  },
  async created() {
    await this.getDashboard();
    this.loading = false;
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.home {
  .numberbox {
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      @include commontext;
      display: flex;
      justify-content: center;
      flex-flow: column;
      align-content: center;
      text-align: center;
      box-shadow: 0 1px 10px rgba(108, 108, 108, 0.2);
      line-height: 50px;
      padding: 20px;
      width: 100%;
      border-radius: 10px;
      span {
        font-size: 16px;
        letter-spacing: normal;
      }
      h2 {
        text-align: center;
        font-size: 38px;
        letter-spacing: normal;
      }
    }
  }
  .tableborder {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  h3 {
    letter-spacing: 1.3px;
    font-weight: 400;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    background: $primary;
    color: $white;
    font-size: 16px;
  }
}
</style>