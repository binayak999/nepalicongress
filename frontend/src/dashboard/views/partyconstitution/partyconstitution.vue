<template>
  <PostTable
    :breadcrumbs="this.breadcrumbs"
    :title="this.title"
    :allPost="this.allPartyConstitution"
  />
</template>

<script>
import PostTable from "../../components/common/PostTable";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PartyConstitution",
  components: { PostTable },
  data() {
    return {
      slug: "party-constitution",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Party Constitutions",
        },
      ],
      title: "Party Constitutions",
    };
  },
  methods: {
    ...mapActions(['fetchPartyConstitution']),
  },
  computed: {
    ...mapGetters(['allPartyConstitution']),
  },
  created() {
    this.fetchPartyConstitution();
  },
};
</script>
