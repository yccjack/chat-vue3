<script setup>
import { TrayIcon } from '@tauri-apps/api/tray';
import { defaultWindowIcon } from '@tauri-apps/api/app';
import { Menu } from '@tauri-apps/api/menu';
import {Window} from '@tauri-apps/api/window';
const menu = await Menu.new({
  items: [
    {
      id: 'quit',
      text: '退出',
      action: () => {
        appWindow.close();
      },
    },
  ],
});
// 创建一个 Window 实例
const appWindow = new Window('main');
const options = {
  icon: await defaultWindowIcon(),
  menu,
  menuOnLeftClick: true
};
const tray = await TrayIcon.new(options);
</script>

<template>

</template>

<style scoped lang="scss">

</style>