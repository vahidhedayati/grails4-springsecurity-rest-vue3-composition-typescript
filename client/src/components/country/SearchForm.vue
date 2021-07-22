<template id="search-contract-template">
  <div>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="pills-search-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-search"
          type="button"
          role="tab"
          aria-controls="pills-search"
          aria-selected="true"
        >
          Search
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="pills-add-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-add"
          type="button"
          role="tab"
          aria-controls="pills-add"
          aria-selected="false"
        >
          Add country
        </button>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-search"
        role="tabpanel"
        aria-labelledby="pills-search-tab"
      >
        <div class="col-sm-2">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="name"
              v-model="countryState.search.name"
            />
          </div>
        </div>
        <div class="col-sm-1">
          <div class="btn-group" role="group" aria-label="Search Contracts">
            <button type="button" class="btn btn-primary" @click="submit()">
              Search
            </button>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-add"
        role="tabpanel"
        aria-labelledby="pills-add-tab"
      >
        <country-form
          @refresh-list="refreshCountries"
          @country-errors="errorCountries"
        >
        </country-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import CountryForm from "./CountryForm.vue";
import { defineComponent, reactive } from "vue";
import { SearchType } from "../../types/search";
export default defineComponent({
  components: {
    CountryForm,
  },
  setup(_, context) {
    const countryState = reactive({
      search: { name: "" } as SearchType,
    });

    function submit() {
      context.emit("submit", countryState.search);
    }
    const refreshCountries = function () {
      context.emit("refresh-list");
    };
    const errorCountries = function (errors: string[]) {
      context.emit("country-errors", errors);
    };
    return { countryState, errorCountries, refreshCountries, submit };
  },
});
</script>
