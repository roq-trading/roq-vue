<script setup>
</script>

<script>
export default {
  methods: {
    request(event) {
      // console.log(this.params);
      const name = this.params.data.name;
      const action = event.target.textContent;
      this.params.context.submit(name, action);
    },
  },
};
</script>

<template>
  <div v-if="params.data.systemd.load_state == 'loaded'">
    <button @click="request" :disabled="params.shared.request || params.data.systemd.active_state != 'active'">STOP</button>
  </div>
</template>
