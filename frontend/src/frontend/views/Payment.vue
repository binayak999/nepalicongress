<template>
  <section>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="onlineMember">
            <h1>Online Membership</h1>
            <p class="mt-3">
              {{ allOnlineMember }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PaymentMember",
  methods: {
    ...mapActions(["verifyOnlineMember"]),
  },
  computed: {
    ...mapGetters(["allOnlineMember"]),
  },
  async created() {
    await this.verifyOnlineMember({
      pidx: this.$route.query.pidx,
    });
  },
};
</script>

<style lang="scss" scoped>
.onlineMember {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 50%;
  margin: 0 auto;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.2);
}
</style>