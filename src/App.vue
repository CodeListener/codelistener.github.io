<script setup lang="ts">
import { onMounted, ref } from "vue";
import useClock from "./hooks/useClock";
import { ExoplaneSetting } from "./utils/planet";
import { dateToString } from "./utils";
import Form from "./components/Form.vue";
import Modal from "./components/Modal.vue";
import Button from "./components/Button.vue";

const earthClockControl = ref<ClockControl>();
const exoplanetClockControl = ref<ClockControl>();
const exoplaneToEarthClockControl = ref<ClockControl>();

// 地球时钟
const earthClock = useClock();
// 外星钟
const exoplanetClock = useClock({
  title: "外星钟",
  setting: ExoplaneSetting,
  // 时钟刻度
  graduation: {
    hour: 18,
    minute: 90,
  },
  ...ExoplaneSetting.baseStartDate,
});
// 外星同步到地球钟
const exoplaneToEarthClock = useClock({ title: "外星钟 -> 地球时间" });

const modalVisible = ref(false);

const form = ref<InstanceType<typeof Form>>();
const noticeForm = ref<InstanceType<typeof Form>>();
// 转成地球时间
function convertTimeWidthEarth(date: DateTimeData) {
  const exoplaneBaseTime = { year: 2804, month: 18, day: 31, hour: 2, minute: 2, second: 88 };
  const earthBaseTime = { year: 1970, month: 1, day: 1, hour: 12, minute: 0, second: 0 };

  const baseTimestamp = ExoplaneSetting.getTimestamp(exoplaneBaseTime);
  const curTimestamp = ExoplaneSetting.getTimestamp(date);

  const delta = curTimestamp - baseTimestamp;
  if (delta < 0) {
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

function onOk() {
  noticeForm.value?.submit((errMsg, date) => {
    if (errMsg) {
      alert(errMsg);
      return;
    }
    exoplanetClockControl.value!.addNotice(date);
  });
}
function showModal() {
  modalVisible.value = true;
}
function onSubmit() {
  form.value?.submit((errMsg, date) => {
    if (errMsg) {
      alert(errMsg);
      return;
    }
    exoplanetClockControl.value?.setDateTime(date);
    // 同步到【外星钟->地球】时间
    exoplaneToEarthClockControl.value!.setDateTime(convertTimeWidthEarth(date));
  });
}
onMounted(() => {
  earthClockControl.value = earthClock.renderClock(400, 200, 90, "#earth");
  exoplanetClockControl.value = exoplanetClock.renderClock(400, 200, 90, "#exoplane", (notice) => {
    alert(`时间到: ${dateToString(notice[0])}`);
  });
  exoplaneToEarthClockControl.value = exoplaneToEarthClock.renderClock(400, 200, 90, "#exoplane-earth");
  // 同步到【外星钟->地球】时间
  exoplaneToEarthClockControl.value.setDateTime(convertTimeWidthEarth(exoplanetClockControl.value.getDateTime()));
});
</script>

<template>
  <div class="main">
    <div class="clocks">
      <div class="clocks">
        <div id="exoplane"></div>
        <div id="exoplane-earth"></div>
        <div id="earth"></div>
      </div>
    </div>
    <div class="form">
      <ul v-if="exoplanetClock.notices.value.length">
        <li v-for="(notice, index) in exoplanetClock.notices.value">闹钟-{{ index + 1 }} {{ dateToString(notice) }}</li>
      </ul>
      <h3>外星钟时钟设置</h3>
      <Form ref="form">
        <div class="btns">
          <Button type="primary" class="submit" @click="onSubmit">确认</Button>
          <Button class="set-notice" @click="showModal">设置闹钟</Button>
        </div>
      </Form>
    </div>
  </div>
  <Modal v-model:visible="modalVisible" @on-ok="onOk">
    <Form ref="noticeForm" />
  </Modal>
</template>

<style lang="less">
.main {
  display: flex;
  justify-content: space-between;
  .clocks {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
  }
  .form {
    background-color: #efefef;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
  }
  .btns {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    .btn {
      flex: 1;
    }
    .btn + .btn {
      margin-left: 10px;
    }
  }
}

canvas {
  max-width: 300px;
  width: 100%;
}
</style>
