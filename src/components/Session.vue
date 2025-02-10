<script setup>
import { AgGridVue } from "ag-grid-vue3";

defineProps({
  shared: {
    type: Object,
    required: false,
  },
});
</script>

<script>
export default {
  data() {
    return {
      gridOptions: {
        autoSizeStrategy: {
          type: "fitCellContents",
        },
        alwaysShowHorizontalScroll: true,
        alwaysShowVerticalScroll: true,
        getRowClass: (params) => {
          return params.data._class;
        },
      },
    };
  },
  methods: {
    getRowId: (params) => params.data._id,
  },
};
</script>

<template>
  <div class="container">
    <h3>Session</h3>
    <div class="grid" v-if="'session' in shared.resources">
      <ag-grid-vue
        style="width: 100%; height: 1024px;"
        class="ag-theme-alpine-dark"
        :gridOptions="gridOptions"
        :columnDefs="shared.resources.session[0]"
        :rowData="shared.resources.session[1]"
        :getRowId="getRowId"
      >
      </ag-grid-vue>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 0.5em 0.5em 0.5em;
  padding: 0.5em;
  background-color: black;
}
</style>
