<script setup>
import axios from "axios";
import { AgGridVue } from "ag-grid-vue3";
import {
  create_url,
  get_trades_headers,
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
      trades: [],
      // config
      reduced: true,
      // ag-grid
      columnDefs: get_ag_grid_column_defs(get_trades_headers(true)),
      defaultColDef: {
        flex: 1,
        resizable: true,
      },
    };
  },
  methods: {
    // data
    fetch_trades() {
      const path = `/api/trades?user=${this.user}&recursive=true`;
      const url = create_url(path, this.gateway);
      axios
        .get(url)
        .then((response) => (this.trades = response.data))
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) this.trades = null;
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
        get_trades_headers(this.reduced)
      );
    },
    // ag-grid
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
      this.fetch_trades();
    },
    timer() {
      this.fetch_trades();
    },
  },
  mounted: function () {
    this.fetch_trades();
  },
};
</script>

<template>
  <div class="container">
    <h3>Trades</h3>
    <div v-if="trades">
      <button @click="toggle_reduced">
        {{ reduced ? "Reduced View" : "Full View" }}
      </button>
      <ag-grid-vue
        style="width: 100%; height: 200px"
        class="ag-theme-alpine-dark"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="trades"
        @ModelUpdated="on_model_updated"
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
