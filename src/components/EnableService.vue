<script setup>
</script>

<script>
export default {
  methods: {
    request(event) {
      console.log(this.params.data);
      const user = this.params.data.user;
      const action = event.target.textContent;
      this.params.context.submit(user, action);
    },
  },
};
</script>

<template>
  <button @click="request">ENABLE</button>
</template>
