<template>
  <PostTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allPost="this.allDocuments"
  />
</template>

<script>
import PostTable from "../../components/common/PostTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Documents",
  components: { PostTable },
  data() {
    return {
      slug: "documents",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Documents",
        },
      ],
      title: "Documents",
    };
  },
  methods: {
    ...mapActions(['fetchDocument']),
  },
  computed: {
    ...mapGetters(['allDocuments']),
  },
  created() {
    this.fetchDocument();
  },
};
</script>
