<script setup>
import axios from "axios";
import { AgGridVue } from "ag-grid-vue3";
import {
  create_url,
  parameters_headers,
  get_ag_grid_column_defs,
} from "@/components/Utils";
defineProps({
  gateway: {
    type: String,
    required: false,
  },
  user: {
    type: String,
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
      // data
      parameters: null,
      // ag-grid
      columnDefs: get_ag_grid_column_defs(parameters_headers),
      defaultColDef: {
        flex: 1,
        resizable: true,
        editable: true,
      },
    };
  },
  methods: {
    // data
    fetch_parameters() {
      const path = `/api/parameters?user=${this.user}&recursive=true`;
      const url = create_url(path, this.gateway);
      axios
        .get(url)
        .then((response) => (this.parameters = response.data))
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) this.parameters = null;
            else console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error:", error.message);
          }
        });
    },
    // ag-grid
    on_model_updated(params) {
      var columns = [];
      params.columnApi.getColumns().forEach(function (column) {
        columns.push(column.colId);
      });
      params.columnApi.autoSizeColumns(columns);
    },
    cell_value_changed(params) {
      console.log(params);
      console.log("row index", params.rowIndex);
      console.log("row data", params.data);
      console.log("col field", params.colDef.field);
      console.log("new value", params.newValue);
      console.log("old value", params.oldValue);
    },
    is_row_selectable(params) {
      return !!params.data;
    },
  },
  watch: {
    user() {
      this.fetch_parameters();
    },
  },
  mounted: function () {
    this.fetch_parameters();
  },
};
</script>

<template>
  <div class="container">
    <h3>Parameters</h3>
    <div v-if="parameters">
      <div class="grid">
        <ag-grid-vue
          style="width: 100%; height: 200px"
          class="ag-theme-alpine-dark"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :rowData="parameters"
          :suppressRowClickSelection="true"
          :isRowSelectable="is_row_selectable"
          @modelUpdated="on_model_updated"
          @cellValueChanged="cell_value_changed"
        >
        </ag-grid-vue>
      </div>
      <a href=""> Submit</a>
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
</style>
