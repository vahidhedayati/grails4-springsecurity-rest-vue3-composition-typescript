<template>
  <div id="custom">
    <ul v-show="countryState.errors.length > 0" class="errors">
      <li v-for="error in countryState.errors" :key="error.code">
        {{ error }}
      </li>
    </ul>

    <search-form
      v-model="search"
      @submit="searchCountries"
      @refresh-list="refreshCountries"
      @country-errors="errorCountries"
    ></search-form>

    
    
    <country-table :countries="countryState.countries"
                   v-bind="{fetchCountries,sortSearch}"
                   @country-update="updateCountries"
                   @sort-search="searchSort"
                   @refresh-list="refreshCountries"
                    @country-errors="errorCountries"
                   >
    </country-table>
    
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
import Pagination from "../Pagination.vue";
import CountryTable from './table/CountryTable.vue'
import searchForm from "./SearchForm.vue";
import utilservice from "../../services/utilservice";
import { SearchType } from "../../types/search";
import { CountryListing, CountryObject } from "../../types/country";
import { defineComponent, reactive } from "vue";
import { getCountries } from "@/services/CountryService";
interface sortSearchInterface  {
  currentSort: string;
  currentSortDir: string;
}
export default defineComponent({
  components: {
    Pagination,
    searchForm,
    CountryTable
  },
  setup() {
    const countryState = reactive({
      search: { name: "" } as SearchType,
      errors: [] as string[],
      countries: [] as CountryObject[],
      total: 0,
      max: 10,
      offset: 0,
      currentPage: 1,
      numberOfPages: 0,
      currentSort: "",
      currentSortDir: "asc",
    });
    const errorCountries = function (errors: string[]) {
      countryState.errors = errors;
    };

    const searchCountries = (search: SearchType) => {
      initialiseCountries(search.name ? "?name=" + search.name : "");
    };
    async function initialiseCountries(variables: string) {
      const res = await getCountries(variables);
      if (res && res.ok) {
        if (res.data) {
          const data = res.data as CountryListing;
          if (data.instanceList) {
            countryState.countries = data.instanceList as CountryObject[];
            countryState.total = data.instanceTotal as number;
            countryState.numberOfPages = data.numberOfPages as number;
          } else {
            countryState.countries = res.data as CountryObject[];
          }
        }
      }
    }
    const pagechanged = function (page: number | string) {
      console.log("Page = " + page);
      countryState.currentPage = page as number;
      countryState.offset =
        countryState.currentPage * countryState.max - countryState.max;
      fetchCountries(countryState.offset);
    };
    function searchSort(object:sortSearchInterface) {
      sortSearch(object.currentSort, object.currentSortDir)
    }
    function sortSearch(currentSort: string, currentSortDir: string):void {
      countryState.currentSort = currentSort;
      countryState.currentSortDir = currentSortDir;
      const variables =
        "?name=" +
        countryState.search.name +
        "&sort=" +
        currentSort +
        "&order=" +
        currentSortDir +
        "&offset=" +
        countryState.offset;
      initialiseCountries(variables);
    }
    const refreshCountries = function () {
      console.log("refreshing entire list after a new entry was added");
      fetchCountries(0);
    };
    const updateCountries = function (country: CountryObject) {
      countryState.errors = [];
      console.log("country.vue updating country list");
      countryState.countries = utilservice.updateObjectsInArr(
        countryState.countries,
        [country]
      );
    };

    function fetchCountries(pageNumber: number) {
      var variables = "";
      if (countryState.search?.name) {
        variables += "?name=" + countryState.search.name;
      }
      if (countryState.currentSort) {
        variables +=
          "&sort=" +
          countryState.currentSort +
          "&order=" +
          countryState.currentSortDir;
      }
      if (variables != "") {
        variables += "&offset=" + pageNumber;
      } else {
        variables = "?offset=" + pageNumber;
      }
      console.log("Fetching countries " + pageNumber);
      initialiseCountries(variables);
    }

    return {
      fetchCountries,
      updateCountries,
      searchSort,
      pagechanged,
      sortSearch,
      refreshCountries,
      countryState,
      errorCountries,
      searchCountries,
    };
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
