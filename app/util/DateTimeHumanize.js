export function humanizedDateTime(date) {
  return humanizedTime(date) + " " + humanizedDate(date);
}

export function humanizedDate(date) {
  let newDate = new Date(date);
  let dateSeparated = [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()];
  return dateSeparated.join(".");
}

export function humanizedTime(date) {
  let newDate = new Date(date);
  let timeSeparated = [newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()];
  return timeSeparated.join(":");
}
