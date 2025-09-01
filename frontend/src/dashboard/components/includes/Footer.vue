<template>
  <section>
    <v-container>
      <v-row>
        <v-col class="text-center">
          Copyright
          <i class="fa fa-copyright"></i>
          {{date}} Nepali Congress
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
section {
  background: $midlightgray;
  @include commontext;
}
</style>