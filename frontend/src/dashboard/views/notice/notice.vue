<template>
  <CustomDateTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allEvents="this.allNotice"
  />
</template>

<script>
import CustomDateTable from "../../components/common/CustomDateTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Notice",
  components: { CustomDateTable },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Notice",
        },
      ],
      title: "Notice",
    };
  },
  methods: {
    ...mapActions(['fetchNotice']),
  },
  computed: {
    ...mapGetters(['allNotice']),
  },
  created() {
    this.fetchNotice();
  },
};
</script>
