<script setup lang="ts">
import { watch } from "vue";
import useClock from "./hooks/useClock";
import { ExoplaneSetting } from "./utils/planet";
const earthClock = useClock();
const exoplanetClock = useClock({
  title: "外星钟",
  year: 2804,
  month: 18,
  day: 31,
  hour: 2,
  minute: 2,
  second: 88,
  setting: ExoplaneSetting,
  graduation: {
    hour: 18,
    minute: 90,
  },
});
earthClock.renderClock(400, 200, 90);
exoplanetClock.renderClock(400, 200, 90);

const handler = watch(exoplanetClock.clockInfo, (clockInfo) => {
  const { month, year, day, hour, minute, second } = clockInfo;
  console.log(clockInfo);

  const setting = clockInfo.setting;
  // 今年开始到上一个月结束天数
  const curYearMonths = setting.MONTH_ITEMS.slice(0, month - 1);
  // 到上一年已流失的时间
  const toPreTotalSeconds = setting.ONE_YEAR_SECONDS * (year - 1);
  // 今年已经流逝的时间
  const curYearPrevMonthTotalSeconds = curYearMonths.reduce((prev, days) => prev + days * setting.ONE_DAY_SECONDS, 0);
  // 今年这个月流逝的时间
  const curMonthSeconds = (day - 1) * setting.ONE_DAY_SECONDS + hour * minute * second + minute * second + second;
  const timestamp = toPreTotalSeconds + curYearPrevMonthTotalSeconds + curMonthSeconds;
  console.log((timestamp / 0.5) * 1000);

  handler();
});
</script>

<template></template>
