<template>
  <CustomDateTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allEvents="this.allEvents"
  />
</template>

<script>
import CustomDateTable from "../../components/common/CustomDateTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Events",
  components: { CustomDateTable },
  data() {
    return {
      slug: "addevent",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Events",
        },
      ],
      title: "Events",
    };
  },
  methods: {
    ...mapActions(['fetchEvents']),
  },
  computed: {
    ...mapGetters(['allEvents']),
  },
  created() {
    this.fetchEvents();
  },
};
</script>
