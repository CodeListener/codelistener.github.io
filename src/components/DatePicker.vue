<template>
  <div class="container">
    <Input prefix="年" v-model="date.year" :min="2804" />
    <Input prefix="月" v-model="date.month" :min="1" :max="36" />
    <Input prefix="日" v-model="date.day" :min="1" :max="31" />
    <Input prefix="时" v-model="date.hour" :min="0" />
    <Input prefix="分" v-model="date.minute" :min="0" />
    <Input prefix="秒" v-model="date.second" :min="0" />
  </div>
  <button class="confirm" @click="onConfirm">确认</button>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import Input from "./Input.vue";

const date = reactive({
  year: 2804,
  month: 18,
  day: 31,
  hour: 2,
  minute: 5,
  second: 88,
});

const emits = defineEmits<{ (event: "confirm", v: DateTimeData): void }>();

function onConfirm() {
  emits("confirm", date);
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  justify-self: center;
  .input {
    flex: 1;
  }
}
.confirm {
  width: 100%;
  height: 30px;
  display: flex;
  border: none;
  background-color: #0088ff;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
  max-width: 200px;
}
</style>
