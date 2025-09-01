<template>
  <PostTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allPost="this.allOnlineLibrary"
  />
</template>

<script>
import PostTable from "../../components/common/PostTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "OnlineLibrary",
  components: { PostTable },
  data() {
    return {
      slug: "online-library",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Online Library",
        },
      ],
      title: "Online Library",
    };
  },
  methods: {
    ...mapActions(['fetchOnlineLibrary']),
  },
  computed: {
    ...mapGetters(['allOnlineLibrary']),
  },
  created() {
    this.fetchOnlineLibrary();
  },
};
</script>
