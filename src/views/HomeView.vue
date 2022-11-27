<script setup>
import axios from "axios";
import Gateways from "@/components/Gateways.vue";
import { create_url } from "@/components/Utils";
</script>

<script>
export default {
  data() {
    return {
      gateways: null,
      gateways_2: [
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
  methods: {
    fetch_config() {
      // note!
      // multiple gateways can be supported when a configuration is provided
      // this will then change the request paths for api calls
      const path = "/config.json";
      const url = create_url(path);
      axios
        .get(url)
        .then((response) => (this.gateways = response.data))
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) {}
            else console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error:", error.message);
          }
        });
    },
  },
  mounted: function () {
    this.fetch_config();
  },
};
</script>

<template>
  <div class="title">
    <h2>Views</h2>
    <hr />
  </div>
  <div class="container">
    <div class="view">
      <Gateways :gateways="gateways" />
    </div>
    <div class="view"></div>
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
  font-size: 1.2em;
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
