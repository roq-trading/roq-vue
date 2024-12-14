<script setup>
import { AgGridVue } from "ag-grid-vue3";
import {
  format_datetime,
} from "@/components/Utils";

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
      columnDefs: [
        { headerName: 'name', field: 'name', },
        { field: 'session.package.name', },
        { field: 'session.package.version', },
        { field: 'session.package.build_number', },
      ],
      defaultColDef: {
        flex: 1,
        resizable: true,
        editable: false,
      },
    };
  },
};
</script>

<template>
  <div class="container">
    <div v-if="shared.services">
      <h3>Package</h3>
      <div class="grid">
        <ag-grid-vue
          style="width: 100%; height: 200px"
          class="ag-theme-alpine-dark"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="shared.services"
        >
        </ag-grid-vue>
      </div>
    </div>
    <div style="clear: both"></div>
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
button {
  color: red;
}
</style>
