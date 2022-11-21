<script setup>
import { RouterLink } from "vue-router";
</script>

<script>
export default {
  data() {
    return {
      gateway: null,
      gateways: [
        "binance",
        "binance-futures",
        "bitfinex",
        "bitmex",
        "bitstamp",
        "bybit",
        "bybit-futures",
        "coinbase-pro",
        "deribit",
        "gate",
        "gate-futures",
        "hitbtc",
        "huobi",
        "huobi-futures",
        "kraken",
        "kraken-futures",
        "kucoin",
        "kucoin-futures",
        "okx",
      ],
    };
  },
};
</script>

<template>
  <div class="title">
    <h2>Gateways</h2>
    <hr />
  </div>
  <div class="container">
    <table>
      <tr v-for="item in gateways" :key="item">
        <td>{{ item }}</td>
        <td>
          <button>
            <RouterLink :to="{ name: 'status', params: { gateway: item } }">
              status
            </RouterLink>
          </button>
        </td>
        <td>
          <button>
            <RouterLink :to="{ name: 'market', params: { gateway: item } }">
              market
            </RouterLink>
          </button>
        </td>
        <td>
          <button>
            <RouterLink :to="{ name: 'user', params: { gateway: item } }">
              user
            </RouterLink>
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.container {
  margin: 0 0.5em 0.5em 0.5em;
  padding: 0.5em;
}
.title {
  width: 100%;
  text-align: center;
}
hr {
  width: 30%;
  margin: auto;
  border-width: 0;
  border-top: 1px solid #f0af0d;
  padding-bottom: 3em;
}
td {
  padding: 0 0.5em 0 0.5em;
}
td:nth-child(1) {
  color: #f0af0d;
}
button {
  border: 1px solid #7f0102;
  background: black;
}
button a {
  color: #f0af0d;
}
button:hover {
  background: #7f0102;
}
button:hover a {
  color: white;
}
</style>
