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
                  <template v-for="(conv, idx) in conversation">
                    <!-- human -->
                    <div v-if="conv.speaker === 'human'"
                         class="w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-gray-800">
                      <div
                          class="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
                        <div class="w-[30px] flex flex-col relative items-end">
                          <div class="relative flex">
                              <span
                                  style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;">
                                <span
                                    style="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; max-width: 100%;">
                                  <img aria-hidden="true" :src="humanImage"
                                       alt="huamn"
                                       style="display: block; max-width: 100%; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px;">
                                </span>
                              </span>
                          </div>
                        </div>
                        <div
                            class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                          <div class="flex flex-grow flex-col gap-3">
                            <div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">{{
                                conv.speech
                              }}
                            </div>
                          </div>
                          <div v-if="false"
                               class="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-3 md:gap-4 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible">
                            <button
                                class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible">
                              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                   stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em"
                                   width="1em"
                                   xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                            </button>
                          </div>
                          <div class="flex justify-between"></div>
                        </div>
                      </div>
                    </div>

                    <!-- ai -->
                    <div v-if="conv.speaker === 'ai'"
                         class="w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group bg-gray-50 dark:bg-[#444654]">
                      <div
                          class="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
                        <div class="w-[30px] flex flex-col relative items-end">
                          <div
                              class="relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center"
                              style="background-color: rgb(16, 163, 127);">
                            <svg width="41" height="41" viewBox="0 0 41 41" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" class="h-6 w-6">
                              <path
                                  d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
                                  fill="currentColor"></path>
                            </svg>
                          </div>

                          <!-- 多个消息 -->
                          <div v-if="conv.speeches.length > 1"
                               class="text-xs flex items-center justify-center gap-1 invisible absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible">
                            <button @click.stop="last(conv)" :disabled="!(conv.idx > 0)"
                                    class="dark:text-white disabled:text-gray-300 dark:disabled:text-gray-400">
                              <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24"
                                   stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3" height="1em"
                                   width="1em"
                                   xmlns="http://www.w3.org/2000/svg">
                                <polyline points="15 18 9 12 15 6"></polyline>
                              </svg>
                            </button>
                            <span class="flex-grow flex-shrink-0">{{ conv.idx + 1 }} / {{
                                conv.speeches.length
                              }}</span>
                            <button @click.stop="next(conv)" :disabled="!(conv.idx < conv.speeches.length - 1)"
                                    class="dark:text-white disabled:text-gray-300 dark:disabled:text-gray-400">
                              <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24"
                                   stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3" height="1em"
                                   width="1em"
                                   xmlns="http://www.w3.org/2000/svg">
                                <polyline points="9 18 15 12 9 6"></polyline>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div
                            class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                          <div class="flex flex-grow flex-col gap-3">
                            <!--  whitespace-pre-wrap -->
                            <div class="min-h-[20px] flex flex-col items-start gap-4">
                              <div v-html="mdToHtml(conv.speeches[conv.idx], conv)"
                                   :class="{ 'result-streaming': conv.loading }"
                                   class="markdown prose w-full break-words dark:prose-invert light">
                              </div>
                            </div>
                          </div>
                          <div class="flex justify-between">
                            <div
                                class="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-3 md:gap-4 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible">
                              <button @click.stop="suitable(idx, conv, 1)"
                                      v-if="conv.suitable[conv.idx] === 0 || conv.suitable[conv.idx] === 1"
                                      :class="{ 'suitable_selected': conv.suitable[conv.idx] === 1 }"
                                      class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400">
                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                     stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em"
                                     width="1em" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3">
                                  </path>
                                </svg>
                              </button>
                              <button @click.stop="suitable(idx, conv, -1)"
                                      v-if="conv.suitable[conv.idx] === 0 || conv.suitable[conv.idx] === -1"
                                      :class="{ 'suitable_selected': conv.suitable[conv.idx] === -1 }"
                                      class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400">
                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                     stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em"
                                     width="1em" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17">
                                  </path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>

                  <div v-if="conversation.length === 0"
                       class="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100">
                    <announcement @update-chat-msg="updateChatMsg"></announcement>
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
      <div class="dark hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col">
        <div class="flex h-full min-h-0 flex-col ">
          <div  class="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
            <mNav
                :newConv="pushNewConv"
                :conversationLen="conversation.length"
                @update_parent_new_chat="newChat"
                @update_parent_openSidebar="selectConversation"
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
import {nextTick, onMounted, ref, watch, watchEffect} from "vue";
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js'
import './assets/index.css'
import 'highlight.js/styles/github.css';
import modalA from "./components/modalA.vue";
import announcement from "./components/announcement.vue";
import axios from 'axios';
import clipboard from 'vue-clipboard3'; // 默认导入
import imagePath from './assets/imgs/human9.png';

const appVersion = ref(__APP_VERSION__);
const deskApp = ref("https://gschaos.club/update_file/Y-Chat_0.1.5_x64_en-US.msi");
const apiUrl = ref();
const theme = ref('light');
const title = ref("新的对话")
const popupShow = ref(false);
const avatarIdx = ref(1);
const pushNewConv = ref({});
const conversation = ref([]);
const chatMsg = ref('');
const chatTitle = ref('新的对话');
const convLoading = ref(false);
const isShowGoBottom = ref(false);
const inputChat = ref("");
const cid = ref("");
// 使用 ref 定义响应式变量
const humanImage = ref(imagePath);
const {toClipboard} = clipboard();

