<template>
  <section>
    <TitleBreadCrumb :title="title" :breadcrumbs="breadcrumbs" />
  </section>
</template>

<script>
import TitleBreadCrumb from "@/dashboard/components/common/TitleBreadCrumb";
export default {
  name: "OnlineMemberPayment",
  components: {
    TitleBreadCrumb,
  },
  data: () => {
    return {
      title: "Online Member Payment",
      breadcrumbs: [
        {
          title: "Dashboard",
          slug: "/dashboard",
        },
        {
          title: "Online Member Payment",
        },
      ],
    };
  },
};
</script>

<style>
</style>