<template>
  <PostUpdate :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import PostUpdate from "../../components/common/PostUpdate";

export default {
  name: "EditPost",
  components: { PostUpdate },
  data() {
    return {
      fortitle: "posts",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Update",
        },
      ],
      title: "Update",
    };
  },
};
</script>
