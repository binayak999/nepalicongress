<template>
  <Post :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import Post from "../../components/common/Post";

export default {
  name: "AddPost",
  components: { Post },
  data() {
    return {
      fortitle: "posts",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Post",
        },
      ],
      title: "Add Post",
    };
  },
};
</script>
