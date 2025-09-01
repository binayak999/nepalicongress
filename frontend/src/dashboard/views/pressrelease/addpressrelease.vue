<template>
  <CustomDatePost :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import CustomDatePost from "../../components/common/CustomDatePost";

export default {
  name: "AddRules",
  components: { CustomDatePost },
  data() {
    return {
      fortitle: "press-release",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Press Release",
        },
      ],
      title: "Add Press Release",
    };
  },
};
</script>
