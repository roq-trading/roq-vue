<script setup>
import { AgGridVue } from "ag-grid-vue3";

defineProps({
  shared: {
    type: Object,
    required: true,
  },
});
</script>

<script>
export default {
  components: {
    AgGridVue,
  },
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
    <h3>Portfolios</h3>
    <div class="grid" v-if="'portfolios' in shared.resources">
      <ag-grid-vue
        style="width: 100%; height: 256px;"
        class="ag-theme-alpine-dark"
        :gridOptions="gridOptions"
        :columnDefs="shared.resources.portfolios[0]"
        :rowData="shared.resources.portfolios[1]"
        :getRowId="getRowId"
      >
      </ag-grid-vue>
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 0.5em 0.5em 0.5em;
  padding: 0.5em;
  background-color: black;
}
</style>
