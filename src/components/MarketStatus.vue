<script setup>
import axios from "axios";
import { create_url } from "./Format";
defineProps({
  gateway: {
    type: String,
    required: false,
  },
  exchange: {
    type: String,
    required: true,
  },
  symbol: {
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
      market_status: null,
    };
  },
  methods: {
    fetch_market_status() {
      const path = `/api/market_status/${this.exchange}/${this.symbol}`;
      axios
        .get(create_url(this.gateway, path))
        .then((response) => (this.market_status = response.data))
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error.response.status);
          }
        });
    },
  },
  watch: {
    symbol() {
      this.fetch_market_status();
    },
    timer() {
      this.fetch_market_status();
    },
  },
  mounted: function () {
    this.fetch_market_status();
  },
};
</script>

<template>
  <div class="container">
    <h3>Market Status</h3>
    <div v-if="market_status">
      <table>
        <tr>
          <td v-if="market_status.trading_status === 'OPEN'" class="ready">
            {{ market_status.trading_status }}
          </td>
          <td v-else class="not_ready">{{ market_status.trading_status }}</td>
        </tr>
      </table>
    </div>
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
td {
  text-align: center;
}
.ready {
  background-color: green;
}
.not_ready {
  background-color: yellow;
}
</style>
