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
    <button @click="control" :disabled="params.shared.request || params.data.systemd.active_state != 'inactive'">START</button>
  </div>
</template>
