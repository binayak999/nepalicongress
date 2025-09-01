<template>
  <Post :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import Post from "../../components/common/Post";

export default {
  name: "AddPopPosts",
  components: { Post },
  data() {
    return {
      fortitle: "popposts",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Poppost",
        },
      ],
      title: "Add Poppost",
    };
  },
};
</script>
