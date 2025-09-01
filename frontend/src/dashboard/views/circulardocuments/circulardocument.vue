<template>

  <PostTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allPost="this.allCircularDocuments"
  />

</template>

<script>
import PostTable from "../../components/common/PostTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "CircularDocuments",
  components: { PostTable },
  data() {
    return {
      slug: "circulars",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Circulars",
        },
      ],
      title: "Circulars",
    };
  },
  methods: {
    ...mapActions(['fetchCircularDocument']),
  },
  computed: {
    ...mapGetters(['allCircularDocuments']),
  },
  created() {
    this.fetchCircularDocument();
  },
};
</script>
