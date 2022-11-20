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
      defaultColDef: {
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
        .then((response) => (this.parameters = response.data));
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
    <p>
      {{ user }}
    </p>
    <div v-if="parameters">
      <table>
        <tr>
          <th>label</th>
          <th>account</th>
          <th>exchange</th>
          <th>symbol</th>
          <th>value</th>
        </tr>
        <tr v-for="item in parameters" :key="item">
          <td>{{ item.label }}</td>
          <td>{{ item.account }}</td>
          <td>{{ item.exchange }}</td>
          <td>{{ item.symbol }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </table>
    </div>
  </div>
  <div class="test">
    <ag-grid-vue
      style="width: 100%; height: 200px"
      class="ag-theme-alpine-dark"
      :columnDefs="headers"
      :defaultColDef="defaultColDef"
      :rowData="parameters"
    >
    </ag-grid-vue>
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
