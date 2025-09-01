<template>
  <Post :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import Post from "../../components/common/Post";

export default {
  name: "AddCircularDocument",
  components: { Post },
  data() {
    return {
      fortitle: "circulars",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Circular",
        },
      ],
      title: "Add Circular",
    };
  },
};
</script>
