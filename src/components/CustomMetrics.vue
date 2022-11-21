<script setup>
import axios from "axios";
defineProps({
  gateway: {
    type: String,
    required: true,
  },
  user: {
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
      custom_metrics: null,
    };
  },
  methods: {
    fetch_custom_metrics() {
      axios
        .get(`${this.prefix}/${this.gateway}/custom_metrics/${this.user}`)
        .then(
          (response) =>
            (this.custom_metrics = response.data)
        );
    },
  },
  watch: {
    symbol() {
      this.fetch_custom_metrics();
    },
    timer() {
      this.fetch_custom_metrics();
    },
  },
  mounted: function () {
    this.fetch_custom_metrics();
  },
};
</script>

<template>
  <div class="container">
    <h3>Custom Metrics</h3>
    <table v-if="custom_metrics">
      <tr v-for="item in custom_metrics" :key="item">
        <!--- v-for="(key, value) in item.measurements" --->
        <td>{{ item.label }}</td>
        <td>{{ item.account }}</td>
        <td>{{ item.exchange }}</td>
        <td>{{ item.symbol }}</td>
        <td>{{ key }}</td>
        <td>{{ value }}</td>
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
