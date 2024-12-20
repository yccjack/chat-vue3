<script setup>
import { ref, watch, toRefs} from 'vue';
import {Window} from '@tauri-apps/api/window';
import { register } from '@tauri-apps/plugin-global-shortcut';
const props = defineProps({
  //发生的新对话标题
  theme: {
    type: String,
    default: "light"
  },
});

const {theme} = toRefs(props);
watch(theme, (newVal, oldVal) => {
  console.log('Theme changed from', oldVal, 'to', newVal);
});

register('CommandOrControl+Alt+Q', () => {
  const visible = appWindow.isVisible();
  if (visible) {
    appWindow.show();
    appWindow.setFocus();
  } else {
    appWindow.show();
  }
});

// 创建一个 Window 实例
const appWindow = new Window('main');

// 控制弹窗显示的状态
const showModal = ref(false);

// 处理最小化操作
const handleMinimize = () => {
  appWindow.hide();
  localStorage.setItem("canTray","true");
  showModal.value = false;  // 关闭弹窗
};

// 处理最大化操作
const handleMaximize = () => {
  appWindow.toggleMaximize();
  showModal.value = false;  // 关闭弹窗
};

// 处理关闭操作
const handleClose = () => {
  let canTray = localStorage.getItem("canTray");
  if("true"===canTray){
    handleMinimize();
  }else{
    showModal.value = true;  // 显示弹窗
  }
};

// 选择关闭窗口
const confirmClose = () => {
  localStorage.removeItem("canTray");
  appWindow.close();
  showModal.value = false;  // 关闭弹窗
};

// 取消操作，关闭弹窗
const cancelAction = () => {
  showModal.value = false;  // 关闭弹窗
};

</script>

<template>
  <div data-tauri-drag-region class="titlebar" :class="{ 'bg-gray-800': theme==='dark', 'bg-white': theme==='light' }"
  >

    <!-- 最小化按钮 -->
    <div
        class="titlebar-button"
        title="最小化"
        @click="handleMinimize"
    >
      <img
          src="https://api.iconify.design/mdi:window-minimize.svg"
          alt="minimize"
      />
    </div>
    <!-- 最大化按钮 -->
    <div
        class="titlebar-button"
        title="最大化"
        @click="handleMaximize"
    >
      <img
          src="https://api.iconify.design/mdi:window-maximize.svg"
          alt="maximize"
      />
    </div>
    <!-- 关闭按钮 -->
    <div
        class="titlebar-button"
        title="关闭"
        @click="handleClose"
    >
      <img
          src="https://api.iconify.design/mdi:close.svg"
          alt="close"
      />
    </div>
  </div>

  <!-- 弹窗 -->
  <div v-if="showModal" class="modal-overlay">
    <div class="card">
      <p class="cookieHeading">是否关闭</p>
      <p class="cookieDescription">选择最小化按钮后台或者关闭 .</p>
      <div class="buttonContainer">
        <button class="acceptButton" @click="handleMinimize">最小化托盘</button>
        <button class="acceptButton" @click="confirmClose">关闭</button>
        <button class="acceptButton" @click="cancelAction">取消</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(252, 252, 252);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

</style>
