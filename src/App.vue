<template>
  <div id="__next">
    <!-- 弹窗 -->
    <modalA :popupShow="popupShow" @close="popupShow = false"></modalA>
    <div class="overflow-hidden w-full h-full relative">
      <div class="flex h-full flex-1 flex-col md:pl-[260px]">
        <sidebar
            :title_chat="chatTitle"
            :newConv="pushNewConv"
            :conversationLen="conversation.length"
            @update_parent_new_chat="newChat"
            @update_parent_openSidebar="selectConversation"
        ></sidebar>
        <main class="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
          <!-- 聊天窗 -->
          <div class="flex-1 overflow-hidden">
            <div class="react-scroll-to-bottom--css-ncqif-79elbk h-full dark:bg-gray-800">
              <div ref="chatContainer" class="react-scroll-to-bottom--css-krija-1n7m0yu">
                <div class="flex flex-col items-center text-sm dark:bg-gray-800">
                  <!-- 对话item -->
                  <conversationBox
                      :conversation="conversation"
                  ></conversationBox>
                  <div v-if="conversation.length === 0"
                       class="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100">
<!--                    <announcement @update-chat-msg="updateChatMsg"></announcement>-->
                    <maskBox
                        :characterData="character"
                        @update-chat-msg="updateChatMsg" />
                  </div>

                  <div class="w-full h-32 md:h-48 flex-shrink-0"></div>
                </div>

                <transition name="el-fade-in-linear">
                  <!-- 回到底部 -->
                  <button v-show="isShowGoBottom" @click="handleScrollBottom"
                          class="cursor-pointer absolute right-6 bottom-[124px] md:bottom-[120px] z-10 rounded-full border border-gray-200 bg-gray-50 text-gray-600 dark:border-white/10 dark:bg-white/10 dark:text-gray-200">
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                         stroke-linejoin="round" class="h-4 w-4 m-1" height="1em" width="1em"
                         xmlns="http://www.w3.org/2000/svg">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </button>
                </transition>
              </div>
            </div>
          </div>

          <!-- 底部输入 -->
          <div
              class="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient">
            <form
                class="stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
              <div class="relative flex h-full flex-1 md:flex-col">
                <div class="flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
                  <button v-if="!convLoading && conversation.length > 0" @click.stop.prevent="chatRepeat"
                          id="chatRepeat" class="btn flex justify-center gap-2 btn-neutral border-0 md:border">
                    重新作答
                  </button>

                  <button v-if="convLoading" @click.stop.prevent="stopChat" id="stopChat"
                          class="btn relative btn-neutral border-0 md:border">
                    停止作答
                  </button>

                </div>
                <div
                    class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                    <textarea v-model="chatMsg"
                              ref="inputChat"
                              @keydown="judgeInput"
                              @input="autoResize"
                              tabindex="0"
                              data-id="root"
                              style="overflow-y: hidden; resize: none;"
                              rows="1"
                              class="m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"></textarea>
                  <button @click.stop.prevent="send"
                          :disabled="convLoading"
                          class="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
                    <div v-if="convLoading" class="text-2xl" style="line-height: 1.3rem;">
                      <span class="load_dot1">·</span><span class="load_dot2">·</span><span class="load_dot3">·</span>
                    </div>
                    <svg v-else stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                         stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-1" height="1em" width="1em"
                         xmlns="http://www.w3.org/2000/svg">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
            <div class="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
              <a href="https://gitee.com/MIEAPP/chatai-vue" target="_blank" rel="noreferrer"
                 class="underline"> chatAi </a> 仅供学习 AI 使用。<span style="color: #00e0e0"> 当前版本：{{
                appVersion
              }}</span>
            </div>
          </div>
        </main>
      </div>

      <!-- 菜单导航 -->
      <div class="dark hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col box-sh">
        <div class="flex h-full min-h-0 flex-col ">
          <div class="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
            <mNav
                :newConv="pushNewConv"
                :characterId="currentCharacter"
                :conversationLen="conversation.length"
                @update_parent_new_chat="newChat"
                @update_parent_openSidebar="selectConversation"
                @clear_current_chat="newChat"
            ></mNav>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute top-0 left-0 right-0 z-[2]"></div>
  </div>
  <div portal-container="">
          <span
              class="pointer-events-none fixed inset-0 z-[60] mx-auto my-2 flex max-w-[560px] flex-col items-stretch justify-start md:pb-5">
          </span>
  </div>


