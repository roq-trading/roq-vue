<script setup>
import axios from "axios";
import { get_prefix, split_supports } from "./Format";
defineProps({
  gateway: {
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
      gateway_status: null,
    };
  },
  methods: {
    fetch_gateway_status() {
      axios
        .get(`${get_prefix()}/${this.gateway}/api/gateway_status?recursive=true`)
        .then((response) => (this.gateway_status = response.data))
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error.response.status);
          }
          this.gateway_status = null;
        });
    },
  },
  watch: {
    timer() {
      this.fetch_gateway_status();
    },
  },
  mounted: function () {
    this.fetch_gateway_status();
  },
};
</script>

<template>
  <div class="container">
    <h3>Gateway Status</h3>
    <table v-if="gateway_status">
      <tr>
        <th>account</th>
        <th>supported</th>
        <th>available</th>
        <th>unavailable</th>
      </tr>
      <tr v-for="item in gateway_status" :key="item">
        <td>{{ item.account }}</td>
        <td>{{ split_supports(item.supported) }}</td>
        <td>{{ split_supports(item.available) }}</td>
        <td>{{ split_supports(item.unavailable) }}</td>
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
