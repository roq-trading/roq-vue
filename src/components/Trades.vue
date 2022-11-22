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
      // trades: null,
      trades: [
        {
          account: "A1",
          order_id: 1234,
          exchange: "deribit",
          symbol: "BTC-PERPETUAL",
          side: "BUY",
          position_effect: "",
          create_time_utc: "",
          update_time_utc: "",
          external_account: "",
          external_order_id: "abc12345",
          external_trade_id: "def67890",
          quantity: 1,
          price: 15954.1,
          last_liquidity: "MAKER",
          routing_id: "",
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
        // TODO fills? group?
        {
          headerName: "external_trade_id",
          field: "external_trade_id",
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
          headerName: "liquidity",
          field: "liquidity",
        },
        {
          headerName: "routing_id",
          field: "routing_id",
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
    fetch_trades() {
      axios
        .get(`${this.prefix}/${this.gateway}/trades/${this.user}`)
        .then((response) => (this.trades = response.data))
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error.response.status);
          }
          this.trades = null;
        });
    },
    toggle_filter() {},
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
        :rowData="trades"
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
