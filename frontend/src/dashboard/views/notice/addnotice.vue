<template>
  <CustomDatePost :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import CustomDatePost from "../../components/common/CustomDatePost";

export default {
  name: "AddNotice",
  components: { CustomDatePost },
  data() {
    return {
      fortitle: "notice",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Manifesto",
        },
      ],
      title: "Add Manifesto",
    };
  },
};
</script>
