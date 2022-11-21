<script setup>
import axios from "axios";
defineProps({
  gateway: {
    type: String,
    required: true,
  },
});
</script>

<script>
export default {
  data() {
    return {
      prefix: "http://192.168.188.70/roq/gateway",
      session: null,
    };
  },
  methods: {
    fetch_session() {
      axios
        .get(`${this.prefix}/${this.gateway}/session`)
        .then((response) => (this.session = response.data))
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error.response.status);
          }
        });
    },
  },
  mounted: function () {
    this.fetch_session();
  },
};
</script>

<template>
  <div class="container">
    <h3>Session</h3>
    <table v-if="session">
      <!--- package --->
      <tr v-for="(value, key, index) in session.package" :key="key">
        <td v-if="index === 0">package</td>
        <td v-else></td>
        <td>{{ key }}</td>
        <td>{{ value }}</td>
      </tr>
      <!--- config --->
      <tr v-for="(value, key, index) in session.config" :key="key">
        <td v-if="index === 0">config</td>
        <td v-else></td>
        <td>{{ key }}</td>
        <td>{{ value }}</td>
      </tr>
      <!--- session --->
      <tr v-for="(value, key, index) in session.session" :key="key">
        <td v-if="index === 0">session</td>
        <td v-else></td>
        <td>{{ key }}</td>
        <td>{{ value }}</td>
      </tr>
      <!--- host.kernel --->
      <tr v-for="(value, key, index) in session.host.kernel" :key="key">
        <td v-if="index === 0">kernel</td>
        <td v-else></td>
        <td>{{ key }}</td>
        <td>{{ value }}</td>
      </tr>
      <!--- host.network --->
      <tr v-for="(value, key, index) in session.host.network" :key="key">
        <td v-if="index === 0">network</td>
        <td v-else></td>
        <td>{{ key }}</td>
        <td>{{ value }}</td>
      </tr>
      <!--- process --->
      <tr v-for="(value, key, index) in session.process" :key="key">
        <td v-if="index === 0">process</td>
        <td v-else></td>
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
td:nth-child(1),
td:nth-child(2) {
  color: #f0af0d;
}
</style>
