<template>
  <CustomDatePostUpdate :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import CustomDatePostUpdate from "../../components/common/CustomDatePostUpdate";

export default {
  name: "EditPostCustomDate",
  components: { CustomDatePostUpdate },
  data() {
    return {
      fortitle: "events",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Update",
        },
      ],
      title: "Update",
    };
  },
};
</script>
