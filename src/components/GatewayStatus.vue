<script setup>
import axios from "axios";
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
      prefix: "http://192.168.188.70/roq/gateway",
      gateway_status: null,
    };
  },
  methods: {
    fetch_gateway_status() {
      axios
        .get(`${this.prefix}/${this.gateway}/gateway_status?recursive=true`)
        .then((response) => (this.gateway_status = response.data))
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error.response.status);
          }
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
        <td>{{ item.supported }}</td>
        <td>{{ item.available }}</td>
        <td>{{ item.unavailable }}</td>
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
