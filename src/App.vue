<script setup lang="ts">
import useExoplanetClock from "./hooks/useExoplanetClock";
const clock = useExoplanetClock({ year: 2804, month: 18, day: 31, hour: 2, minute: 2, second: 88 });
clock.renderClock(200, 200);
</script>

<template></template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
