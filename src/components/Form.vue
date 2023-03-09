<template>
  <div class="container">
    <Input prefix="年" v-model="date.year" :min="2804" />
    <Input prefix="月" v-model="date.month" :min="1" :max="18" />
    <Input prefix="日" v-model="date.day" :min="1" :max="maxDay" />
    <Input prefix="时" v-model="date.hour" :min="0" :max="36" />
    <Input prefix="分" v-model="date.minute" :min="0" :max="89" />
    <Input prefix="秒" v-model="date.second" :min="0" :max="89" />
  </div>
  <slot />
</template>
<script setup lang="ts">
import { reactive, computed } from "vue";
import { dateToString } from "../utils";
import { ExoplaneSetting } from "../utils/planet";
import Input from "./Input.vue";

const date = reactive({
  ...ExoplaneSetting.baseStartDate,
});

const maxDay = computed(() => {
  return ExoplaneSetting.monthItems[date.month - 1];
});

function validate(date: DateTimeData) {
  if (ExoplaneSetting.getTimestamp(ExoplaneSetting.baseStartDate) > ExoplaneSetting.getTimestamp(date)) {
    return `当前外星钟时间不可小于： ${dateToString(ExoplaneSetting.baseStartDate)}`;
  }
}

function submit(cb: (valid: string | undefined, date: DateTimeData) => void) {
  const msg = validate(date);
  cb(msg, date);
}

defineExpose({
  submit,
});
</script>

<style lang="less" scoped>
.container {
  max-width: 520px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .input {
    flex: 0 1 32%;
  }
  .input:nth-child(n + 4) {
    margin-top: 10px;
  }
}
</style>
