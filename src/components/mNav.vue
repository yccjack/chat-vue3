<template>
  <!-- 菜单导航 -->
  <nav class="flex h-full flex-1 flex-col space-y-1 p-2">
    <a @click.stop="newChat"
       class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 cursor-pointer text-sm mb-2 flex-shrink-0 border "
       :class="{' text-black/50 border-black/10':theme==='light','text-white border-white/20': theme==='dark'}"
    >
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
           stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
           xmlns="http://www.w3.org/2000/svg">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      新的对话
    </a>

    <!-- 对话列表 -->
    <div class="flex-col flex-1 overflow-y-auto border-b"
         :class="{' border-black/10':theme==='light',' border-white/20': theme==='dark'}"
    >
      <div class="flex flex-col  gap-2 text-sm "
           :class="{' text-black/50':theme==='light','text-gray-100': theme==='dark'}"
      >
        <template v-for="(convs, cidx) in conversations">

          <div v-if="convs.editable"
               class="m-focus flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer hover:pr-14 break-all pr-14 "
               :class="{'bg-gray-200 hover:bg-gray-200':theme==='light','bg-gray-800 hover:bg-gray-800': theme==='dark'}"
          >
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                 stroke-linecap="round"
                 stroke-linejoin="round" class="h-4 w-4 flex-shrink-0" height="1em" width="1em"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <input id="titleInput" v-model="convTitletmp" @blur="titleInputBlur(cidx, convs)"
                   type="text" class="text-sm border-none bg-transparent p-0 m-0 w-full mr-0"
                   autofocus="true">
            <div class="absolute flex right-1 z-10 text-gray-300 visible">
              <button @click="changeConvTitle(cidx, convs)" class="p-1 hover:text-white">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                     stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                     xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
              <button @click="cancelChangeConvTitle(cidx, convs)" class="p-1 hover:text-white">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                     stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                     xmlns="http://www.w3.org/2000/svg">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <a v-else-if="convs.delete" @blur="cancelDelConv(cidx, convs)"
             class="m-focus flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 bg-gray-800 hover:bg-gray-800 group">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                 stroke-linecap="round"
                 stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                 xmlns="http://www.w3.org/2000/svg">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path
                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            <div class="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">删除 "{{
                convs.title
              }}"?
              <div class="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-800"></div>
            </div>
            <div class="absolute flex right-1 z-10 text-gray-300 visible">
              <button @click="delConv(cidx)" class="p-1 hover:text-white">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                     stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                     xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
              <button @click="cancelDelConv(cidx, convs)" class="p-1 hover:text-white">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                     stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                     xmlns="http://www.w3.org/2000/svg">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </a>


          <a v-else @click.stop.prevent="selectConversation(convs, true)"
             :class="{ 'bg-gray-600 hover:bg-gray-800 pr-14  dark:bg-white/10': convs.selected&&theme==='dark', 'hover:bg-[#2A2B32] hover:pr-4': theme==='dark'&&!convs.selected ,
              'bg-red-100 hover:bg-white/20 pr-14  dark:bg-white/10': convs.selected&&theme==='light', ' hover:bg-white/20 hover:pr-4': theme==='light'&&!convs.selected}"
             class="flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all group shadow-md border border-black/10">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                 stroke-linecap="round"
                 stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z">
              </path>
            </svg>
            <div class="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative  ">
              {{ convs.title }}
            </div>
            <div v-show="convs.selected" class="absolute flex right-1 z-10  visible"
                 :class="{' text-gray-800':theme==='light','text-gray-300': theme==='dark'}"
            >
              <button @click="editTitle(cidx, convs)" class="p-1 hover:text-white">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                     stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>
              <button @click="convs.delete = true" class="p-1 hover:text-white">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                     stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                     xmlns="http://www.w3.org/2000/svg">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                  </path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </a>

        </template>

      </div>
    </div>

    <a v-if="conversations.length>0" @click.stop.prevent="clearConversations"
       class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 cursor-pointer text-sm"
       :class="{' text-black/50':theme==='light','text-white': theme==='dark'}"
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
    <a v-if="theme === 'light'" @click="changeTheme('dark')"
       class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 cursor-pointer text-sm"
       :class="{' text-black/50':theme==='light','text-white': theme==='dark'}"
    >
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
           stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      暗黑主题
    </a>

    <a v-if="theme === 'dark'" @click="changeTheme('light')"
       class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200  cursor-pointer text-sm"
       :class="{' text-black/50':theme==='light','text-white': theme==='dark'}"
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

    <a href="https://gschaos.club" target="_blank"
       class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 cursor-pointer text-sm"
       :class="{' text-black/50':theme==='light','text-white': theme==='dark'}"
    >
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
           stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
      首页 &amp; FAQ</a>

    <a v-if="!isTauri.call()" :href="deskApp" target="_blank"
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
    <!-- 只在 Update 被成功导入时才渲染 -->
    <Suspense v-if="Update">
      <template #default>
        <component :is="Update"/>
      </template>
      <template #fallback>
        <div>Loading...</div> <!-- 可选的加载提示 -->
      </template>
    </Suspense>
  </nav>
</template>
<script setup>

import {isTauri} from "@tauri-apps/api/core";
import {onMounted, ref, watch, nextTick} from 'vue';
import axios from "axios";

const Update = ref(null);

