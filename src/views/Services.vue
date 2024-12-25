<script setup>
import ServiceControl from "@/components/ServiceControl.vue";
import { shared } from "@/socket";
</script>

<script>
export default {
};
</script>

<template>
  <div class="title">
    <h2>Services</h2>
    <hr />
  </div>
  <div class="container">
    <div class="view">
      <ServiceControl :shared="shared" />
    </div>
    <div class="view"></div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 0.5em 0.5em 0.5em;
  padding: 0.5em;
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
td {
  padding: 0 0.5em 0 0.5em;
}
td:nth-child(1) {
  color: #f0af0d;
}
button {
  border: 1px solid #7f0102;
  background: black;
  font-size: 1.2em;
}
button a {
  color: #f0af0d;
}
button:hover {
  background: #7f0102;
}
button:hover a {
  color: white;
}
</style>
