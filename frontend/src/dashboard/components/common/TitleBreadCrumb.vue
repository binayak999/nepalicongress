<template>
  <nav 
    aria-label="Breadcrumb navigation" 
    class="breadcrumb-nav"
  >
    <!-- Title -->
    <h1>{{ title }}</h1>

    <!-- Breadcrumbs -->
    <ol>
      <li 
        v-for="(breadcrumb, index) in breadcrumbs" 
        :key="index"
        :class="{ 'is-last': index === breadcrumbs.length - 1 }"
      >
        <router-link 
          v-if="breadcrumb.slug"
          :to="breadcrumb.slug"
          :aria-current="index === breadcrumbs.length - 1 ? 'page' : undefined"
        >
          {{ breadcrumb.title }}
        </router-link>
        <span v-else>{{ breadcrumb.title }}</span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "TitleBreadCrumb",
  props: {
    title: {
      type: String,
      required: true
    },
    breadcrumbs: {
      type: Array,
      required: true,
      validator: function(value) {
        return value.every(item => 
          typeof item.title === 'string' && 
          (item.slug === undefined || typeof item.slug === 'string')
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.breadcrumb-nav {
  background: $midlightgray;
  padding: 1.25rem;

  h1 {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }

  ol {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0.625rem 0 0;
    
    li {
      display: flex;
      align-items: center;
      font-size: 0.8125rem;
      margin-right: 1.875rem;
      position: relative;

      &:not(.is-last)::after {
        content: "\f101";
        font-family: "Fontawesome";
        position: absolute;
        right: -1.25rem;
        color: rgba(0, 0, 0, 0.5);
      }

      a {
        text-decoration: none;
        color: $dark;
        transition: color 0.2s ease;

        &:hover {
          color: rgba($dark, 0.7);
        }
      }
    }
  }
}
</style>