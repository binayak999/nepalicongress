<template>
  <Post :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import Post from "../../components/common/Post";

export default {
  name: "AddOnlineLibrary",
  components: { Post },
  data() {
    return {
      fortitle: "online-library",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Online Library",
        },
      ],
      title: "Add Online Library",
    };
  },
};
</script>