</template>


<script setup>
import mNav from "./components/mNav.vue";
import sidebar from "./components/sidebar.vue";
import maskBox from "./components/maskBox.vue";
import conversationBox from "./components/conversationBox.vue";
import {nextTick, onMounted, ref, watch, watchEffect} from "vue";
import './assets/index.css'
import 'highlight.js/styles/github.css';
import modalA from "./components/modalA.vue";
import axios from 'axios';
import clipboard from 'vue-clipboard3'; // 默认导入
import { throttle } from 'lodash';

const updateConversation = throttle(() => {
  conversation.value = [...conversation.value]; // 触发更新
}, 100); // 每 100ms 触发一次
const appVersion = ref(__APP_VERSION__);
const deskApp = ref("https://gschaos.club/update_file/Y-Chat_0.2.6_x64_en-US.msi");
const apiUrl = ref();
const theme = ref('light');
const title = ref("新的对话")
const popupShow = ref(false);
const avatarIdx = ref(1);
const pushNewConv = ref({});
const conversation = ref([]);
const chatMsg = ref('');
const currentCharacter = ref(-1);
const chatTitle = ref('新的对话');
const convLoading = ref(false);
const isShowGoBottom = ref(false);
const inputChat = ref("");
const cid = ref("");

const {toClipboard} = clipboard();
const character = ref([])
const decoder = new TextDecoder("utf-8");
watchEffect(() => {

});

function updateChatMsg(message,character) {
  chatMsg.value = message; // 将子组件传递的值赋值给父组件的 chatMsg
  currentCharacter.value=character
}

function autoResize() {
  const textarea = inputChat.value;
  textarea.style.height = "auto"; // 先重置高度
  textarea.style.height = `${textarea.scrollHeight}px`; // 设置为内容高度
}

function stopChat() {
  axios.post(`${apiUrl.value}/stop/chat/${cid.value}`, {})
      .then((result) => {
        var rconv = conversation.value[conversation.value.length - 1];
        rconv["loading"] = false;
        convLoading.value = false;
      })
      .catch((err) => {
        console.error(err)
      });

}

function changeHeight() {
  var elem = inputChat.value;
  elem.style.height = '24px';
  var scrollHeight = elem.scrollHeight;
  if (24 >= scrollHeight || chatMsg.value.length === 0) {
    resetHeight();
    return;
  }

  elem.style.removeProperty("overflow-y")
  elem.style.height = scrollHeight + 'px';
}

function resetHeight() {
  var elem = inputChat.value;
  elem.style.height = '24px';
  elem.style["overflow-y"] = 'hidden';
}
function getCharacterInfo(){
  axios.post(`${apiUrl.value}/chat/character`, {})
      .then((result) => {
        character.value=result.data.data
      })
      .catch((err) => {
        console.error(err)
      });
}
// vueCopy 方法
const vueCopy = (node) => {
  const code = node.getElementsByTagName("code")[0].innerHTML;
  // 使用 toClipboard 来复制文本
  toClipboard(code)
      .then(() => {

        const svg = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Copied!</span>`;
        const nodeInnerHtml = node.innerHTML;
        node.innerHTML = svg;
        setTimeout(() => {
          node.innerHTML = nodeInnerHtml;
        }, 1000);
      })
      .catch((err) => {
        console.log('复制失败', err);
      });
};

function initConvs(convs) {
  for (let i = 0; i < convs.length; i++) {
    var conv = convs[i];
    if (conv.speaker === "human") {
      continue
    }
    conv["idx"] = conv["speeches"].length - 1;
  }
  return convs;
}

function chatRepeat() {
  if (convLoading.value) {
    return
  }
  convLoading.value = true;
  var rconv = conversation.value[conversation.value.length - 1];
  rconv["idx"] = rconv["suitable"].length;
  rconv["loading"] = true;
  rconv["suitable"].push(0);
  rconv["speeches"].push("");
  try {
    var idx = rconv.idx;
    // 使用 Axios 发送 GET 请求，接收流式数据
    fetch(`${apiUrl.value}/chat/repeat/${cid.value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // 设置为你接口要求的Content-Type
      },
      data:{
        character:conversation[0].characterId
      }
    }).then(response => {
      // 处理流式数据
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      const readStream = () => {
        reader.read().then(({done, value}) => {
          if (done) {
            rconv["loading"] = false;
            convLoading.value = false;
            return;
          }
          const chunk = decoder.decode(value, {stream: true});
          // 直接更新 speeches 数组的第一个元素，确保响应式
          rconv.speeches[idx] += chunk;
          conversation.value[conversation.value.length - 1] = rconv;
          handleScrollBottom();
          readStream();
        });
      };
      readStream();
    });

  } catch (error) {
    console.error('请求失败:', error);
  }
}

