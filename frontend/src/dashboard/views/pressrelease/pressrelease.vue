<template>
  <CustomDateTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allEvents="this.allPressRelease"
  />
</template>

<script>
import CustomDateTable from "../../components/common/CustomDateTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PressRelease",
  components: { CustomDateTable },
  data() {
    return {
      slug: "pressrelease",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Press Release",
        },
      ],
      title: "Press Release",
    };
  },
  methods: {
    ...mapActions(['fetchPressRelease']),
  },
  computed: {
    ...mapGetters(['allPressRelease']),
  },
  created() {
    this.fetchPressRelease();
  },
};
</script>
