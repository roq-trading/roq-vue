<script setup>
import axios from "axios";
import { get_prefix, format_helper } from "./Format";
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
      session: null,
    };
  },
  methods: {
    fetch_session() {
      axios
        .get(`${get_prefix()}/${this.gateway}/api/session`)
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
        <td v-if="key === 'event_logs'">
          <div v-for="(value_2, key_2) in value" :key="key_2">
            <p>{{ value_2 }} [{{ key_2 }}]</p>
          </div>
        </td>
        <td v-else>{{ value }}</td>
      </tr>
      <!--- host.network --->
      <tr v-for="(value, key, index) in session.host.network" :key="key">
        <td v-if="index === 0">network</td>
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
      <!--- process --->
      <tr v-for="(value, key, index) in session.process" :key="key">
        <td v-if="index === 0">process</td>
        <td v-else></td>
        <td>{{ key }}</td>
        <td>{{ format_helper(key, value) }}</td>
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
td:nth-child(1),
td:nth-child(2) {
  color: #d7d6d2;
}
</style>
