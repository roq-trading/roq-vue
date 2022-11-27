<script setup>
import axios from "axios";
import _ from "lodash";
import { create_url, format_helper } from "@/components/Utils";
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
      reference_data: null,
    };
  },
  methods: {
    fetch_reference_data() {
      const path = `/api/reference_data/${this.exchange}/${this.symbol}`;
      const url = create_url(path, this.gateway);
      axios
        .get(url)
        .then(
          (response) =>
            (this.reference_data = _.omit(response.data, [
              "stream_id",
              "exchange",
              "symbol",
            ]))
        )
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) this.reference_data = null;
            else console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error:", error.message);
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
table {
  width: 100%;
  background-color: black;
}
td:nth-child(1) {
  color: #d7d6d2;
}
</style>
