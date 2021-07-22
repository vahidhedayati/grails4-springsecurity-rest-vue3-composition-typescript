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

.errors,
.message {
  font-size: 0.8em;
  line-height: 2;
  margin: 1em 2em;
  padding: 0.25em;
}

.message {
  background: #f3f3ff;
  border: 1px solid #b2d1ff;
  color: #006dba;
  -moz-box-shadow: 0 0 0.25em #b2d1ff;
  -webkit-box-shadow: 0 0 0.25em #b2d1ff;
  box-shadow: 0 0 0.25em #b2d1ff;
}

.errors {
  background: #fff3f3;
  border: 1px solid #ffaaaa;
  color: #cc0000;
  -moz-box-shadow: 0 0 0.25em #ff8888;
  -webkit-box-shadow: 0 0 0.25em #ff8888;
  box-shadow: 0 0 0.25em #ff8888;
}

.errors ul,
.message {
  padding: 0;
}

.errors li {
  list-style: none;

  text-indent: 2.2em;
}

.message {
  text-indent: 2.2em;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
