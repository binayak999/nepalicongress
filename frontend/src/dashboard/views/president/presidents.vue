<template>
  <PostTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allPost="this.allPresident"
  />
</template>

<script>
import PostTable from "../../components/common/PostTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "President",
  components: { PostTable },
  data() {
    return {
      slug: "president",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "President",
        },
      ],
      title: "President",
    };
  },
  methods: {
    ...mapActions(['fetchPresident']),
  },
  computed: {
    ...mapGetters(['allPresident']),
  },
  created() {
    this.fetchPresident();
  },
};
</script>
