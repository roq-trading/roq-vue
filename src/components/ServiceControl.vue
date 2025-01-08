<script setup>
import { AgGridVue } from "ag-grid-vue3";
import StartService from "./StartService.vue";
import StopService from "./StopService.vue";
import { shared, request } from "@/socket";
import { useRouter } from "vue-router";

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
      router: useRouter(),
      gridOptions: {
        autoSizeStrategy: {
          type: "fitCellContents",
        },
        alwaysShowHorizontalScroll: true,
        alwaysShowVerticalScroll: true,
        onCellClicked: (event) => {
          switch (event.column.colId) {
            case '0':
            case '1':
              break;
            default:
              this.router.push(event.data.name);
          }
        },
      },
      columnDefs: [
        { cellRenderer: StartService, cellRendererParams: { shared: this.shared, }, },
        { cellRenderer: StopService, cellRendererParams: { shared: this.shared, }, },
        { headerName: 'name', field: 'name', 
          cellRenderer: (params) => {
                    const route = {
                                name: "service",
                                params: { name: params.value }
                              };

                    const link = document.createElement("a");
                    link.href = this.$router.resolve(route).href;
                    link.innerText = params.value;
                    link.addEventListener("click", e => {
                                e.preventDefault();
                                this.$router.push(route);
                              });
                    return link;
                }
        },
        { headerName: 'description', field: 'systemd.description', },
        { headerName: 'active_state', field: 'systemd.active_state', cellClassRules: {
          'inactive': params => params.value == 'inactive',
          'bad': params => params.value == 'failed',
          },
        },
        { headerName: 'active_enter_timestamp', field: 'systemd.active_enter_timestamp', },
        { headerName: 'load_state', field: 'systemd.load_state', cellClassRules: {
          'bad': params => params.value == 'not-found',
          },
        },
        { headerName: 'unit_file_state', field: 'systemd.unit_file_state', cellClassRules: {
          'bad': params => params.value == 'disabled',
          },
        },
      ],
      defaultColDef: {
        flex: 1,
        resizable: true,
        editable: false,
      },
      name: null,
      context: {
        submit: (name, action) => {
          request('control', name, action.toLowerCase());
        },
      },
    };
  },
  methods: {
    request(name, action) {
      const request = [
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
    rowSelected(params) {
      this.name = params.node.isSelected() ? params.data.name : null;
    },
  },
};
</script>

<template>
  <div class="container">
    <div v-if="shared.services">
      <h3>Service Control</h3>
      <div class="grid">
        <ag-grid-vue
          style="width: 100%; height: 200px"
          class="ag-theme-alpine-dark"
          :gridOptions="gridOptions"
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
