<script setup>
defineProps({
  gateways: {
    required: true,
  },
});
</script>

<template>
  <div class="container">
    <h3>Gateways</h3>
    <table v-if="gateways">
      <tr v-for="item in gateways" :key="item">
        <td>{{ item }}</td>
        <td>
          <RouterLink :to="{ name: 'strategy', params: { gateway: item } }">
            strategy
          </RouterLink>
        </td>
        <td>
          <RouterLink :to="{ name: 'public', params: { gateway: item } }">
            public
          </RouterLink>
        </td>
        <td>
          <RouterLink :to="{ name: 'private', params: { gateway: item } }">
            private
          </RouterLink>
        </td>
        <td>
          <RouterLink :to="{ name: 'status', params: { gateway: item } }">
            status
          </RouterLink>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.container {
  margin: 0 0.5em 0.5em 0.5em;
  padding: 0.5em;
  background-color: black;
}
tr {
  margin-bottom: 0.5em;
}
td {
  padding: 0 0.5em 0 0.5em;
  font-size: 1.2em;
  line-height: 2em;
  padding-right: 0.5em;
  padding-bottom: 0.5em;
  width: 10em;
}
td:nth-child(1) {
  color: #f0af0d;
}
a {
  display: block;
  border: 1px solid #7f0102;
  background: black;
  text-align: center;
}
a {
  color: #f0af0d;
}
a:hover {
  background: #7f0102;
}
a:hove {
  color: white;
}
</style>
