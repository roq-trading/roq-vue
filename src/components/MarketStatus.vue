<script setup>
import axios from "axios";
defineProps({
  gateway: {
    type: String,
    required: true,
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
      prefix: "http://192.168.188.70/roq/gateway",
      market_status: null,
    };
  },
  methods: {
    fetch_market_status() {
      axios
        .get(
          `${this.prefix}/${this.gateway}/market_status/${this.exchange}/${this.symbol}`
        )
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
          <td>trading_status</td>
          <td>{{ market_status.trading_status }}</td>
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
td {
  padding: 0 0.5em 0 0.5em;
}
td:nth-child(1) {
  color: #f0af0d;
}
td:nth-child(2) {
  text-align: right;
}
</style>
