<template>
  <div class="input">
    <span class="prefix">{{ prefix }}</span> <input type="number" :value="modelValue" @change="onChange" :min="min" :max="max" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ modelValue: number; min: number; max?: number; prefix: string }>();
const emits = defineEmits<{ (event: "update:modelValue", v: number): void }>();
function onChange(e: Event) {
  const $input = e.target as HTMLInputElement;
  const value = parseInt($input.value);
  emits("update:modelValue", Number.isNaN(value) ? props.min : value);
}
</script>

<style lang="less" scoped>
.input {
  display: flex;
  align-items: center;
  line-height: 30px;
  input {
    height: 30px;
    border: none;
    width: 100%;
  }
  border: 1px solid #efefef;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  .prefix {
    padding: 0 4px;
    background-color: #efefef;
  }
}
.input + .input {
    margin-left: 4px;
}
</style>
