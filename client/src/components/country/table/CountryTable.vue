<template id="fulltable-template" >
  <div>
    <table class="table">
      <thead class="thead-inverse">
        <tr>
          <th @click="sort('id')" :class="{ active: state.column === 'id' }">
            ID
            <span
              :class="{
                blank: state.column != 'id',
                arrow: state.column === 'id',
                asc: state.column === 'id' && state.currentSortDir === 'asc',
                desc: state.column === 'id' && state.currentSortDir === 'desc',
              }"
            >
            </span>
          </th>
          <th
            @click="sort('name')"
            :class="{ active: state.column === 'name' }"
          >
            Name
            <span
              :class="{
                blank: state.column != 'name',
                arrow: state.column === 'name',
                asc: state.column === 'name' && state.currentSortDir === 'asc',
                desc:
                  state.column === 'name' && state.currentSortDir === 'desc',
              }"
            >
            </span>
          </th>
          <th
            @click="sort('code')"
            :class="{ active: state.column === 'code' }"
          >
            Code
            <span
              :class="{
                blank: state.column != 'code',
                arrow: state.column === 'code',
                asc: state.column === 'code' && state.currentSortDir === 'asc',
                desc:
                  state.column === 'code' && state.currentSortDir === 'desc',
              }"
            >
            </span>
          </th>
          <th
            @click="sort('updateUser')"
            :class="{ active: state.column == 'updateUser' }"
          >
            Updated By
            <span
              :class="{
                blank: state.column != 'updateUser',
                arrow: state.column === 'updateUser',
                asc:
                  state.column === 'updateUser' &&
                  state.currentSortDir === 'asc',
                desc:
                  state.column === 'updateUser' &&
                  state.currentSortDir === 'desc',
              }"
            >
            </span>
          </th>
          <th
            @click="sort('lastUpdated')"
            :class="{ active: state.column === 'lastUpdated' }"
          >
            last Updated
            <span
              :class="{
                blank: state.column != 'lastUpdated',
                arrow: state.column === 'lastUpdated',
                asc:
                  state.column === 'lastUpdated' &&
                  state.currentSortDir === 'asc',
                desc:
                  state.column === 'lastUpdated' &&
                  state.currentSortDir === 'desc',
              }"
            >
            </span>
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <!--1-->
      <!-- sortedCats replaces vehicles and is only sorting by current paginated dataset -->
      <table-row
        v-for="country in countries"
        :key="country.id"
        :country="country"
        @country-update="updateCountries"
        @refresh-list="refreshCountries"
        @country-show="showCountry"
        @country-errors="errorCountries"
        v-bind="{ fetchCountries }"
      ></table-row>
      <!--2-->
    </table>

    <display-country-modal
      :show="state.showModal"
      :country="state.currentShowCountry"
      @close="closeModalPopup"
    ></display-country-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from "vue";
import { CountryObject } from "@/types/country";
import TableRow from "./TableRow.vue";
import DisplayCountryModal from "./DisplayCountryModal.vue";
type SortSearchInterface = (
  currentSort: string,
  currentSortDir: string
) => void;

export default defineComponent({
  props: {
    countries: {
      type: Object as PropType<CountryObject[]>,
    },
    sortSearch: {
      //type: Function as PropType<(currentSort: string, currentSortDir: string)=> void>
      type: Function as PropType<SortSearchInterface>,
      required: true,
    },
    ///sortSearch: Function as PropType<SortSearchInterface>,
  },
  components: {
    TableRow,
    DisplayCountryModal,
  },
  setup(props, context) {
    let state = reactive({
      updatedResults: null,
      currentShowCountry: {} as CountryObject | undefined,
      currentSort: "contractName",
      currentSortDir: "asc",
      column: "id",
      activeColumn: "id",
      currentStyle: "",
      showModal: false,
    });

    const sort = function (s: string) {
      state.column = s;
      state.activeColumn = s;
      //if s == current sort, reverse
      if (s === state.currentSort) {
        state.currentSortDir = state.currentSortDir === "asc" ? "desc" : "asc";
      }
      state.currentSort = s;

      //This is full on search and sortedSearch sits in the parent page Custom.vue
      //TODO - props function PropType causing issues with call below
      //TODO - Cannot invoke an object which is possibly 'undefined'.Vetur(2722)
      props.sortSearch(s, state.currentSortDir);

      /* context.emit("sort-search", {
        currentSort: s,
        currentSortDir: state.currentSortDir,
      });
      */
    };
    const updateCountries = function (country: CountryObject) {
      console.log("countryTable.vue updating country list");
      context.emit("country-update", country);
    };
    const showCountry = function (country: CountryObject) {
      //This is when the tableRow returned current current to be displayed - this updates the internal country
      //of this page to be that.
      state.currentShowCountry = country;
      state.showModal = true;
      //
    };
    const closeModalPopup = function () {
      state.showModal = false;
      state.currentShowCountry = undefined;
    };
    const refreshCountries = () => {
      console.log("countryTable.vue refresh country list");
      context.emit("refresh-list");
    };
    const errorCountries = function (errors: string[]) {
      console.log("countryTable.vue updating country list");
      context.emit("country-errors", errors);
    };

    return {
      errorCountries,
      refreshCountries,
      closeModalPopup,
      showCountry,
      updateCountries,
      sort,
      state,
    };
  },
});
</script>

<style>
th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #42b983;
}

.arrow.desc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #42b983;
}
th.active {
  color: orange !important;
}
</style>
