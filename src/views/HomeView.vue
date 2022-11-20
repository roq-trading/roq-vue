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
    <ul v-for="item in gateways" :key="item">
      <li>
        <RouterLink :to="{ name: 'market', params: { gateway: item } }">{{
          item
        }}</RouterLink>
      </li>
    </ul>
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
</style>
