<script setup>
defineProps({
  stroke: { type: String, default: 'currentColor' },
  fill: { type: String, default: 'none' },
  strokeWidth: { type: [Number, String], default: 2 },
  viewBox: { type: String, default: '0 0 24 24' },
  strokeLinecap: { type: String, default: 'round' },
  strokeLinejoin: { type: String, default: 'round' },
  className: { type: String, default: '' },
});
</script>

<template>
  <svg
      :stroke="stroke"
      :fill="fill"
      :stroke-width="strokeWidth"
      :viewBox="viewBox"
      :stroke-linecap="strokeLinecap"
      :stroke-linejoin="strokeLinejoin"
      :class="className"
      xmlns="http://www.w3.org/2000/svg"
  >
    <slot></slot>
  </svg>
</template>

<style scoped lang="scss">

</style>