<template>
  <section>
    <button type="button" @click="action" v-if="!loading" class="customButton">
      {{ text }}
    </button>
    <button type="button" disabled v-if="loading" class="customButton">
      <v-progress-circular
        color="white"
        indeterminate
        size="20"
        width="2"
      ></v-progress-circular>
    </button>
  </section>
</template>

<script>
export default {
  name: "CustomButton",
  props:{
    text: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    action() {
      this.$emit("clickAction");
    },
  },
};
</script>

<style lang="scss" scoped>
.customButton {
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px 20px;
  width: 150px;
  text-align: center;
  text-decoration: none;
  &:hover {
    background-color: #45a049;
  }
}
</style>