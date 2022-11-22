import dayjs from "dayjs";
import _ from "lodash";

function format_date(value) {
  if (_.isNil(value)) return;
  const date = dayjs(value);
  return date.format("YYYY-MM-DD");
}

function format_datetime(value) {
  if (_.isNil(value)) return;
  const date = typeof value === "string" ? dayjs(value) : dayjs.unix(value);
  return date.format("YYYY-MM-DD hh:mm:ss");
}

export function format_helper(key, value) {
  if (_.includes(key, "time")) return format_datetime(value);
  if (_.includes(key, "date")) return format_date(value);
  if (typeof value === "number") return `${value}`; // TODO thousand separator
  return value;
}
