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
        .get(
          `${this.prefix}/${this.gateway}/custom_metrics/${this.user}?recursive=true`
        )
        .then((response) => (this.custom_metrics = response.data))
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error.response.status);
          }
          this.custom_metrics = null;
        });
    },
  },
  watch: {
    user() {
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
      <tr>
        <th>label</th>
        <th>account</th>
        <th>exchange</th>
        <th>symbol</th>
        <th>key</th>
        <th>value</th>
      </tr>
      <template v-for="item in custom_metrics" :key="item">
        <tr
          v-for="(measurement, index) in item.measurements"
          :key="measurement"
        >
          <template v-if="index === 0">
            <td>{{ item.label }}</td>
            <td>{{ item.account }}</td>
            <td>{{ item.exchange }}</td>
            <td>{{ item.symbol }}</td>
          </template>
          <template v-else>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </template>
          <td>{{ measurement.name }}</td>
          <td>{{ measurement.value }}</td>
        </tr>
      </template>
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
th,
td {
  padding: 0.2em;
}
th {
  color: #99969f;
  text-align: left;
}
td:nth-child(1) {
  color: #d7d6d2;
}
</style>
