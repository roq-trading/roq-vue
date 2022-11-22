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
      stream_status: null,
    };
  },
  methods: {
    fetch_stream_status() {
      axios
        .get(`${this.prefix}/${this.gateway}/stream_status?recursive=true`)
        .then((response) => (this.stream_status = response.data))
        .catch((error) => {
          if (error.response.status != 404) {
            console.log(error.response.status);
          }
        });
    },
  },
  watch: {
    timer() {
      this.fetch_stream_status();
    },
  },
  mounted: function () {
    this.fetch_stream_status();
  },
};
</script>

<template>
  <div class="container">
    <h3>Stream Status</h3>
    <table v-if="stream_status">
      <tr>
        <th>stream_id</th>
        <th>account</th>
        <th>supports</th>
        <th>transport</th>
        <th>protocol</th>
        <th>encoding</th>
        <th>priority</th>
        <th>connection_status</th>
      </tr>
      <tr v-for="item in stream_status" :key="item">
        <td>{{ item.stream_id }}</td>
        <td>{{ item.account }}</td>
        <td>{{ item.supports }}</td>
        <td>{{ item.transport }}</td>
        <td>{{ item.protocol }}</td>
        <td>{{ item.encoding }}</td>
        <td>{{ item.priority }}</td>
        <td v-if="item.connection_status === 'READY'" class="ready">
          {{ item.connection_status }}
        </td>
        <td v-else class="not_ready">{{ item.connection_status }}</td>
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
.ready {
  background-color: green;
}
.not_ready {
  background-color: yellow;
}
</style>
