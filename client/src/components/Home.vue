<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |

    <span v-if="isAuthenticated">
      <router-link to="/profile">
        <button class="btn btn-xs btn-danger">Profile</button>
      </router-link>

      <router-link to="/logout">Logout</router-link>
    </span>
    <span v-else>
      <router-link to="/login">Login</router-link>
    </span>
  </div>
</template>