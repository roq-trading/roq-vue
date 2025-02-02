<script setup>
</script>

<script>
export default {
  methods: {
    request(event) {
      console.log(this.params.data);
      const user = this.params.data.user;
      const action = event.target.textContent;
      const strategy_id = this.params.data.strategy_id;
      this.params.context.submit(user, action, strategy_id);
    },
  },
};
</script>

<template>
  <button @click="request">DISABLE</button>
</template>
