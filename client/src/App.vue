<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    
    <span v-if="isAuthenticated">
       <router-link   to="/profile" >
      <button class="btn btn-xs btn-danger">Profile</button>
     </router-link>

     
      <router-link to="/logout">Logout</router-link>
    </span>
    <span v-else>
      <router-link to="/login">Login</router-link>
    </span>
  </div>

  <router-view />
</template>

<script lang="ts">
import { defineComponent,computed } from "vue";
import store from "./store";
export default defineComponent({
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
</style>
