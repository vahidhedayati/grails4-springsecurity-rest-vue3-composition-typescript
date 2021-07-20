<template>
  <Suspense>
    <template #default>
      <div v-if="isAuthenticated">You are already logged in</div>
      <div v-else>
        <form @submit.prevent="onSubmit">
          <div class="form-group my-2">
            <label>Username</label>
            <input
              v-model="form.username"
              class="form-control"
              placeholder="Username"
              required
            />
          </div>
          <div class="form-group my-2">
            <label>Password</label>
            <input
              v-model="form.password"
              class="form-control"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div class="text-danger my-2"></div>
          <button class="btn btn-success btn-block my-2" type="submit">
            Login
          </button>
        </form>
      </div>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

import { useRouter, useRoute } from "vue-router";

import fetcher from "../../services/fetcher";
import profileservice from "../../services/profileservice";
import store from "../../store";
import { User, usernameRegex, UserRole } from "../../types/user";

export type LoginResponse = {
  refresh_token: string | undefined;
  access_token: string | undefined;
  roles: UserRole[];
  id: string;
  user: User | undefined;
};

export default defineComponent({
  setup() {
    const form = reactive({
      loginFail: false,
      valid: true,
      passwordShow: false,
      password: "",
      passwordRules: [
        (v: string) => !!v || "Password is required",
        (v: string) =>
          (v && v.length >= 5) || "Password must be more than 5 characters",
      ],
      username: "",
      usernameRules: [
        (v: string) => !!v || "Username is required",
        (v: string) => usernameRegex.test(v) || "Username must be valid",
      ],
    });
    const router = useRouter();
    const route = useRoute();

    const onSubmit = async () => {
      const res = await fetcher<LoginResponse>(
        "POST",
        "http://localhost:8080/api/login",
        {
          username: form.username,
          password: form.password,
        }
      );

      if (!res.ok || !res.data?.access_token) {
        form.loginFail = true;
        return;
      } else {
        //console.log(" -- " + JSON.stringify(res.data));
        const jwt = res.data.access_token;
        const refreshToken = res.data.refresh_token;
        const roles = res.data.roles;

        const username = form.username;
        await store.dispatch("login", { jwt, refreshToken, username, roles });

        getProfile(res.data.id);

        router.push({ name: "Home", query: { ...route.query } });
      }
      form.username = "";
      form.password = "";
    };

    const isAuthenticated = store.getters.isAuthenticated;

    async function getProfile(userId: string) {
      console.log(userId);
      const profile = await profileservice.fetchProfile(userId);
      if (profile) {
        await store.dispatch("profile/setProfile", profile.data);
      }
    }

    return {
      form,
      onSubmit,
      isAuthenticated,
    };
  },
});
</script>
