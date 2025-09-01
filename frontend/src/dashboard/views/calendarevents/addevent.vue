<template>
  <CustomDatePost :fortitle="this.fortitle" :breadcrumbs="this.breadcrumbs" :title="this.title" />
</template>

<script>
import CustomDatePost from "../../components/common/CustomDatePost";

export default {
  name: "AddCalendarEvent",
  components: { CustomDatePost },
  data() {
    return {
      fortitle: "calendar-events",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Add Calendar Event",
        },
      ],
      title: "Add Calendar Event",
    };
  },
};
</script>
