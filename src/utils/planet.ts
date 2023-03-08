function getDays(year: number, month: number) {
  const date = new Date(year, month, 0);
  return date.getDate();
}

export const EarthSetting: ClockSetting = {
  SECONDS: 60,
  MINUTES: 60,
  HOURS: 24,
  DURATION: 1000,
  // 每月天数
  get MONTH_ITEMS() {
    const curYear = new Date().getFullYear();
    const months = Array.from({ length: 12 }).map((_, month) => getDays(curYear, month));
    return months;
  },
  // 一天秒数
  get ONE_DAY_SECONDS() {
    return this.HOURS * this.MINUTES * this.SECONDS;
  },
  // 一年秒数
  get ONE_YEAR_SECONDS() {
    return this.MONTH_ITEMS.reduce((prev, cur) => prev + cur * this.ONE_DAY_SECONDS, 0);
  },
};

export const ExoplaneSetting: ClockSetting = {
  // 1分钟90秒
  SECONDS: 90,
  // 1小时90分钟
  MINUTES: 90,
  // 1天36小时
  HOURS: 36,
  DURATION: EarthSetting.DURATION * 0.5,
  // 每月天数
  MONTH_ITEMS: [44, 42, 48, 40, 48, 44, 40, 44, 42, 40, 40, 42, 44, 48, 42, 40, 44, 38],
  // 一天秒数
  get ONE_DAY_SECONDS() {
    return this.HOURS * this.MINUTES * this.SECONDS;
  },
  // 一年秒数
  get ONE_YEAR_SECONDS() {
    return this.MONTH_ITEMS.reduce((prev, cur) => prev + cur * this.ONE_DAY_SECONDS, 0);
  },
  //   convertToEarthTime() {},
};
