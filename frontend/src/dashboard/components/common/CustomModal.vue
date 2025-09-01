<template>
  <section :class="!show ? 'hide' : ''">
    <div class="bodyPopup">
      <header>
        <ul>
          <li><slot name="title"></slot></li>
          <li><i class="fa fa-close" @click="closePopup"></i></li>
        </ul>
      </header>
      <main>
        <slot name="body"></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </section>
</template>

<script>
export default {
  name: "CustomModal",
  props: ["show"],
  methods: {
    closePopup() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: block;
  z-index: 1000;
  visibility: visible;
  opacity: 1;
  transition: all 0.3s;
  overflow-y: scroll;
  padding: 100px;
}
section.hide {
  visibility: hidden;
  opacity: 0;
}
section header {
  background-color: #fff;
  padding: 20px 40px 0 30px;
  border-radius: 0.5rem 0.5rem 0 0;
  display: flex;
  justify-content: flex-end;
  i {
    cursor: pointer;
  }
  h1{
    font-size: 26px;
  }
}
section main {
  background-color: #fff;
  padding: 1rem;
}
section footer {
  background-color: #fff;
  padding: 1rem;
  border-radius: 0 0 0.5rem 0.5rem;
}
.bodyPopup {
  // width: 500px;
  width: 100%;
  position: relative;
}
ul{
    width: 100%;
    list-style: none;
    display: flex;
    align-items: center;
    padding-left: 0;
    justify-content: space-between;
}
</style>