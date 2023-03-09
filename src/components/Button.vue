<template>
  <button class="btn" :class="type"><slot /></button>
</template>
<script setup lang="ts">
withDefaults(defineProps<{ type?: "primary" | "default" }>(), {
  type: "default",
});
</script>
<style lang="less" scoped>
.btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  color: #fff;
  display: block;
  cursor: pointer;
  color: #333;
  background-color: #fff;
  border: 1px solid #ccc;
  &:hover {
    opacity: 0.8;
  }
  &.primary {
    background-color: #0088ff;
    color: #fff;
    border: 1px solid #0088ff;
  }
}
</style>
