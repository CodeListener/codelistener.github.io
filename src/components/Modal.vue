<template>
  <teleport to="body">
    <transition name="fade">
      <div class="modal" v-if="_visible">
        <div class="modal-body">
          <slot />
          <div class="btns">
            <Button type="primary" @click="onOk">确定</Button>
            <Button @click="onCancel">取消</Button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import Button from "./Button.vue";
const props = withDefaults(defineProps<{ visible?: boolean }>(), { visible: false });
const _visible = ref(props.visible);

const emits = defineEmits<{ (event: "onCancel"): void; (event: "onOk"): void; (event: "update:visible", v: boolean): void }>();

function close() {
  _visible.value = false;
  emits("update:visible", false);
}
function onOk() {
  close();
  emits("onOk");
}
function onCancel() {
  close();
  emits("onCancel");
}
watch(
  () => props.visible,
  (v) => (_visible.value = v)
);
</script>
<style lang="less" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  .modal-body {
    position: fixed;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    background-color: #fff;
    border-radius: 8px;
    padding: 40px;
    .btns {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 20px;
      .btn {
        flex: 1 1 100px;
      }
      .btn + .btn {
        margin-left: 10px;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
