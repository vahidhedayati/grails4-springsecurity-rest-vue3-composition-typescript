<template id="driverSelect-template" xmlns="http://www.w3.org/1999/xhtml">
  <div class="form-group">
    <select class="form-control" v-model="selected" @change="updateValue()">
      <option v-if="blankForm" disabled :value="null">
        Select a {{ field }}
      </option>
      <option v-for="value in values" :value="value.id" :key="value.id">
        {{ value.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  props: {
    values: { type: Array },
    field: { type: String },
    actualItem: { default: null },
    obj: { type: Object },
  },
  setup(props, context) {
    const blankForm = ref(props.actualItem == null);
    const selected = ref(props.actualItem);

    const updateValue = function () {
      context.emit("input", selected.value);
    };

    onMounted(() => {
      if (props.actualItem != null) {
        console.log("doing stuff");
        updateValue();
      }
    });

    return { blankForm, selected, updateValue };
  },
});
</script>

<style>
/* Add custom rules here */
</style>
