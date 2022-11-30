<script setup>
import axios from "axios";
import { AgGridVue } from "ag-grid-vue3";
import {
  create_url,
  format_datetime,
  format_integer,
  format_number,
  format_string,
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
      orders: null,
      headers: _.map(
        [
          { name: "account", formatter: format_string },
          { name: "order_id", formatter: format_integer },
          { name: "exchange", formatter: format_string },
          { name: "symbol", formatter: format_string },
          { name: "side", formatter: format_string },
          { name: "position_effect", formatter: format_string },
          { name: "order_type", formatter: format_string },
          { name: "time_in_force", formatter: format_string },
          { name: "execution_instructions", formatter: format_string },
          { name: "order_template", formatter: format_string },
          { name: "create_time_utc", formatter: format_datetime },
          { name: "update_time_utc", formatter: format_datetime },
          { name: "external_account", formatter: format_string },
          { name: "external_order_id", formatter: format_string },
          { name: "status", formatter: format_string },
          { name: "quantity", formatter: format_number },
          { name: "price", formatter: format_number },
          { name: "stop_price", formatter: format_number },
          { name: "remaining_quantity", formatter: format_number },
          { name: "traded_quantity", formatter: format_number },
          { name: "average_traded_price", formatter: format_number },
          { name: "last_traded_quantity", formatter: format_number },
          { name: "last_traded_price", formatter: format_number },
          { name: "last_liquidity", formatter: format_string },
          { name: "routing_id", formatter: format_string },
          { name: "max_request_version", formatter: format_integer },
          { name: "max_response_version", formatter: format_integer },
          { name: "max_accepted_version", formatter: format_integer },
        ],
        (item) => ({
          headerName: item.name,
          field: item.name,
          headerTooltip: item.name,
          valueFormatter: (node) => item.formatter(node.value),
        })
      ),
      default_headers: {
        flex: 1,
        resizable: true,
        floatingFilter: false,
        filter: "agTextColumnFilter",
      },
    };
  },
  methods: {
    fetch_orders() {
      const path = `/api/orders?user=${this.user}&recursive=true`;
      const url = create_url(path, this.gateway);
      axios
        .get(url)
        .then((response) => (this.orders = response.data))
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) this.orders = null;
            else console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error:", error.message);
          }
        });
    },
    toggle_filter() {},
    auto_resize(params) {
      var columns = [];
      params.columnApi.getColumns().forEach(function (column) {
        columns.push(column.colId);
      });
      params.columnApi.autoSizeColumns(columns, true);
    },
  },
  watch: {
    user() {
      this.fetch_orders();
    },
    timer() {
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
      <input
        type="checkbox"
        id="filter"
        value="false"
        v-model="toggle_filter"
      />
      <label for="filter">Filter?</label>
      <ag-grid-vue
        style="width: 100%; height: 200px"
        class="ag-theme-alpine-dark"
        :columnDefs="headers"
        :defaultColDef="default_headers"
        :rowData="orders"
        @ModelUpdated="auto_resize"
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
