<template>
  <Post :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import Post from "../../components/common/Post";

export default {
  name: "AddDateHistory",
  components: { Post },
  data() {
    return {
      fortitle: "datehistory",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add History Slider",
        },
      ],
      title: "Add History Slider",
    };
  },
};
</script>
