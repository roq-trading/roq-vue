<script setup>
import { AgGridVue } from "ag-grid-vue3";
import { shared, request } from "@/socket";
import { isProxy, toRaw } from 'vue';

const props = defineProps({
  shared: {
    type: Object,
    required: true,
  },
});
</script>

<script>
export default {
  components: {
    AgGridVue,
  },
  data() {
    return {
      gridOptions: {
        autoSizeStrategy: {
          type: "fitCellContents",
        },
      },
      context: {
        request_helper: (category, request_2) => {
          request('parameters', shared.name, request_2);
        },
      },
    };
  },
  methods: {
    getRowId: (params) => params.data._id,
    test_request: (event) => {
      // XXX FIXME DEBUG
      const request_2 = [{
        label: "foo",
        strategy_id: 0,
        account: "",
        exchange: "",
        symbol: "BTC",
        value: Math.random().toString(),
      },{
        label: "bar",
        strategy_id: 0,
        account: "",
        exchange: "",
        symbol: "ETH",
        value: Math.random().toString(),
      }];
      request('parameters', shared.name, request_2);
    },
    onCellValueChanged: (event) => {
      const proxy = isProxy(event.data);
      const data = proxy ? toRaw(event.data) : event.data;
      const request = structuredClone(data);
      delete request._id;
      delete request.user;
      event.context.request_helper('parameters', request);
    },
  },
};
</script>

<template>
  <div class="container">
    <h3>Parameters</h3>
    <div class="grid" v-if="'parameters' in shared.resources">
      <ag-grid-vue
        style="width: 100%; height: 256px;"
        class="ag-theme-alpine-dark"
        :gridOptions="gridOptions"
        :columnDefs="shared.resources.parameters[0]"
        :rowData="shared.resources.parameters[1]"
        :getRowId="getRowId"
        :context="context"
        @cell-value-changed="onCellValueChanged"
      >
      </ag-grid-vue>
    </div>
    <div style="clear: both"></div>
    <button @click="test_request">TEST</button>
  </div>
</template>

<style scoped>
.container {
  margin: 0 0.5em 0.5em 0.5em;
  padding: 0.5em;
  background-color: black;
}
td {
  padding: 0 0.5em 0 0.5em;
}
td:nth-child(1) {
  color: #f0af0d;
}
td:nth-child(2) {
  text-align: right;
}
.grid {
  margin-bottom: 1em;
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
