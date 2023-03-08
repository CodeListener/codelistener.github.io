<script setup lang="ts">
import useExoplanetClock from "./hooks/useExoplanetClock";
const clock = useExoplanetClock({ year: 2804, month: 18, day: 38, hour: 11, minute: 88, second: 5 });
clock.renderClock(400, 200, 90);
</script>

<template>
</template>

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
