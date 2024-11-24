import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);

dayjs.extend(timezone);
dayjs.tz.setDefault("America/Tegucigalpa");

const DATE_FORMAT = "DD/MM/YY HH:mm";

export const formatSubstractDate = (isoDateString) => {
  const date = dayjs(isoDateString);
  return date.subtract(6, "hour").format(DATE_FORMAT);
  // return date.subtract(6, 'hour').format('DD/MM/YY');
};

export const formatDate = (isoDateString) => {
  const date = dayjs(isoDateString);
  return date.format(DATE_FORMAT);
};

export const substractDate = (isoDateString) => {
  const date = dayjs(isoDateString);
  return date.subtract(6, "hour")
};
