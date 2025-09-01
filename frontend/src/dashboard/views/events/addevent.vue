<template>
  <CustomDatePost :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import CustomDatePost from "../../components/common/CustomDatePost";

export default {
  name: "AddEvent",
  components: { CustomDatePost },
  data() {
    return {
      fortitle: "events",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Event",
        },
      ],
      title: "Add Event",
    };
  },
};
</script>
