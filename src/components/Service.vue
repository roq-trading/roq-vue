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
        { headerName: 'user', field: 'user', cellClass: 'key-column', },
        { headerName: 'description', field: 'description', cellClass: 'value-column', },
        { headerName: 'state', field: 'state', cellClassRules: {
          'bad': params => params.value == 'DISABLED',
          },
        },
        { headerName: 'connection_status', field: 'connection_status', cellClass: 'value-column', },
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
    getRowStyle(params) {
      // red: #ff4500
      // grey: #d7d6d2
      // orange: #f0af0d
      // dark-grey: #99969f
      // red: #7f0102
      // blue: #16304b
      if (params.data.connection_status == 'READY')
        return {'background':'#16304b'};
    },
  },
};
</script>

<template>
  <div class="container">
    <h3>Service</h3>
    <div class="grid" v-if="'service' in shared.resources">
      <ag-grid-vue
        style="width: 100%; height: 512px;"
        class="ag-theme-alpine-dark"
        :gridOptions="gridOptions"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :getRowStyle="getRowStyle"
        :rowData="shared.resources.service[1]"
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
