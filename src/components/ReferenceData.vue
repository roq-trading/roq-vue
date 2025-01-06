<script setup>
import { AgGridVue } from "ag-grid-vue3";

defineProps({
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
      row_id: null,
      gridOptions: {
        autoSizeStrategy: {
          type: "fitCellContents",
        },
        alwaysShowHorizontalScroll: true,
        alwaysShowVerticalScroll: true,
        onRowClicked: (event) => {
          this.row_id = event.data._id;
        },
      },
    };
  },
  methods: {
    getRowId: (params) => params.data._id,
    close_modal() {
      this.row_id = null;
    },
  },
};
</script>

<template>
  <div @keydown.esc="close_modal" class="container">
    <h3>Reference Data</h3>
    <div class="grid" v-if="'reference_data' in shared.resources">
      <ag-grid-vue
        style="width: 100%; height: 512px;"
        class="ag-theme-alpine-dark"
        :gridOptions="gridOptions"
        :columnDefs="shared.resources.reference_data[0]"
        :rowData="shared.resources.reference_data[1]"
        :getRowId="getRowId"
      >
      </ag-grid-vue>
    </div>
    <div style="clear: both"></div>
  </div>
  <div v-if="row_id && 'reference_data' in shared.resources" class="modal">
    <div class="modal-container" ref="target">
      <h2>Reference Data</h2>
      <table>
        <thead>
          <tr>
            <th>key</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in shared.resources.reference_data[1][row_id]" >
            <td>{{ key }}</td>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
      <div style="text-align: center">
        <button style="position: aboslute; left: 50%" @click="close_modal()">CLOSE</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 0.5em 0.5em 0.5em;
  padding: 0.5em;
  background-color: black;
}
.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: 1024px;
  margin: auto;
  padding: 0.5em;
  background-color: #16304b;
}
table {
  width: 100%;
  background-color: black;
  margin-bottom: 0.5em;
}
td:nth-child(1) {
  color: #d7d6d2;
}
</style>
