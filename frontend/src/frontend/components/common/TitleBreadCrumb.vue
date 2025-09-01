<template>
  <section>
    <div v-if="language === 'English'">
      <h5>{{ breadcrumbs[breadcrumbs.length - 1].eng.title }}</h5>
      <ul class="breadcrumb">
        <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <router-link :to="breadcrumb.slug" v-if="breadcrumb.slug">{{
            breadcrumb.eng.title
          }}</router-link>

          <span v-if="breadcrumb.slug == undefined && index != 2">{{
            breadcrumb.eng.title.length > 50
              ? breadcrumb.eng.title.slice(0, 50) + " [...]"
              : breadcrumb.eng.title
          }}</span>
        </li>
      </ul>
    </div>
    <div
      v-if="language !== 'English'"
      v-bind:class="{ nep: language !== 'English' }"
    >
      <h5>{{ breadcrumbs[breadcrumbs.length - 1].nep.title }}</h5>
      <ul class="breadcrumb">
        <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <router-link :to="breadcrumb.slug" v-if="breadcrumb.slug">{{
            breadcrumb.nep.title
          }}</router-link>
          <span v-if="breadcrumb.slug == undefined && index != 2">{{
            breadcrumb.nep.title.length > 50
              ? breadcrumb.nep.title.slice(0, 50) + " [...]"
              : breadcrumb.nep.title
          }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "TitleBreadCrumb",
  props: ["title", "breadcrumbs", "language"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
section {
  background: $white;
  padding: 30px 50px;
  border-bottom: 2px solid #00000024;
  box-shadow: 0px 1px 20px #00000040;
  @media only screen and (max-width: 991px) {
    padding: 30px 15px;
  }
  h5 {
    font-size: 20px;
    margin-bottom: 8px;
    letter-spacing: 1.3px;
    text-align: center;
  }
  .breadcrumb {
    display: flex;
    font-size: 14px;
    list-style: none;
    padding-left: 0;
    flex-wrap: wrap;
    justify-content: center;
    li {
      position: relative;
      padding-right: 30px;
      letter-spacing: 1.2px;
      &::after {
        content: "\f101";
        font-family: "Fontawesome";
        right: 10px;
        position: absolute;
      }
      &:last-of-type,
      &:nth-last-of-type(2) {
        padding-right: 0;
        &::after {
          display: none;
        }
      }

      a {
        text-decoration: none;
        color: $text;
      }
    }
  }
}
.nep {
  h5 {
    letter-spacing: 0;
    font-family: $nepalifont;
  }
  .breadcrumb {
    li {
      letter-spacing: 0;
      font-family: $nepalifont;
    }
  }
}
</style>
