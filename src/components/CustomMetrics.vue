<script setup>
import axios from "axios";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
defineProps({
  gateway: {
    type: String,
    required: true,
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
      prefix: "http://192.168.188.70/roq/gateway",
      custom_metrics: null,
      headers: [
        { headerName: "label", field: "label", filter: "agTextColumnFilter" },
        {
          headerName: "account",
          field: "account",
          filter: "agTextColumnFilter",
        },
        {
          headerName: "exchange",
          field: "exchange",
          filter: "agTextColumnFilter",
        },
        { headerName: "symbol", field: "symbol", filter: "agTextColumnFilter" },
        { headerName: "key", field: "key", filter: false },
        { headerName: "value", field: "value", filter: false },
      ],
      default_headers: {
        flex: 1,
        minWidth: 200,
        resizable: true,
        floatingFilter: true,
      },
    };
  },
  methods: {
    fetch_custom_metrics() {
      axios
        .get(`${this.prefix}/${this.gateway}/custom_metrics/${this.user}`)
        .then((response) => (this.custom_metrics = response.data))
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error.response.status);
          }
        });
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
      <ag-grid-vue
        style="width: 100%; height: 200px"
        class="ag-theme-alpine-dark"
        :columnDefs="headers"
        :defaultColDef="defaultColDef"
        :rowData="parameters"
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
