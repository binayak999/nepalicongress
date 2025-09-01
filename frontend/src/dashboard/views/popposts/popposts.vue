<template>
  <PostTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allPost="this.allPopposts"
  />
</template>

<script>
import PostTable from "../../components/common/PostTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Popposts",
  components: { PostTable },
  data() {
    return {
      slug: "popposts",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Popposts",
        },
      ],
      title: "Popposts",
    };
  },
  methods: {
    ...mapActions(['fetchPopPost']),
  },
  computed: {
    ...mapGetters(['allPopposts']),
  },
  created() {
    this.fetchPopPost();
  },
};
</script>
