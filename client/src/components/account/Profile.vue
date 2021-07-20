<template>
  <div class="">
    <app-header></app-header>
    <h4>Profilo</h4>
    <!-- {{ details }} -->
    {{ details["profile/profile"] }}
    <p>{{ details["profile/profile"].name }}</p>
    <p>{{ details["profile/profile"].username }}</p>
    <p>{{ details.profileDetails.roles }}</p>
    <router-view></router-view>
    <router-link
      to="/profile/edit"
      class="ui animated green button"
      tabindex="0"
    >
      <div class="visible content">Edit</div>
      <div class="hidden content">
        <i class="right arrow icon"></i>
      </div>
    </router-link>
    <div
      class="ui animated red button"
      tabindex="0"
      @click="deleteProfile(profile.id)"
    >
      <div class="visible content">Delete</div>
      <div class="hidden content">
        <i class="right arrow icon"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../../store";
import AppHeader from "../AppHeader.vue";
export default defineComponent({
  components: {
    AppHeader,
  },
  setup() {
    function deleteProfile(id: string) {
      console.log("delete profile: " + id);
    }

    return { details: { ...store.getters }, deleteProfile };
  },
});
</script>
