<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>

          <span v-if="isAuthenticated">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ profileDetails.username }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <router-link class="dropdown-item" to="/profile">
                    Profile
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/logout"
                    >Logout</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Country' }">Countries</router-link>
            </li>
          </span>
          <span v-else>
            <li>
              <router-link class="nav-link active" to="/login"
                >Login</router-link
              >
            </li>
          </span>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import store from "../store";
export default defineComponent({
  setup() {
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const profileDetails = computed(() => store.getters.profileDetails);
    return {
      profileDetails,
      isAuthenticated,
    };
  },
});
</script>