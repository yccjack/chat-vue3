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
    <foo-tool
    :desk-app="deskApp"
    :show-clear="showClear"
    :theme="theme"
    @change_theme="changeTheme"
    @clear_chat_list="clearConversations"
    ></foo-tool>
  </nav>
</template>
<script setup>


import {onMounted, ref, watch,computed} from 'vue';
import axios from "axios";

import FooTool from "./fooTool.vue";

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
  } ,
  //角色id
  characterId: {
    type: Number,
    default: -1
  }
});
const emit = defineEmits(['update_parent_new_chat', 'update_parent_openSidebar', "clear_current_chat", "update_theme"]);
const conversations = ref([]);
const theme = ref('light');
const oldConv = ref(null);
const deskApp = ref("");
const apiUrl = ref(__APP_API_RUI__);
const isFlowSystemTheme = ref(false);
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
  if(conversations.value.length<=0){
    return;
  }
  const conversationIds = conversations.value.map(conversation => conversation.id);
  const data = {
    "ids": conversationIds
  };
  conversations.value.map(conversation => {
    localStorage.removeItem("conversation_map" + conversation.id);
  });
  axios.post(`${apiUrl.value}/chat/clear`, data)
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
  conversations.value = JSON.parse(convs)
  console.log("conv="+conversations.value+"localConvs="+convs)
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
  if (!loadConv) {
    return;
  }
  emit('update_parent_openSidebar', conv, loadConv);
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
const showClear = computed(() => {
  console.log(conversations.value);
 return  conversations.value.length> 0
});
onMounted(async () => {
  isFlowSystemTheme.value = "true"===localStorage.getItem("isFlowSystemTheme");
  deskApp.value = `https://gschaos.club/update_file/Y-Chat_${appVersion.value}_x64_zh-CN.msi`
  let theme = detectSystemTheme();
  if(!theme){
    theme = localStorage.getItem("theme") || "light";
  }
  if(isFlowSystemTheme.value){
    changeTheme(theme);
  }
  loadConversations();

});
</script>
<style scoped lang="scss">

</style>