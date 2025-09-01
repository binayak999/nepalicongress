<template>
  <Post :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import Post from "../../components/common/Post";

export default {
  name: "AddOurInspiration",
  components: { Post },
  data() {
    return {
      fortitle: "our-inspiration",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Inspiration",
        },
      ],
      title: "Add Inspiration",
    };
  },
};
</script>
