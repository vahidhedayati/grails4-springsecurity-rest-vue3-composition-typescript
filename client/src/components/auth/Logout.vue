<template>
  <div id="logout">
    <h1>Logging out ..</h1>
   </div>
</template>

<script lang="ts">
import { defineComponent,onMounted } from 'vue'
import store from "../../store";
import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
      async function actionPage() {
        await store.dispatch("logout", { });
      }
       
      const router = useRouter();
      onMounted(() => {
        actionPage();
        router.push({ name: "Home"});
      })
    },
})
</script>
