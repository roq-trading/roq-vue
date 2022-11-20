<script setup>
import axios from "axios";
import ReferenceData from "../components/ReferenceData.vue";
import MarketStatus from "../components/MarketStatus.vue";
import TopOfBook from "../components/TopOfBook.vue";
import Statistics from "../components/Statistics.vue";
import _ from "lodash";
defineProps({
  gateway: {
    type: String,
    required: true,
  },
});
</script>

<script>
export default {
  data() {
    return {
      prefix: "http://192.168.188.70/roq/gateway",
      timer: new Date(),
      exchanges: [],
      exchange: null,
      symbols: null,
      symbol: null,
    };
  },
  methods: {
    refresh_timer() {
      setTimeout(() => {
        this.timer = new Date();
        this.refresh_timer();
      }, 5000);
    },
    fetch_exchanges() {
      axios
        .get(`${this.prefix}/${this.gateway}/top_of_book`)
        .then((response) => (this.exchanges = response.data));
    },
    fetch_symbols() {
      axios
        .get(`${this.prefix}/${this.gateway}/top_of_book/${this.exchange}`)
        .then((response) => (this.symbols = _.sortBy(response.data)));
    },
  },
  watch: {
    exchange() {
      this.fetch_symbols();
    },
  },
  mounted: function () {
    this.refresh_timer();
    this.fetch_exchanges();
  },
};
</script>

<template>
  <div class="container">
    <h2 v-if="symbol">{{ gateway }} / {{ exchange }} / {{ symbol }}</h2>
    <h2 v-else>{{ gateway }}</h2>
  </div>
  <div class="title">
    <h2>Context</h2>
    <hr />
  </div>
  <div class="container">
    <div class="context">
      <div class="selector">
        <h3>Exchange</h3>
        <select v-model="exchange" class="form-control" size="4">
          <option v-for="item in exchanges" :key="item">{{ item }}</option>
        </select>
      </div>
      <div class="selector" v-if="symbols">
        <h3>⇒</h3>
      </div>
      <div class="selector" v-if="symbols">
        <h3>Symbol</h3>
        <select v-model="symbol" class="form-control" size="4">
          <option v-for="item in symbols" :key="item">{{ item }}</option>
        </select>
      </div>
    </div>
  </div>
  <div class="title" v-if="symbol">
    <h2>Market</h2>
    <hr />
  </div>
  <div class="market">
    <div class="object">
      <ReferenceData
        :gateway="gateway"
        :exchange="exchange"
        :symbol="symbol"
        :timer="timer"
        v-if="symbol"
      />
    </div>
    <div class="object">
      <MarketStatus
        :gateway="gateway"
        :exchange="exchange"
        :symbol="symbol"
        :timer="timer"
        v-if="symbol"
      />
      <TopOfBook
        :gateway="gateway"
        :exchange="exchange"
        :symbol="symbol"
        :timer="timer"
        v-if="symbol"
      />
      <Statistics
        :gateway="gateway"
        :exchange="exchange"
        :symbol="symbol"
        :timer="timer"
        v-if="symbol"
      />
    </div>
  </div>
</template>

<style scoped>
select {
  padding: 0.1em 0.5em 0.1em 0.5em;
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

.context {
  padding-bottom: 2em;
  display: flex;
  gap: 2em;
}
.selector {
  vertical-align: text-top;
}
.market {
  display: grid;
  grid-template-columns: 50% 50%;
}
.object {
}
.container {
  margin: 0 0.5em 0.5em 0.5em;
  padding: 0.5em;
}
</style>
