<template>
  <CustomDateTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allEvents="this.allRulesandRegulation"
  />
</template>

<script>
import CustomDateTable from "../../components/common/CustomDateTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "RulesAndRegulation",
  components: { CustomDateTable },
  data() {
    return {
      slug: "rulesandregulation",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Rules And Regulations",
        },
      ],
      title: "Rules And Regulations",
    };
  },
  methods: {
    ...mapActions(['fetchRulesNregulation']),
  },
  computed: {
    ...mapGetters(['allRulesandRegulation']),
  },
  created() {
    this.fetchRulesNregulation();
  },
};
</script>
