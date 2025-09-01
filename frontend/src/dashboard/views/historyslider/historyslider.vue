<template>
  <PostTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allPost="this.allDateHistory"
  />
</template>

<script>
import PostTable from "../../components/common/PostTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HistorySlider",
  components: { PostTable },
  data() {
    return {
      slug: "datehistory",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "History Slider",
        },
      ],
      title: "History Slider",
    };
  },
  methods: {
    ...mapActions(['fetchDateHistory']),
  },
  computed: {
    ...mapGetters(['allDateHistory']),
  },
  created() {
    this.fetchDateHistory();
  },
};
</script>
