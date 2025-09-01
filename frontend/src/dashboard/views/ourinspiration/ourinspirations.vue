<template>
  <PostTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allPost="this.allOurInspiration"
  />
</template>

<script>
import PostTable from "../../components/common/PostTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Our Inspirations",
  components: { PostTable },
  data() {
    return {
      slug: "our-inspiration",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Our Inspirations",
        },
      ],
      title: "Our Inspirations",
    };
  },
  methods: {
    ...mapActions(['fetchInspiration']),
  },
  computed: {
    ...mapGetters(['allOurInspiration']),
  },
  created() {
    this.fetchInspiration();
  }, 
};
</script>
