<template>
  <CustomDatePost :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import CustomDatePost from "../../components/common/CustomDatePost";

export default {
  name: "AddHistory",
  components: { CustomDatePost },
  data() {
    return {
      fortitle: "history",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add History",
        },
      ],
      title: "Add History",
    };
  },
};
</script>
