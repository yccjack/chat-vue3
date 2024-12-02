<script setup>
import {getCurrentWindow} from '@tauri-apps/api/window';
import {Menu, MenuItem, Submenu} from '@tauri-apps/api/menu';
import {listen} from '@tauri-apps/api/event';

// 监听菜单点击事件
listen('menu-open', () => {
  console.log('打开菜单被点击');
  // 执行打开文件的逻辑
});

listen('menu-save', () => {
  console.log('保存菜单被点击');
  // 执行保存文件的逻辑
});

listen('menu-exit', () => {
  console.log('退出菜单被点击');
  // 执行退出逻辑
});

async function createMenu() {
  const fileMenu = await Submenu.new({
    id: 'file-menu',
    text: '文件',
    items: [
      await MenuItem.new({ id: 'open', text: '打开' }),
      await MenuItem.new({ id: 'save', text: '保存' }),
    ],
  });

  const editMenu = await Submenu.new({
    id: 'edit-menu',
    text: '编辑',
    items: [
      await MenuItem.new({ id: 'undo', text: '撤销' }),
      await MenuItem.new({ id: 'redo', text: '重做' }),
    ],
  });

  const menu = await Menu.new({
    id: 'main-menu',
    items: [fileMenu, editMenu],
  });

  console.log('菜单创建成功', menu);
}

createMenu();

await getCurrentWindow().close();
</script>
<template>
  <div>
    <h1>欢迎使用 Tauri 应用</h1>
    <p>菜单已加载，请通过菜单栏操作。</p>
  </div>
</template>

<style scoped lang="scss">

</style>