<script setup>
import axios from "axios";
import dayjs from "dayjs";
import _ from "lodash";
import { get_prefix } from "./Format";
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
      statistics: null,
    };
  },
  methods: {
    format_datetime(obj) {
      if (_.isNil(obj)) return;
      const date = dayjs(obj);
      return date.format("YYYY-MM-DD hh:mm:ss");
    },
    fetch_statistics() {
      axios
        .get(
          `${get_prefix()}/${this.gateway}/statistics/${this.exchange}/${
            this.symbol
          }`
        )
        .then((response) => (this.statistics = response.data))
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error.response.status);
          }
        });
    },
  },
  watch: {
    symbol() {
      this.fetch_statistics();
    },
    timer() {
      this.fetch_statistics();
    },
  },
  mounted: function () {
    this.fetch_statistics();
  },
};
</script>

<template>
  <div class="container">
    <h3>Statistics</h3>
    <div v-if="statistics">
      <table>
        <tr v-for="item in statistics.statistics" :key="item">
          <td>{{ item.type }}</td>
          <td>{{ item.value }}</td>
          <td>{{ format_datetime(item.begin_time_utc) }}</td>
          <td>{{ format_datetime(item.end_time_utc) }}</td>
        </tr>
      </table>
      <div v-if="statistics.exchange_time_utc">
        <i
          >Exchange time: {{ format_datetime(statistics.exchange_time_utc) }}</i
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
table {
  width: 100%;
  background-color: black;
}
td:nth-child(1) {
  color: #d7d6d2;
}
</style>
