<template>
  <CustomDatePost :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import CustomDatePost from "../../components/common/CustomDatePost";

export default {
  name: "AddNews",
  components: { CustomDatePost },
  data() {
    return {
      fortitle: "news",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Congress Work",
        },
      ],
      title: "Add Congress Work",
    };
  },
};
</script>