function judgeInput(e) {
  if (!e.shiftKey && e.keyCode === 13) {
    e.cancelBubble = true;  //ie阻止冒泡行为
    e.stopPropagation(); //Firefox阻止冒泡行为
    e.preventDefault(); //取消事件的默认动作*换行
    send();
  }
}

function send() {
  if (chatMsg.value.trim().length === 0) {
    return;
  }

  if (convLoading.value) {
    return;
  }

  convLoading.value = true;
  var chat_msg = chatMsg.value;
  chatMsg.value = ""

  var first = conversation.value.length === 0;

  conversation.value.push({
    "speaker": "human",
    "speech": chat_msg
  })

  var conv = {
    "idx": 0,
    "loading": true,
    "speaker": "ai",
    "suitable": [0],
    "speeches": [""],
    "characterId": currentCharacter.value
  }
  conversation.value.push(conv)

  handleScrollBottom();

  try {
    // 使用 Axios 发送 GET 请求，接收流式数据
    fetch(`${apiUrl.value}/chat/${cid.value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // 设置为你接口要求的Content-Type
      }, body: JSON.stringify({
        prompt: chat_msg,
        character: conv.characterId
      })
    }).then(response => {
      // 处理流式数据
      const reader = response.body.getReader();

      const readStream = () => {
        reader.read().then(({done, value}) => {
          if (done) {
            conv["loading"] = false;
            convLoading.value = false;
            return;
          }
          const chunk = decoder.decode(value, {stream: true});
          // 直接更新 speeches 数组的第一个元素，确保响应式
          conv.speeches[0] = conv.speeches[0] + chunk;
          conversation.value[conversation.value.length - 1] = conv;
          conversation.value[conversation.value.length - 1].speeches = [
            ...conversation.value[conversation.value.length - 1].speeches,
          ];
          if (first) {
            var newConv = {
              "id": cid.value,
              "title": title.value,
              "characterId": currentCharacter.value
            };
            generateConvTitle(newConv);
            pushNewConv.value = newConv
            selectConversation(newConv, false);
            // 修正拼写错误
            first = false; // 标记为非首次
          }
          handleScrollBottom();
          readStream();
        });
      };
      readStream();
    });

  } catch (error) {
    console.error('请求失败:', error);
  }
}

function generateConvTitle(conv) {
  //如果服务器响应报文中没有指明事件，默认触发message事件
  var humanSpeek = conversation.value[conversation.value.length - 2].speech
  if (humanSpeek) {
    conv.title = humanSpeek.substring(0, 10);
  }
  selectConversation(conv, false);
}

function newChat() {
  if (conversation.value.length === 0) {
    return
  }
  chatTitle.value = "新的对话";
  loadId()
}

function selectConversation(conv, loadConv = false) {
  chatTitle.value = conv.title || "Y-Chat";
  currentCharacter.value = conv.characterId || -1;
  if (!loadConv) {
    return;
  }
  axios.get(`${apiUrl.value}/conv/${conv.id}`)
      .then((result) => {
        var resp = result.data;
        var content = resp.data;

        cid.value = conv.id;
        conversation.value = initConvs(content.conversation.convs)
        handleScrollBottom();
        setTimeout(() => {
          isScrollAndNotBottom();
        }, 300)
      })
      .catch((err) => {
      });
}


//触发新对话，获取随机的id，
function loadId() {
  axios.post(`${apiUrl.value}/generate/id`, {})
      .then((result) => {
        var resp = result.data;
        cid.value = resp.data
        conversation.value = []
      })
      .catch((err) => {
        console.error(err)
      });
}

function loadAvatar() {
  avatarIdx.value = localStorage.getItem("avatar") || Math.ceil(Math.random() * 9);
}

const chatContainer = ref(null)

function handleScrollBottom() {
  nextTick(() => {
    // 确保 chatContainer.value 已经被正确设置
    if (chatContainer.value ) {
      let scrollElem = chatContainer.value;
      scrollElem.scrollTo({top: scrollElem.scrollHeight, behavior: 'smooth'});
    }
  });
}


function isScrollAndNotBottom() {
  let chatDivEle = chatContainer.value;
  if (!chatDivEle) {
    return;
  }

  if (chatDivEle.scrollHeight <= chatDivEle.clientHeight) {
    isShowGoBottom.value = false;
    return;
  }
  const scrollTop = chatDivEle.scrollTop;
  const windowHeight = chatDivEle.clientHeight;
  const scrollHeight = chatDivEle.scrollHeight;
  if (scrollTop + windowHeight >= scrollHeight - 50) {
    isShowGoBottom.value = false;
    return;
  }
  isShowGoBottom.value = true;
}

watch(chatMsg, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    changeHeight();
    // 当 chatMsg 变化时调用 autoResize
    nextTick(() => {
      autoResize();
    })
  }
});

onMounted(async () => {
  apiUrl.value = __APP_API_RUI__;
  // 从 localStorage 获取 popupShow 状态
  const savedPopupShow = localStorage.getItem(`popupShow${__APP_VERSION__}`);
  // 如果 savedPopupShow 不存在，表示是第一次弹窗
  popupShow.value = savedPopupShow !== 'true';
  loadId();
  loadAvatar();
  // let chatDivEle = chatContainer.value;
  // chatDivEle.addEventListener('scroll', isScrollAndNotBottom, true)
  deskApp.value = `https://gschaos.club/update_file/Y-Chat_${appVersion.value}_x64_zh-CN.msi`
  window.copy = vueCopy
  getCharacterInfo();
});

</script>


<style lang="scss">
html,
body {
  height: 100%;
  width: 100%;
}

#app {
  height: 100%;
}

