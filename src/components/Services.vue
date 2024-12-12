<script setup>
import { AgGridVue } from "ag-grid-vue3";
import ControlService from "./ControlService.vue";
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
        { headerName: 'description', field: 'systemd.description', },
        { headerName: 'load_state', field: 'systemd.load_state', },
        { headerName: 'unit_file_state', field: 'systemd.unit_file_state', },
        { headerName: 'active_state', field: 'systemd.active_state', },
        { headerName: 'active_enter_timestamp', field: 'systemd.active_enter_timestamp', valueFormatter: (node) => format_datetime(node.value), },
        { cellRenderer: ControlService, cellRendererParams: { shared: this.shared, }, },
      ],
      defaultColDef: {
        flex: 1,
        resizable: true,
        editable: false,
      },
      context: {
        control: this.control,
      },
    };
  },
  methods: {
    control(action, name) {
      var request = [
        'systemd',
        'control',
        name,
        action.toLowerCase(),
      ];
      var message = JSON.stringify(request);
      console.log(message);
      this.shared.socket.send(message);
      this.shared.request = true;
    },
    getRowStyle(params) {
      // red: #ff4500
      // grey: #d7d6d2
      // orange: #f0af0d
      // dark-grey: #99969f
      // red: #7f0102
      // blue: #16304b
      if (params.data.systemd.load_state != 'loaded')
        return {'background':'#7f0102'};
      if (params.data.systemd.active_state == 'active')
        return {'background':'#16304b'};
    },
  },
};
</script>

<template>
  <div class="container">
    <div v-if="shared.services">
      <h3>systemd</h3>
      <div class="grid">
        <ag-grid-vue
          style="width: 100%; height: 200px"
          class="ag-theme-alpine-dark"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :getRowStyle="getRowStyle"
          :rowData="shared.services"
          :context="context"
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
