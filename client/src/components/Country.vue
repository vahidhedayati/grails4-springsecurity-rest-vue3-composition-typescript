<template>
  <div id="custom">
    <!-- generic pagination -->
    <Pagination
      :maxVisibleButtons="3"
      :totalPages="numberOfPages"
      :total="total"
      @sortSearch="sortSearch"
      :currentPage="currentPage"
      @pagechanged="pagechanged"
    />
  </div>
</template>



  <script lang="ts">
import Pagination from "./Pagination.vue";
//import utilservice from "../services/utilservice";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Pagination,
  },
  setup() {
    //utilservice.updateObjectsInArr
  },
});
</script>
<style>
#custom {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
.reduceZoom {
  zoom: 25.5%;
}
</style>
