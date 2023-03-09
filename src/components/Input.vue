<template>
  <div class="input">
    <span class="prefix">{{ prefix }}</span> <input type="number" :value="modelValue" @input="onChange" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ modelValue?: number; min: number; max?: number; prefix: string }>();
const emits = defineEmits<{ (event: "update:modelValue", v?: number): void }>();

const parseValue = (v: string) => (v ? Math.max(Math.min(parseInt(v), props?.max || Infinity), props.min) : "");

function onChange(e: Event) {
  const $input = e.target as HTMLInputElement;
  const value = parseValue($input.value);
  // fix:输入多次无法同步input问题
  $input.value = `${value}`;
  emits("update:modelValue", value || props.min);
}
</script>

<style lang="less" scoped>
.input {
  display: flex;
  line-height: 30px;
  input {
    height: 30px;
    border: none;
    padding-left: 8px;
    box-sizing: border-box;
    width: 100%;
  }
  border: 1px solid #efefef;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  .prefix {
    padding: 0 8px;
    font-size: 12px;
    color: #666;
    background-color: #efefef;
  }
}
</style>
