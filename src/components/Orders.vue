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
      //orders: null,
      orders: [
        {
          account: "A1",
          order_id: 1234,
          exchange: "deribit",
          symbol: "BTC-PERPETUAL",
          side: "BUY",
          position_effect: "",
          order_type: "LIMIT",
          time_in_force: "GTC",
          execution_instructions: "",
          order_template: "",
          create_time_utc: "",
          update_time_utc: "",
          external_account: "",
          external_order_id: "abc12345",
          status: "WORKING",
          quantity: 1,
          price: 15954.1,
          stop_price: null,
          remaining_quantity: 1,
          traded_quantity: 0,
          average_traded_price: null,
          last_traded_quantity: null,
          last_traded_price: null,
          last_liquidity: null,
          routing_id: "",
          max_request_version: 1,
          max_response_version: 1,
          max_accepted_version: 1,
        },
      ],
      headers: [
        {
          headerName: "account",
          field: "account",
        },
        {
          headerName: "order_id",
          field: "order_id",
        },
        {
          headerName: "exchange",
          field: "exchange",
        },
        {
          headerName: "symbol",
          field: "symbol",
        },
        {
          headerName: "side",
          field: "side",
        },
        {
          headerName: "position_effect",
          field: "position_effect",
        },
        {
          headerName: "order_type",
          field: "order_type",
        },
        {
          headerName: "time_in_force",
          field: "time_in_force",
        },
        {
          headerName: "execution_instructions",
          field: "execution_instructions",
        },
        {
          headerName: "order_template",
          field: "order_template",
        },
        {
          headerName: "create_time_utc",
          field: "create_time_utc",
        },
        {
          headerName: "update_time_utc",
          field: "update_time_utc",
        },
        {
          headerName: "external_account",
          field: "external_account",
        },
        {
          headerName: "external_order_id",
          field: "external_order_id",
        },
        {
          headerName: "status",
          field: "status",
        },
        {
          headerName: "quantity",
          field: "quantity",
        },
        {
          headerName: "price",
          field: "price",
        },
        {
          headerName: "stop_price",
          field: "stop_price",
        },
        {
          headerName: "remaining_quantity",
          field: "remaining_quantity",
        },
        {
          headerName: "traded_quantity",
          field: "traded_quantity",
        },
        {
          headerName: "average_traded_price",
          field: "average_traded_price",
        },
        {
          headerName: "last_traded_quantity",
          field: "last_traded_quantity",
        },
        {
          headerName: "last_traded_price",
          field: "last_traded_price",
        },
        {
          headerName: "last_liquidity",
          field: "last_liquidity",
        },
        {
          headerName: "routing_id",
          field: "routing_id",
        },
        {
          headerName: "max_request_version",
          field: "max_request_version",
        },
        {
          headerName: "max_response_version",
          field: "max_response_version",
        },
        {
          headerName: "max_accepted_version",
          field: "max_accepted_version",
        },
      ],
      default_headers: {
        flex: 1,
        minWidth: 150,
        resizable: true,
        floatingFilter: false,
        filter: "agTextColumnFilter",
        autoSizeColumn: true,
      },
    };
  },
  methods: {
    fetch_orders() {
      axios
        .get(`${this.prefix}/${this.gateway}/orders/${this.user}`)
        .then((response) => (this.orders = response.data))
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error.response.status);
          }
        });
    },
    toggle_filter() {},
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
