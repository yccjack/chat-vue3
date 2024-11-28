<script setup>
import { Window } from '@tauri-apps/api/window';
import {isTauri} from "@tauri-apps/api/core";

const appWindow = new Window('main');
document
    .getElementById('titlebar-minimize')
    ?.addEventListener('click', () => appWindow.minimize());
document
    .getElementById('titlebar-maximize')
    ?.addEventListener('click', () => appWindow.toggleMaximize());
document
    .getElementById('titlebar-close')
    ?.addEventListener('click', () => appWindow.close());
</script>

<template>
  <div data-tauri-drag-region class="titlebar">
    <div class="titlebar-button" id="titlebar-minimize">
      <img
          src="https://api.iconify.design/mdi:window-minimize.svg"
          alt="minimize"
      />
    </div>
    <div class="titlebar-button" id="titlebar-maximize">
      <img
          src="https://api.iconify.design/mdi:window-maximize.svg"
          alt="maximize"
      />
    </div>
    <div class="titlebar-button" id="titlebar-close">
      <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>