<script setup lang="ts">
import { onMounted, ref } from "vue";
import useClock from "./hooks/useClock";
import { ExoplaneSetting } from "./utils/planet";
import DatePicker from "./components/DatePicker.vue";

const earthClockControl = ref<ClockControl>();
const exoplanetClockControl = ref<ClockControl>();
const exoplaneConvertWidthEarthClockControl = ref<ClockControl>();

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
const exoplaneConvertWidthEarthClock = useClock({ title: "外星钟 -> 地球时间" });

// 转成地球时间
function convertTimeWidthEarth(date: DateTimeData) {
  const exoplaneBaseTime = { year: 2804, month: 18, day: 31, hour: 2, minute: 2, second: 88 };
  const earthBaseTime = { year: 1970, month: 1, day: 1, hour: 12, minute: 0, second: 0 };

  const baseTimestamp = ExoplaneSetting.getTimestamp(exoplaneBaseTime);
  const curTimestamp = ExoplaneSetting.getTimestamp(date);

  const delta = curTimestamp - baseTimestamp;
  if (delta < 0) {
    console.log("小于范围");
    // 小于起始时间直接返回地球起始时间
    return earthBaseTime;
  }

  // 转成地球时间戳差值
  const transformTimestamp = Math.floor(delta / 2) * 1000;

  const eartchDate = new Date(`${earthBaseTime.year}-${earthBaseTime.month}-${earthBaseTime.day} ${earthBaseTime.hour}:${earthBaseTime.minute}:${earthBaseTime.second}`);
  const resultDate = new Date(eartchDate.getTime() + transformTimestamp);

  return {
    year: resultDate.getFullYear(),
    month: resultDate.getMonth() + 1,
    day: resultDate.getDate(),
    hour: resultDate.getHours(),
    minute: resultDate.getMinutes(),
    second: resultDate.getSeconds(),
  };
}

onMounted(() => {
  earthClockControl.value = earthClock.renderClock(400, 200, 90, "#earth");
  exoplanetClockControl.value = exoplanetClock.renderClock(400, 200, 90, "#exoplane", () => {});
  exoplaneConvertWidthEarthClockControl.value = exoplaneConvertWidthEarthClock.renderClock(400, 200, 90, "#exoplane-earth");
  // 同步到【外星钟->地球】时间
  exoplaneConvertWidthEarthClockControl.value.setDateTime(convertTimeWidthEarth(exoplanetClockControl.value.getDateTime()));
});

const changeTime = (res: DateTimeData) => {
  exoplanetClockControl.value?.setDateTime(res);
  // 同步到【外星钟->地球】时间
  exoplaneConvertWidthEarthClockControl.value!.setDateTime(convertTimeWidthEarth(res));
};
</script>

<template>
  <DatePicker @confirm="changeTime" />
  <div class="clocks">
    <div id="exoplane"></div>
    <div id="exoplane-earth"></div>
    <div id="earth"></div>
  </div>
</template>

<style>
canvas {
  max-width: 300px;
  width: 100%;
}
.clocks {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
