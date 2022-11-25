<script setup>
import axios from "axios";
import { create_url } from "../components/Format";
defineProps({
  gateway: {
    type: String,
    required: false,
  },
});
</script>

<script>
export default {
  data() {
    return {
      timer: new Date(),
      accounts: [],
      account: null,
    };
  },
  methods: {
    refresh_timer() {
      setTimeout(() => {
        this.timer = new Date();
        this.refresh_timer();
      }, 5000);
    },
    fetch_accounts() {
      const path = "/api/accounts";
      axios
        .get(create_url(this.gateway, path))
        .then((response) => (this.accounts = response.data));
    },
  },
  mounted: function () {
    this.refresh_timer();
    this.fetch_accounts();
  },
};
</script>

<template>
  <div class="title">
    <h2>Context</h2>
    <hr />
  </div>
  <div class="container">
    <div class="context">
      <div class="selector">
        <h3>Account</h3>
        <select v-model="account" class="form-control" size="4">
          <option v-for="item in accounts" :key="item">{{ item }}</option>
        </select>
      </div>
    </div>
  </div>
  <div class="container">
    <p v-if="account">{{ gateway }} / {{ account }}</p>
    <p v-else>{{ gateway }}</p>
  </div>
  <div class="title" v-if="account">
    <h2>Private</h2>
    <hr />
  </div>
</template>

<style scoped>
select {
  padding: 0.1em 0.5em 0.1em 0.5em;
}
.title {
  width: 100%;
  text-align: center;
}
hr {
  width: 30%;
  margin: auto;
  border-width: 0;
  border-top: 1px solid #f0af0d;
  padding-bottom: 3em;
}

.context {
  padding-bottom: 2em;
  display: flex;
  gap: 2em;
}
.selector {
  vertical-align: text-top;
}
.market {
  display: grid;
  grid-template-columns: 50% 50%;
}
.object {
}
.container {
  margin: 0 0.5em 0.5em 0.5em;
  padding: 0.5em;
}
</style>
