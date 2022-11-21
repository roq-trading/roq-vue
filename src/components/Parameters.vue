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
      parameters: null,
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
    fetch_parameters() {
      axios
        .get(`${this.prefix}/${this.gateway}/parameters/${this.user}/foo`)
        .then((response) => (this.parameters = response.data))
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error.response.status);
          }
        });
    },
  },
  watch: {
    user() {
      this.fetch_parameters();
    },
  },
  mounted: function () {
    this.fetch_parameters();
  },
};
</script>

<template>
  <div class="container">
    <h3>Parameters</h3>
    <div v-if="parameters">
      <ag-grid-vue
        style="width: 100%; height: 200px"
        class="ag-theme-alpine-dark"
        :columnDefs="headers"
        :defaultColDef="default_headers"
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
td:nth-child(2) {
  text-align: right;
}
.test {
}
</style>
