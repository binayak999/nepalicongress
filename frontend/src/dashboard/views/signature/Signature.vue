<template>
  <section>
    <v-container>
      <div>
        <v-progress-linear
          v-if="loading"
          indeterminate
          color="primary"
        ></v-progress-linear>
      </div>
      <v-row v-if="!loading">
        <v-simple-table class="tableSignature" border>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Province</th>
                <th class="text-left">District</th>
                <th class="text-left">Signature</th>
                <th class="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in signatures" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.province }}</td>
                <td>{{ item.district }}</td>
                <td>
                  <img
                    :src="item.image"
                    alt="signature"
                    width="100"
                    height="100"
                  />
                </td>
                <td>
                  <v-btn
                    color="error"
                    @click="() => deleteSignatureAction(item._id)"
                    :loading="deleteLoading && item._id === id"
                  >
                    <v-icon> mdi-delete </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Signature",
  data: () => ({
    signatures: [],
    deleteLoading: false,
    id: undefined,
    loading: true,
  }),
  methods: {
    ...mapActions(["getSignatures", "deleteSignature"]),
    async deleteSignatureAction(id) {
      if (confirm("Are you sure you want to delete this signature?")) {
        this.id = id;
        this.deleteLoading = true;
        await this.deleteSignature(id);
        this.signatures = this.allSignatures;
        alert("Signature deleted successfully");
        this.id = undefined;
        this.deleteLoading = false;
      }
    },
  },
  computed: {
    ...mapGetters(["allSignatures"]),
  },
  async created() {
    await this.getSignatures();
    this.signatures = this.allSignatures;
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.tableSignature {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
}
</style>