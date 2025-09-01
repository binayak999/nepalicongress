<template>
  <Post :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import Post from "../../components/common/Post";

export default {
  name: "AddPresident",
  components: { Post },
  data() {
    return {
      fortitle: "president",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add President",
        },
      ],
      title: "Add President",
    };
  },
};
</script>
