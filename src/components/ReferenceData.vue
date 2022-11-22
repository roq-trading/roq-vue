<script setup>
import axios from "axios";
import _ from "lodash";
import { format_helper } from "./Format";
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
      reference_data: null,
    };
  },
  methods: {
    fetch_reference_data() {
      axios
        .get(
          `${this.prefix}/${this.gateway}/reference_data/${this.exchange}/${this.symbol}`
        )
        .then(
          (response) =>
            (this.reference_data = _.omit(response.data, [
              "stream_id",
              "exchange",
              "symbol",
            ]))
        )
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error.response.status);
          }
        });
    },
  },
  watch: {
    symbol() {
      this.fetch_reference_data();
    },
    timer() {
      this.fetch_reference_data();
    },
  },
  mounted: function () {
    this.fetch_reference_data();
  },
};
</script>

<template>
  <div class="container">
    <h3>Reference Data</h3>
    <table v-if="reference_data">
      <tr v-for="(value, key) in reference_data" :key="key">
        <td>{{ key }}</td>
        <td v-if="typeof value === 'number'" style="text-align: right">
          {{ format_helper(key, value) }}
        </td>
        <td v-else>{{ format_helper(key, value) }}</td>
      </tr>
    </table>
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
