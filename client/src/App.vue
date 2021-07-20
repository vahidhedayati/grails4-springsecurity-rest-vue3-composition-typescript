<template>
  <app-header></app-header>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import AppHeader from "./components/AppHeader.vue";
import store from "./store";
export default defineComponent({
  components: {
    AppHeader,
  },
  setup() {
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    return {
      isAuthenticated,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
