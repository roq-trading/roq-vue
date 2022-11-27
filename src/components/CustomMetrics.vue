<script setup>
import axios from "axios";
import { create_url } from "@/components/Utils";
defineProps({
  gateway: {
    type: String,
    required: false,
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
      custom_metrics: null,
    };
  },
  methods: {
    fetch_custom_metrics() {
      const path = `/api/custom_metrics/${this.user}?recursive=true`;
      const url = create_url(path, this.gateway);
      axios
        .get(url)
        .then((response) => (this.custom_metrics = response.data))
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) this.custom_metrics = null;
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
