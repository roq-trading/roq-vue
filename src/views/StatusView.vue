<script setup>
import Session from "@/components/Session.vue";
import StreamStatus from "@/components/StreamStatus.vue";
import GatewayStatus from "@/components/GatewayStatus.vue";
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
    };
  },
  methods: {
    refresh_timer() {
      setTimeout(() => {
        this.timer = new Date();
        this.refresh_timer();
      }, 5000);
    },
  },
  mounted: function () {
    this.refresh_timer();
  },
};
</script>

<template>
  <div class="title">
    <h2>Status</h2>
    <hr />
  </div>
  <div class="container">
    <div class="object">
      <GatewayStatus :gateway="gateway" :timer="timer" />
    </div>
    <div class="object">
      <StreamStatus :gateway="gateway" :timer="timer" />
    </div>
    <div class="object">
      <Session :gateway="gateway" :timer="timer" />
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
