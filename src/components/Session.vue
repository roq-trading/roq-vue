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
    {{ session }}
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
