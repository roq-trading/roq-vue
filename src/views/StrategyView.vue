<script setup>
import axios from "axios";
import Parameters from "../components/Parameters.vue";
import CustomMetrics from "../components/CustomMetrics.vue";
import Orders from "../components/Orders.vue";
import Trades from "../components/Trades.vue";
import { get_prefix } from "../components/Format";
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
      timer: new Date(),
      users: null,
      user: null,
    };
  },
  methods: {
    refresh_timer() {
      setTimeout(() => {
        this.timer = new Date();
        this.refresh_timer();
      }, 5000);
    },
    fetch_users() {
      axios
        .get(`${get_prefix()}/${this.gateway}/api/users`)
        .then((response) => (this.users = response.data));
    },
  },
  watch: {
    exchange() {
      this.fetch_users();
    },
  },
  mounted: function () {
    this.refresh_timer();
    this.fetch_users();
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
        <h3>User</h3>
        <select v-model="user" class="form-control" size="4">
          <option v-for="item in users" :key="item">{{ item }}</option>
        </select>
      </div>
    </div>
  </div>
  <div class="container">
    <p v-if="user">{{ gateway }} / {{ user }}</p>
    <p v-else>{{ gateway }}</p>
  </div>
  <div class="title" v-if="user">
    <h2>Strategy</h2>
    <hr />
  </div>
  <div class="user">
    <div class="object">
      <Parameters :gateway="gateway" :user="user" v-if="user" />
    </div>
    <div class="object">
      <CustomMetrics
        :gateway="gateway"
        :user="user"
        :timer="timer"
        v-if="user"
      />
    </div>
    <div class="object">
      <Orders :gateway="gateway" :user="user" :timer="timer" v-if="user" />
    </div>
    <div class="object">
      <Trades :gateway="gateway" :user="user" :timer="timer" v-if="user" />
    </div>
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
.user {
  display: grid;
  grid-template-columns: 100%;
}
.object {
}
.container {
  margin: 0 0.5em 0.5em 0.5em;
  padding: 0.5em;
}
</style>