function renderCodeBlock(code, codeHtml, language = "") {
  return `<div class="bg-black mb-4 rounded-md">
    <div class="code_header flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans">
      <span>${language}</span>
      <button onclick="copy(this)" class="flex ml-auto gap-2">
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        </svg>
        <span>Copy code</span>
        <code style="display:none">${code}</code>
      </button>
    </div>
    <div class="p-4 overflow-y-auto">
      <code class="!whitespace-pre hljs language-${language}">${codeHtml}</code>
    </div>
  </div>`;
}

// 配置 markdown-it 实例
const marked = new MarkdownIt({
  html: true,               // 允许 HTML 标签
  linkify: true,            // 将 URL 自动转换为链接
  typographer: true,        // 使用引号替换等
  highlight: (code, language) => {
    let codeHtml = language && hljs.getLanguage(language)
        ? hljs.highlight(code, {language}).value
        : hljs.highlightAuto(code).value;

    return renderCodeBlock(code, codeHtml, language);
  }

});
// 直接返回 highlight 函数生成的 HTML，避免 MarkdownIt 额外包裹 <code>
marked.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const language = token.info.trim();
  return marked.options.highlight(token.content, language);
};

watchEffect(() => {

});

function updateChatMsg(message) {
  chatMsg.value = message; // 将子组件传递的值赋值给父组件的 chatMsg
}

function autoResize() {
  const textarea = inputChat.value;
  textarea.style.height = "auto"; // 先重置高度
  textarea.style.height = `${textarea.scrollHeight}px`; // 设置为内容高度
}

function stopChat() {
  axios.post(`http://${apiUrl.value}/stop/chat/${cid.value}`, {})
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

function changeTheme(newTheme) {
  theme.value = newTheme;
  const html = document.documentElement; // 获取 <html> 元素
  html.classList.remove('light', 'dark');
  html.classList.add(newTheme);
  html.style.colorScheme = newTheme;
  localStorage.setItem('theme', newTheme);
}

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

function last(conv) {
  if (conv.idx === 0) {
    return;
  }
  conv.idx--;
  refreshConversation();
}

function refreshConversation() {

}

function suitable(idx, conv, suit) {
  var cdate = {
    "idx": idx,
    "msg_idx": conv.idx,
    "suitable": suit,
  }
  conv.suitable[conv.idx] = suit

  axios.put(`http://${apiUrl.value}/ai/suitable/${cid.value}`, cdate)
      .then((result) => {

        refreshConversation()
      })
      .catch((err) => {
      });
}

function next(conv) {
  if (conv.idx === conv["speeches"].length - 1) {
    return;
  }
  conv.idx++;
  refreshConversation();
}

function countAndConcat(str, substr) {
  // 使用正则表达式的全局匹配来查找子字符串
  const matches = str.match(new RegExp(substr, 'g'));

  // 判断子字符串的个数是奇数还是偶数
  const count = matches ? matches.length : 0;
  const isOdd = count % 2 === 1;

  // 根据判断结果返回相应的字符串
  return isOdd ? str + "\n" + substr : str;
}

function mdToHtml(md, conv) {
  if (md === "") {
    return "<p></p>"
  }

  md = countAndConcat(md, "```")
  return marked.render(md);
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
  refreshConversation()
  try {
    var idx = rconv.idx;
    // 使用 Axios 发送 GET 请求，接收流式数据
    fetch(`http://${apiUrl.value}/chat/repeat/${cid.value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // 设置为你接口要求的Content-Type
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
            refreshConversation();
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
  chat_msg = chat_msg.trim().replace(/\n/g, "")
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
    "speeches": [""]
  }
  conversation.value.push(conv)

  // 滚动到最下面
  handleScrollBottom();

  try {
    // 使用 Axios 发送 GET 请求，接收流式数据
    fetch(`http://${apiUrl.value}/chat/${cid.value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // 设置为你接口要求的Content-Type
      }, body: JSON.stringify({
        prompt: chat_msg
      })
    }).then(response => {
      // 处理流式数据
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
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
          conversation.value = [...conversation.value]; // 触发响应式更新
          if (first) {
            var newConv = {
              "id": cid.value,
              "title": title.value
            };
            generateConvTitle(newConv);
            pushNewConv.value = newConv
            selectConversation(newConv, false);
            refreshConversation(); // 修正拼写错误
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
  if (!loadConv) {
    return;
  }
  axios.get(`http://${apiUrl.value}/conv/${conv.id}`)
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
  axios.post(`http://${apiUrl.value}/generate/id`, {})
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
    if (chatContainer.value) {
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
  }
});
onMounted(async () => {
  apiUrl.value = __APP_API_RUI__;
  // 从 localStorage 获取 popupShow 状态
  const savedPopupShow = localStorage.getItem('popupShowV0.1.5');
  // 如果 savedPopupShow 不存在，表示是第一次弹窗
  popupShow.value = savedPopupShow !== 'true';
  var theme = localStorage.getItem("theme") || "light"
  changeTheme(theme);
  loadId();
  // loadConversations();
  loadAvatar();

  let chatDivEle = chatContainer.value;
  chatDivEle.addEventListener('scroll', isScrollAndNotBottom, true)
  deskApp.value = `https://gschaos.club/update_file/Y-Chat_${appVersion.value}_x64_zh-CN.msi`
  window.copy = vueCopy
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
</style>
