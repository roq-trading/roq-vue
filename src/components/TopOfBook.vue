<script setup>
import axios from "axios";
import dayjs from "dayjs";
import _ from "lodash";
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
      top_of_book: null,
    };
  },
  methods: {
    format_datetime(obj) {
      if (_.isNil(obj)) return;
      const date = dayjs(obj);
      return date.format("YYYY-MM-DD hh:mm:ss");
    },
    fetch_top_of_book() {
      axios
        .get(
          `${this.prefix}/${this.gateway}/top_of_book/${this.exchange}/${this.symbol}`
        )
        .then((response) => (this.top_of_book = response.data));
    },
  },
  watch: {
    symbol() {
      this.fetch_top_of_book();
    },
    timer() {
      this.fetch_top_of_book();
    },
  },
  mounted: function () {
    this.fetch_top_of_book();
  },
};
</script>

<template>
  <div class="container">
    <h3>Top of Book</h3>
    <div v-if="top_of_book">
      <table>
        <tr v-for="(value, key) in top_of_book.layer" :key="key">
          <td>{{ key }}</td>
          <td>{{ value }}</td>
        </tr>
      </table>
      <div v-if="top_of_book.exchange_time_utc">
        <i
          >Exchange time:
          {{ format_datetime(top_of_book.exchange_time_utc) }}</i
        >
      </div>
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
