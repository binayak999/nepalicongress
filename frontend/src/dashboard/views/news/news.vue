<template>
  <CustomDateTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allEvents="this.allNews"
  />
</template>

<script>
import CustomDateTable from "../../components/common/CustomDateTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Congress Work",
  components: { CustomDateTable },
  data() {
    return {
      slug: "news",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Congress Work",
        },
      ],
      title: "Congress Work",
    };
  },
  methods: {
    ...mapActions(['fetchNews']),
  },
  computed: {
    ...mapGetters(['allNews']),
  },
  created() {
    this.fetchNews();
  },
};
</script>
