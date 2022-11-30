<script setup>
import axios from "axios";
import _ from "lodash";
import { AgGridVue } from "ag-grid-vue3";
import {
  create_url,
  custom_metrics_headers,
  get_ag_grid_column_defs,
} from "@/components/Utils";
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
  data() {
    return {
      // data
      custom_metrics: [],
      // ag-grid
      columnDefs: get_ag_grid_column_defs(custom_metrics_headers),
      defaultColDef: {
        flex: 1,
        resizable: true,
      },
    };
  },
  methods: {
    // data
    flatten(data) {
      return _.reduce(
        data,
        (result, item) => {
          _.forEach(item.measurements, (item_2) => {
            result.push({
              label: item.label,
              account: item.account,
              exchange: item.exchange,
              symbol: item.symbol,
              key: item_2.name,
              value: item_2.value,
            });
          });
          return result;
        },
        []
      );
    },
    fetch_custom_metrics() {
      const path = `/api/custom_metrics?user=${this.user}&recursive=true`;
      const url = create_url(path, this.gateway);
      axios
        .get(url)
        .then((response) => (this.custom_metrics = this.flatten(response.data)))
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) this.custom_metrics = [];
            else console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error:", error.message);
          }
        });
    },
    // ag-grid
    on_model_updated(params) {
      var columns = [];
      params.columnApi.getColumns().forEach(function (column) {
        columns.push(column.colId);
      });
      params.columnApi.autoSizeColumns(columns);
    },
  },
  watch: {
    user() {
      this.fetch_custom_metrics();
    },
    timer() {
      this.fetch_custom_metrics();
    },
  },
  mounted: function () {
    this.fetch_custom_metrics();
  },
};
</script>

<template>
  <div class="container">
    <h3>Custom Metrics</h3>
    <div v-if="custom_metrics">
      <div class="grid">
        <ag-grid-vue
          style="width: 100%; height: 200px"
          class="ag-theme-alpine-dark"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="custom_metrics"
          @modelUpdated="on_model_updated"
        >
        </ag-grid-vue>
      </div>
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
