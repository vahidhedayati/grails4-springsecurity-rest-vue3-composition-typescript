<template>
  <modal :show="show" @close="close"  v-if="show">
    <div class="modal-header">
      <h3>Display country {{country.name}}</h3>
    </div>
    <div class="modal-body">
      <div class="row">
      <div class="form-label col-sm-12">
        Name
        {{country.name}}
      </div>

      <div class="form-label col-sm-12">
        code
        {{country.code}}
      </div>

      <div class="form-label col-sm-12">
        username
        {{country.updateUser.username}}
      </div>
      <div class="form-label col-sm-12">
        last updated
        {{country.lastUpdated}}
      </div>
    </div>
      <div class="modal-footer text-right">
           <button class="modal-default-button" @click="close()">
             Close
           </button>
      </div>
    </div>
  </modal>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CountryObject } from "@/types/country";
import modal from '@/components/Modal.vue'
 
export default defineComponent({
  props: {
    show: {
        type: Object as PropType<boolean>
      }, 
      country : {
        type: Object as PropType<CountryObject>
      }
  },
  components: {
    modal,
  },
  setup(_,context) {
   // let state = reactive({
   //   errors:[] as string[]
   // })

    const close= function () {
        console.log('running close')
        context.emit('close');
    }
    return {close}
  }
})

</script>
<style>
  .dateField input {
    color: red;
    max-width:90px !important;
  }
</style>
