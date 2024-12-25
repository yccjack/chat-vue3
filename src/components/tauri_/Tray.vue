<!--<script setup>-->
<!--import { TrayIcon } from '@tauri-apps/api/tray';-->
<!--import { defaultWindowIcon } from '@tauri-apps/api/app';-->
<!--import { Menu } from '@tauri-apps/api/menu';-->
<!--import {getCurrentWindow } from '@tauri-apps/api/window';-->
<!--const appWin = getCurrentWindow();-->
<!--const menu = await Menu.new({-->
<!--  items: [-->
<!--    {-->
<!--      id: 'open',-->
<!--      text: '打开主界面[ctrl+alt+q]',-->
<!--      action: () => {-->
<!--        const visible = appWin.isVisible();-->
<!--        if (visible){-->
<!--          appWin.show();-->
<!--          appWin.setFocus();-->
<!--        }-->
<!--      },-->
<!--    },-->
<!--    {-->
<!--      id: 'quit',-->
<!--      text: '退出',-->
<!--      action: () => {-->
<!--        localStorage.removeItem("canTray");-->
<!--        tray.close();-->
<!--        appWin.close();-->
<!--      },-->
<!--    },-->
<!--  ],-->
<!--});-->
<!--const options = {-->
<!--  icon: await defaultWindowIcon(),-->
<!--  menu,-->
<!--  menuOnLeftClick: false, // 禁止左键显示菜单-->
<!--  action: (event) => {-->
<!--    switch (event.type) {-->
<!--      case 'Click':-->
<!--        if(event.button ==='Left'){-->
<!--          const visible = appWin.isVisible();-->
<!--          if (visible) {-->
<!--            appWin.show();-->
<!--            appWin.setFocus();-->
<!--          } else {-->
<!--            appWin.show();-->
<!--          }-->
<!--        }-->
<!--        break;-->
<!--      case 'DoubleClick':-->
<!--        if(event.button ==='Left'){-->
<!--          const visible = appWin.isVisible();-->
<!--          if (visible) {-->
<!--            appWin.show();-->
<!--            appWin.setFocus();-->
<!--          } else {-->
<!--            appWin.show();-->
<!--          }-->
<!--        }-->
<!--        break;-->
<!--    }-->
<!--  },-->
<!--};-->
<!--const tray = await TrayIcon.new(options);-->

<!--</script>-->

<!--<template>-->

<!--</template>-->

<!--<style scoped lang="scss">-->

<!--</style>-->