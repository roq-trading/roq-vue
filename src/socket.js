import {reactive, ref, shallowRef} from 'vue';

const shared = reactive({
  services: [],
  name: '',
  resources: {},
  next_request_id: 0,
});

const create_url = () => {
  if (typeof import.meta.env.VITE_ROQ_URL === 'undefined') {
    const protocol = window.location.protocol == 'https' ? 'wss' : 'ws';
    const hostname = window.location.hostname;
    const port = window.location.port;
    return protocol + '://' + hostname + ':' + port + '/roq/';
  } else {
    return `${import.meta.env.VITE_ROQ_URL}`;
  }
};

const create_socket = () => {
  const url = create_url();
  const socket = new WebSocket(url);

  socket.onopen = (event) => {
    console.log('open');
    const request = [
      'login',
      'roq-vue',
    ];
    console.log('request:', request);
    const message = JSON.stringify(request);
    event.target.send(message);
  };

  socket.onclose = (event) => {
    console.log('close');
    shared.services = [];
    shared.name = '';
    shared.resources = {};
  };

  const schema_to_ag_grid_column_defs = (schema) => {
    const get_type = (type) => {
      switch (type) {
        case 'bool':
          return 'boolean';
        case 'int16':
        case 'uint16':
        case 'int32':
        case 'uint32':
        case 'int64':
        case 'uint64':
        case 'double':
          return 'number';
        case 'string':
          return 'text';
        case 'date':
        case 'datetime':
          return 'dateString';
        default:
          return type;
      }
    };
    const get_filter = (type) => {
      switch (type) {
        case 'boolean':
          return 'agTextColumnFilter';
        case 'number':
          return 'agNumberColumnFilter';
        case 'text':
          return 'agTextColumnFilter';
        case 'dateString':
          return 'agDateColumnFilter';
        default:
          return type;
      }
    };
    const callback = (item) => {
      const type = get_type(item.type);
      return {
        headerName: item.field,
        field: item.field,
        type: type,
        enableCellChangeFlash: true,
        filter: get_filter(type),
        // rowGroup: item.key,  // XXX enterprise, only
      };
    };
    return schema.map(callback);
  };

  socket.onmessage = (event) => {
    // console.log('data:', event.data);
    const message = JSON.parse(event.data);
    // console.log('message:', message);
    const method = message[0];
    if (method == 'ack') {
      console.log('message:', message);
      const action = message[1];
      if (action == 'login' && shared.name.length > 0) {
        const request = [
          'subscribe',
          name,
        ];
        console.log(request);
        const message = JSON.stringify(request);
        console.log(message);
        event.target.send(message);
      }
    } else if (method == 'snapshot') {
      const resource = message[1];
      const rows = message[2];
      if (resource == 'services') {
        shared.services = rows;
      } else {
        const helper = () => {
          if (message.length < 4) return [];
          const schema = message[3];
          return schema_to_ag_grid_column_defs(schema);
        };
        const columns = helper();
        shared.resources[resource] = [columns, rows];
      }
    } else if (method == 'update') {
      const resource = message[1];
      const rows = message[2];
      if (resource == 'services') {
        shared.services = rows;
      } else {
        if (resource in shared.resources) {
          const tmp = Array.from(shared.resources[resource][1]);
          for (const item of rows) {
            const index = tmp.findIndex((obj) => {
              return item._id === obj._id;
            });
            if (index < 0) {
              tmp.push(item);
            } else {
              tmp[index] = item;
            }
          }
          shared.resources[resource][1] = tmp;
        } else {
          console.error('UNEXPECTED !!!');
          shared.resources[resource] = [{}, rows];
        }
        // console.log(resource, shared.resources[resource]);
      }
    }
  };

  return socket;
};

var socket = create_socket();

const send = (request) => {
  if (socket.readyState !== socket.OPEN) return;
  console.log('request:', request);
  const message = JSON.stringify(request);
  socket.send(message);
};

const subscribe = (name) => {
  console.log('name:', name);
  shared.name = name;
  const request = [
    'subscribe',
    name,
  ];
  send(request);
};

const unsubscribe = (name) => {
  shared.name = '';
  shared.resources = {};
  const request = [
    'unsubscribe',
    name,
  ];
  send(request);
};

const request = (resource, name, action) => {
  const opaque = ++shared.next_request_id;
  const request = [
    'request',
    resource,
    opaque,
    name,
    action,
  ];
  send(request);
  // this.shared.request = true;
};

export {shared, subscribe, unsubscribe, request};
