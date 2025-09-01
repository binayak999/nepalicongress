<template>
  <Post :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import Post from "../../components/common/Post";

export default {
  name: "AddPartyConsititution",
  components: { Post },
  data() {
    return {
      fortitle: "party-constitution",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Party Consititution",
        },
      ],
      title: "Add Party Consititution",
    };
  },
};
</script>
