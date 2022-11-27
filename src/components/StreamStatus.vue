<script setup>
import axios from "axios";
import _ from "lodash";
import { create_url, split_supports } from "@/components/Utils";
defineProps({
  gateway: { type: String, required: false },
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
      stream_status: null,
    };
  },
  methods: {
    fetch_stream_status() {
      const path = "/api/stream_status?recursive=true";
      const url = create_url(path, this.gateway);
      axios
        .get(url)
        .then((response) => {
          this.stream_status = _.sortBy(response.data, [
            function (obj) {
              return obj.stream_id;
            },
          ]);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) this.stream_status = null;
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
        <td>{{ split_supports(item.supports) }}</td>
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
  border-collapse: collapse;
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
.ready {
  background-color: green;
}
.not_ready {
  background-color: yellow;
}
</style>
