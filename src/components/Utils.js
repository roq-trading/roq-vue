import dayjs from "dayjs";
import _ from "lodash";

export function format_date(value) {
  if (_.isNil(value)) return;
  const date = dayjs(value);
  return date.format("YYYY-MM-DD");
}

export function format_datetime(value) {
  if (_.isNil(value)) return;
  const date = typeof value === "string" ? dayjs(value) : dayjs.unix(value);
  return date.format("YYYY-MM-DD hh:mm:ss");
}

export function format_integer(value) {
  if (_.isNil(value)) return;
  return `${value}`; // TODO thousand separator
}

export function format_number(value) {
  if (_.isNil(value)) return;
  return `${value}`; // TODO thousand separator
}

export function format_string(value) {
  if (_.isNil(value)) return;
  return value;
}

export function format_helper(key, value) {
  if (_.includes(key, "time")) return format_datetime(value);
  if (_.includes(key, "date")) return format_date(value);
  if (typeof value === "number") return `${value}`; // TODO thousand separator
  return value;
}

export function split_supports(value) {
  return _.split(value, "|");
}

export function get_prefix() {
  if (typeof import.meta.env.VITE_ROQ_URL === "undefined")
    return `${window.location.origin}${import.meta.env.BASE_URL}`;
  return `${import.meta.env.VITE_ROQ_URL}`;
}

export function create_url(path, gateway) {
  const prefix = get_prefix();
  if (typeof gateway === "undefined") return `${prefix}${path}`;
  return `${prefix}/${gateway}${path}`;
}

export const order_headers = [
  { name: "account", always: true, formatter: format_string },
  { name: "order_id", always: true, formatter: format_integer },
  { name: "exchange", always: true, formatter: format_string },
  { name: "symbol", always: true, formatter: format_string },
  { name: "side", always: true, formatter: format_string },
  { name: "position_effect", always: false, formatter: format_string },
  { name: "order_type", always: false, formatter: format_string },
  { name: "time_in_force", always: false, formatter: format_string },
  {
    name: "execution_instructions",
    always: false,
    formatter: format_string,
  },
  { name: "order_template", always: false, formatter: format_string },
  { name: "create_time_utc", always: false, formatter: format_datetime },
  { name: "update_time_utc", always: false, formatter: format_datetime },
  { name: "external_account", always: false, formatter: format_string },
  { name: "external_order_id", always: false, formatter: format_string },
  { name: "status", always: true, formatter: format_string },
  { name: "quantity", always: true, formatter: format_number },
  { name: "price", always: true, formatter: format_number },
  { name: "stop_price", always: true, formatter: format_number },
  { name: "remaining_quantity", always: true, formatter: format_number },
  { name: "traded_quantity", always: true, formatter: format_number },
  { name: "average_traded_price", always: true, formatter: format_number },
  { name: "last_traded_quantity", always: false, formatter: format_number },
  { name: "last_traded_price", always: false, formatter: format_number },
  { name: "last_liquidity", always: false, formatter: format_string },
  { name: "routing_id", always: false, formatter: format_string },
  { name: "max_request_version", always: false, formatter: format_integer },
  {
    name: "max_response_version",
    always: false,
    formatter: format_integer,
  },
  {
    name: "max_accepted_version",
    always: false,
    formatter: format_integer,
  },
];

export function get_order_headers(reduced) {
  if (reduced) {
    return _.reduce(
      order_headers,
      (result, item) => {
        if (item.always) result.push(item);
        return result;
      },
      []
    );
  } else {
    return order_headers;
  }
}

export function get_ag_grid_column_defs(headers) {
  return _.map(headers, (item) => ({
    headerName: item.name,
    field: item.name,
    headerTooltip: item.name,
    valueFormatter: (node) => item.formatter(node.value),
  }));
}
