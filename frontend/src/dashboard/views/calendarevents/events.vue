<template>
  <CustomDateTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allEvents="this.allCalendarEvent"
  />
</template>

<script>
import CustomDateTable from "../../components/common/CustomDateTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CalendarEvents",
  components: { CustomDateTable },
  data() {
    return {
      slug: "addcalendarevent",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Calendar Events",
        },
      ],
      title: "Calendar Events",
    };
  },
  methods: {
    ...mapActions(['fetchCalendarEvent']),
  },
  computed: {
    ...mapGetters(['allCalendarEvent']),
  },
  created() {
    this.fetchCalendarEvent();
  },
};
</script>
