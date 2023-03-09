function getDays(year: number, month: number) {
  const date = new Date(year, month, 0);
  return date.getDate();
}

// 获取外星时间戳
function getExoplaneTiemstamp(date: DateTimeData) {
  const { year, month, day, hour, minute, second } = date;
  const yearTimestamp = (year - 1) * ExoplaneSetting.oneYearSeconds;
  const monthTimestamp = ExoplaneSetting.monthItems.slice(0, month - 1).reduce((prev, days) => prev + days * ExoplaneSetting.oneDaySeconds, 0);
  const dayTimestamp = (day - 1) * ExoplaneSetting.oneDaySeconds;
  const hourTimestamp = hour === 0 ? 0 : (hour - 1) * ExoplaneSetting.oneHourSeconds;
  const minuteTimestamp = minute === 0 ? 0 : (minute - 1) * ExoplaneSetting.seconds;
  const secondTimestamp = second;
  return yearTimestamp + monthTimestamp + dayTimestamp + hourTimestamp + minuteTimestamp + secondTimestamp;
}

export const EarthSetting: ClockSetting = {
  baseStartDate: {
    year: 1970,
    month: 1,
    day: 1,
    hour: 12,
    minute: 0,
    second: 0,
  },
  seconds: 60,
  minutes: 60,
  hours: 24,
  duration: 1000,
  get oneHourSeconds() {
    return 3600;
  },
  // 每月天数
  get monthItems() {
    const curYear = new Date().getFullYear();
    const months = Array.from({ length: 12 }).map((_, month) => getDays(curYear, month));
    return months;
  },
  // 一天秒数
  get oneDaySeconds() {
    return this.hours * this.minutes * this.seconds;
  },
  // 一年秒数
  get oneYearSeconds() {
    return this.monthItems.reduce((prev, cur) => prev + cur * this.oneDaySeconds, 0);
  },
  getTimestamp(date) {
    const result = new Date(`${date.year}-${date.month}-${date.day} ${date.hour}:${date.minute}:${date.second}`);
    return result.getTime();
  },
};

export const ExoplaneSetting: ClockSetting = {
  baseStartDate: {
    year: 2804,
    month: 18,
    day: 31,
    hour: 2,
    minute: 2,
    second: 88,
  },
  // 1分钟90秒
  seconds: 90,
  // 1小时90分钟
  minutes: 90,
  // 1天36小时
  hours: 36,
  duration: EarthSetting.duration * 0.5,
  // 每月天数
  monthItems: [44, 42, 48, 40, 48, 44, 40, 44, 42, 40, 40, 42, 44, 48, 42, 40, 44, 38],
  // 一小时秒数
  get oneHourSeconds() {
    return this.minutes * this.seconds;
  },
  // 一天秒数
  get oneDaySeconds() {
    return this.hours * this.minutes * this.seconds;
  },
  // 一年秒数
  get oneYearSeconds() {
    return this.monthItems.reduce((prev, cur) => prev + cur * this.oneDaySeconds, 0);
  },
  getTimestamp: getExoplaneTiemstamp,
  //   convertToEarthTime() {},
};
