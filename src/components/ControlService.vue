<script setup>
</script>

<script>
export default {
  methods: {
    control(event) {
      // console.log(this.params);
      var action = event.target.textContent;
      var id = this.params.data.name;
      this.params.context.control(action, id);
    },
  },
};
</script>

<template>
  <div v-if="params.data.systemd.load_state == 'loaded'">
    <div v-if="params.data.systemd.active_state == 'inactive'">
      <button @click="control" :disabled="params.shared.request">START</button>
    </div>
    <div v-if="params.data.systemd.active_state == 'active'">
      <button @click="control" :disabled="params.shared.request">STOP</button>
      <button @click="control" :disabled="params.shared.request">RESTART</button>
    </div>
  </div>
</template>
