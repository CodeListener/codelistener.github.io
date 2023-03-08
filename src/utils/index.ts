// const O_SECOND = 90;
// const O_MINUTE = 90;
// const O_HOUR = 36;
// const O_MONTHS = 18;
// const O_MONTH_ITEMS = [44, 42, 48, 40, 48, 44, 40, 44, 42, 40, 40, 42, 44, 48, 42, 40, 44, 38];
// const O_ONE_DAY_SECONDS = O_HOUR * O_MINUTE * O_SECOND;
// const O_ONE_YEAR_SECONDS = O_MONTH_ITEMS.reduce((prev, cur) => prev + cur * O_ONE_DAY_SECONDS, 0);

// function getOToEarthTime(year, month, day, hour, minute, second) {
//   const curYearMonths = O_MONTH_ITEMS.slice(0, month - 1);
//   // 到上一年已流失的时间
//   const toPreTotalSeconds = O_ONE_YEAR_SECONDS * (year - 1);
//   // 今年已经流逝的时间
//   const curYearPrevMonthTotalSeconds = curYearMonths.reduce((prev, days) => prev + days * O_ONE_DAY_SECONDS, 0);
//   // 今年这个月流逝的时间
//   const curMonthSeconds = (day - 1) * O_ONE_DAY_SECONDS + hour * minute * second;
//   // 转成地球时间流逝的时间戳
//   return ((toPreTotalSeconds + curYearPrevMonthTotalSeconds + curMonthSeconds) / 0.5) * 1000;
// }

// // 以地球时间为基准单位计算出时间差
// const DELTA = Math.abs(getOToEarthTime(2804, 18, 31, 2, 2, 88) - new Date("1970-1-1 12:00:00").getTime());

// console.log("地球时间：", new Date("1970-1-1 12:00:00"));
// console.log("某行星相对地球时间：", new Date(getOToEarthTime(2804, 18, 31, 2, 2, 88)));
// console.log("时间差：", DELTA);
