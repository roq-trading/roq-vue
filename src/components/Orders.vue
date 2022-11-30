<script setup>
import axios from "axios";
import { AgGridVue } from "ag-grid-vue3";
import {
  create_url,
  get_orders_headers,
  get_ag_grid_column_defs,
} from "@/components/Utils";
import _ from "lodash";
defineProps({
  gateway: {
    type: String,
    required: false,
  },
  user: {
    type: String,
    required: true,
  },
  timer: {
    type: Date,
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
      // data
      orders: [],
      // config
      reduced: true,
      active: true,
      // ag-grid
      columnDefs: get_ag_grid_column_defs(get_orders_headers(true)),
      defaultColDef: {
        flex: 1,
        resizable: true,
      },
      api: null,
    };
  },
  methods: {
    // data
    fetch_orders() {
      const path = `/api/orders?user=${this.user}&recursive=true&active=${this.active}`;
      const url = create_url(path, this.gateway);
      axios
        .get(url)
        .then((response) => (this.orders = response.data))
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) this.orders = [];
            else console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error:", error.message);
          }
        });
    },
    // config
    toggle_reduced() {
      this.reduced = !this.reduced;
      this.columnDefs = get_ag_grid_column_defs(
        get_orders_headers(this.reduced)
      );
    },
    toggle_active() {
      this.active = !this.active;
    },
    // ag-grid
    on_grid_ready(params) {
      this.api = params.api;
    },
    on_selection_changed() {
      console.log("TODO modal");
      const rows = this.api.getSelectedRows();
      if (_.size(rows) > 0) console.log(rows[0]);
    },
    on_model_updated(params) {
      var columns = [];
      params.columnApi.getColumns().forEach(function (column) {
        columns.push(column.colId);
      });
      params.columnApi.autoSizeColumns(columns, !this.reduced);
    },
  },
  watch: {
    user() {
      this.fetch_orders();
    },
    timer() {
      this.fetch_orders();
    },
    active() {
      this.fetch_orders();
    },
  },
  mounted: function () {
    this.fetch_orders();
  },
};
</script>

<template>
  <div class="container">
    <h3>Orders</h3>
    <div v-if="orders">
      <button @click="toggle_reduced">
        {{ reduced ? "Reduced View" : "Full View" }}
      </button>
      <button @click="toggle_active">
        {{ active ? "Active Orders" : "All Orders" }}
      </button>
      <ag-grid-vue
        style="width: 100%; height: 200px"
        class="ag-theme-alpine-dark"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="orders"
        :enableCellChangeFlash="true"
        rowSelection="single"
        @gridReady="on_grid_ready"
        @selectionChanged="on_selection_changed"
        @modelUpdated="on_model_updated"
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
td {
  padding: 0 0.5em 0 0.5em;
}
td:nth-child(1) {
  color: #f0af0d;
}
</style>
