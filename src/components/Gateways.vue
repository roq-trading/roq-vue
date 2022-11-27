<script setup>
defineProps({
  gateways: {
    required: false,
  },
});
</script>

<template>
  <div class="container">
    <template v-if="gateways">
      <h3>Gateways</h3>
      <table>
        <tr v-for="item in gateways" :key="item">
          <td>{{ item }}</td>
          <td>
            <RouterLink
              :to="{ name: 'strategy_by_gateway', params: { gateway: item } }"
            >
              strategy
            </RouterLink>
          </td>
          <td>
            <RouterLink
              :to="{ name: 'public_by_gateway', params: { gateway: item } }"
            >
              public
            </RouterLink>
          </td>
          <td>
            <RouterLink
              :to="{ name: 'private_by_gateway', params: { gateway: item } }"
            >
              private
            </RouterLink>
          </td>
          <td>
            <RouterLink
              :to="{ name: 'status_by_gateway', params: { gateway: item } }"
            >
              status
            </RouterLink>
          </td>
        </tr>
      </table>
    </template>
    <template v-else>
      <h3>Gateway</h3>
      <table>
        <tr>
          <td>
            <RouterLink :to="{ name: 'strategy' }"> strategy </RouterLink>
          </td>
          <td>
            <RouterLink :to="{ name: 'public' }"> public </RouterLink>
          </td>
          <td>
            <RouterLink :to="{ name: 'private' }"> private </RouterLink>
          </td>
          <td>
            <RouterLink :to="{ name: 'status' }"> status </RouterLink>
          </td>
        </tr>
      </table>
    </template>
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
a:hover {
  color: white;
}
</style>
