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
    <div class="button-group">
      <div class="button-container">
        <a title="清空对话" @click.stop.prevent="clearChatList">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
               stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
               xmlns="http://www.w3.org/2000/svg">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
            </path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </a>
        <a title="暗黑主题" v-show="theme === 'light'" @click="changeTheme('dark')">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
               stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </a>

        <a title="高亮主题" v-show="theme === 'dark'" @click="changeTheme('light')">
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
        </a>
        <a :title="isFlowSystemTheme ? '取消主题跟随系统' : '主题跟随系统'"  @click="flowSystemTheme(!isFlowSystemTheme)">
          <svg v-show="!isFlowSystemTheme" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16 16H13L10.8368 13.3376C9.96488 13.7682 8.99592 14 8 14C6.09909 14 4.29638 13.1557 3.07945 11.6953L0 8L3.07945 4.30466C3.14989 4.22013 3.22229 4.13767 3.29656 4.05731L0 0H3L16 16ZM5.35254 6.58774C5.12755 7.00862 5 7.48941 5 8C5 9.65685 6.34315 11 8 11C8.29178 11 8.57383 10.9583 8.84053 10.8807L5.35254 6.58774Z" fill="#000000"/>
            <path d="M16 8L14.2278 10.1266L7.63351 2.01048C7.75518 2.00351 7.87739 2 8 2C9.90091 2 11.7036 2.84434 12.9206 4.30466L16 8Z" fill="#000000"/>
          </svg>
          <svg v-show="isFlowSystemTheme" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 8L3.07945 4.30466C4.29638 2.84434 6.09909 2 8 2C9.90091 2 11.7036 2.84434 12.9206 4.30466L16 8L12.9206 11.6953C11.7036 13.1557 9.90091 14 8 14C6.09909 14 4.29638 13.1557 3.07945 11.6953L0 8ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" fill="#000000"/>
          </svg>
        </a>

        <a title="作者主页" href="https://gschaos.club" target="_blank">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
               stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>

        <a title="桌面端下载" v-if="!isTauri()" :href="deskApp" target="_blank">
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
        </a>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
/* From Uiverse.io by SoloResearchLab */
.button-group {
  display: flex;
  border-radius: 10px;
}

.button-container {
  display: flex;
  width: 100%;
  padding: 10px; /* 1.5rem */
  border-radius: 10px;
}

.button-container a {
  color: #3b82f6; /* light-blue-light */
  border: 2px solid transparent;
  display: inline-flex;
  align-items: center;
  margin-right: 5px; /* 4 * 5 (assuming 1 unit = 5px) */
  padding: 10px; /* 2.5 * 4 */
  background-color: #f3f4f6; /* light-secondary */
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 9999px;
  font-size: 14px;
  text-align: center;
  transition: all 0.2s ease;
}

.button-container a:last-child {
  margin-right: 0;
}

.button-container a:hover {
  color: black;
  border-color: #3b82f6; /* light-blue-light */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.button-container a svg {
  width: 15px; /* 5 * 4 */
  height: 15px;
  fill: currentColor;
}

/* Dark Mode Styles */
@media (prefers-color-scheme: dark) {
  .button-group {
    background-color: #1f2937; /* box-dark */
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.5),
    0px 2px 4px -1px rgba(0, 0, 0, 0.3);
  }

  .button-container {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .button-container a {
    color: #9ca3af; /* gray-400 */
    background-color: #374151; /* button-curved-default-dark */
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  }

  .button-container a:hover,
  .button-container a:focus,
  .button-container a:active {
    background-color: #4b5563; /* button-curved-pressed-dark */
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
    0px 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}

</style>