<template id="tablerow-template">
  <tr>
    <td>{{ country.id }}</td>
    <td>
      <span v-if="state.showForm">
        <input v-model="state.updatedCountry.name" />
      </span>
      <span v-else>
        {{ country.name }}
      </span>
    </td>
    <td>
      <span v-if="state.showForm">
        <input v-model="state.updatedCountry.code" />
      </span>
      <span v-else>
        {{ country.code }}
      </span>
    </td>
    <td>{{ country.updateUser?.username }}</td>
    <td>{{ country.lastUpdated }}</td>
    <td class="dropdown">
      <span v-if="state.showForm">
        <button v-on:click="save(state.updatedCountry)">Save</button>
      </span>
      <span v-else>
        <button v-on:click="editCountry(country)">Edit</button>
        <button v-on:click="actionDropDown({ value: 'display' }, country.id)">
          Display
        </button>
        <button v-on:click="actionDropDown({ value: 'delete' }, country.id)">
          Delete
        </button>
      </span>
    </td>
  </tr>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import {
  getCountries,
  patchCountry,
  deleteCountry,
} from "@/services/CountryService";
import { CountryObject } from "@/types/country";
export type eventType = {
  value: string;
};
export default defineComponent({
  props: {
    country: {
      //type: Object as PropType<CountryObject>
      type: Object as () => CountryObject,
    },
  },
  setup(props, context) {
    const state = reactive({
      response: [],
      errors: [],
      showCountry: null,
      updatedCountry: {} as CountryObject,
      updatedCountryAlternative: {
        name: undefined,
        updateUser: undefined,
        id: undefined,
        code: undefined,
        lastUpdated: undefined,
        error: [],
      } as CountryObject,
      serverURL: process.env.SERVER_URL,
      showForm: false,
    });

    const editCountry = function () {
      state.updatedCountry = props.country as CountryObject;
      state.showForm = true;
    };

    async function actionDropDown(event: eventType, id: string) {
      if (event.value === "display") {
        console.log("display " + id);
        const res = await getCountries("?id=" + id);

        if (res.data && res.ok) {
          console.log("show resData " + JSON.stringify(res.data));
          context.emit("country-show", res.data);
        } else {
          context.emit("country-errors", res.data);
        }
      }
      if (event.value === "delete") {
        if (confirm("Delete record?")) {
          console.log("delete " + id);
          const res = await deleteCountry(id);
          if (res && res.data) {
            // we need to reload page
            context.emit("refresh-list");
          } else {
            console.log("denied");
          }
        }
      }
    }
    const updateValue = function (value: string) {
      context.emit("input", value);
    };
    async function save() {
      const res = await patchCountry(state.updatedCountry);
      if (res && res.data && res.ok) {
        state.showForm = false;
        console.log("resData " + JSON.stringify(res.data));
        context.emit("country-update", res.data);
      } else {
        context.emit("country-errors", (res.data as CountryObject).error);
      }
    }
    return { save, updateValue, actionDropDown, editCountry, state };
  },
});
</script>

<!-- Per Component Custom CSS Rules -->
<style>
.dropdown-label.text {
  font-size: 0.8em;
}
.dropdown-label-container {
  margin-top: -30px !important;
}
.dropdown-label-container .angle-down {
  margin-top: -10px !important;
  margin-left: -10px !important;
  background-color: orange !important;
}
.dropdown {
  margin-right: 50px;
  float: right !important;
  display: inline-block !important;
  width: 30px !important;
  font-size: 0.8em;
}
.dropdown .options {
  width: 80px !important;
  font-size: 0.8em;
  background: red;
}
/* Add custom rules here */
</style>
