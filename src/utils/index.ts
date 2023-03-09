export function dateToString(date: DateTimeData, format: string = "yyyy-MM-dd hh:mm:ss") {
  const { year, month, day, hour, minute, second } = date;
  format = format
    .replace("yyyy", fullZero(year))
    .replace("MM", fullZero(month))
    .replace("dd", fullZero(day))
    .replace("hh", fullZero(hour))
    .replace("mm", fullZero(minute))
    .replace("ss", fullZero(second));
  return format;
}
export function fullZero(v: number) {
  return `${v}`.padStart(2, "0");
}
