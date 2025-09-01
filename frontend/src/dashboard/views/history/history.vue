<template>
  <CustomDateTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allEvents="this.allHistory"
  />
</template>

<script>
import CustomDateTable from "../../components/common/CustomDateTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "History",
  components: { CustomDateTable },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "History",
        },
      ],
      title: "History",
    };
  },
  methods: {
    ...mapActions(['fetchHistory']),
  },
  computed: {
    ...mapGetters(['allHistory']),
  },
  created() {
    this.fetchHistory();
  },
};
</script>