.flex_row_c_c {
  display: flex;
  align-content: center;
  flex-direction: row;
  justify-items: center;
}

.react-scroll-to-bottom--css-krija-1n7m0yu {
  height: 100%;
  overflow-y: auto;
  width: 100%;
}

.code_header {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.prose :where(code):not(:where([class~=not-prose] *)):before {
  content: "" !important;
}

.prose :where(code):not(:where([class~=not-prose] *)):after {
  content: "" !important;
}

#chatRepeat:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  --tw-ring-offset-width: 0px;
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), 0 0 transparent;
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 transparent);
}

.suitable_selected {
  --tw-text-opacity: 1 !important;
  cursor: auto !important;
}

.load_dot1 {
  -webkit-animation: blink 1s steps(2, start) infinite;
  animation: blink 1s steps(2, start) infinite;
}

.load_dot2 {
  -webkit-animation: blink 1s steps(3, start) infinite;
  animation: blink 1s steps(3, start) infinite;
}

.load_dot3 {
  -webkit-animation: blink 1s steps(4, start) infinite;
  animation: blink 1s steps(4, start) infinite;
}

#app .markdown h1 {
  margin-bottom: 0rem;
  margin-top: 0rem;
}

#app .markdown h2 {
  margin-bottom: 0rem;
  margin-top: 0rem;
}

#app .markdown h3 {
  margin-bottom: 0rem;
  margin-top: 0rem;
}

#app .markdown h4 {
  margin-bottom: 0rem;
  margin-top: 0rem;
}

#app .markdown h5 {
  margin-bottom: 0rem;
  margin-top: 0rem;
}

#app .markdown h6 {
  margin-bottom: 0rem;
  margin-top: 0rem;
}

@media (max-width: 640px) {
  #app .none {
    display: none;
  }
}

.w-180px {
  width: 180px;
}

.box-sh {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5); /* 添加阴影 */
}

.nav-bk {
  background-color: #EEE9E9
}

.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}
</style>
