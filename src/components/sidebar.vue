<template>
  <div
      class="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
    <div>
      <button @click="showSlideMethod" type="button"
              class="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"><span
          class="sr-only">打开侧边栏</span>
        <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round"
             stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em"
             xmlns="http://www.w3.org/2000/svg">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>
    <h1 class="flex-1 text-center text-base font-normal">{{ chatTitle }}</h1>
    <button @click.stop="newChat" type="button" class="px-3">
      <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round"
           stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  </div>
  <div v-show="showSlide" class="semi-portal" style="z-index: 1000;">
    <div class="">
      <div class="semi-modal-mask"></div>
      <div role="none" class="semi-modal-wrap">
        <div class="semi-modal semi-modal-small" id="dialog-3" style="width: 0px;">
          <div role="dialog" aria-modal="true" aria-labelledby="semi-modal-title" aria-describedby="semi-modal-body"
               class="semi-modal-content">
            <div class="semi-modal-body-wrapper">
              <div class="semi-modal-body" x-semi-prop="children">
                <div class="fixed inset-0 z-40 flex">
                  <div class="relative flex w-full max-w-xs flex-1 flex-col bg-gray-900 translate-x-0"
                       id="headlessui-dialog-panel-:r1:" data-headlessui-state="open">
                    <div class="absolute top-0 right-0 -mr-12 pt-2 opacity-100">
                      <button @click="closeShowSlide" type="button"
                              class="ml-1 flex h-10 w-10 items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"><span
                          class="sr-only">关闭侧边栏</span>
                        <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24"
                             stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-white" height="1em"
                             width="1em" xmlns="http://www.w3.org/2000/svg">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                    <div style="width:320px"
                         class="flex h-full flex-1 items-start border-white/20">
                      <mNav
                          :initAl="props.initAl"
                          :newConv="props.newConv"
                          :conversationLen="props.conversationLen"
                          :sidebarNewChat=sidebarNewChat
                          @update_parent_new_chat="newChat"
                          @update_parent_openSidebar="notifyParentUpdateSelect"
                      ></mNav>
                    </div>
                  </div>
                  <div @click="closeShowSlide" style="width:calc(100% - 320px)" class="flex-shrink-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>

import {onMounted, ref, watch} from "vue";
import mNav from "./mNav.vue";

const showSlide = ref(false);
const menu = ref(null);
const chatTitle = ref("");
const sidebarNewChat = ref(1);

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
  title_chat: {
    type: String,
    default: '新的对话'
  }
});

onMounted(async () => {
  chatTitle.value = props.title_chat
});
// 观察 popupShow prop 的变化
watch(() => props.title_chat, (val) => {
  chatTitle.value = val
});

const emit = defineEmits(['update_parent_new_chat', 'update_parent_openSidebar']);

function notifyParentUpdateSelect(conv, loadConv) {
  emit("update_parent_openSidebar", conv, loadConv)
  closeShowSlide()
}

function newChat() {
  if (props.conversationLen === 0) {
    return
  }
  sidebarNewChat.value += 1;
  chatTitle.value = "新的对话";
  emit("update_parent_new_chat", "")
}

function showSlideMethod() {
  showSlide.value = true;
}

function closeShowSlide() {
  showSlide.value = false;
}
</script>
<style scoped lang="scss">

</style>