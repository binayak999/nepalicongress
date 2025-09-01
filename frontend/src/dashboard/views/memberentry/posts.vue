<template>
  <PostTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allPost="this.allPost"
  />
</template>

<script>
import PostTable from "../../components/common/PostTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Posts",
  components: { PostTable },
  data() {
    return {
      slug: "posts",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Posts",
        },
      ],
      title: "Posts",
    };
  },
  methods: {
    ...mapActions(['fetchPosts']),
  },
  computed: {
    ...mapGetters(['allPost']),
  },
  created() {
    this.fetchPosts();
  },
};
</script>
