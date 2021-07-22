<template id="add-country-template" >
  <div>
    <div id="inputRow" class="row">
      <div class="col-sm-3">
        <div class="input-group">
          Country name:
          <input
            type="text"
            class="form-control"
            placeholder="Enter a name..."
            v-model="country.name"
            required
          />
        </div>
      </div>

      <div class="col-sm-2">
        <div class="input-group">
          Country Code:
          <input
            type="text"
            class="form-control"
            placeholder="Enter code"
            v-model="country.code"
          />
        </div>
      </div>

      <!-- if the user is logged in this is value is preset by their ID after the page has been loaded -->
      <input type="hidden" v-model="country.updateUser.id" />

      <div class="col-sm-2">
        <div class="input-group"></div>
        <div class="btn-group" role="group" aria-label="Add new vehicle">
          <button type="button" class="btn btn-success" @click="submit()">
            Add country
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { createCountry } from "@/services/CountryService";
import { User, CountryObject } from "@/types/country";
import store from "../../store";
import { defineComponent, reactive, onMounted } from "vue";

export default defineComponent({
  setup(_, context) {
    let country: CountryObject = reactive({
      error: [],
      name: "",
      code: "",
      id: "",
      lastUpdated: "",
      updateUser: { id: "" }, //, username:'' },
    });
    onMounted(() => {
      country.updateUser = {
        id: store.getters.profileDetails.profile.id,
      } as User;
      //,username: store.getters.profileDetails.profile.username}
    });

    async function submit() {
      const res = await createCountry(country);
      if (res && res.ok) {
        if (res.data) {
          console.log("refresh entire list from countryForm ");
          context.emit("refresh-list");
        }
      } else {
        console.log(" --" + JSON.stringify(res.data));
        context.emit("country-errors", (res.data as CountryObject).error);
      }
    }
    return { country, submit };
  },
});
</script>
