<script setup>
import { AgGridVue } from "ag-grid-vue3";
import EnableService from "./EnableService.vue";
import DisableService from "./DisableService.vue";
import { request } from "@/socket";

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
      },
      columnDefs: [
        { cellRenderer: EnableService, cellRendererParams: { shared: this.shared, }, },
        { cellRenderer: DisableService, cellRendererParams: { shared: this.shared, }, },
        { headerName: 'user', field: 'user', },
        { headerName: 'connection_status', field: 'connection_status', },
        { headerName: 'state', field: 'state', },
      ],
      defaultColDef: {
        flex: 1,
        resizable: true,
        editable: false,
      },
      name: null,
      context: {
        submit: (user, action) => {
          const data = [user, action.toLowerCase()];
          request('control2', this.shared.name, data);
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
    <h3>Status</h3>
    <div class="grid" v-if="'status' in shared.resources">
      <ag-grid-vue
        style="width: 100%; height: 512px;"
        class="ag-theme-alpine-dark"
        :gridOptions="gridOptions"
        :columnDefs="columnDefs"
        :rowData="shared.resources.status[1]"
        :context="context"
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
table {
  width: 100%;
  background-color: black;
}
td:nth-child(1) {
  color: #d7d6d2;
}
</style>
