import dayjs from 'dayjs';
import _ from 'lodash';

export function format_date(value) {
  if (_.isNil(value)) return;
  const date = dayjs(value);
  return date.format('YYYY-MM-DD');
}

export function format_datetime(value) {
  if (_.isNil(value)) return;
  if (typeof value === 'string') {
    const data = dayjs(value);
    return date.format('YYYY-MM-DD hh:mm:ss');
  }
  if (value == 0) return '';
  const date = dayjs.unix(value);
  return date.format('YYYY-MM-DD hh:mm:ss');
}

export function format_integer(value) {
  if (_.isNil(value)) return;
  return `${value}`;  // TODO thousand separator
}

export function format_number(value) {
  if (_.isNil(value)) return;
  return `${value}`;  // TODO thousand separator
}

export function format_string(value) {
  if (_.isNil(value)) return;
  return value;
}

export function format_helper(key, value) {
  if (_.includes(key, 'time')) return format_datetime(value);
  if (_.includes(key, 'date')) return format_date(value);
  if (typeof value === 'number') return `${value}`;  // TODO thousand separator
  return value;
}

export function split_supports(value) {
  return _.split(value, '|');
}

export function get_prefix() {
  if (typeof import.meta.env.VITE_ROQ_URL === 'undefined')
    return `${window.location.origin}${import.meta.env.BASE_URL}`;
  return `${import.meta.env.VITE_ROQ_URL}`;
}

export function create_url(path, gateway) {
  const prefix = get_prefix();
  if (typeof gateway === 'undefined') return `${prefix}${path}`;
  return `${prefix}/${gateway}${path}`;
}

// services

export const services_headers = [
  {label: 'name', name: 'name', always: true, formatter: format_string},
  {label: 'id', name: 'systemd.id', always: true, formatter: format_string},
  {
    label: 'description',
    name: 'systemd.description',
    always: true,
    formatter: format_string
  },
  {
    label: 'path',
    name: 'systemd.fragment_path',
    always: true,
    formatter: format_string
  },
  {
    label: 'active_state',
    name: 'systemd.active_state',
    always: true,
    formatter: format_string
  },
  {
    label: 'load_state',
    name: 'systemd.load_state',
    always: true,
    formatter: format_string
  },
  {
    label: 'active_enter_timestamp',
    name: 'systemd.active_enter_timestamp',
    always: true,
    formatter: format_string
  },
];

// parameters

export const parameters_headers = [
  {
    name: 'delete?',
    always: true,
    formatter: format_string,
    checkbox: true,
  },
  {name: 'label', always: true, formatter: format_string},
  {name: 'account', always: true, formatter: format_string},
  {name: 'exchange', always: true, formatter: format_string},
  {name: 'symbol', always: true, formatter: format_string},
  {name: 'value', always: true, formatter: format_string},
];

// custom metrics

export const custom_metrics_headers = [
  {name: 'label', always: true, formatter: format_string},
  {name: 'account', always: true, formatter: format_string},
  {name: 'exchange', always: true, formatter: format_string},
  {name: 'symbol', always: true, formatter: format_string},
  {name: 'key', always: true, formatter: format_string},
  {name: 'value', always: true, formatter: format_number},
];

// order

export const orders_headers = [
  {name: 'account', always: true, formatter: format_string},
  {name: 'order_id', always: true, formatter: format_integer},
  {name: 'exchange', always: true, formatter: format_string},
  {name: 'symbol', always: true, formatter: format_string},
  {name: 'side', always: true, formatter: format_string},
  {name: 'position_effect', always: false, formatter: format_string},
  {name: 'order_type', always: false, formatter: format_string},
  {name: 'time_in_force', always: false, formatter: format_string},
  {
    name: 'execution_instructions',
    always: false,
    formatter: format_string,
  },
  {name: 'order_template', always: false, formatter: format_string},
  {name: 'create_time_utc', always: false, formatter: format_datetime},
  {name: 'update_time_utc', always: false, formatter: format_datetime},
  {name: 'external_account', always: false, formatter: format_string},
  {name: 'external_order_id', always: false, formatter: format_string},
  {name: 'status', always: true, formatter: format_string},
  {name: 'quantity', always: true, formatter: format_number},
  {name: 'price', always: true, formatter: format_number},
  {name: 'stop_price', always: true, formatter: format_number},
  {name: 'remaining_quantity', always: true, formatter: format_number},
  {name: 'traded_quantity', always: true, formatter: format_number},
  {name: 'average_traded_price', always: true, formatter: format_number},
  {name: 'last_traded_quantity', always: false, formatter: format_number},
  {name: 'last_traded_price', always: false, formatter: format_number},
  {name: 'last_liquidity', always: false, formatter: format_string},
  {name: 'routing_id', always: false, formatter: format_string},
  {name: 'max_request_version', always: false, formatter: format_integer},
  {
    name: 'max_response_version',
    always: false,
    formatter: format_integer,
  },
  {
    name: 'max_accepted_version',
    always: false,
    formatter: format_integer,
  },
];

export function get_orders_headers(reduced) {
  if (reduced) {
    return _.reduce(orders_headers, (result, item) => {
      if (item.always) result.push(item);
      return result;
    }, []);
  } else {
    return orders_headers;
  }
}

// trades

export const trades_headers = [
  {name: 'account', always: true, formatter: format_string},
  {name: 'order_id', always: true, formatter: format_integer},
  {name: 'exchange', always: true, formatter: format_string},
  {name: 'symbol', always: true, formatter: format_string},
  {name: 'side', always: true, formatter: format_string},
  {name: 'position_effect', always: false, formatter: format_string},
  {name: 'create_time_utc', always: false, formatter: format_datetime},
  {name: 'update_time_utc', always: false, formatter: format_datetime},
  {name: 'external_account', always: false, formatter: format_string},
  {name: 'external_order_id', always: false, formatter: format_string},
  {name: 'external_trade_id', always: false, formatter: format_string},
  {name: 'quantity', always: true, formatter: format_number},
  {name: 'price', always: true, formatter: format_number},
  {name: 'liquidity', always: true, formatter: format_string},
  {name: 'routing_id', always: false, formatter: format_string},
];

export function get_trades_headers(reduced) {
  if (reduced) {
    return _.reduce(trades_headers, (result, item) => {
      if (item.always) result.push(item);
      return result;
    }, []);
  } else {
    return trades_headers;
  }
}

// ag-grid

export function get_ag_grid_column_defs(headers) {
  return _.reduce(headers, (result, item) => {
    const has_checkbox = typeof item.checkbox !== 'undefined';
    result.push({
      headerName: item.label,
      field: item.name,
      headerTooltip: item.name,
      valueFormatter: (node) => item.formatter(node.value),
      // headerCheckboxSelection: has_checkbox,
      // checkboxSelection: has_checkbox,
      // showDisabledCheckboxes: has_checkbox,
    });
    return result;
  }, []);
}
