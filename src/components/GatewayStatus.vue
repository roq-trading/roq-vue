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
        .get(`${this.prefix}/${this.gateway}/gateway_status`)
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
td:nth-child(1),
td:nth-child(2) {
  color: #f0af0d;
}
</style>