const appVersion = ref(__APP_VERSION__);
const convTitletmp = ref('');
// 获取传递的 prop
const props = defineProps({
  //发生的新对话标题
  newConv: {
    type: Object,
    default: {}
  },
  //新对话内容的长度
  conversationLen: {
    type: Number,
    default: 0
  },
  //是否存在来自sidebar的引用
  sidebarNewChat: {
    type: Number,
    default: 0
  }
});
const emit = defineEmits(['update_parent_new_chat', 'update_parent_openSidebar', "clear_current_chat", "update_theme"]);
const conversations = ref([]);
const theme = ref('light');
const oldConv = ref(null);
const deskApp = ref("");
const apiUrl = ref();
const characterValue = ref(props.characterId);

function changeTheme(newTheme) {
  theme.value = newTheme;
  const html = document.documentElement; // 获取 <html> 元素
  html.classList.remove('light', 'dark');
  html.classList.add(newTheme);
  html.style.colorScheme = newTheme;
  localStorage.setItem('theme', newTheme);
  emit("update_theme", newTheme)
}

function clearConversations() {
  const conversationIds = conversations.value.map(conversation => conversation.id);
  const data = {
    "ids": conversationIds
  };
  axios.post(`https://${apiUrl.value}/chat/clear`, data)
      .then((result) => {

      })
      .catch((err) => {
      });
  conversations.value = []
  saveConversations();
  emit('clear_current_chat');
}


function titleInputBlur(idx, conv) {
  setTimeout(() => {
    cancelChangeConvTitle(idx, conv);
  }, 100);
}

function cancelChangeConvTitle(idx, conv) {
  conv.editable = false;
  conversations.value[idx] = conv;
}

function editTitle(idx, conv) {
  convTitletmp.value = conv.title;
  conv.editable = true;
  conversations.value[idx] = conv;
  setTimeout(() => {
    document.getElementById("titleInput").focus();
  }, 150)
}

function loadConversations() {
  let convs = localStorage.getItem("conversations") || "[]";
  let latestSelect = localStorage.getItem("conversations_latest_select");
  let jsonData = JSON.parse(convs);
  conversations.value = jsonData
  if (latestSelect) {
    for (let idx in jsonData) {
      const conv = jsonData[idx];
      if (latestSelect === conv.id) {
        selectConversation(conv, true)
        break
      }
    }

  }


}

function changeConvTitle(idx, conv) {
  conv.title = convTitletmp.value;
  saveConversations();
  cancelChangeConvTitle(idx, conv)
}

function saveConversations() {
  const conversations_put = JSON.parse(JSON.stringify(conversations.value));
  for (let idx in conversations_put) {
    const conv = conversations_put[idx];
    delete conv.editable;
    delete conv.selected;
    delete conv.delete;
  }
  let convs = JSON.stringify(conversations_put);
  localStorage.setItem("conversations", convs);
}

function cancelDelConv(idx, conv) {
  conv.delete = false;
  conversations.value[idx] = conv;
}

function delConv(cidx) {
  conversations.value.splice(cidx, 1);
  saveConversations();
}

function selectConversation(conv, loadConv) {
  // 如果 oldConv 已经有值，且 oldConv.value 不是 null，则将其 selected 设置为 false
  if (oldConv.value !== null && oldConv.value !== undefined) {
    oldConv.value.selected = false;
  }
  conv.selected = true
  oldConv.value = conv;
  document.title = conv.title || "Y-Chat";
  localStorage.setItem("conversations_latest_select", conv.id);
  if (!loadConv) {
    return;
  }
  // 使用 nextTick 确保父组件已经渲染完毕
  nextTick(() => {
    emit('update_parent_openSidebar', conv, loadConv);
  });
}

//触发新对话，
function newChat() {
  if (props.conversationLen === 0) {
    return
  }
  document.title = "新的对话";
  for (let idx in conversations.value) {
    var conv = conversations.value[idx];
    delete conv.editable;
    delete conv.selected;
    delete conv.delete;
  }
  emit('update_parent_new_chat', "");
}

// 函数：检测系统主题
function detectSystemTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
// 观察 popupShow prop 的变化
watch(() => props.newConv, (val) => {
  conversations.value.unshift(val);
  saveConversations();
  selectConversation(val, false)
});
// 观察 popupShow prop 的变化
watch(() => props.sidebarNewChat, (val) => {
  //如果是来自sidebar触发的newChat事件，这里需要将选中数据解除，但是不需要通知父组件，通知由sidebar执行
  document.title = "新的对话";
  for (let idx in conversations.value) {
    var conv = conversations.value[idx];
    delete conv.editable;
    delete conv.selected;
    delete conv.delete;
  }
});
// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  const newTheme = e.matches ? 'dark' : 'light';
  changeTheme(newTheme);
});
onMounted(async () => {
  if (isTauri.call()) {
    import("../components/Update.vue").then((module) => {
      Update.value = module.default;
    });
  }
  apiUrl.value = __APP_API_RUI__;
  deskApp.value = `https://gschaos.club/update_file/Y-Chat_${appVersion.value}_x64_zh-CN.msi`
  let theme = detectSystemTheme();
  if(!theme){
    theme = localStorage.getItem("theme") || "light";
  }
  changeTheme(theme);
  loadConversations();
});
</script>
<style scoped lang="scss">

</style>