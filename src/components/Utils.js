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
