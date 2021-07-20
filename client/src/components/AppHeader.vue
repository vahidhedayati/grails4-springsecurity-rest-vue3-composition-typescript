<template id="app-header-template">
  <div class="container">
    <div class="jumbotron">
      <Home />
    </div>
  </div>
</template>

  <script lang="ts">
import { defineComponent } from "vue";
import Home from "./Home.vue";
export default defineComponent({
  name: "app-header",
  props: {
    headerImage: { default: "logo" },
    headerText: {
      default: "Welcome to the Garage",
    },
  },
  components: {
    Home,
  },
});
</script>

<style>
</style>
