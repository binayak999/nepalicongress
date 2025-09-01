<template>
  <section class="alertsection" v-if="allAlerts.status">
    <div class="background-white">
      <div>
        <sweetalert-icon :icon="allAlerts.icon" />
        <h1>{{allAlerts.title}}</h1>
        <h3>{{allAlerts.subtitle}}</h3>
        <p>{{allAlerts.message}}</p>
      </div>
    </div>
  </section>
</template>
<script>
import {  mapGetters } from "vuex";
export default {
  name: "AlertNotification",
  props: ["info"],
  computed: mapGetters(["allAlerts"]),
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.alertsection {
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999999;
  display: flex;
  align-items: center;
  justify-content: center;
  .background {
    &-white {
      position: absolute;
      background: $white;
      z-index: 9999;
      width: 35%;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column;
      min-width: 380px;
      h1 {
        font-family: $mon;
        font-weight: 500;
        text-transform: uppercase;
        font-size: 20px;
        letter-spacing: 1px;
        text-align: center;
        color: $dark;
      }
      h3 {
        font-family: $mon;
        font-weight: 500;
        font-size: 16px;
        letter-spacing: 1px;
        text-align: center;
        color: $text;
        margin-bottom: 10px;
        margin-top: 15px;

      }
      p {
        text-align: center;
        color: $ligtgray;
        font-size: 16px;
      }
    }
  }
}
</style>