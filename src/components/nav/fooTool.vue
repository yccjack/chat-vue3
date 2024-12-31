<script setup>
import {ref} from "vue";
import {isTauri} from "@tauri-apps/api/core";
const props = defineProps({
  showClear: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: "light"
  },
  deskApp: {
    type: String,
    default: ""
  }
});
const emit = defineEmits(['clear_chat_list', "change_theme"]);
const isFlowSystemTheme = ref(false);

function changeTheme(arg) {
  emit("change_theme", arg)
}

//主题跟随系统
function flowSystemTheme(isFlow) {
  console.log(isFlow)
  isFlowSystemTheme.value = isFlow;
  localStorage.setItem("isFlowSystemTheme", isFlowSystemTheme.value);
}

function clearChatList() {
  emit("clear_chat_list", true)
}


</script>

<template>
  <div :class="{' text-black/50':theme==='light','text-white': theme==='dark'}">
    <a v-show="showClear" @click.stop.prevent="clearChatList"
       class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 cursor-pointer text-sm"
    >

      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
           stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
           xmlns="http://www.w3.org/2000/svg">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
        </path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
      清空对话
    </a>
    <a v-if="theme === 'light'&&!isFlowSystemTheme" @click="changeTheme('dark')"
       class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 cursor-pointer text-sm"
    >
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
           stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      <button>暗黑主题</button>
    </a>

    <a v-if="theme === 'dark'&&!isFlowSystemTheme" @click="changeTheme('light')"
       class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200  cursor-pointer text-sm"
    >
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
           stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
           xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      高亮主题</a>

    <a @click="flowSystemTheme(!isFlowSystemTheme)"
       class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200  cursor-pointer text-sm"
    >
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
           stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
           xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <span v-show="!isFlowSystemTheme">主题跟随系统变更</span>
      <span v-show="isFlowSystemTheme">取消主题跟随系统</span>
    </a>

    <a href="https://gschaos.club" target="_blank"
       class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 cursor-pointer text-sm"
    >
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
           stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
      首页 &amp; FAQ</a>

    <a v-if="!isTauri()" :href="deskApp" target="_blank"
       class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
           stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
           xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.5"
              d="M22 16.0003V15.0003C22 12.1718 21.9998 10.7581 21.1211 9.8794C20.2424 9.00072 18.8282 9.00072 15.9998 9.00072H7.99977C5.17135 9.00072 3.75713 9.00072 2.87845 9.8794C2 10.7579 2 12.1711 2 14.9981V15.0003V16.0003C2 18.8287 2 20.2429 2.87868 21.1216C3.75736 22.0003 5.17157 22.0003 8 22.0003H16H16C18.8284 22.0003 20.2426 22.0003 21.1213 21.1216C22 20.2429 22 18.8287 22 16.0003Z"
              fill="#1C274C"/>
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12 1.25C11.5858 1.25 11.25 1.58579 11.25 2L11.25 12.9726L9.56943 11.0119C9.29986 10.6974 8.82639 10.661 8.51189 10.9306C8.1974 11.2001 8.16098 11.6736 8.43054 11.9881L11.4305 15.4881C11.573 15.6543 11.781 15.75 12 15.75C12.2189 15.75 12.4269 15.6543 12.5694 15.4881L15.5694 11.9881C15.839 11.6736 15.8026 11.2001 15.4881 10.9306C15.1736 10.661 14.7001 10.6974 14.4305 11.0119L12.75 12.9726L12.75 2C12.75 1.58579 12.4142 1.25 12 1.25Z"
              fill="#1C274C"/>
      </svg>
      <span style="color: #00a67d">桌面端下载地址</span></a>
  </div>
</template>

<style scoped lang="scss">

</style>