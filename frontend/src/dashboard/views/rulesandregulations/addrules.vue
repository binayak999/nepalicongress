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
      fortitle: "rules-and-regulations",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Rules and Regulations",
        },
      ],
      title: "Add Rules and Regulations",
    };
  },
};
</script>
